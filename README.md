# SAE IIITDM Kurnool website

A static website using HTML, CSS, and browser JavaScript. No installation,
build command, database, or application server is required for hosting.

## Files

- `index.html`: home, about, activities, and update previews.
- `blogs.html`: engineering field notes.
- `gallery.html`: gallery layout and image lightbox.
- `css/styles.css`: shared styles and responsive layouts.
- `js/main.js`: mobile menu, scrolling, animations, and lightbox.
- `assets/`: add real team photos, logos, and documents here.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000>. Stop the server with Ctrl+C.

## Design and content

The site uses an Aspen Search-inspired divided grid, oversized Manrope type,
charcoal/mint panels, and scroll-linked movement of the supplied team monogram.
Fonts and icons are self-hosted; there is no external runtime dependency.

- Home: chapter introduction, engineering disciplines, teamwork, and verified links.
- Field notes (`blogs.html`): complete educational articles on design, testing, and documentation.
- Gallery: supplied logo artwork with a keyboard-accessible viewer and clearly marked future photo collections.

The mobile menu, native disclosure panels, light/dark theme switch, and artwork
viewer work without a framework. Motion respects reduced-motion preferences;
unsupported scroll timelines fall back to a static logo. The main content and
links remain available without JavaScript.

Team photos, a confirmed roster, official social URLs/contact email, and the
vehicle STEP/render have not yet been supplied. Add real content before making
claims about people, achievements, or competitions. `DESIGN.md` documents the
visual system; `PRODUCT.md` records the known product facts.

## Assets

`assets/logo.jpeg` is the original team logo sheet. The header and home artwork
use its variants through CSS positioning without modifying the original file.
Manrope is distributed under the SIL Open Font License; Tabler icons use MIT.
Their licenses are included in `assets/fonts/` and `assets/icons/`.

## GitHub Pages deployment

- Repository: <https://github.com/sae-iiitdmk/website>
- Website address once deployed: <https://sae-iiitdmk.github.io/website/>
- Deployment runs: <https://github.com/sae-iiitdmk/website/actions/workflows/pages.yml>

Set **Settings > Pages > Source** to **GitHub Actions** before the first deployment.
The workflow
in `.github/workflows/pages.yml` deploys on every push to `main` and can also
be run manually from the Actions tab.

The workflow copies the HTML pages, CSS, JavaScript, assets, and `.nojekyll`
into a staging folder, uploads it, and deploys it to Pages. No build tool or
custom secret is required. If you add another page or top-level asset folder,
include it in the workflow's copy step.

Keep navigation and asset paths relative so they work under `/website/`.
After pushing changes, wait for the deployment run to succeed and check the
published pages. Pages settings are at
<https://github.com/sae-iiitdmk/website/settings/pages>.

To use `https://sae-iiitdmk.github.io/` without `/website/`, rename this
repository to `sae-iiitdmk.github.io` and update these links.

References:
- [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Configure a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
