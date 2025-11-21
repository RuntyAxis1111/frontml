# UI Redesign Implementation Plan

## Goal Description
Elevate the current UI to a "premium, elegant" aesthetic. The current design is functional but looks a bit raw. We will refine the glassmorphism, typography, and layout to create a more sophisticated, cinematic feel.

## Proposed Changes

### Styling (`src/components/ui/Overlay.jsx`)
-   **Refined Glassmorphism**:
    -   Reduce border opacity (`border-white/5` instead of `10`).
    -   Increase backdrop blur (`backdrop-blur-xl`).
    -   Add subtle gradients to backgrounds (`bg-gradient-to-b from-white/5 to-transparent`).
-   **Typography**:
    -   Use a mix of `sans-serif` (Inter) for headers and `mono` (Share Tech Mono) for data.
    -   Increase letter spacing (`tracking-widest`) for labels.
    -   Use lighter font weights for a cleaner look.
-   **Layout**:
    -   **Header**: Make it more minimal. Remove the heavy border-left. Use a subtle glowing dot or line.
    -   **Stats Cards**: Move them to the bottom-left or make them floating "pills" rather than heavy cards.
    -   **Logs**: Make the logs panel floating and more transparent.
-   **Effects**:
    -   Add subtle inner shadows or glows to panels.

### Global Styles (`src/index.css`)
-   Ensure `Inter` font is loaded and set as default sans.

### 3D Logic (`src/components/3d`)
-   **Shared Tree Logic (`src/utils/treeGenerator.js`)**:
    -   Extract the procedural tree generation from `DecisionTree.jsx` into a shared utility.
    -   Return a graph structure (nodes and edges) that can be traversed.
-   **`DecisionTree.jsx`**:
    -   Update to use the shared `treeGenerator`.
    -   **Material Upgrade**: Change branches to a "Premium Glass" look:
        -   `transmission`: 1 (fully transparent)
        -   `roughness`: 0.1 (smooth)
        -   `thickness`: 0.5 (refraction volume)
        -   `color`: White or very faint blue.

-   **`DataPackets.jsx`**:
    -   Update to use `treeGenerator` to find valid paths from Root to Leaves.
    -   Ensure packet animation follows the *exact* curve of the branches (using the same `CatmullRomCurve3` parameters).


## Verification Plan
-   **Visual Check**: Verify the new look matches the "elegant" description (cleaner, more premium).
-   **Responsiveness**: Ensure it still looks good on different screen sizes.
