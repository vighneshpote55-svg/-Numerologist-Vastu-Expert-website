import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Navigation, AlertCircle, RefreshCw } from 'lucide-react';
import { MAHAVASTU_16_ZONES, MahavastuZoneDetail } from '../../data/mahavastuZonesData';
import { trackEvent } from '../../lib/analytics';

interface LiveCompassUtilityProps {
  onOpenConsultationModal: (initialService?: string) => void;
}

export const LiveCompassUtility: React.FC<LiveCompassUtilityProps> = ({
  onOpenConsultationModal
}) => {
  const [heading, setHeading] = useState<number>(0);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [manualHeading, setManualHeading] = useState<number>(0);
  const [useManual, setUseManual] = useState<boolean>(false);

  // Identify matching 16 Mahavastu Zone based on degree angle
  // 360 / 16 = 22.5 deg per zone.
  // North (N) center is 0° (span 348.75° to 11.25°)
  const getZoneFromDegree = (deg: number): MahavastuZoneDetail => {
    const normalized = (deg % 360 + 360) % 360;
    
    // Check zones
    if (normalized >= 348.75 || normalized < 11.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'N')!;
    if (normalized >= 11.25 && normalized < 33.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'NNE')!;
    if (normalized >= 33.75 && normalized < 56.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'NE')!;
    if (normalized >= 56.25 && normalized < 78.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'ENE')!;
    if (normalized >= 78.75 && normalized < 101.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'E')!;
    if (normalized >= 101.25 && normalized < 123.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'ESE')!;
    if (normalized >= 123.75 && normalized < 146.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'SE')!;
    if (normalized >= 146.25 && normalized < 168.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'SSE')!;
    if (normalized >= 168.75 && normalized < 191.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'S')!;
    if (normalized >= 191.25 && normalized < 213.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'SSW')!;
    if (normalized >= 213.75 && normalized < 236.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'SW')!;
    if (normalized >= 236.25 && normalized < 258.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'WSW')!;
    if (normalized >= 258.75 && normalized < 281.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'W')!;
    if (normalized >= 281.25 && normalized < 303.75) return MAHAVASTU_16_ZONES.find(z => z.code === 'WNW')!;
    if (normalized >= 303.75 && normalized < 326.25) return MAHAVASTU_16_ZONES.find(z => z.code === 'NW')!;
    return MAHAVASTU_16_ZONES.find(z => z.code === 'NNW')!;
  };

  const activeHeading = useManual ? manualHeading : heading;
  const currentZone = getZoneFromDegree(activeHeading);

  const requestCompassPermission = async () => {
    // iOS 13+ requires requestPermission
    if (typeof (DeviceOrientationEvent as any) !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionState('granted');
          bindOrientation();
        } else {
          setPermissionState('denied');
          setUseManual(true);
        }
      } catch (err) {
        console.warn('Compass permission rejected', err);
        setPermissionState('denied');
        setUseManual(true);
      }
    } else {
      // Android and standard desktop browsers
      bindOrientation();
    }
  };

  const bindOrientation = () => {
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      setUseManual(true);
      return;
    }

    const handler = (e: DeviceOrientationEvent) => {
      let compassHeading: number | null = null;
      if ((e as any).webkitCompassHeading !== undefined) {
        // iOS provides webkitCompassHeading directly relative to magnetic north
        compassHeading = (e as any).webkitCompassHeading;
      } else if (e.alpha !== null) {
        // Android fallback (alpha represents compass rotation around Z axis)
        compassHeading = (360 - e.alpha) % 360;
      }

      if (compassHeading !== null) {
        setHeading(Math.round(compassHeading));
        setPermissionState('granted');
      }
    };

    window.addEventListener('deviceorientation', handler, true);
  };

  useEffect(() => {
    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      setUseManual(true);
    }
  }, []);

  return (
    <div className="bg-[#10152A]/90 border border-[#C8A45D]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#C8A45D]">
          Sensor-Calibrated Measurement
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#F7F4EC] mt-1">
          Live Device Compass & 16-Zone Spot Auditor
        </h3>
        <p className="text-xs text-[#9EA3B5] mt-1 max-w-2xl">
          Stand in the physical center of your living room, office, or plot. Point your smartphone toward any door, bed, or desk to immediately detect its exact 16-zone Mahavastu quadrant.
        </p>
      </div>

      {/* Sensor Permission / Manual Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#080A14] border border-white/10 text-xs">
        <div className="flex items-center gap-2 text-[#E8D5A8]">
          <Navigation className="w-4 h-4 text-[#C8A45D]" />
          <span>
            {useManual
              ? 'Manual Compass Mode (Drag dial or slider below)'
              : permissionState === 'granted'
              ? 'Sensor Active: Real-time device gyroscopic heading'
              : 'Point device to calibrate live compass'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {permissionState !== 'granted' && (
            <button
              type="button"
              onClick={requestCompassPermission}
              className="px-3 py-1.5 rounded-lg bg-[#C8A45D] text-[#080A14] font-semibold text-xs transition-colors cursor-pointer"
            >
              Activate Sensor
            </button>
          )}

          <button
            type="button"
            onClick={() => setUseManual(!useManual)}
            className="px-2.5 py-1.5 rounded-lg bg-[#10152A] hover:bg-[#182348] border border-white/10 text-[#9EA3B5] hover:text-[#F7F4EC] text-xs transition-colors cursor-pointer"
          >
            {useManual ? 'Use Gyroscope' : 'Manual Dial'}
          </button>
        </div>
      </div>

      {/* Main Dial & Live Reading */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
        
        {/* Animated Compass Rose Dial */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-[#C8A45D]/40 bg-[#080A14] flex items-center justify-center shadow-[0_0_50px_rgba(200,164,93,0.15)]">
            
            {/* Compass Outer Markings */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${-activeHeading}deg)` }}
            >
              {/* Cardinal indicators */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 font-serif font-bold text-red-500 text-sm">N</span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-serif font-bold text-[#E8D5A8] text-sm">S</span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-serif font-bold text-[#E8D5A8] text-sm">E</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-serif font-bold text-[#E8D5A8] text-sm">W</span>

              {/* 16 Zone Ticks */}
              {MAHAVASTU_16_ZONES.map((zone, idx) => {
                const angle = idx * 22.5;
                return (
                  <div
                    key={zone.code}
                    className="absolute inset-0 flex justify-center pointer-events-none"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="w-0.5 h-2 bg-[#C8A45D]/50 mt-1" />
                  </div>
                );
              })}
            </div>

            {/* Fixed Central Reticle Pointer */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-red-500" />
            </div>

            {/* Inner Center Display */}
            <div className="relative z-10 text-center p-4 rounded-full bg-[#10152A] border border-[#C8A45D]/40 w-36 h-36 flex flex-col items-center justify-center shadow-inner">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F7F4EC]">
                {activeHeading}°
              </span>
              <span className="font-serif text-sm font-semibold text-[#C8A45D] mt-0.5">
                {currentZone.code} ({currentZone.cardinalGroup})
              </span>
              <span className="text-[10px] font-mono text-[#9EA3B5]">
                {currentZone.element.split(' ')[0]}
              </span>
            </div>

          </div>

          {/* Manual Slider if enabled */}
          {useManual && (
            <div className="w-full max-w-xs mt-5 space-y-1.5">
              <div className="flex justify-between text-[11px] text-[#9EA3B5] font-mono">
                <span>0° (North)</span>
                <span>180° (South)</span>
                <span>359°</span>
              </div>
              <input
                type="range"
                min="0"
                max="359"
                value={manualHeading}
                onChange={e => setManualHeading(parseInt(e.target.value, 10))}
                className="w-full accent-[#C8A45D] cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Real-Time Zone Assessment Card */}
        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-xl bg-[#080A14] border border-[#C8A45D]/35 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9EA3B5]">
                  Detected Mahavastu Sector
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-semibold text-[#F7F4EC]">
                  {currentZone.name}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#10152A] border border-[#C8A45D]/30 text-xs font-mono text-[#E8D5A8]">
                {currentZone.degreeSpan}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[#C8A45D] font-mono text-[11px] uppercase tracking-wider block">
                Primary Life Influence:
              </span>
              <p className="text-[#F7F4EC] font-medium">
                {currentZone.attribute}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Elemental Force</span>
                <span className="font-medium text-[#E8D5A8] mt-0.5 block">{currentZone.element}</span>
              </div>

              <div className="p-2.5 rounded bg-[#10152A] border border-white/5">
                <span className="text-[10px] font-mono uppercase text-[#9EA3B5] block">Presiding Deity</span>
                <span className="font-medium text-[#F7F4EC] mt-0.5 block truncate">{currentZone.deityArchetype.split('(')[0]}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
              <span className="text-[#E8D5A8] font-mono text-[11px] block">
                Recommended Spatial Use:
              </span>
              <p className="text-[#9EA3B5] text-[11px] leading-relaxed">
                {currentZone.bestUse}
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-amber-400 font-mono text-[11px] block">
                Avoid In This Sector:
              </span>
              <p className="text-[#9EA3B5] text-[11px] leading-relaxed">
                {currentZone.avoidUse}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenConsultationModal(`Audit for ${currentZone.name} (${activeHeading} deg)`)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C8A45D] to-[#E8D5A8] hover:from-[#d5b36e] hover:to-[#f0e0b9] text-[#080A14] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>Book Vastu Audit for this Sector</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
