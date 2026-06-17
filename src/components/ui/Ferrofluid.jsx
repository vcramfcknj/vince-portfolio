import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = `
  precision highp float;
  uniform vec3 iResolution;
  uniform vec2 iMouse;
  uniform float iTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  // Simple 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
    st.x *= iResolution.x / iResolution.y;

    // Mouse influence
    vec2 mouse = iMouse.xy / iResolution.xy;
    mouse.x *= iResolution.x / iResolution.y;
    float dist = distance(st, mouse);
    float mouseForce = exp(-dist * 10.0) * 0.5;

    // Fluid noise calculation
    vec2 pos = st * 3.0;
    float n = snoise(pos + iTime * 0.2);
    n += snoise(pos * 2.0 - iTime * 0.3) * 0.5;
    n += snoise(pos * 4.0 + iTime * 0.1) * 0.25;

    n += mouseForce;

    // Create sharp contrasting fluid look
    float fluid = smoothstep(0.4, 0.6, n);
    
    // Mix color with a darker shade for depth
    vec3 col = mix(uColor * 0.2, uColor, fluid);
    
    // Add specular highlight
    float specular = smoothstep(0.7, 0.9, n);
    col += specular * vec3(0.8, 0.9, 1.0) * 0.5;

    gl_FragColor = vec4(col, fluid * 0.8);
  }
`;

export default function Ferrofluid({ color = '#4F46E5' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isActive = true;
    let animationId;
    let renderer, gl, program, geometry, mesh, resizeObserver;
    let boundMouseMove;

    const initId = setTimeout(() => {
      if (!isActive || !containerRef.current) return;

      renderer = new Renderer({ alpha: true, antialias: true });
      gl = renderer.gl;
      gl.canvas.style.width = '100%';
      gl.canvas.style.height = '100%';
      gl.canvas.style.display = 'block';
      containerRef.current.appendChild(gl.canvas);
      gl.clearColor(0, 0, 0, 0);

      geometry = new Triangle(gl);

      const hexToRgb = (h) => {
        let r = 0, g = 0, b = 0;
        if (h.length === 7) {
          r = parseInt(h.slice(1, 3), 16) / 255;
          g = parseInt(h.slice(3, 5), 16) / 255;
          b = parseInt(h.slice(5, 7), 16) / 255;
        }
        return [r, g, b];
      };

      program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          iTime: { value: 0 },
          iResolution: { value: [gl.canvas.width, gl.canvas.height, 1] },
          iMouse: { value: [0, 0] },
          uColor: { value: hexToRgb(color) },
        },
      });

      mesh = new Mesh(gl, { geometry, program });

      const handleResize = () => {
        if (!containerRef.current || !renderer || !program) return;
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth === 0 || clientHeight === 0) return;
        renderer.setSize(clientWidth, clientHeight);
        program.uniforms.iResolution.value = [clientWidth, clientHeight, 1];
      };
      
      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(containerRef.current);
      handleResize();

      boundMouseMove = (e) => {
        if (!gl) return;
        const rect = gl.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = rect.height - (e.clientY - rect.top);
        program.uniforms.iMouse.value = [x, y];
      };
      window.addEventListener('mousemove', boundMouseMove);

      const update = (t) => {
        if (!isActive) return;
        animationId = requestAnimationFrame(update);
        if (program && renderer && mesh) {
          program.uniforms.iTime.value = t * 0.001;
          renderer.render({ scene: mesh });
        }
      };
      animationId = requestAnimationFrame(update);
    }, 100);

    return () => {
      isActive = false;
      clearTimeout(initId);
      
      if (resizeObserver) resizeObserver.disconnect();
      if (animationId) cancelAnimationFrame(animationId);
      if (boundMouseMove) window.removeEventListener('mousemove', boundMouseMove);
      
      // Properly dispose of WebGL resources
      if (geometry) geometry.remove();
      if (program) program.remove();
      
      if (gl) {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
        if (containerRef.current?.contains(gl.canvas)) {
          containerRef.current.removeChild(gl.canvas);
        }
      }
    };
  }, [color]);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }} 
    />
  );
}
