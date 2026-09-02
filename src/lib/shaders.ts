/**
 * Shared GLSL for the Tasklyn Core.
 *
 * Every part of the Core (points, struts, nodes, pathways, strata) runs the
 * SAME `coreTransform` in its vertex stage. That is the whole trick: the object
 * cannot come apart into unrelated effects, because one function owns its shape
 * at every moment of the film.
 */

export const NOISE = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

vec3 curl(vec3 p){
  const float e = 0.12;
  float x1 = snoise(p + vec3(0.0, e, 0.0)) - snoise(p - vec3(0.0, e, 0.0));
  float x2 = snoise(p + vec3(0.0, 0.0, e)) - snoise(p - vec3(0.0, 0.0, e));
  float y1 = snoise(p + vec3(0.0, 0.0, e)) - snoise(p - vec3(0.0, 0.0, e));
  float y2 = snoise(p + vec3(e, 0.0, 0.0)) - snoise(p - vec3(e, 0.0, 0.0));
  float z1 = snoise(p + vec3(e, 0.0, 0.0)) - snoise(p - vec3(e, 0.0, 0.0));
  float z2 = snoise(p + vec3(0.0, e, 0.0)) - snoise(p - vec3(0.0, e, 0.0));
  return normalize(vec3(x1 - x2, y1 - y2, z1 - z2) / (2.0 * e) + 1e-5);
}
`;

/** Uniform block shared by every Core material. */
export const CORE_UNIFORMS = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uIntro;
uniform float uAssemble;
uniform float uFragment;
uniform float uOpen;
uniform float uCollapse;
uniform float uCharge;
uniform float uPresence;
uniform vec3  uPointer;
uniform vec3  uShape;
uniform float uDepth;
uniform float uStill;
`;

/**
 * The one deformation function.
 *
 * Order is narrative, not arbitrary:
 *   assemble -> industry bias -> breathe -> fragment -> open -> pointer -> collapse
 */
export const CORE_TRANSFORM = /* glsl */ `
vec3 coreTransform(vec3 p, float seed, float layer, out float energy){
  float r = length(p);
  vec3 dir = r > 0.0001 ? p / r : vec3(0.0, 1.0, 0.0);

  // 1. assembly out of the void. Staggered by seed so the structure resolves
  //    in waves instead of one snap.
  float aDelay = fract(seed * 7.31);
  float a = clamp((uAssemble - aDelay * 0.55) / 0.45, 0.0, 1.0);
  a = a * a * (3.0 - 2.0 * a);
  p = mix(dir * (r + 26.0 + seed * 34.0), p, a);

  // 2. industry bias. Selecting an industry does not swap the object,
  //    it re-proportions it.
  p.xz *= mix(1.0, uShape.x, 0.85);
  float tw = uShape.y * p.y * 0.42;
  float ct = cos(tw), st = sin(tw);
  p.xz = mat2(ct, -st, st, ct) * p.xz;

  // 3. breathing. Slow and uneven; a constant pulse reads as decoration.
  float breathe = snoise(p * 0.28 + vec3(0.0, uTime * 0.11, 0.0));
  p += dir * breathe * 0.085 * (0.4 + a);

  // Ring quantisation. The logo mark is a stepped ascent, so matter in the
  // Core settles onto discrete rings rather than a smooth field.
  float rings = max(uShape.z, 1.0);
  float band = floor(p.y * rings * 0.5 + 0.5) / (rings * 0.5);
  p.y = mix(p.y, band, 0.22 * a * (1.0 - uFragment));

  // 4. fragmentation. Each cluster drifts on its own vector and loses its
  //    relationship to the others.
  vec3 scatter = curl(p * 0.34 + seed * 3.7 + uTime * 0.045);
  float burst = 0.9 + fract(seed * 13.7) * 2.1;
  p += scatter * uFragment * burst;
  p.y += sin(seed * 41.0) * uFragment * 0.55;

  // 5. strata separation. The Core opens along its four layers.
  float lane = layer - 1.5;
  p.y += lane * uOpen * 2.05;
  p.xz *= 1.0 + uOpen * 0.14;

  // 6. pointer. Matter near the cursor leans toward it and lights up.
  //    Falls off fast, so the effect is felt rather than seen.
  vec3 toP = uPointer - p;
  float d = length(toP);
  float pull = uPresence * exp(-d * d * 0.16) * (1.0 - uCollapse);
  p += normalize(toP + 1e-5) * pull * 0.72;

  // 7. collapse. Everything converges on one point.
  float cDelay = fract(seed * 3.17) * 0.32;
  float c = clamp((uCollapse - cDelay) / (1.0 - cDelay), 0.0, 1.0);
  c = pow(c, 0.62);
  p = mix(p, vec3(0.0), c);

  energy = pull * 1.6 + uCharge * 0.5 + c;
  return p;
}
`;

