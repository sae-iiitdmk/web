---
name: SAE IIITDM Kurnool
description: Aspen-inspired editorial grid for the SAE student chapter.
colors:
  paper: "#f5efe1"
  ink: "#151313"
  muted: "#665a4c"
  wash: "#e6d8b8"
  oxblood: "#4a101b"
  gold: "#c7a45c"
  on-gold: "#151313"
  on-oxblood: "#f3ddb0"
  dark: "#121212"
  on-dark: "#f3ddb0"
  line: "#b8a588"
  paper-dark-theme: "#121212"
  ink-dark-theme: "#f3e6c8"
  muted-dark-theme: "#c3b599"
  wash-dark-theme: "#242020"
  line-dark-theme: "#756754"
typography:
  display:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(36px, 4.4vw, 64px)"
    fontWeight: 900
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(52px, 6.2vw, 88px)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(24px, 2.65vw, 40px)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "20px"
    lineHeight: 1.5
  label:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "12px"
spacing:
  section: "clamp(24px, 3.5vw, 56px)"
  mobile-section: "24px"
  section-margin: "0"
  row: "24px"
  compact: "12px"
components:
  text-link:
    textColor: "{colors.ink}"
    padding: "0 0 8px"
  header-contact:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.on-dark}"
    padding: "0 24px"
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 18px"
  collection:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    padding: "32px"
  collection-oxblood:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.on-oxblood}"
    padding: "32px"
  lightbox:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "48px 24px 24px"
    width: "min(90vw, 880px)"
---

# Design System: SAE IIITDM Kurnool

## Overview

**Creative North Star: “Aspen's editorial grid, adapted to SAE.”**

The user-selected Aspen Search reference sets the layout and motion; the team palette sets all colors: oversized Helvetica-first lettering, carbon-black and oxblood planes, gold identity accents, and thin continuous dividers. The supplied SAE logo sheet anchors the identity; its cropped monograms provide artwork without invented team photography.

Key characteristics:

- Large, tightly spaced typography against compact utility labels.
- Edge-to-edge divided grids with generous internal space.
- Scroll-linked monogram movement with static and reduced-motion fallbacks.

## Colors

### Primary

