import React, { useEffect, useRef, useState } from 'react';
import { generateFantasyMap, TerrainType } from '../utils/mapGenerator';
import type { MapPoint } from '../utils/mapGenerator';

export const FantasyMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mapData, setMapData] = useState<MapPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<MapPoint | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

  useEffect(() => {
    const map = generateFantasyMap(400, 300);
    setMapData(map);
    drawMap(map);
  }, []);

  const drawMap = (points: MapPoint[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(0.5, '#312e81');
    gradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw terrain points
    points.forEach(point => {
      const { x, y, terrain, elevation } = point;
      const size = 3 + elevation * 2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      
      // Set color based on terrain type
      switch (terrain) {
        case TerrainType.MOUNTAIN:
          ctx.fillStyle = `rgba(139, 69, 19, ${0.6 + elevation * 0.4})`;
          break;
        case TerrainType.FOREST:
          ctx.fillStyle = `rgba(34, 197, 94, ${0.6 + elevation * 0.4})`;
          break;
        case TerrainType.WATER:
          ctx.fillStyle = `rgba(59, 130, 246, ${0.6 + elevation * 0.4})`;
          break;
        case TerrainType.PLAINS:
          ctx.fillStyle = `rgba(132, 204, 22, ${0.6 + elevation * 0.4})`;
          break;
        case TerrainType.DESERT:
          ctx.fillStyle = `rgba(251, 191, 36, ${0.6 + elevation * 0.4})`;
          break;
        case TerrainType.MAGICAL:
          ctx.fillStyle = `rgba(168, 85, 247, ${0.6 + elevation * 0.4})`;
          break;
      }
      
      ctx.fill();
      
      // Add glow effect for magical terrain
      if (terrain === TerrainType.MAGICAL) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#a855f7';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw connections between nearby points
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
    ctx.lineWidth = 1;
    
    points.forEach(point => {
      const nearbyPoints = points.filter(p => {
        const distance = Math.sqrt((p.x - point.x) ** 2 + (p.y - point.y) ** 2);
        return distance < 50 && distance > 0;
      });
      
      nearbyPoints.forEach(nearby => {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(nearby.x, nearby.y);
        ctx.stroke();
      });
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find closest point
    let closest: MapPoint | null = null;
    let minDistance = Infinity;

    mapData.forEach(point => {
      const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
      if (distance < 20 && distance < minDistance) {
        closest = point;
        minDistance = distance;
      }
    });

    setHoveredPoint(closest);
  };

  const handleClick = () => {
    if (hoveredPoint) {
      setSelectedPoint(hoveredPoint);
    }
  };

  const getTerrainName = (terrain: TerrainType): string => {
    switch (terrain) {
      case TerrainType.MOUNTAIN: return 'Mountain';
      case TerrainType.FOREST: return 'Forest';
      case TerrainType.WATER: return 'Water';
      case TerrainType.PLAINS: return 'Plains';
      case TerrainType.DESERT: return 'Desert';
      case TerrainType.MAGICAL: return 'Magical Realm';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-fantasy-dark/30 backdrop-blur-sm rounded-lg border border-fantasy-gold/30 p-6">
      <h2 className="text-2xl font-bold text-fantasy-gold mb-4 font-fantasy">Fantasy Realm Map</h2>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="border border-fantasy-gold/20 rounded-lg cursor-crosshair fantasy-glow"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />
        
        {hoveredPoint && (
          <div className="absolute top-2 right-2 bg-fantasy-dark/80 backdrop-blur-sm rounded-lg p-3 border border-fantasy-gold/30">
            <p className="text-fantasy-gold text-sm font-semibold">
              {getTerrainName(hoveredPoint.terrain)}
            </p>
            <p className="text-fantasy-light text-xs">
              Coords: ({hoveredPoint.x}, {hoveredPoint.y})
            </p>
            <p className="text-fantasy-light text-xs">
              Elevation: {hoveredPoint.elevation.toFixed(2)}
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-fantasy-light/80">
        <p>Hover over terrain to explore • Click to select a location</p>
        {selectedPoint && (
          <div className="mt-2 p-2 bg-fantasy-purple/20 rounded border border-fantasy-gold/20">
            <p className="text-fantasy-gold">
              Selected: {getTerrainName(selectedPoint.terrain)} at ({selectedPoint.x}, {selectedPoint.y})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
