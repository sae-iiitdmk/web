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
    browser.close()