/* ------------------------------------------------------------------ */
/*  points                                                             */
/* ------------------------------------------------------------------ */

export const POINTS_VERT = /* glsl */ `
${CORE_UNIFORMS}
${NOISE}
${CORE_TRANSFORM}

attribute float aSeed;
attribute float aLayer;
attribute float aScale;

uniform float uSize;
uniform float uPixelRatio;

varying float vEnergy;
varying float vLayer;
varying float vDepthFade;

void main(){
  float energy;
  vec3 p = coreTransform(position, aSeed, aLayer, energy);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = -mv.z;

  // Points close to the lens stay crisp; distant ones fall away. The range is
  // wide because the camera travels from 130 units out to inside the object.
  vDepthFade = 1.0 - smoothstep(14.0, 52.0, dist);
  vEnergy = energy;
  vLayer = aLayer;

  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (60.0 / max(dist, 0.6));
  gl_PointSize = clamp(gl_PointSize, 1.0, 34.0);
  gl_PointSize *= 1.0 + energy * 1.4;
}
`;

export const POINTS_FRAG = /* glsl */ `
precision highp float;

uniform vec3 uCold;
uniform vec3 uHot;
uniform float uOpacity;
uniform float uStill;

varying float vEnergy;
varying float vLayer;
varying float vDepthFade;

void main(){
  // Round, soft-edged. A square point reads as a bug at this scale.
  vec2 uv = gl_PointCoord - 0.5;
  float d = dot(uv, uv);
  if (d > 0.25) discard;
  float mask = 1.0 - smoothstep(0.06, 0.25, d);

  // Cold matter is inactive system; hot is work being done right now. The
  // brand accent sits in the middle of this ramp, which is where most grains
  // land, so the Core reads as Tasklyn blue rather than as generic cyan.
  vec3 col = mix(uCold, uHot, clamp(vEnergy * 0.9 + vLayer * 0.1, 0.0, 1.0));
  float alpha = mask * uOpacity * vDepthFade * (0.62 + vEnergy * 0.8) * (1.0 - uStill * 0.74);

  gl_FragColor = vec4(col, alpha);
}
`;

/* ------------------------------------------------------------------ */
/*  struts + nodes (instanced solids)                                  */
/* ------------------------------------------------------------------ */

