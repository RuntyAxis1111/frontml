# Organic Biotech Redesign Plan

## Goal Description
Transform the current "Dark Cyberpunk" aesthetic into a "Organic Biotech / HYBE Nature" look. The scene should feel like a clean, luminous data lab surrounded by abstract nature.

## Proposed Changes

### Scene & Lighting (`src/components/3d/Experience.jsx`)
-   **Background**: Change to soft off-white/warm gray (`#f4f7f6`).
-   **Fog**: Add matching fog to blend the floor with the horizon.
-   **Lighting**:
    -   Use `Environment` preset "forest" or "park" (low intensity).
    -   Add `DirectionalLight` (pale yellow) for sun simulation and soft shadows.
    -   Adjust Post-processing: Reduce Bloom intensity, adjust ToneMapping for a brighter look.

### Materials (`src/components/3d/DecisionTree.jsx`)
-   **Nodes**: Polished White Ceramic (`color: #ffffff`, `roughness: 0.1`, `transmission: 0`).
-   **Branches**: Light Silver/Grey (`color: #e2e8f0`, `roughness: 0.2`, `metalness: 0.5`).
-   **Floor**: Use `ContactShadows` instead of a dark mesh platform.

### Particles (`src/components/3d/DataPackets.jsx`)
-   **Colors**: Nature-inspired palette:
    -   Leaf Green (`#4ade80`)
    -   Water Blue (`#38bdf8`)
    -   Solar Amber (`#fbbf24`)

### UI & Global Styles (`src/components/ui/Overlay.jsx`, `src/index.css`)
-   **Global**: Change body background to `#f4f7f6`.
-   **Overlay**: Invert colors for the light theme.
    -   Text: Dark Gray (`text-slate-800`) instead of White.
    -   Panels: White glass (`bg-white/40`) with dark borders (`border-black/5`).

## Verification Plan
-   **Visual Check**: Ensure the scene looks bright, clean, and "organic".
-   **Contrast**: Verify UI text is readable against the light background.
