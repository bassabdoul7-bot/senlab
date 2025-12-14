export default function PlaceholderLab() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#e8e4df" roughness={0.8} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2, -4]} receiveShadow>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Main Lab Table */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 0.08, 1.2]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} />
        </mesh>
        {[[-1.1, 0.45, -0.5], [1.1, 0.45, -0.5], [-1.1, 0.45, 0.5], [1.1, 0.45, 0.5]].map((pos, i) => (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={[0.06, 0.9, 0.06]} />
            <meshStandardMaterial color="#404040" metalness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Side Tables */}
      <group position={[-3, 0, -2]} scale={0.7}>
        <mesh position={[0, 0.9, 0]} castShadow><boxGeometry args={[2.5, 0.08, 1.2]} /><meshStandardMaterial color="#2a2a2a" /></mesh>
      </group>
      <group position={[3, 0, -2]} scale={0.7}>
        <mesh position={[0, 0.9, 0]} castShadow><boxGeometry args={[2.5, 0.08, 1.2]} /><meshStandardMaterial color="#2a2a2a" /></mesh>
      </group>

      {/* Cabinets */}
      <mesh position={[-5, 1, -3]} castShadow>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>
      <mesh position={[5, 1, -3]} castShadow>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#8b7355" />
      </mesh>

      {/* Ceiling Lights */}
      {[[0, 3.9, 0], [-3, 3.9, -2], [3, 3.9, -2]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh><boxGeometry args={[0.8, 0.05, 0.3]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} /></mesh>
          <pointLight position={[0, -0.1, 0]} intensity={0.5} distance={5} color="#fffef5" />
        </group>
      ))}

      {/* Sample Equipment - Beaker */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.12, 32]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.6} roughness={0.1} />
      </mesh>

      {/* Test Tubes */}
      {[-0.15, 0, 0.15].map((x, i) => (
        <mesh key={i} position={[x + 0.5, 0.98, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 16]} />
          <meshStandardMaterial color="#aaddff" transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
