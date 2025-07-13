export const TerrainType = {
  MOUNTAIN: 'mountain',
  FOREST: 'forest',
  WATER: 'water',
  PLAINS: 'plains',
  DESERT: 'desert',
  MAGICAL: 'magical'
} as const;

export type TerrainType = typeof TerrainType[keyof typeof TerrainType];

export interface MapPoint {
  x: number;
  y: number;
  terrain: TerrainType;
  elevation: number;
  id: string;
}

// Simple noise function for procedural generation
function noise(x: number, y: number, seed: number = 12345): number {
  let n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
  return (n - Math.floor(n));
}

// Generate height map using multiple octaves of noise
function generateHeightMap(width: number, height: number, seed: number = 12345): number[][] {
  const map: number[][] = [];
  
  for (let y = 0; y < height; y++) {
    map[y] = [];
    for (let x = 0; x < width; x++) {
      let value = 0;
      let frequency = 0.01;
      let amplitude = 1;
      
      // Multiple octaves for more natural terrain
      for (let i = 0; i < 4; i++) {
        value += noise(x * frequency, y * frequency, seed + i) * amplitude;
        frequency *= 2;
        amplitude *= 0.5;
      }
      
      map[y][x] = Math.max(0, Math.min(1, value));
    }
  }
  
  return map;
}

// Determine terrain type based on elevation and noise
function getTerrainType(elevation: number, x: number, y: number, seed: number): TerrainType {
  const terrainNoise = noise(x * 0.02, y * 0.02, seed + 1000);
  const magicNoise = noise(x * 0.05, y * 0.05, seed + 2000);
  
  // Magical terrain appears in specific areas
  if (magicNoise > 0.85) {
    return TerrainType.MAGICAL;
  }
  
  // Water in low elevation areas
  if (elevation < 0.3) {
    return TerrainType.WATER;
  }
  
  // Mountains in high elevation areas
  if (elevation > 0.7) {
    return TerrainType.MOUNTAIN;
  }
  
  // Use noise to determine other terrain types
  if (terrainNoise > 0.6) {
    return TerrainType.FOREST;
  } else if (terrainNoise > 0.3) {
    return TerrainType.PLAINS;
  } else {
    return TerrainType.DESERT;
  }
}

// Generate fantasy map with procedural terrain
export function generateFantasyMap(width: number, height: number, density: number = 0.3): MapPoint[] {
  const seed = Date.now(); // Use current time as seed for variation
  const heightMap = generateHeightMap(width, height, seed);
  const points: MapPoint[] = [];
  
  // Generate points based on density
  for (let y = 0; y < height; y += Math.floor(1 / density)) {
    for (let x = 0; x < width; x += Math.floor(1 / density)) {
      // Add some randomness to point placement
      const offsetX = x + (Math.random() - 0.5) * 20;
      const offsetY = y + (Math.random() - 0.5) * 20;
      
      if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
        const elevation = heightMap[Math.floor(offsetY)][Math.floor(offsetX)];
        const terrain = getTerrainType(elevation, offsetX, offsetY, seed);
        
        points.push({
          x: offsetX,
          y: offsetY,
          terrain,
          elevation,
          id: `${offsetX}-${offsetY}-${Date.now()}`
        });
      }
    }
  }
  
  // Add some additional interesting points
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const elevation = heightMap[Math.floor(y)][Math.floor(x)];
    const terrain = getTerrainType(elevation, x, y, seed);
    
    points.push({
      x,
      y,
      terrain,
      elevation,
      id: `special-${i}-${Date.now()}`
    });
  }
  
  return points;
}

// Get distance between two points
export function getDistance(p1: MapPoint, p2: MapPoint): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

// Find nearby points within a certain radius
export function findNearbyPoints(center: MapPoint, allPoints: MapPoint[], radius: number): MapPoint[] {
  return allPoints.filter(point => 
    point.id !== center.id && getDistance(center, point) <= radius
  );
}
