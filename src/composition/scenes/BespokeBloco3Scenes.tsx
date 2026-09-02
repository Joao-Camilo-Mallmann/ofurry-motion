import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Series } from 'remotion';
import { OFurryTheme } from '../../theme/ofurry';
import { MotionPresets, getAmbientDrift, getSpringProgress, getGlowPulse } from '../../theme/motion';
import { ParticleField } from '../../primitives/ParticleField';
import * as Lucide from 'lucide-react';

export interface BespokeSceneProps {
  transparent?: boolean;
}

// =========================================================================
// CENA 1: "ABRIR PRODUTO" (5.0s / 150 frames)
// Metáfora: Fatiamento a laser da caixa-preta do COE expondo camadas internas
// Silhueta: blueprint-grifo
// =========================================================================
export const Scene1AbrirProduto: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 60 });
  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entrySpring, [0, 0.4, 1], [0, 0.95, 1]);
  const slideY = interpolate(entrySpring, [0, 1], [40, 0]);

  // Laser scanner motion
  const laserY = interpolate(frame, [15, 110], [-100, 500], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slice separation
  const sliceSpring = getSpringProgress(frame, fps, 35, MotionPresets.snappy);
  const sliceGap = interpolate(sliceSpring, [0, 1], [0, 36]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.1} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        {/* Lado Esquerdo: Tipografia Monumental Clean */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', transform: `translateY(${slideY}px)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '6px 20px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '16px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              ENGENHARIA REVERSA
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
            <div style={{ color: OFurryTheme.colors.secondary, fontSize: '14px', letterSpacing: '0.12em' }}>
              SYS.SCAN // 03:00
            </div>
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            ABRIR <br />
            <span style={{ color: OFurryTheme.colors.accentOrange, textShadow: OFurryTheme.effects.glowOrange }}>
              PRODUTO
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
            <Lucide.Layers size={28} color={OFurryTheme.colors.accentOrange} />
            <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700, letterSpacing: '0.08em' }}>
              DISSECANDO A CAIXA-PRETA
            </span>
          </div>
        </div>

        {/* Lado Direito: Bloco Fatiado Cinético a Laser (Sem container cinza opaco) */}
        <div
          style={{
            position: 'relative',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: `${sliceGap}px`,
          }}
        >
          {/* Linha de Feixe Laser Cortante */}
          {frame > 15 && frame < 115 && (
            <div
              style={{
                position: 'absolute',
                left: '-10%',
                right: '-10%',
                top: `${laserY}px`,
                height: '3px',
                backgroundColor: OFurryTheme.colors.accentOrange,
                boxShadow: OFurryTheme.effects.glowOrangeStrong,
                zIndex: 10,
              }}
            />
          )}

          {/* Fatia Superior: Título Emitido / Renda Fixa */}
          <div
            style={{
              width: '100%',
              padding: '32px 40px',
              border: `2px solid rgba(255, 255, 255, 0.4)`,
              borderLeft: `8px solid #FFFFFF`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `translateY(-${sliceGap / 2}px)`,
              boxShadow: '0 0 40px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Lucide.ShieldCheck size={36} color="#FFFFFF" />
              <div>
                <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  RENDA FIXA EMBUTIDA
                </div>
                <div style={{ color: OFurryTheme.colors.secondary, fontSize: '15px', letterSpacing: '0.06em', marginTop: '4px' }}>
                  PROTEÇÃO DO VALOR NOMINAL
                </div>
              </div>
            </div>
            <div style={{ fontFamily: OFurryTheme.typography.families.tech, fontSize: '28px', color: '#FFFFFF', fontWeight: 800 }}>
              85%
            </div>
          </div>

          {/* Fatia Inferior: Derivativo / Opção de Alta */}
          <div
            style={{
              width: '100%',
              padding: '32px 40px',
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              borderLeft: `8px solid ${OFurryTheme.colors.accentOrange}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `translateY(${sliceGap / 2}px)`,
              boxShadow: OFurryTheme.effects.glowOrange,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Lucide.Cpu size={36} color={OFurryTheme.colors.accentOrange} />
              <div>
                <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: OFurryTheme.colors.accentOrange, letterSpacing: '0.04em' }}>
                  DERIVATIVO DE GANHO
                </div>
                <div style={{ color: '#FFFFFF', fontSize: '15px', letterSpacing: '0.06em', marginTop: '4px' }}>
                  EXPOSIÇÃO À ALTA DO ATIVO
                </div>
              </div>
            </div>
            <div style={{ fontFamily: OFurryTheme.typography.families.tech, fontSize: '28px', color: OFurryTheme.colors.accentOrange, fontWeight: 800 }}>
              15%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 2: "2 OBJETIVOS AO MESMO TEMPO" (3.0s / 90 frames)
// Metáfora: Bifurcação cinética de forças opostas
// Silhueta: horizontal-split
// =========================================================================
export const Scene2DuasCoisas: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 1.8, amplitudeX: 1.2, periodFrames: 50 });
  const titleSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const titleScale = interpolate(titleSpring, [0, 1], [0.88, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 0.3, 1], [0, 0.95, 1]);

  const leftWingSpring = getSpringProgress(frame, fps, 8, MotionPresets.snappy);
  const rightWingSpring = getSpringProgress(frame, fps, 12, MotionPresets.snappy);
  const leftX = interpolate(leftWingSpring, [0, 1], [60, 0]);
  const rightX = interpolate(rightWingSpring, [0, 1], [-60, 0]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.3} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', transform: `scale(${titleScale})`, opacity: titleOpacity }}>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '6px 24px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '16px',
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            A DUPLA PROMESSA
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '140px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            2 OBJETIVOS
          </div>
          <div style={{ fontSize: '24px', color: OFurryTheme.colors.secondary, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            AO MESMO TEMPO
          </div>
        </div>

        {/* Split Flutuante sem cards cinzas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 1fr', gap: '30px', width: '1350px', alignItems: 'center' }}>
          <div
            style={{
              border: `2px solid rgba(255, 255, 255, 0.5)`,
              borderLeft: `8px solid #FFFFFF`,
              padding: '28px 36px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              transform: `translateX(-${leftX}px)`,
              opacity: interpolate(leftWingSpring, [0, 0.4, 1], [0, 0.9, 1]),
              boxShadow: '0 0 30px rgba(0,0,0,0.6)',
            }}
          >
            <Lucide.Shield size={42} color="#FFFFFF" />
            <div>
              <div style={{ color: OFurryTheme.colors.secondary, fontSize: '14px', letterSpacing: '0.14em' }}>LADO 01</div>
              <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: '#FFFFFF', letterSpacing: '0.04em' }}>PROTEGER CAPITAL</div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 153, 0, 0.15)',
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              boxShadow: OFurryTheme.effects.glowOrange,
            }}
          >
            <Lucide.Zap size={44} color={OFurryTheme.colors.accentOrange} />
          </div>

          <div
            style={{
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              borderRight: `8px solid ${OFurryTheme.colors.accentOrange}`,
              padding: '28px 36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '24px',
              textAlign: 'right',
              transform: `translateX(${rightX}px)`,
              opacity: interpolate(rightWingSpring, [0, 0.4, 1], [0, 0.9, 1]),
              boxShadow: OFurryTheme.effects.glowOrange,
            }}
          >
            <div>
              <div style={{ color: OFurryTheme.colors.accentOrange, fontSize: '14px', letterSpacing: '0.14em' }}>LADO 02</div>
              <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: OFurryTheme.colors.accentOrange, letterSpacing: '0.04em' }}>SURFAR A ALTA</div>
            </div>
            <Lucide.TrendingUp size={42} color={OFurryTheme.colors.accentOrange} />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 3: "PROTEGER CAPITAL" (3.0s / 90 frames)
