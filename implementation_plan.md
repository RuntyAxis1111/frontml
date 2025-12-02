# Visibility Fix & Background Update Plan

## Goal Description
1.  **Fix Data Packets Visibility**: The "bolitas de luz" are currently invisible because their high intensity (`multiplyScalar(20)`) causes them to bloom white against the bright white background. We need to reduce their intensity and adjust the material so their original colors (Green, Blue, Amber) are distinct and visible again.
2.  **Background Depth**: Add a large, elegant, abstract tree in the background. It should be subtle (glass/wireframe) to add depth without distracting from the main data visualization.

## Proposed Changes

### Data Packets (`src/components/3d/DataPackets.jsx`)
-   **Color & Intensity Fix**:
    -   Reduce `multiplyScalar` from `20` to `2` or `3`.
    -   Switch to `meshStandardMaterial` with `emissive` property for a controlled glow that retains color.
    -   Ensure colors (`#4ade80`, `#38bdf8`, `#fbbf24`) are saturated enough to stand out against `#f4f7f6`.

### Background (`src/components/3d/Experience.jsx` & `src/components/3d/BackgroundTree.jsx`)
-   **New Component `BackgroundTree`**:
    -   Create a new component that generates a larger, static version of the tree.
    -   **Visual Style**: "Elegant" & "Subtle".
        -   Use `MeshPhysicalMaterial` with high `transmission` (glass) and `roughness: 0.2` OR a delicate `Wireframe`.
        -   Color: Light Grey/Silver to blend with the clean aesthetic.
    -   **Placement**: Position at `z: -15`, `scale: 6`, `y: -5` to loom nicely in the background.

## Sidebar Replication Plan
-   **Install Dependency**: `lucide-react` for icons.
-   **Create `Sidebar.jsx`**:
    -   Implement `w-64` (expanded) / `w-[72px]` (collapsed) logic.
    -   Implement Hover expansion logic.
    -   Replicate exact styling (bg-white, border-r, text-gray-700, active: bg-blue-50 text-blue-600).
    -   Add Logo and User Profile sections as specified.
-   **Create `Layout.jsx`**:
    -   Flex container to hold Sidebar and Main Content.
-   **Update `App.jsx`**:
    -   Wrap the 3D experience in the new Layout.

## Verification Plan
### Automated Tests
-   N/A (Visual changes)

### Manual Verification
-   **Packet Visibility**: Run the app and verify that green, blue, and amber packets are clearly visible and distinct against the white background.
-   **Background Aesthetics**: Verify the background tree looks "elegant" (not messy) and provides good depth.
-   **Sidebar Fidelity**: Verify the sidebar looks and behaves exactly like the description (collapse, hover, active states).
