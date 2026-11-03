---
name: Mostafa Arekhi Portfolio
description: Persian video and motion portfolio in a neon After Effects workspace.
colors:
  bg: "#0d0d17"
  line: "#2b2a3b"
  text: "#f5f4fa"
  muted: "#acaabe"
  purple: "#b485ff"
  focus: "#c99cff"
typography:
  display:
    fontFamily: "Vazirmatn, sans-serif"
    fontSize: "clamp(34px, 3.65vw, 57px)"
    fontWeight: 800
    lineHeight: 1.6
    letterSpacing: "-1.8px"
  headline:
    fontFamily: "Vazirmatn, sans-serif"
    fontSize: "22px"
    fontWeight: 500
  body:
    fontFamily: "Vazirmatn, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  icon: "8px"
  button: "12px"
  panel: "15px"
  project: "15px"
spacing:
  actions: "18px"
  project-gap: "26px"
  mobile-inset: "14px"
components:
  button-primary:
    backgroundColor: "linear-gradient(130deg, #7654e4, #6446de)"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "10px 25px"
  button-secondary:
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "10px 25px"
  project-card:
    backgroundColor: "#08070e"
    rounded: "{rounded.project}"
---

# Design System: Mostafa Arekhi Portfolio

## Overview

**Creative North Star: "Neon After Effects Workspace"**

The supplied Neon After Effects Portfolio UI reference governs the implemented world: a violet-black editor frame, lavender illumination, a dimensional Ae object and orbit, and a compact skills timeline. Persian copy gives the portfolio its voice; actual project videos and the portrait provide its substance.

The interface combines dense editor details with open space around the introduction and contact invitation. Decorative controls suggest a creative workspace; functional controls remain identifiable as navigation, playback, timeline scrubbing and contact links.

**Key Characteristics:**
- Dark editor panels with quiet violet borders.
- Persian hierarchy with deliberate LTR islands for filenames, software marks and time.
- Neon depth concentrated in the Ae illustration.
- Real video previews with a central play/pause control.

## Colors

### Primary
- **Lavender purple** (`purple`) is the shared accent family; the illustration and actions use related violet gradients.
- **Pale lavender focus** (`focus`) marks keyboard focus with a two-pixel outline and six-pixel offset.

### Neutral
- **Violet black** (`bg`) anchors the page and separates the timeline columns.
- **Editor divider** (`line`) draws header, timeline and service separators.
- **Soft white** (`text`) carries primary reading and controls.
- **Muted lavender grey** (`muted`) carries supporting paragraphs and notes.

**The Local Glow Rule.** Keep the strongest glow around the hero object and orbit; content panels retain quiet borders and restrained gradients.

## Typography

Vazirmatn with sans-serif fallback carries Persian text; weights 400–900 load from Google Fonts. Arial renders Ae/Pr/Ps marks; Georgia renders decorative fx labels. Filenames and timecodes retain Latin direction.

The hero uses the display token on wide screens. At the 1200px and 900px breakpoints it becomes 40px and 31px. At 640px and below it uses `clamp(33px, 8.1vw, 48px)`, normal wrapping and a 1.65 line height. About headings use 52px/700 (44px at 1200px, 36px at 900px, 40px on mobile); about copy uses 19px/2.05 with a 46ch maximum measure, reducing to 17px/2 on mobile. The contact headline uses 80px/800 with a 1.5 line height, reducing to 66px at 900px and 56px on mobile. Introductory copy uses 18px/1.95 on wide screens; supporting prose uses the body style, often with a line height of 2.

## Layout

The document and hero grid are Persian RTL. Header chrome, hero artwork and timeline ruler retain LTR containers with RTL copy inside where needed; the project carousel follows RTL. Preserve these explicit direction boundaries.