// Metáfora: Escudo blindado com carimbo punch "GARANTIA NOMINAL"
// Silhueta: monumental-hero
// =========================================================================
export const Scene3ProtegerCapital: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.2, amplitudeX: 1.0, periodFrames: 55 });
  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entrySpring, [0, 0.3, 1], [0, 0.95, 1]);

  const shieldSpring = getSpringProgress(frame, fps, 4, MotionPresets.bouncy);
  const shieldScale = interpolate(shieldSpring, [0, 1], [0.3, 1]);
  const shieldRotate = interpolate(shieldSpring, [0, 1], [-20, 0]);

  const stampSpring = getSpringProgress(frame, fps, 20, MotionPresets.bouncy);
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 0.95, 1]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.2} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.9fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                padding: '6px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              PILAR 01
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
            <div style={{ color: OFurryTheme.colors.secondary, fontSize: '14px', letterSpacing: '0.12em' }}>
              RENDA FIXA EMBUTIDA
            </div>
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            PROTEGER <br />
            <span style={{ color: OFurryTheme.colors.accentOrange }}>CAPITAL</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 24px',
              border: `1px solid rgba(255, 255, 255, 0.3)`,
              width: 'fit-content',
              marginTop: '8px',
            }}
          >
            <Lucide.Lock size={26} color={OFurryTheme.colors.accentOrange} />
            <span style={{ fontFamily: OFurryTheme.typography.families.tech, fontSize: '20px', color: '#FFFFFF', fontWeight: 700 }}>
              DEVOLUÇÃO DO VALOR NOMINAL
            </span>
          </div>
        </div>

        {/* Escudo Flutuante com Carimbo de Impacto */}
        <div
          style={{
            position: 'relative',
            height: '540px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 153, 0, 0.4)',
              transform: `rotate(${frame * 0.9}deg)`,
            }}
          />

          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 153, 0, 0.12)',
              border: `3px solid ${OFurryTheme.colors.accentOrange}`,
              boxShadow: OFurryTheme.effects.glowOrangeStrong,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${shieldScale}) rotate(${shieldRotate}deg)`,
            }}
          >
            <Lucide.ShieldCheck size={130} color={OFurryTheme.colors.accentOrange} strokeWidth={2.2} />
          </div>

          {frame >= 20 && (
            <div
              style={{
                position: 'absolute',
                top: '55%',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                padding: '14px 36px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '38px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                transform: `scale(${stampScale}) rotate(-6deg)`,
                opacity: stampOpacity,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.6)',
                border: '3px solid #000000',
                zIndex: 10,
                textAlign: 'center',
              }}
            >
              GARANTIA NOMINAL
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 4: "SURFAR ALTA" (3.0s / 90 frames)
// Metáfora: Vetor ascendente livre com contador exponencial
// Silhueta: split-authority
// =========================================================================
export const Scene4BuscarGanhos: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.2, periodFrames: 50 });
  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entrySpring, [0, 0.3, 1], [0, 0.95, 1]);

  const gainPct = interpolate(frame, [5, 65], [0, 38.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 2.2),
  });

  const chartProgress = interpolate(frame, [8, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.4} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '6px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              PILAR 02
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
            <div style={{ color: OFurryTheme.colors.accentOrange, fontSize: '14px', letterSpacing: '0.12em' }}>
              EXPOSIÇÃO AO ATIVO
            </div>
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            SURFAR <br />
            <span style={{ color: OFurryTheme.colors.accentOrange, textShadow: OFurryTheme.effects.glowOrange }}>
              ALTA
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' }}>
            <div style={{ color: OFurryTheme.colors.secondary, fontSize: '15px', letterSpacing: '0.14em' }}>
              POTENCIAL DE GANHO
            </div>
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: '110px',
                fontWeight: 800,
                color: OFurryTheme.colors.accentOrange,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textShadow: OFurryTheme.effects.glowOrangeStrong,
              }}
            >
              +{gainPct.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Curva de Alta Vetorial Flutuante */}
        <div style={{ position: 'relative', width: '100%', height: '360px' }}>
          <svg width="100%" height="100%" viewBox="0 0 600 320" style={{ overflow: 'visible' }}>
            <path
              d="M 20 280 Q 200 260, 320 160 T 560 40"
              fill="none"
              stroke={OFurryTheme.colors.accentOrange}
              strokeWidth="7"
              strokeDasharray="700"
              strokeDashoffset={700 * (1 - chartProgress)}
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,153,0,0.9))' }}
            />
          </svg>

          {chartProgress > 0.8 && (
            <div
              style={{
                position: 'absolute',
                top: '5%',
                right: '4%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '8px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '16px',
                fontWeight: 900,
                boxShadow: OFurryTheme.effects.glowOrangeStrong,
              }}
            >
              <Lucide.Target size={18} color="#000000" />
              PICO DE ALTA
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 5: "4 ATIVOS" (3.0s / 90 frames)
// Metáfora: Radar HUD radial interligando os 4 ativos
// Silhueta: hud-radial
// =========================================================================
export const Scene5AtivosReferencia: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 1.8, amplitudeX: 1.0, periodFrames: 50 });
  const titleSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const titleOpacity = interpolate(titleSpring, [0, 0.3, 1], [0, 0.95, 1]);

  const node1Spring = getSpringProgress(frame, fps, 4, MotionPresets.snappy);
  const node2Spring = getSpringProgress(frame, fps, 10, MotionPresets.snappy);
  const node3Spring = getSpringProgress(frame, fps, 16, MotionPresets.snappy);
  const node4Spring = getSpringProgress(frame, fps, 22, MotionPresets.snappy);

  const assetNodes = [
    { title: 'AÇÕES', icon: Lucide.Activity, spring: node1Spring, color: '#FFFFFF' },
    { title: 'ÍNDICES', icon: Lucide.TrendingUp, spring: node2Spring, color: OFurryTheme.colors.accentOrange },
    { title: 'DÓLAR', icon: Lucide.DollarSign, spring: node3Spring, color: '#00F0FF' },
    { title: 'OURO', icon: Lucide.Coins, spring: node4Spring, color: '#FFD700' },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.3} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: titleOpacity }}>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '6px 20px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            ATIVOS DE REFERÊNCIA
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            4 ATIVOS
          </div>
        </div>

        {/* 4 Nós Orbitais Flutuantes sem caixas de dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', width: '1400px' }}>
          {assetNodes.map((asset) => {
            const IconComp = asset.icon;
            const scale = interpolate(asset.spring, [0, 1], [0.85, 1]);
            const transY = interpolate(asset.spring, [0, 1], [30, 0]);
            const op = interpolate(asset.spring, [0, 0.3, 1], [0, 0.95, 1]);

            return (
              <div
                key={asset.title}
                style={{
                  border: `2px solid ${asset.color}`,
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '16px',
                  transform: `translateY(${transY}px) scale(${scale})`,
                  opacity: op,
                  boxShadow: `0 0 30px rgba(0,0,0,0.6)`,
                }}
              >
                <div
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${asset.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComp size={38} color={asset.color} />
                </div>
                <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: '#FFFFFF', letterSpacing: '0.06em' }}>
                  {asset.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 6: "DINHEIRO DIVIDIDO" (4.0s / 120 frames)
// Metáfora: Fatiamento mecânico do aporte de R$ 100k em R$ 85k e R$ 15k
// Silhueta: horizontal-split
// =========================================================================
export const Scene6DivisaoCapital: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 55 });
  const entry = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entry, [0, 0.3, 1], [0, 0.95, 1]);

  const splitProgress = getSpringProgress(frame, fps, 15, MotionPresets.snappy);
  const splitOffset = interpolate(splitProgress, [0, 1], [0, 28]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.2} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '44px',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '6px 20px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            APORTE: R$ 100 MIL
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '130px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            DINHEIRO <span style={{ color: OFurryTheme.colors.accentOrange }}>DIVIDIDO</span>
          </div>
        </div>

        {/* Duas Barras Flutuantes Proporcionais */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px', width: '1350px' }}>
          <div
            style={{
              border: `2px solid rgba(255, 255, 255, 0.5)`,
              borderLeft: `8px solid #FFFFFF`,
              padding: '32px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transform: `translateX(-${splitOffset}px)`,
              boxShadow: '0 0 30px rgba(0,0,0,0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: OFurryTheme.colors.secondary, fontSize: '16px', letterSpacing: '0.12em' }}>
                RENDA FIXA (85%)
              </span>
              <Lucide.ShieldCheck size={32} color="#FFFFFF" />
            </div>
            <div style={{ fontFamily: OFurryTheme.typography.families.tech, fontSize: '72px', fontWeight: 800, color: '#FFFFFF' }}>
              R$ 85.000
            </div>
          </div>

          <div
            style={{
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              borderLeft: `8px solid ${OFurryTheme.colors.accentOrange}`,
              padding: '32px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              transform: `translateX(${splitOffset}px)`,
              boxShadow: OFurryTheme.effects.glowOrange,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: OFurryTheme.colors.accentOrange, fontSize: '16px', letterSpacing: '0.12em', fontWeight: 700 }}>
                DERIVATIVO (15%)
              </span>
              <Lucide.Cpu size={32} color={OFurryTheme.colors.accentOrange} />
            </div>
            <div style={{ fontFamily: OFurryTheme.typography.families.tech, fontSize: '72px', fontWeight: 800, color: OFurryTheme.colors.accentOrange }}>
              R$ 15.000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 7: "RENDA FIXA RENDE" (4.0s / 120 frames)
