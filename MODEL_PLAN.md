# Vehicle visual and scroll animation plan

## Verified source

- Local ZIP: `assets/Assembly__.zip` (118,896,146 bytes).
- Main assembly: `Assembly__/gaadi_after_brakes_ass_stp.STEP` (59,349,469 bytes).
- STEP header: AP214 / AUTOMOTIVE_DESIGN, exported by SolidWorks 2026.
- Offline import test succeeded using OpenCascade through `occt-import-js`.
- Test tessellation: 297 meshes, 1,413,225 triangles, 1,152,830 vertices.
- Tessellation settings: millimeters, absolute linear deflection 1.0, angular deflection 0.35.
- Import bounding dimensions: approximately 2416 × 1802 × 2015 mm; these describe the whole imported assembly's bounding box, not certified vehicle specifications.
- Inspection details: `planning/model-inspection.json`.
- Actual geometry preview: `planning/vehicle-preview.png`. This is a technical preview with simple lighting and imported mesh colors, not a finished promotional render. The camera and materials still need art direction.

The test confirms the assembly can be imported and rendered. The solidworks
assembly files do not need to be resolved separately for this STEP import.
It does not validate mechanical function, design dimensions, or assembly constraints.

## Recommended implementation

The user wants the vehicle to move aside on scroll rather than a complete
interactive CAD viewer. Render the actual assembly offline to a transparent
image and animate that image. Avoid shipping the STEP or triangulated CAD
scene to visitors for this effect.

1. Choose a clear three-quarter camera angle that shows chassis, wheels,
   suspension, and braking components. Confirm upright orientation and framing.
2. Produce a finished transparent render from the supplied geometry. Use
   controlled light and oxblood/carbon/gold presentation consistent with the
   website. Keep recognizable engineering details; do not invent components.
3. Export responsive transparent WebP images, with PNG as a fallback if needed.
   Working targets: a desktop image around 1600px wide and a smaller mobile
   image, ideally each under 500KB. These are targets, not measured final sizes.
4. Replace the home hero's moving monogram with the vehicle render. Keep the
   real logo in the header and the existing gallery identity artwork.
5. Start the vehicle prominently in the hero. As the visitor scrolls, translate
   it sideways and reduce its scale slightly to reveal adjacent team/project
   text. Use CSS scroll timelines for transform/opacity; keep the transition
   reversible when scrolling upward.
6. At mobile widths keep the vehicle contained above the text, with shorter
   movement. Show it statically when reduced motion is requested or scroll
   timelines are unavailable.
7. Verify image loading, visible vehicle details, text overlap, keyboard access,
   scroll reversibility, responsive layout, reduced motion, and page performance.

For a change in viewing angle, use a small set of actual rendered views with
crossfades. A lightweight GLB/Three.js presentation is an optional later
upgrade if real camera orbiting is required. It would require decimation,
material consolidation, and measurement on phones; the 1.4-million-triangle
test mesh is not the intended browser asset.

## Hosting and source handling

The original ZIP and CAD sources stay local and are ignored by Git. The
planning preview is outside `assets/`, so the Pages workflow does not deploy
it. Only final optimized site assets should be added to `assets/` when the
model animation is implemented. The existing GitHub Pages deployment needs
no backend for either image animation or an optional GLB presentation.

## Current state

Import feasibility and a technical render are verified. Header transparency
is implemented. The vehicle scene and its scroll animation are planned, and
have not replaced the live hero yet.

Reference: [occt-import-js import and triangulation documentation](https://github.com/kovacsv/occt-import-js).
