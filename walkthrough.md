# 3D XGBoost Visualization Walkthrough

## Overview
We have implemented a high-end, cinematic 3D data visualization for XGBoost decision trees using React, Three.js, and React Three Fiber. The project is set up with a futuristic "Unreal Engine 5" aesthetic, featuring ceramic materials, neon glow effects, and dynamic data packet animations.

## Implementation Details

### 3D Components (`src/components/3d`)
- **`Experience.jsx`**: The main scene container. It sets up the dark void atmosphere, lighting, and post-processing effects (Bloom, Vignette, Noise).
- **`DecisionTree.jsx`**: Procedurally generates a 3D tree structure. Nodes and branches use a custom "matte white ceramic" PBR material (`roughness: 0.2`, `transmission: 0`).
- **`DataPackets.jsx`**: Simulates data flowing through the tree. Uses `Trail` components to create high-speed, neon-colored light trails (Blue, Green, Yellow).

### UI Components (`src/components/ui`)
- **`Overlay.jsx`**: A futuristic HUD overlay. It uses "Glassmorphism" with backdrop filters and `framer-motion` for smooth entrance animations. Displays dummy model metrics and logs.

### Styling
- **`tailwind.config.js`**: Configured with custom neon colors (`neon-blue`, `neon-green`, `neon-yellow`) and the `Share Tech Mono` font.
- **`index.css`**: Sets the global background color and imports necessary fonts.

## How to Run

Since the environment currently lacks `node` and `npm`, you will need to install dependencies and run the project manually.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Verification
Once the server is running, you should see:
- A dark, cinematic scene.
- A white ceramic tree structure.
- Neon data packets flowing through the tree.
- A futuristic UI overlay with animated stats.
