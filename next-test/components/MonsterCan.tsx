'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const GLOW_COLOR = '#39ff14'

function Can() {
  const canRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/monster_energy_drink.glb')

  useEffect(() => {
    if (!canRef.current) return
    if (canRef.current.getObjectByName('__grid__')) return

    // Make original textures glow neon green/white
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const orig = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial
        mesh.material = new THREE.MeshStandardMaterial({
          map: orig.map ?? null,
          emissive: new THREE.Color('#39ff14'),
          emissiveMap: orig.map ?? null,
          emissiveIntensity: 1.2,
          roughness: 0.4,
          metalness: 0.3,
        })
      }
    })

    // Measure the can to size the grid cylinder
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())

    // Only wrap the body, not the caps - trim height slightly
    const radius = (Math.max(size.x, size.z) / 2) * 1.02
    const bodyHeight = size.y * 0.80

    // Compute segment counts so grid cells are roughly square
    const radialSegs = 28
    const circumference = 2 * Math.PI * radius
    const segWidth = circumference / radialSegs
    const heightSegs = Math.round(bodyHeight / segWidth)

    const cylGeo = new THREE.CylinderGeometry(
      radius, radius, bodyHeight, radialSegs, heightSegs
    )

    const gridMat = new THREE.MeshBasicMaterial({
      color: GLOW_COLOR,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    })
    const grid = new THREE.Mesh(cylGeo, gridMat)
    // Shift down so the bottom stays at its original position
    const bottomOffset = (size.y * 0.88 - size.y * 0.80) / 2
    grid.position.set(center.x, center.y - bottomOffset, center.z)
    grid.name = '__grid__'
    canRef.current.add(grid)

    // Neck/shoulder section - tapered frustum from body top up to the neck ring
    const bodyTopY   = center.y - bottomOffset + bodyHeight / 2
    const neckTopY   = center.y - size.y / 2 + size.y * 0.98
    const neckHeight = neckTopY - bodyTopY
    const neckTopR   = radius * 0.88
    const neckMidY   = (bodyTopY + neckTopY) / 2
    const neckHeightSegs = Math.max(2, Math.round(neckHeight / segWidth))

    const neckGeo = new THREE.CylinderGeometry(
      neckTopR, radius, neckHeight, radialSegs, neckHeightSegs
    )
    const neck = new THREE.Mesh(neckGeo, new THREE.MeshBasicMaterial({
      color: GLOW_COLOR,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      depthTest: false,
    }))
    neck.position.set(center.x, neckMidY, center.z)
    neck.name = '__neck__'
    canRef.current.add(neck)

    // Neck halo layers
    const neckHaloOffsets = [0.008, 0.022, 0.042]
    neckHaloOffsets.forEach((off, i) => {
      const opacity = [0.28, 0.12, 0.05][i]
      const nH = new THREE.Mesh(
        new THREE.CylinderGeometry(neckTopR + off * radius, radius + off * radius, neckHeight, radialSegs, neckHeightSegs),
        new THREE.MeshBasicMaterial({ color: GLOW_COLOR, wireframe: true, transparent: true, opacity, depthWrite: false, depthTest: false })
      )
      nH.position.set(center.x, neckMidY, center.z)
      nH.name = `__neck_halo_${i}__`
      canRef.current!.add(nH)
    })

    // Glow halo layers
    const haloLayers = [
      { scale: 1.008, opacity: 0.28 },
      { scale: 1.022, opacity: 0.12 },
      { scale: 1.042, opacity: 0.05 },
    ]
    haloLayers.forEach(({ scale, opacity }, i) => {
      const halo = new THREE.Mesh(
        cylGeo,
        new THREE.MeshBasicMaterial({
          color: GLOW_COLOR,
          wireframe: true,
          transparent: true,
          opacity,
          depthWrite: false,
        })
      )
      halo.position.set(center.x, center.y - bottomOffset, center.z)
      halo.scale.setScalar(scale)
      halo.name = `__halo_${i}__`
      canRef.current!.add(halo)
    })
  }, [scene])

  useFrame(() => {
    if (canRef.current) canRef.current.rotation.y += 0.004
  })

  return (
    <group ref={canRef} scale={0.55} rotation={[0.2, 0, 0.12]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/monster_energy_drink.glb')

export default function MonsterCan() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 4, 4]} intensity={0.8} />
        <pointLight position={[0, 2, 4]} intensity={1.5} color="#ffffff" distance={10} />
        <pointLight position={[-3, 2, 3]} intensity={1.0} color={GLOW_COLOR} distance={10} />
        <Can />
        <OrbitControls enablePan={false} enableZoom={true} enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  )
}
