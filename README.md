# SAE IIITDM Kurnool website

A static website using HTML, CSS, and browser JavaScript. No installation,
build command, database, or application server is required for hosting.

## Files

- `index.html`: home, about, activities, and update previews.
- `blogs.html`: update cards.
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

## Current content status

The pages are a draft. Social/contact links and article links using `href="#"`
need real destinations. The gallery contains emoji placeholders rather than
photos. Existing event dates, participation claims, awards, and attendance
figures need confirmation by the team before publication. There is no member
roster yet.

For an informational team site, prioritize the about section, verified team
members/roles, projects, official social links, contact details, and photos.
Keep blogs only if the team intends to maintain them.

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
