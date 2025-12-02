# XGBoost 3D Visualization

A high-performance, interactive 3D visualization of an XGBoost decision tree, built with **React Three Fiber** and **Three.js**. This project renders a complex, procedurally generated tree structure with real-time data packet animations, designed to run smoothly across devices.

## 🚀 Features

*   **Procedural Tree Generation**: Dynamically generates a 3D decision tree structure with recursive branching logic.
*   **Optimized Rendering**: Uses geometry and material sharing (instancing-like behavior) to render hundreds of nodes and branches efficiently.
*   **Real-time Data Flow**: Visualizes data packets traversing the tree paths using optimized Catmull-Rom curves.
*   **Performance First**:
    *   Low-poly geometries for maximum frame rate.
    *   Shared resources to minimize draw calls.
    *   Optimized post-processing pipeline (Bloom, Vignette, Noise).
*   **Aesthetic Design**: "Ceramic & Neon" visual style with soft shadows and organic lighting.

## 🛠 Tech Stack

*   **Framework**: [React](https://reactjs.org/)
*   **3D Engine**: [Three.js](https://threejs.org/)
*   **React Renderer**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
*   **Helpers**: [Drei](https://github.com/pmndrs/drei)
*   **Post-Processing**: [React Postprocessing](https://github.com/pmndrs/react-postprocessing)
*   **Styling**: [TailwindCSS](https://tailwindcss.com/)
*   **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 Installation & Setup

1.  **Clone the repository** (if applicable) or navigate to the project directory.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit `http://localhost:5173` to view the visualization.

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Vercel will auto-detect the Vite configuration:
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  Deploy!

## 🔧 Optimization Details

To ensure 60FPS performance, the following optimizations were implemented:
*   **Geometry/Material Sharing**: Nodes and packets share single geometry and material instances to reduce memory overhead.
*   **Curve Optimization**: Reduced sampling resolution for motion paths.
*   **Post-Processing**: Disabled multisampling and optimized bloom thresholds.
*   **DPR Limiting**: Capped pixel ratio to 2 to prevent performance drops on high-density displays.
