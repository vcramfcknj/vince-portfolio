'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'

function Shape({ color, type }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.cos(t / 4) / 2
    meshRef.current.rotation.y = Math.sin(t / 4) / 2
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        {type === 'torus' ? (
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        ) : type === 'icosahedron' ? (
          <icosahedronGeometry args={[1.5, 0]} />
        ) : (
          <sphereGeometry args={[1.2, 64, 64]} />
        )}
        <MeshDistortMaterial 
          color={color} 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.8} 
          roughness={0.2} 
          distort={type === 'sphere' ? 0.4 : 0.1} 
          speed={2} 
          wireframe={type === 'torus'}
        />
      </mesh>
    </Float>
  )
}

export default function Abstract3D({ color = "#4F46E5", type = "sphere" }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '300px' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color={color} />
        <Shape color={color} type={type} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
