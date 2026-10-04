# Assets Folder

This folder serves as the central location for all media assets used in the SAE Club website.

## Recommended Structure

```
assets/
├── images/
│   ├── logo/          # SAE club logos
│   ├── team/          # Team photos
│   ├── events/        # Event photos
│   ├── projects/      # Project images
│   └── gallery/       # Gallery images
├── icons/             # Custom icons (if any)
└── documents/         # PDFs, reports, etc.
```

## Usage

When adding images, update the corresponding HTML files to reference them. Example:

```html
<img src="assets/images/team/group-photo.jpg" alt="SAE Team 2024">
```

## Notes

- Use optimized images (WebP format recommended for web)
- Keep file names lowercase with hyphens
- Include descriptive alt text for accessibility
