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
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 3.2vw, 52px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px, 6vw, 92px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(24px, 2.65vw, 40px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
spacing:
  section: "clamp(24px, 4vw, 64px)"
  mobile-section: "24px"
  section-margin: "55px"
  row: "32px"
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

The user-selected Aspen Search reference sets the layout and motion; the team palette sets all colors: oversized Manrope lettering, carbon-black and oxblood planes, gold identity accents, and thin continuous dividers. The supplied SAE logo sheet anchors the identity; its cropped monograms provide artwork without invented team photography.

Key characteristics:

- Large, tightly spaced typography against compact utility labels.
- Edge-to-edge divided grids with generous internal space.
- Scroll-linked monogram movement with static and reduced-motion fallbacks.

## Colors

### Primary

Oxblood (#4a101b) owns invitation panels and the hero artwork, paired with pale gold (#f3ddb0). Gold (#c7a45c) carries the masthead, team-art background, and text selection. Carbon black (#121212) anchors the hero masthead, statement, and footer. These brand colors were explicitly supplied by the user and take precedence over the reference palette.

### Neutral

Paper and ink form the page foundation. Wash separates artwork and collections; muted supports descriptive copy; line marks secondary divisions. Carbon blocks retain their pale-gold foreground in both themes.

The five `*-dark-theme` frontmatter colors replace paper, ink, muted, wash, and line under `data-theme="dark"`. Oxblood, on-oxblood, gold, on-gold, dark, and on-dark remain fixed. Theme selection follows the device until locally overridden using `sae-theme`.

**The Paired Surface Rule.** Always pair oxblood with on-oxblood, gold with on-gold, and dark with on-dark rather than the current page foreground.

## Typography

Display and body share self-hosted variable **Manrope**, with a sans-serif fallback. The WOFF2 asset is `assets/fonts/manrope-latin.woff2`; the declared weight range is 400–800 and font display is swap.

Frontmatter records the masthead, major section heading, note title, body, and label roles. General headings use balanced wrapping. The chapter subline uses `clamp(25px, 3.3vw, 50px)` and line height 1.15; inner-page display headings use `clamp(85px, 10vw, 160px)`. Body paragraphs cap at 65ch; article paragraphs cap at 60ch.

The home masthead spells out Society of Automotive Engineers, with a 34px stacked heading and chapter caption on mobile; primary section headings use 60px. Inner-page titles use `clamp(68px, 22vw, 90px)` to contain long words.

## Layout

Use full-width sections rather than a centered card stack. The desktop hero uses a 3:7 text/vehicle split with a 280px minimum text rail. The vehicle spans the identity and intro rows; its height is `clamp(560px, calc(100svh - 180px), 720px)`. The hero contains the team name, a short factual introduction, and the vehicle; slogan panels are omitted. Copy groups align at the top with 16–24px gaps rather than stretching short text across tall panels. General splits are 1:1, contact is 1.5:1, journal navigation/content is 1:2, and collections are three equal columns.

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

- **Do** preserve Manrope, divided grids, fixed surface/foreground pairs, and the supplied identity artwork.
- **Do** keep keyboard, native details/dialog behavior, dark theme, and reduced-motion fallbacks intact.
- **Do** contain long headings within their grid columns on narrow screens.
- **Don't** add rounded card stacks, gradients, or decorative shadows to this visual world.
- **Don't** use fictional photographs, metrics, or achievements as visual proof.

## Workshop photography

The homepage pairs a large workshop image with a compact gallery invitation. Gallery photographs retain their natural proportions in three columns, two below 1024px, and one below 540px, with 24px gaps. Each photograph has a factual caption and opens in the existing native dialog; thumbnails are lazy-loaded and full-size images load on demand. Sponsorship actions use the existing ruled contact links, including the approved full PDF download.

The homepage sponsor strip sits immediately above contact, with two linked marks at their natural proportions and no visible heading. Its fixed cream surface preserves logo legibility in both themes. Logos stack on screens below 540px.

Headings use direct labels. Copy is brief and factual; repeated introduction panels and promotional slogans are omitted.
