"""Browser regression check: pip install playwright; playwright install chromium webkit.
Run against a local HTTP server or Pages: python scripts/check-vehicle.py URL ENGINE.
"""
import sys
from playwright.sync_api import sync_playwright

url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8017/'
engine = sys.argv[2] if len(sys.argv) > 2 else 'chromium'
pixel_check = '''async canvas => await new Promise(resolve => requestAnimationFrame(() => {
  const gl = canvas.getContext('webgl2');
  const pixel = new Uint8Array(4);
  let visible = 0;
  for (let y=1; y<20; y++) for (let x=1; x<20; x++) {
    gl.readPixels(Math.floor(canvas.width*x/20), Math.floor(canvas.height*y/20), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
    if (pixel[3]>32) visible++;
  }
  resolve(visible);
}))'''
colour_check = """async canvas => await new Promise(resolve => requestAnimationFrame(() => {
  const gl = canvas.getContext('webgl2');
  const pixels = new Uint8Array(canvas.width * canvas.height * 4);
  gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  let visible = 0, blue = 0, clipped = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] <= 200) continue;
    visible++;
    if (pixels[i + 2] > pixels[i] + 8) blue++;
    if (pixels[i] > 248 && pixels[i + 1] > 248 && pixels[i + 2] > 248) clipped++;
  }
  resolve({visible, blue, clipped});
}))"""
with sync_playwright() as p:
    browser = getattr(p, engine).launch()
    for width in (1440, 390):
        page = browser.new_page(viewport={'width': width, 'height': 1000})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(url)
        for attempt in range(3):
            page.wait_for_selector('.hero-art[data-vehicle-state="ready"]', timeout=60000)
            canvas = page.locator('#vehicle-viewer canvas')
            assert canvas.evaluate(pixel_check) > 3, 'Ready state with blank framebuffer'
            colours = canvas.evaluate(colour_check)
            assert colours['visible'] > 1000, colours
            assert colours['blue'] > colours['visible'] * 0.1, 'Imported blue is washed out: ' + str(colours)
            assert colours['clipped'] < colours['visible'] * 0.1, 'Material highlights clip to white: ' + str(colours)
            if attempt < 2:
                page.reload()
        canvas.focus()
        page.keyboard.press('ArrowRight')
        page.keyboard.press('+')
        page.locator('#vehicle-reset').click()
        page.wait_for_timeout(500)
        assert canvas.evaluate(pixel_check) > 3
        page.evaluate('scrollTo(0,document.body.scrollHeight)')
        page.wait_for_timeout(300)
        page.evaluate('scrollTo(0,0)')
        page.wait_for_timeout(500)
        assert canvas.evaluate(pixel_check) > 3
        page.set_viewport_size({'width': 800, 'height': 700})
        page.wait_for_timeout(500)
        assert canvas.evaluate(pixel_check) > 3
        page.wait_for_timeout(3000)
        assert canvas.evaluate(pixel_check) > 3
        assert not errors, errors
        print(f'{engine} {width}: actual pixels survive reload, keyboard, reset, scroll, resize, idle', flush=True)
        if engine == 'chromium':
            canvas.evaluate("c => { window.contextLoss = c.getContext('webgl2').getExtension('WEBGL_lose_context'); window.contextLoss.loseContext(); }")
            page.wait_for_selector('.hero-art[data-vehicle-state="fallback"]')
            assert page.locator('.vehicle-fallback').is_visible()
            page.evaluate('window.contextLoss.restoreContext()')
            page.wait_for_selector('.hero-art[data-vehicle-state="ready"]', timeout=30000)
            assert canvas.evaluate(pixel_check) > 3
            print('GPU context loss shows image; restoration redraws real geometry', flush=True)
        page.close()
    page = browser.new_page()
    page.route('**/assets/vehicle.glb*', lambda route: route.abort())
    page.goto(url)
    page.wait_for_selector('.hero-art[data-vehicle-state="fallback"]', timeout=30000)
    assert page.locator('.vehicle-fallback').is_visible()
    print('Failed model download leaves visible image', flush=True)
    page = browser.new_page()
    page.add_init_script("const getContext=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /^webgl/.test(type)?null:getContext.call(this,type,...args);};")
    page.goto(url)
    page.wait_for_selector('.hero-art[data-vehicle-state="fallback"]', timeout=30000)
    assert page.locator('.vehicle-guidance').is_visible()
    assert 'acceleration' in page.locator('.vehicle-guidance').inner_text()
    assert page.locator('.vehicle-fallback').is_visible()
    print('Unavailable graphics show browser-acceleration guidance and static preview', flush=True)
    browser.close()