// Metáfora: Recomposição temporal da renda fixa até bater os R$ 100k
// Silhueta: stacked-steps
// =========================================================================
export const Scene7RendaFixaMotor: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 55 });
  const entry = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entry, [0, 0.3, 1], [0, 0.95, 1]);

  const moneyProgress = interpolate(frame, [10, 80], [85000, 100000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 2.5),
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.2} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '6px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              MECÂNICA TEMPORAL
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '130px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            RENDA FIXA <br />
            <span style={{ color: OFurryTheme.colors.accentOrange }}>RENDE</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
            <Lucide.ShieldCheck size={28} color="#FFFFFF" />
            <span style={{ color: OFurryTheme.colors.secondary, fontSize: '20px', letterSpacing: '0.08em' }}>
              RECOMPOSIÇÃO DOS R$ 100 MIL NO VENCIMENTO
            </span>
          </div>
        </div>

        {/* Painel do Contador Temporal Flutuante */}
        <div
          style={{
            position: 'relative',
            height: '420px',
            border: `2px solid rgba(255, 255, 255, 0.4)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            gap: '20px',
            boxShadow: '0 0 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ color: OFurryTheme.colors.secondary, fontSize: '16px', letterSpacing: '0.14em' }}>
            VALOR ACUMULADO
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: '100px',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              textShadow: '0 0 30px rgba(255,255,255,0.4)',
            }}
          >
            R$ {Math.round(moneyProgress).toLocaleString('pt-BR')}
          </div>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '8px 24px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '18px',
              fontWeight: 900,
              letterSpacing: '0.1em',
            }}
          >
            ALVO: 100% NO VENCIMENTO
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 8: "TETO DE GANHO" (4.5s / 135 frames)
// Metáfora: Colisão violenta contra barreira rígida (teto em +20%)
// Silhueta: split-authority
// =========================================================================
export const Scene8TetoCallSpread: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 50 });
  const entry = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entry, [0, 0.3, 1], [0, 0.95, 1]);

  const stockGain = interpolate(frame, [8, 90], [0, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const userGain = interpolate(frame, [8, 45, 90], [0, 20, 20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.3} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '6px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              A ARMADILHA
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            TETO DE <br />
            <span style={{ color: OFurryTheme.colors.accentOrange, textShadow: OFurryTheme.effects.glowOrange }}>
              GANHO
            </span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 153, 0, 0.15)',
              border: `1px solid ${OFurryTheme.colors.accentOrange}`,
              padding: '12px 24px',
              width: 'fit-content',
            }}
          >
            <Lucide.AlertTriangle size={24} color={OFurryTheme.colors.accentOrange} />
            <span style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '20px', color: '#FFFFFF', letterSpacing: '0.08em' }}>
              CALL SPREAD
            </span>
          </div>
        </div>

        {/* Comparador Flutuante de Alta com Barreira Rígida de Teto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }}>
          {/* Linha do Ativo de Mercado (+75%) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '16px' }}>
              <span style={{ color: '#00F0FF', fontWeight: 700 }}>ALTA DO MERCADO</span>
              <span style={{ color: '#00F0FF', fontWeight: 800, fontFamily: OFurryTheme.typography.families.tech, fontSize: '24px' }}>
                +{stockGain.toFixed(1)}%
              </span>
            </div>
            <div style={{ height: '28px', border: '1px solid rgba(0,240,255,0.4)', position: 'relative' }}>
              <div style={{ height: '100%', width: `${Math.min(stockGain, 100)}%`, backgroundColor: '#00F0FF' }} />
            </div>
          </div>

          {/* Linha Travada no Teto (+20%) */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '16px' }}>
              <span style={{ color: OFurryTheme.colors.accentOrange, fontWeight: 700 }}>SEU RETORNO NO COE</span>
              <span style={{ color: OFurryTheme.colors.accentOrange, fontWeight: 800, fontFamily: OFurryTheme.typography.families.tech, fontSize: '24px' }}>
                +{userGain.toFixed(1)}% (TRAVADO)
              </span>
            </div>
            <div style={{ height: '28px', border: `2px solid ${OFurryTheme.colors.accentOrange}`, position: 'relative' }}>
              <div style={{ height: '100%', width: `${(userGain / 75) * 100}%`, backgroundColor: OFurryTheme.colors.accentOrange, boxShadow: OFurryTheme.effects.glowOrange }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 9: "INFLAÇÃO CORRÓI" (4.5s / 135 frames)
// Metáfora: Corrosão inflacionária do poder de compra
// Silhueta: blueprint-grifo
// =========================================================================
export const Scene9InflacaoCorrosao: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 55 });
  const entry = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entry, [0, 0.3, 1], [0, 0.95, 1]);

  const realValue = interpolate(frame, [10, 80], [100000, 72000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.2} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: '#FF3333',
                color: '#FFFFFF',
                padding: '6px 18px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              ALERTA CRÍTICO
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
          </div>

          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}
          >
            INFLAÇÃO <br />
            <span style={{ color: '#FF3333', textShadow: '0 0 30px rgba(255, 51, 51, 0.6)' }}>
              CORRÓI
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
            <Lucide.Flame size={28} color="#FF3333" />
            <span style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700 }}>
              MESMO VALOR NOMINAL // PERDA REAL
            </span>
          </div>
        </div>

        {/* Painel do Poder de Compra Derretendo */}
        <div
          style={{
            position: 'relative',
            height: '420px',
            border: `2px solid rgba(255, 51, 51, 0.5)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            gap: '20px',
            boxShadow: '0 0 40px rgba(255, 51, 51, 0.3)',
          }}
        >
          <div style={{ color: OFurryTheme.colors.secondary, fontSize: '16px', letterSpacing: '0.14em' }}>
            PODER DE COMPRA REAL
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: '100px',
              fontWeight: 800,
              color: '#FF3333',
              letterSpacing: '-0.03em',
              textShadow: '0 0 30px rgba(255, 51, 51, 0.5)',
            }}
          >
            R$ {Math.round(realValue).toLocaleString('pt-BR')}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 51, 51, 0.15)',
              border: '1px solid #FF3333',
              padding: '10px 24px',
              color: '#FFFFFF',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '18px',
            }}
          >
            <Lucide.Lock size={22} color="#FF3333" />
            DINHEIRO TRAVADO
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 10: "4 PERGUNTAS" (4.0s / 120 frames)
// Metáfora: Scanner HUD de auditoria projetando checklist essencial
// Silhueta: hud-radial
// =========================================================================
export const Scene10PerguntasDecisivas: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 1.8, amplitudeX: 1.0, periodFrames: 50 });
  const titleSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const titleOpacity = interpolate(titleSpring, [0, 0.3, 1], [0, 0.95, 1]);

  const questions = [
    { num: '01', text: 'QUAL O TETO DO GANHO?', delay: 6 },
    { num: '02', text: 'QUAL O PRAZO DE TRAVA?', delay: 14 },
    { num: '03', text: 'QUAL O CUSTO EMBUTIDO?', delay: 22 },
    { num: '04', text: 'QUANTO RENDE O CDI?', delay: 30 },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: transparent ? 'transparent' : OFurryTheme.colors.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: OFurryTheme.typography.families.tech,
      }}
    >
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.3} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: titleOpacity }}>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '6px 20px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '15px',
              fontWeight: 900,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            AUDITORIA
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '135px',
              fontWeight: 900,
              color: OFurryTheme.colors.primary,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            4 PERGUNTAS
          </div>
        </div>

        {/* 4 Pontos de Auditoria Flutuantes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '1350px' }}>
          {questions.map((q) => {
            const springProgress = getSpringProgress(frame, fps, q.delay, MotionPresets.snappy);
            const transY = interpolate(springProgress, [0, 1], [30, 0]);
            const op = interpolate(springProgress, [0, 0.4, 1], [0, 0.95, 1]);

            return (
              <div
                key={q.num}
                style={{
                  border: `2px solid ${OFurryTheme.colors.borderLight}`,
                  borderLeft: `6px solid ${OFurryTheme.colors.accentOrange}`,
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  transform: `translateY(${transY}px)`,
                  opacity: op,
                  boxShadow: '0 0 30px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '32px', color: OFurryTheme.colors.accentOrange }}>
                  {q.num}
                </div>
                <div style={{ fontFamily: OFurryTheme.typography.families.hero, fontSize: '26px', color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  {q.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SEQUÊNCIA COMPLETA DO BLOCO 3 (TOTAL: 10 CENAS / 1140 FRAMES / 38s)
// =========================================================================
export const BespokeBloco3Sequence: React.FC<BespokeSceneProps> = ({ transparent = false }) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={150} name="Scene1-AbrirProduto">
        <Scene1AbrirProduto transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90} name="Scene2-DuasCoisas">
        <Scene2DuasCoisas transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90} name="Scene3-ProtegerCapital">
        <Scene3ProtegerCapital transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90} name="Scene4-BuscarGanhos">
        <Scene4BuscarGanhos transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90} name="Scene5-AtivosReferencia">
        <Scene5AtivosReferencia transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} name="Scene6-DivisaoCapital">
        <Scene6DivisaoCapital transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} name="Scene7-RendaFixaMotor">
        <Scene7RendaFixaMotor transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={135} name="Scene8-TetoCallSpread">
        <Scene8TetoCallSpread transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={135} name="Scene9-InflacaoCorrosao">
        <Scene9InflacaoCorrosao transparent={transparent} />
      </Series.Sequence>
      <Series.Sequence durationInFrames={120} name="Scene10-PerguntasDecisivas">
        <Scene10PerguntasDecisivas transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};