The sticky header is 76px tall. The decorative left tool rail is a descendant of the hero, confined between its top and bottom insets; main content and footer have no left offset. The hero has a maximum width of 1530px and two columns: copy right, artwork left. Above 640px, a centered hero-scene wrapper keeps the illustration on one fixed 520×465px canvas. ResizeObserver scales that canvas uniformly to the artwork column width divided by 520, capped at 1.2; the orbit and Ae object therefore retain their proportions as the column narrows. The outer hero-art retains the layout and artwork loops. At 640px and below the wrapper uses display:contents, preserving the existing mobile composition. The timeline uses a 35% layer list and 65% track area. Projects form an RTL native scroll-snap carousel inside a centered 1640px maximum width, with four portrait videos visible on desktop; three separate service cards align alongside one another. Portrait artwork and biography form two equal columns inside a 1480px maximum width with a 650px section minimum height. The portrait frame grows to a 440px maximum width. Services and contact also use a 1480px maximum width; contact has a 660px minimum height and a broad centered invitation.

Responsive rules are at 1600px minimum and 1200px, 900px and 640px maximum. At 900px the project carousel shows two videos, the rail narrows and services become a single list up to 680px wide; each card places its visual and text side by side at 45%/55%. At 640px the header becomes 67px tall, the rail disappears, navigation opens vertically, and hero, biography and services stack. The carousel shows one full-width card at a time, retaining horizontal navigation with an 18px gap. Panels use the mobile inset token. Service visuals return above their text; contact links form a vertical grid up to 340px wide. The portrait frame retains 88% width with a 330px maximum. The timeline stays two columns at 43%/57%, with smaller labels and fewer visible ruler labels.

## Elevation & Depth

Violet tonal layers, fine borders and small shadows establish depth. The translucent header has a 16px backdrop blur. CSS/SVG hero artwork combines gradient faces, extrusion shadows, an illuminated orbit, selection handles, translucent planes and a curve graph. Video cards brighten their borders on hover without moving; buttons lift three pixels. The Ae object floats over seven seconds and the caret blinks over 1.2 seconds. Reduced-motion CSS disables animations, transitions and smooth scrolling; timeline autoplay is disabled for reduced motion, while its manual play button remains available. One-shot IntersectionObserver entrances animate opacity and the individual CSS translate property from 22px below over .65s with cubic-bezier(.16,1,.3,1), leaving existing illustration transforms intact. Second and third project/service cards receive 70ms and 140ms delays. Observed elements are unobserved after entry. Reduced-motion preference skips entrance setup; no scroll handler or animation library is added.

## Shapes

Softly rounded buttons, panels, project cards and software tiles follow the frontmatter radii; video cards reduce to 13px on mobile. The Ae object is a sculptural rounded square. Diamond keyframes and square selection handles provide editor-specific contrast. Most borders are one pixel; the header mark and orbit use two-pixel strokes.

## Components

### Actions and navigation
Primary actions have a violet gradient, inset highlight and subtle outer shadow. Secondary actions have a transparent surface and muted border. Both align icon and label inline, have a minimum wide-screen height of 51px, lift on hover and retain global keyboard focus. Header links use a bottom accent for hover/active state; on mobile it becomes a vertical rule. The menu exposes expanded state and closes on link selection, Escape or a click outside the header.

### Project slider and video card
The fourteen uploaded Usher/Arkan videos form an RTL native scroll-snap carousel. Fisher–Yates randomizes the complete list once per page load without duplicates; the former three-video selection is no longer displayed. Previous/next buttons, mouse dragging, native touch scrolling, keyboard arrows and Home/End navigate. Mouse dragging can start on the picture, rail or play circle; it uses a grab cursor and temporarily disables snap, then snaps to the nearest card on release. Touch uses the browser’s horizontal overflow scrolling and CSS snap with touch-action:auto, preserving vertical page scrolling and pinch zoom. Custom pointer dragging runs only for pointerType mouse. There is no bottom control-strip exclusion. Mouse dragging suppresses the subsequent click so it cannot accidentally toggle playback; lostpointercapture only ends the drag when its event target is the carousel grid. A Persian live position label reports the visible range and boundary buttons disable at the ends. ArrowLeft advances and ArrowRight returns when the carousel itself has focus; each playback button remains independently keyboard accessible. Motion preferences switch navigation between smooth and instant scrolling. No autoplay or slider dependency is used.

