import React, { useEffect, useMemo, useRef } from "react";
import { PerspectiveCamera, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, MathUtils, SRGBColorSpace, Vector2 } from "three";
import { useStore } from "zustand";
import todayScreenshot from "../../assets/screenshots/today-plan.webp";
import workoutScreenshot from "../../assets/screenshots/adaptive-workout.webp";
import { experienceStore } from "../store/experienceStore";
import { tensionFragmentShader, tensionVertexShader } from "../shaders/tensionMaterial";

const anchors = [
  [-2.55, 1.34, 0.12],
  [-2.74, -0.7, 0.08],
  [-1.12, -1.73, 0.06],
  [1.23, -1.69, 0.06],
  [2.73, -0.46, 0.08],
  [2.54, 1.2, 0.12],
];

function ScreenPlane({ mobile }) {
  const planeRef = useRef();
  const textures = useTexture([todayScreenshot, workoutScreenshot]);
  const activeSystem = useStore(experienceStore, (state) => state.activeSystem);
  const map = activeSystem === "workout" ? textures[1] : textures[0];

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
    });
  }, [textures]);

  useFrame((_, delta) => {
    if (!planeRef.current) return;
    const { chapter, adapted } = experienceStore.getState();
    const chapterVisibility = chapter < 1 ? 0.2 : chapter < 4 ? 0.7 : 0.22;
    const target = Math.min(0.9, chapterVisibility + (adapted ? 0.12 : 0));
    planeRef.current.material.opacity = MathUtils.damp(planeRef.current.material.opacity, target, 5, delta);
  });

  return (
    <mesh ref={planeRef} position={[0.32, -0.06, -0.43]} scale={mobile ? 0.77 : 0.92}>
      <planeGeometry args={[1.48, 3.22]} />
      <meshBasicMaterial map={map} transparent opacity={0.2} toneMapped={false} />
    </mesh>
  );
}

export function PerformanceWeave({ mobile }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const pointerRef = useRef(new Vector2(0.5, 0.5));
  const adaptationRef = useRef(0);
  const chapterRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uChapter: { value: 0 },
      uAdaptation: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uPointerStrength: { value: 0.7 },
      uScrollVelocity: { value: 0 },
      uReveal: { value: 0.55 },
    }),
    [],
  );

  useFrame(({ clock }, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const state = experienceStore.getState();
    const material = meshRef.current.material;
    const pointerStrength = state.quality === "low" ? 0.38 : 0.72;

    adaptationRef.current = MathUtils.damp(adaptationRef.current, state.adapted ? 1 : 0, 5.8, delta);
    chapterRef.current = MathUtils.damp(chapterRef.current, state.chapter, 3.8, delta);
    pointerRef.current.x = MathUtils.damp(pointerRef.current.x, state.pointer.x, 5.5, delta);
    pointerRef.current.y = MathUtils.damp(pointerRef.current.y, state.pointer.y, 5.5, delta);

    material.uniforms.uTime.value = clock.elapsedTime;
    material.uniforms.uProgress.value = state.progress;
    material.uniforms.uChapter.value = chapterRef.current;
    material.uniforms.uAdaptation.value = adaptationRef.current;
    material.uniforms.uPointer.value.copy(pointerRef.current);
    material.uniforms.uPointerStrength.value = pointerStrength;
    material.uniforms.uScrollVelocity.value = state.scrollVelocity;
    material.uniforms.uReveal.value = MathUtils.clamp(0.5 + state.progress * 0.24, 0, 1);

    const targetX = mobile ? 0 : 1.42 - Math.min(state.chapter, 4) * 0.1;
    const targetY = mobile ? -0.72 + Math.min(state.chapter, 3) * 0.12 : -0.02 + Math.min(state.chapter, 4) * 0.08;
    const targetScale = mobile ? 0.78 : state.chapter === 2 ? 1.08 : 1;
    groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, targetX, 3.4, delta);
    groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, targetY, 3.4, delta);
    groupRef.current.rotation.z = MathUtils.damp(groupRef.current.rotation.z, mobile ? -0.04 : -0.1 + state.progress * 0.12, 3.8, delta);
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, mobile ? -0.02 : -0.15 + state.chapter * 0.025, 3.8, delta);
    groupRef.current.scale.setScalar(MathUtils.damp(groupRef.current.scale.x, targetScale, 3.5, delta));
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.03, mobile ? 6.4 : 5.7]} fov={mobile ? 49 : 42} />
      <ambientLight intensity={0.72} />
      <pointLight position={[-3, 4, 5]} intensity={14} color="#b9ffe4" />
      <pointLight position={[4, -2, 3]} intensity={7} color="#64d8ff" />
      <group ref={groupRef}>
        <ScreenPlane mobile={mobile} />
        <mesh ref={meshRef}>
          <planeGeometry args={[5.9, 3.7, mobile ? 56 : 104, mobile ? 38 : 70]} />
          <shaderMaterial
            vertexShader={tensionVertexShader}
            fragmentShader={tensionFragmentShader}
            uniforms={uniforms}
            side={DoubleSide}
            transparent
            depthWrite={false}
          />
        </mesh>
        {anchors.map((position, index) => (
          <mesh key={position.join("-")} position={position}>
            <cylinderGeometry args={[0.068, 0.068, 0.1, mobile ? 12 : 20]} />
            <meshStandardMaterial color={index === 4 ? "#54ffc0" : "#b9c2bb"} metalness={0.56} roughness={0.36} />
          </mesh>
        ))}
      </group>
    </>
  );
}