Oxblood (#4a101b) owns invitation panels and the hero artwork, paired with pale gold (#f3ddb0). Gold (#c7a45c) carries the masthead, team-art background, and text selection. Carbon black (#121212) anchors the hero masthead and introduction. These brand colors were explicitly supplied by the user and take precedence over the reference palette.

### Neutral

Paper and ink form the page foundation. Wash separates artwork and collections; muted supports descriptive copy; line marks secondary divisions. Carbon blocks retain their pale-gold foreground in both themes.

The five `*-dark-theme` frontmatter colors replace paper, ink, muted, wash, and line under `data-theme="dark"`. Oxblood, on-oxblood, gold, on-gold, dark, and on-dark remain fixed. Theme selection follows the device until locally overridden using `sae-theme`.

**The Paired Surface Rule.** Always pair oxblood with on-oxblood, gold with on-gold, and dark with on-dark rather than the current page foreground.

## Typography

Display and body share the installed **Helvetica Neue / Helvetica** stack, with Arial and sans-serif fallbacks. Headings request weight 900; the installed font determines the available rendered weight. The previous Manrope preload and active font-face declaration are removed.

Frontmatter records the masthead, major section heading, note title, body, and label roles. General headings use balanced wrapping. The chapter subline uses `clamp(25px, 3.3vw, 50px)` and line height 1.15; inner-page display headings use `clamp(85px, 10vw, 160px)`. Body paragraphs cap at 65ch; article paragraphs cap at 60ch.

The home masthead spells out Society of Automotive Engineers, with a 34–42px stacked heading and chapter caption on mobile; primary section headings use 60px. Inner-page titles use `clamp(68px, 22vw, 90px)` to contain long words.

## Layout

Use full-width sections rather than a centered card stack. The desktop hero uses a 3:7 text/vehicle split with a 280px minimum text rail. The vehicle spans the identity and intro rows; its height is `clamp(560px, calc(100svh - 180px), 640px)`. The hero contains the team name, a short factual introduction, and the vehicle; slogan panels are omitted. Copy groups align at the top with 16–24px gaps rather than stretching short text across tall panels. General splits are 1:1, contact is 1.5:1, journal navigation/content is 1:2, and collections are three equal columns.

Section padding follows the frontmatter section token. Below 768px it becomes 24px, major grids stack, and collections become one column. The mobile hero stacks a compact identity heading, a 420px vehicle panel, and supporting text with content-driven heights. Vehicle controls reserve 72px and have a 44px minimum button height. At 1150px and below the clock hides and header spacing tightens. At 360px and below controls and hero copy tighten further. Above 1800px the body caps at 1800px with side borders.

The sticky header is 76px tall, or 66px below 768px. Its layer is 10; the mobile navigation is fixed immediately below it at layer 9. Journal navigation is sticky on desktop and static on mobile.

## Elevation & Depth

No box shadows are implemented. Flat tonal blocks, one-pixel divisions, oversized type, and clipped artwork establish depth. The native artwork dialog uses an opaque dark translucent backdrop (`rgb(12 10 10 / 0.8)`) rather than a floating card shadow.

## Shapes

Square corners and continuous one-pixel rules define the system. Do not add rounded cards or gradients. Artwork regions clip oversized monograms; home logo variants use 200% background sizing to crop the supplied sheet. The header uses the transparent logo PNG with centered contain sizing. Gallery collection panels share borders rather than leaving card gutters.

## Components

- **Navigation and controls:** compact text, theme icon button, dark contact link, and underlined current/hover desktop route. Mobile Menu becomes Close while expanded; link selection, Escape, and returning to desktop close it. Escape returns focus to the toggle.
- **Text and block links:** fine underline or top rule with an arrow that shifts 3px right/up on hover. Use these existing action patterns rather than inventing a filled primary button.
- **Keyboard focus:** links, buttons, and summaries use a 3px current-color outline offset by 5px. The skip link appears on focus above the header.
- **Discipline details:** native `details`/`summary`, thin top and final bottom rules, 28px vertical summary padding, and a plus icon rotating 45 degrees when open. Topic tags are small labels with bottom rules, not pills.
- **Notes and collections:** notes are ruled grid rows; collections are flat adjacent panels in wash, charcoal, or oxblood. Hovered note rows use wash. Maintain explicit captions for unavailable photography.
- **Artwork dialog:** native modal, frontmatter sizing, maximum height 95dvh, contained image at maximum 75dvh, close control, centered caption, and outside-click dismissal. Native Escape behavior is retained.
- **Monogram motion:** native CSS scroll timelines move the hero mark from `translateX(0) rotate(-8deg)` to `translateX(-38%) rotate(12deg)` across the first 1100px of root scrolling. The team mark moves from `translateX(10%) rotate(5deg)` to `translateX(-12%) rotate(-5deg)` across its view timeline. Unsupported browsers retain static artwork. Reduced motion disables animations/transitions and smooth scrolling. The dotted wheel canvas redraws only on resize, with device-pixel ratio capped at 2.

## Do's and Don'ts

- **Do** preserve Helvetica-first typography, divided grids, fixed surface/foreground pairs, and the supplied identity artwork.
- **Do** keep keyboard, native details/dialog behavior, dark theme, and reduced-motion fallbacks intact.
- **Do** contain long headings within their grid columns on narrow screens.
- **Don't** add rounded card stacks, gradients, or decorative shadows to this visual world.
- **Don't** use fictional photographs, metrics, or achievements as visual proof.

## Workshop photography

The homepage pairs a large workshop image with a compact gallery invitation. Gallery photographs retain their natural proportions in three columns, two below 1024px, and one below 540px, with 24px gaps. Each photograph has a factual caption and opens in the existing native dialog; thumbnails are lazy-loaded and full-size images load on demand. Sponsorship actions use the existing ruled contact links, including the approved full PDF download.

The homepage sponsor strip sits immediately above contact, with two linked marks at their natural proportions and no visible heading. Its fixed cream surface preserves logo legibility in both themes. Logos stack on screens below 540px.

Most headings use direct labels. Two focused expressive headlines accompany the debut result and workshop photographs; copy elsewhere stays brief and factual. Repeated introduction panels are omitted.

The debut result pairs an uncropped team photograph with an oxblood copy panel. Gallery and notes retain the full photograph proportions, captions, and source links.

Gallery navigation links to three named collections: Team & results, Workshop, and Logo. Sections have stable anchors; new uploads should be grouped by event or activity rather than appended to an unsorted collection.

The header identifies the team as Team Monarch above the IIITDM Kurnool caption on every route. Its type and logo scale down on narrow phones to keep navigation controls visible.

Contact details include a visible clickable email and a plain postal address. Supporting links use 18–20px type, 16px vertical padding, and a 56px minimum target height.

The contact section includes a compact, lazy-loaded Google Maps iframe above its supporting links (220px tall on desktop, 200px on mobile), with a titled frame and a direct location link. The embed is taken from the institute's contact page.

## Typography and final section

Use Helvetica Neue / Helvetica when installed, falling back to Arial / sans-serif. No proprietary Helvetica font files are bundled. Headings request weight 900; available installed font faces determine the rendered weight. General body copy is 20px on desktop, with main panel copy at 22–28px and phone copy at 20–22px. Captions use 15px. Compact navigation, map links, and contact actions retain moderate sizes.

The shared footer panels are removed. Contact is the final homepage section. Main panel padding caps at 56px; work and notes omit their former extra margins. Text remains content-driven, with no forced panel-height stretching.

The hero now caps at 640px with 36–64px desktop title type and 20–28px introduction copy. The logo sheet caps at 440px inside a 24px padded panel to avoid creating an oversized adjacent text panel.
