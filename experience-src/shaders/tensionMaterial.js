export const tensionVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uChapter;
  uniform float uAdaptation;
  uniform float uPointerStrength;
  uniform float uScrollVelocity;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vDepth;
  varying float vPressure;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float pointerDistance = distance(uv, uPointer);
    float localPressure = exp(-pointerDistance * 8.5) * uPointerStrength;
    float passiveTension = sin(position.x * 5.2 + uTime * 0.18) * cos(position.y * 6.1 - uTime * 0.13);
    float unresolved = sin((position.x + position.y) * 3.7 + uChapter * 0.45) * (1.0 - smoothstep(0.0, 2.0, uChapter));
    float sportPull = exp(-distance(uv, vec2(0.74, 0.58)) * 5.8) * uAdaptation;
    float scrollLoad = sin(position.y * 8.0 + uProgress * 16.0) * min(abs(uScrollVelocity) * 0.018, 0.12);

    transformed.z += passiveTension * 0.035;
    transformed.z += unresolved * 0.075;
    transformed.z += localPressure * 0.34;
    transformed.z += scrollLoad;
    transformed.y += sportPull * 0.2;
    transformed.x -= sportPull * 0.13;

    vDepth = transformed.z;
    vPressure = localPressure + sportPull;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

export const tensionFragmentShader = /* glsl */ `
  uniform float uProgress;
  uniform float uChapter;
  uniform float uAdaptation;
  uniform float uReveal;
  varying vec2 vUv;
  varying float vDepth;
  varying float vPressure;

  void main() {
    vec3 graphite = vec3(0.018, 0.038, 0.032);
    vec3 fiber = vec3(0.11, 0.15, 0.13);
    vec3 deepGreen = vec3(0.015, 0.25, 0.16);
    vec3 signal = vec3(0.22, 0.95, 0.64);
    vec3 ice = vec3(0.35, 0.73, 0.82);

    float warp = smoothstep(0.54, 0.94, abs(sin(vUv.x * 188.0)));
    float weft = smoothstep(0.56, 0.95, abs(sin(vUv.y * 152.0)));
    float weave = max(warp * 0.75, weft * 0.48);
    float seamPosition = mix(0.37, 0.53, smoothstep(0.0, 2.0, uChapter));
    float seamWave = sin(vUv.x * 8.0 + uProgress * 4.0) * 0.016;
    float seamDistance = abs(vUv.y - seamPosition - seamWave);
    float seam = 1.0 - smoothstep(0.02, 0.052, seamDistance);
    float eventPulse = exp(-distance(vUv, vec2(0.74, 0.58)) * 9.0) * uAdaptation;
    vec2 apertureUv = (vUv - vec2(0.5, 0.48)) * vec2(1.0, 1.28);
    float aperture = 1.0 - smoothstep(0.18 + uReveal * 0.13, 0.33 + uReveal * 0.16, length(apertureUv));

    vec3 base = mix(graphite, deepGreen, 0.18 + max(vDepth, 0.0) * 0.72 + eventPulse * 0.2);
    vec3 color = base + weave * fiber;
    color = mix(color, signal, seam * (0.54 + smoothstep(0.0, 3.0, uChapter) * 0.3));
    color = mix(color, ice, eventPulse * 0.34);
    color += vPressure * vec3(0.035, 0.09, 0.06);
    float chapterFade = 1.0 - smoothstep(5.0, 6.0, uChapter) * 0.72;
    float alpha = clamp((0.94 - aperture * mix(0.44, 0.78, uReveal)) * chapterFade, 0.08, 0.96);

    gl_FragColor = vec4(color, alpha);
  }
`;
