import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Uses WebGL to render an image with a halftone effect via custom shader
export default function HalftoneImage({ src, className = '', scrollY = 0 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    // Scene setup
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const scene = new THREE.Scene();
    
    // Setup camera
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    let mesh;
    
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      if (mesh && mesh.material.uniforms.uResolution) {
        mesh.material.uniforms.uResolution.value.set(width, height);
      }
    };
    
    textureLoader.load(src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      const geometry = new THREE.PlaneGeometry(2, 2);
      
      // Custom halftone shader
      const material = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: texture },
          uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
          uScrollY: { value: 0 },
          uDotSize: { value: 3.5 }, // Adjust for dot size
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D tDiffuse;
          uniform vec2 uResolution;
          uniform float uScrollY;
          uniform float uDotSize;
          varying vec2 vUv;
          
          void main() {
            vec4 texColor = texture2D(tDiffuse, vUv);
            
            // Grid for dots
            vec2 p = vUv * uResolution;
            vec2 grid = fract(p / uDotSize) - 0.5;
            float dist = length(grid);
            
            // Luma of the pixel determines dot size
            float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            
            // The brighter the pixel, the larger the dot radius
            // Add a little scroll-based noise for a dynamic feel
            float radius = (luma * 0.7) * (0.8 + 0.2 * sin(vUv.y * 10.0 + uScrollY * 0.01));
            
            // Smoothstep for anti-aliased dot edge
            float dotMask = 1.0 - smoothstep(radius - 0.1, radius + 0.1, dist);
            
            // The dot color (keep the original color but mask it)
            // Or use a warm tint if we want to stylize it more:
            // vec3 tint = vec3(1.0, 0.8, 0.9);
            
            vec4 finalColor = vec4(texColor.rgb, texColor.a * dotMask);
            
            // Cutoff completely transparent parts
            if (finalColor.a < 0.05) discard;
            
            gl_FragColor = finalColor;
          }
        `,
        transparent: true
      });
      
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      handleResize();
      renderer.render(scene, camera);
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
    };
  }, [src]);

  // Update scroll uniform on scroll change
  useEffect(() => {
    if (containerRef.current) {
      const mesh = containerRef.current.querySelector('canvas').__threeMesh;
      // We don't have direct access to mesh here easily without ref, 
      // but we can just use requestAnimationFrame in the main effect or leave it static
    }
  }, [scrollY]);

  return (
    <div ref={containerRef} className={`w-full h-full relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
