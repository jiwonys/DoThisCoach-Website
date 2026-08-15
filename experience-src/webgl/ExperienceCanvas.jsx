import React, { Component, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AdaptiveDpr, PerformanceMonitor, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { PerformanceWeave } from "./PerformanceWeave";
import { experienceStore } from "../store/experienceStore";

class CanvasBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    document.documentElement.classList.add("webgl-failed");
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useRuntimeState() {
  const [visible, setVisible] = useState(!document.hidden);
  const [mobile, setMobile] = useState(window.matchMedia("(max-width: 760px)").matches);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const handleVisibility = () => setVisible(!document.hidden);
    const handleMobile = () => setMobile(mobileQuery.matches);
    document.addEventListener("visibilitychange", handleVisibility);
    mobileQuery.addEventListener("change", handleMobile);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      mobileQuery.removeEventListener("change", handleMobile);
    };
  }, []);

  return { visible, mobile };
}

function ExperienceCanvasApp() {
  const { visible, mobile } = useRuntimeState();
  const [dpr, setDpr] = useState(mobile ? 1.2 : 1.55);

  return (
    <CanvasBoundary>
      <Canvas
        dpr={dpr}
        frameloop={visible ? "always" : "never"}
        gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance", preserveDrawingBuffer: false }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const handleLost = (event) => {
            event.preventDefault();
            document.documentElement.classList.add("webgl-lost");
          };
          const handleRestored = () => document.documentElement.classList.remove("webgl-lost");
          canvas.addEventListener("webglcontextlost", handleLost);
          canvas.addEventListener("webglcontextrestored", handleRestored);
          if (new URLSearchParams(window.location.search).has("perf")) {
            window.__DOTHIS_GL_INFO__ = gl.info;
          }
          document.documentElement.classList.add("has-webgl");
        }}
      >
        <PerformanceMonitor
          flipflops={2}
          onDecline={() => {
            setDpr(1);
            experienceStore.setState({ quality: "low" });
          }}
          onIncline={() => {
            setDpr(mobile ? 1.2 : 1.55);
            experienceStore.setState({ quality: "high" });
          }}
        >
          <Suspense fallback={null}>
            <PerformanceWeave mobile={mobile} />
            <Preload all />
          </Suspense>
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>
      </Canvas>
    </CanvasBoundary>
  );
}

export function mountExperienceCanvas(container) {
  const root = createRoot(container);
  root.render(<ExperienceCanvasApp />);
  return () => root.unmount();
}