export const SOLID_VERT = /* glsl */ `
${CORE_UNIFORMS}
${NOISE}
${CORE_TRANSFORM}

attribute float aSeed;
attribute float aLayer;
attribute float aActive;
attribute float aShell;

varying float vEnergy;
varying float vActive;
varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vFog;

// Each shell turns at its own rate, and the middle one turns the other way.
// This is what makes the Core read as a mechanism rather than as one object
// spinning: you can see parts moving against each other.
mat2 shellSpin(float shell){
  float rate = shell < 0.5 ? 0.038 : (shell < 1.5 ? -0.061 : 0.094);
  float a = uTime * rate;
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

void main(){
  // The instance matrix places the strut; coreTransform then carries the whole
  // instance as part of the same body.
  vec4 inst = instanceMatrix * vec4(position, 1.0);
  vec3 centre = (instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;

  mat2 spin = shellSpin(aShell);
  inst.xz = spin * inst.xz;
  centre.xz = spin * centre.xz;

  float energy;
  vec3 movedCentre = coreTransform(centre, aSeed, aLayer, energy);
  vec3 p = inst.xyz + (movedCentre - centre);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vec3 n = mat3(instanceMatrix) * normal;
  n.xz = spin * n.xz;
  vNormalW = normalize(n);
  vViewDir = normalize(-mv.xyz);
  vEnergy = energy;
  vActive = aActive;
  vFog = 1.0 - smoothstep(16.0, 56.0, -mv.z);

  gl_Position = projectionMatrix * mv;
}
`;

export const SOLID_FRAG = /* glsl */ `
precision highp float;

uniform vec3 uCold;
uniform vec3 uHot;
uniform float uOpacity;
uniform float uFresnelPow;
uniform float uStill;

varying float vEnergy;
varying float vActive;
varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vFog;

void main(){
  // Translucent machined surface: almost nothing face-on, bright at the edge.
  float fres = pow(1.0 - abs(dot(normalize(vNormalW), normalize(vViewDir))), uFresnelPow);
  float heat = clamp(vEnergy * 0.85 + vActive, 0.0, 1.0);
  vec3 col = mix(uCold, uHot, heat);

  float alpha = (0.26 + fres * 0.78 + heat * 0.55) * uOpacity * vFog * (1.0 - uStill * 0.7);
  gl_FragColor = vec4(col * (0.62 + fres * 0.85 + heat), alpha);
}
`;

/* ------------------------------------------------------------------ */
/*  pathways                                                           */
/* ------------------------------------------------------------------ */

export const PATH_VERT = /* glsl */ `
${CORE_UNIFORMS}
${NOISE}
${CORE_TRANSFORM}

attribute float aSeed;
attribute float aLayer;
attribute float aT;
attribute float aLine;

varying float vT;
varying float vLine;
varying float vEnergy;
varying float vFog;

void main(){
  float energy;
  vec3 p = coreTransform(position, aSeed, aLayer, energy);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);

  vT = aT;
  vLine = aLine;
  vEnergy = energy;
  vFog = 1.0 - smoothstep(16.0, 52.0, -mv.z);

  gl_Position = projectionMatrix * mv;
}
`;

export const PATH_FRAG = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uCollapse;
uniform vec3 uCold;
uniform vec3 uHot;
uniform float uOpacity;
uniform float uFlow;
uniform float uActivity;
uniform float uStill;

varying float vT;
varying float vLine;
varying float vEnergy;
varying float vFog;

void main(){
  // Base pathway is barely there. It is wiring, not decoration.
  float base = 0.16;

  // Packets of work travelling the wire. Each line has its own offset and rate
  // so the system never pulses in unison.
  float rate = uFlow * (0.55 + fract(vLine * 0.371) * 0.9);
  float head = fract(uTime * rate + fract(vLine * 0.917));
  float d = abs(vT - head);
  d = min(d, 1.0 - d);

  float packet = exp(-d * d * 900.0);
  float tail = exp(-d * 26.0) * 0.28;

  // A pathway only carries a packet if this part of the system is awake.
  float awake = step(fract(vLine * 0.613), uActivity);
  float pulse = (packet + tail) * awake;

  vec3 col = mix(uCold, uHot, clamp(pulse * 1.4 + vEnergy, 0.0, 1.0));
  float alpha = (base + pulse * 0.95) * uOpacity * vFog * (1.0 - uCollapse * 0.7) * (1.0 - uStill * 0.82);

  gl_FragColor = vec4(col * (0.5 + pulse * 1.8), alpha);
}
`;
