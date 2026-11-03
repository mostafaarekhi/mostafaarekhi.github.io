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
    fontSize: "clamp(36px, 3.9vw, 61px)"
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
  project: "17px"
spacing:
  actions: "18px"
  project-gap: "22px"
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
    backgroundColor: "#15111e"
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
- Real video previews with native playback controls.

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

The hero uses the display token on wide screens. At the 1200px and 900px breakpoints it becomes 42px and 34px. At 640px and below it uses `clamp(33px, 8.1vw, 48px)`, normal wrapping and a 1.65 line height. About headings use 35px/700; the contact headline uses 52px/800, reducing to 43px on mobile. Introductory copy uses 18px/1.95 on wide screens; supporting prose uses the body style, often with a line height of 2.

## Layout

The document is Persian RTL. Header chrome, hero grid, timeline ruler and project grid use LTR containers with RTL copy inside where needed. Preserve these explicit direction boundaries.

The sticky header is 76px tall. A decorative left tool rail accompanies a 78px content offset. The hero has a maximum width of 1530px and two columns: copy left, artwork right. The timeline uses a 35% layer list and 65% track area. Projects and services form three columns; portrait and biography form two columns.

Responsive rules are at 1600px minimum and 1200px, 900px and 640px maximum. At 900px the rail narrows and services stack. At 640px the header becomes 67px tall, the rail disappears, navigation opens vertically, and hero, projects and biography stack. Panels use the mobile inset token and contact links wrap. The timeline stays two columns at 43%/57%, with smaller labels and fewer visible ruler labels.

## Elevation & Depth

Violet tonal layers, fine borders and small shadows establish depth. The translucent header has a 16px backdrop blur. CSS/SVG hero artwork combines gradient faces, extrusion shadows, an illuminated orbit, selection handles, translucent planes and a curve graph. Cards lift five pixels on hover; buttons lift three pixels. The Ae object floats over seven seconds and the caret blinks over 1.2 seconds. Reduced-motion CSS disables animations, transitions and smooth scrolling; timeline animation remains explicitly user-operated.

## Shapes

Softly rounded buttons, panels, project cards and software tiles follow the frontmatter radii. The Ae object is a sculptural rounded square. Diamond keyframes and square selection handles provide editor-specific contrast. Most borders are one pixel; the header mark and orbit use two-pixel strokes.

## Components

### Actions and navigation
Primary actions have a violet gradient, inset highlight and subtle outer shadow. Secondary actions have a transparent surface and muted border. Both align icon and label inline, have a minimum wide-screen height of 51px, lift on hover and retain global keyboard focus. Header links use a bottom accent for hover/active state; on mobile it becomes a vertical rule. The menu exposes expanded state and closes on link selection, Escape or a click outside the header.

### Video project card
Cards pair a 1.65-ratio preview (1.6 on mobile), software badge, circular play overlay and Persian metadata. Hover lifts the card and brightens its border. Playback reveals native controls and changes video sizing from cover to contain. Only one video plays at a time. The overlay leaves the tab order during playback and returns on pause/end. A shared live status region reports failures.

### Skills timeline
Four labeled layers align with colored clips, diamond keyframes and a playhead. A transparent native range input supports pointer/keyboard scrubbing; focus outlines the track container. Play/pause advances a seven-second, 30fps decorative timeline and updates the hero timecode. It does not control project videos. Playback stops at the end and when the document becomes hidden.

### Software, portrait and contact
Ae/Pr/Ps letter marks sit on tinted dark tiles. The portrait has a radial glow, baseline border and readable name plaque. Contact links are bordered rounded rectangles; Telegram has initial filled emphasis. Preserve the real destinations. No contact form or text-entry field exists.

## Do's and Don'ts

### Do:
- Do preserve Persian reading order and explicit LTR filenames, marks and timecodes.
- Do keep real videos, the portrait and existing contact destinations as the content anchors.
- Do retain visible keyboard focus, labeled controls and reduced-motion CSS behavior.
- Do concentrate dimensional neon effects in the hero artwork.

### Don't:
- Don't turn decorative window chrome, tool icons or selection handles into apparent working controls.
- Don't replace native video playback with a decorative-only player.
- Don't flatten the mobile layout into a scaled desktop canvas.