Cards contain vertical 9:16 videos and a central 64px circular play/pause button, as explicitly requested. Native video controls are absent. The button has a translucent dark-purple surface, pale border, white 25px icon and soft shadow. It hides during playback and returns on pause or end; keyboard focus reveals the pause control while playing. Clicking the picture also toggles playback. Play/pause/end events synchronize its icon, accessible label and aria-pressed state. There are no badges or visible captions. Video uses contain against a near-black background. Hover only brightens the border. All fourteen videos have matching assets/posters/<basename>.jpg poster images, extracted at one second and 450px wide (496KB total), so previews appear before video loading. Sources begin as lazy data-src values with preload none and load near the viewport (180px vertical and 100px horizontal observer margins). Playing one video pauses the others; videos pause when offscreen or when the document is hidden. A shared live status region reports loading failures, and each video keeps its descriptive accessible label.

### Skills timeline
Four labeled layers align with colored clips, diamond keyframes and a playhead. A transparent native range input supports pointer/keyboard scrubbing; focus outlines the track container. The seven-second, 30fps decorative timeline autoplays in a continuous loop, wrapping its position modulo 210 and updating the hero timecode. An observer pauses it offscreen; document visibility pauses and resumes it when appropriate. Manual pause persists rather than being overridden by visibility or observer changes. Reduced-motion preference disables automatic playback, while the manual play button can still start it. Timeline playback does not control project videos; video autoplay remains absent.

### Software, portrait and contact
Ae/Pr/Ps letter marks sit on tinted dark tiles. Services are separate 16px-radius preview cards with plum, violet and blue-black accents. Each has a 270px decorative visual stage with a software window bar, followed by a body with a 27px/600 title, 16px description and contact CTA. Editing shows a layered preview and timeline; motion shows an extruded tile, dashed curve and nodes; design shows typography sheets and color swatches. These visuals use CSS and inline SVG, with no added assets or dependencies. Software marks in the preview bars are 31px tiles with a 6px radius. On hover-capable devices without reduced-motion preference, the central preview shape shifts/rotates gently; the once-only entrance behavior remains unchanged. The portrait is a rotated framed composition with a toolbar, readable name plaque, corner selection handles, offset backplate, elliptical orbit, floating layer label and diamond keyframe strip. These are decorative editor geometry; the real portrait remains the focal image. A dedicated photo stage uses a 443/448 aspect ratio with overflow clipping and a radial CSS light behind the original 443×527 transparent image. Bottom anchoring crops the transparent upper padding, bringing the head near the frame top without modifying the asset. Contact links are prominent bordered rectangles with an 11px radius, 210px minimum width, 19px 26px padding and 18px text on desktop; Telegram has initial filled emphasis. Mobile links span the available width with 17px text. Preserve the real destinations. No contact form or text-entry field exists.

## Do's and Don'ts

### Do:
- Do preserve Persian reading order and explicit LTR filenames, marks and timecodes.
- Do keep real videos, the portrait and existing contact destinations as the content anchors.
- Do retain visible keyboard focus, labeled controls and reduced-motion CSS behavior.
- Do keep the strongest dimensional neon effects in the hero and echo editor geometry in the portrait.

### Don't:
- Don't turn decorative window chrome, tool icons or selection handles into apparent working controls.
- Don't add playback chrome beyond the central play/pause button, or badges and captions over the vertical project videos.
- Don't flatten the mobile layout into a scaled desktop canvas.

## Artwork loops
Hero tile and orbit float gently; the About portrait and layer drift over an 8-second cycle, with opacity breathing in the portrait backlight. CSS composite properties preserve base framing. IntersectionObserver and page visibility pause loops when offscreen or hidden. Reduced-motion preference disables spatial loops and preference changes apply immediately. No dependencies or per-frame JavaScript are added.


Contact closing title stays on one line with fluid 24–80px type. Contact buttons pair their existing labels with decorative Telegram, Instagram and WhatsApp SVG icons.

Contact logos use Bootstrap Icons' Telegram, Instagram and WhatsApp SVGs (MIT), replacing the older thin illustrations.

