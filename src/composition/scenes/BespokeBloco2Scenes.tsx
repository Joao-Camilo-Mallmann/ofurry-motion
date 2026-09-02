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
// CENA 1: "PATRIMÔNIO DE ANOS -> VENDIDO COMO SEGURO" (3.5s / 105 frames)
// Metáfora: Barras de anos de suor sendo canalizadas para um cofre "seguro"
// =========================================================================
export const Scene1PatrimonioSeguro: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Micro-drift contínuo
  const ambient = getAmbientDrift(frame, { amplitudeY: 2.5, amplitudeX: 1.2, periodFrames: 55 });

  // Entrada geral
  const entry = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const opacity = interpolate(entry, [0, 0.4, 1], [0, 0.95, 1]);

  // Contador de patrimônio acumulado
  const moneyProgress = interpolate(frame, [10, 60], [0, 250000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 2.5),
  });

  // Carimbo "100% SEGURO" que cai aos 45 frames
  const stampSpring = getSpringProgress(frame, fps, 42, MotionPresets.bouncy);
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 0.3, 1], [0, 0.95, 1]);
  const stampRotate = interpolate(stampSpring, [0, 1], [-12, -4]);

  // Feixe de transferência para o cofre (frames 30 a 70)
  const beamProgress = interpolate(frame, [25, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const yearsData = [
    { year: 'ANO 1', value: 'R$ 50k', pct: 20 },
    { year: 'ANO 2', value: 'R$ 100k', pct: 40 },
    { year: 'ANO 3', value: 'R$ 150k', pct: 60 },
    { year: 'ANO 4', value: 'R$ 200k', pct: 80 },
    { year: 'ANO 5', value: 'R$ 250k', pct: 100 },
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
          height: '860px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '80px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          opacity,
          zIndex: 2,
        }}
      >
        {/* COLUNA ESQUERDA: ACÚMULO DE ANOS DE TRABALHO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Header minimalista com badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '6px 16px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '15px',
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              5 ANOS DE CONSTRUÇÃO
            </div>
            <div style={{ height: '1px', flex: 1, backgroundColor: OFurryTheme.colors.borderLight }} />
          </div>

          {/* Valor monumental do patrimônio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ color: OFurryTheme.colors.secondary, fontSize: '16px', letterSpacing: '0.14em' }}>
              PATRIMÔNIO ACUMULADO
            </div>
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: '92px',
                fontWeight: 800,
                color: OFurryTheme.colors.primary,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textShadow: '0 0 30px rgba(255, 255, 255, 0.2)',
              }}
            >
              R$ {Math.round(moneyProgress).toLocaleString('pt-BR')}
            </div>
          </div>

          {/* Barras de evolução anual empilhando */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
            {yearsData.map((item, idx) => {
              const barSpring = getSpringProgress(frame, fps, 6 + idx * 4, MotionPresets.snappy);
              const widthPct = interpolate(barSpring, [0, 1], [0, item.pct]);
              const isLatest = idx === yearsData.length - 1;

              return (
                <div key={item.year} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '60px',
                      fontSize: '14px',
                      color: isLatest ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.secondary,
                      fontWeight: isLatest ? 700 : 500,
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '28px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid ${isLatest ? OFurryTheme.colors.accentOrange : OFurryTheme.colors.borderLight}`,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${widthPct}%`,
                        backgroundColor: isLatest ? OFurryTheme.colors.accentOrange : '#FFFFFF',
                        opacity: isLatest ? 1 : 0.8,
                        boxShadow: isLatest ? OFurryTheme.effects.glowOrange : 'none',
                        transition: 'width 0.1s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: '80px',
                      textAlign: 'right',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: isLatest ? OFurryTheme.colors.accentOrange : '#FFFFFF',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUNA DIREITA: O COFRE "SEGURO" QUE ABSORVE O CAPITAL */}
        <div
          style={{
            position: 'relative',
            height: '620px',
            border: `2px solid ${OFurryTheme.colors.borderLight}`,
            backgroundColor: 'rgba(15, 15, 15, 0.65)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px',
            overflow: 'hidden',
          }}
        >
          {/* Mira e cantos do cofre */}
          <div style={{ position: 'absolute', top: 16, left: 16, width: 24, height: 24, borderTop: `3px solid ${OFurryTheme.colors.accentOrange}`, borderLeft: `3px solid ${OFurryTheme.colors.accentOrange}` }} />
          <div style={{ position: 'absolute', top: 16, right: 16, width: 24, height: 24, borderTop: `3px solid ${OFurryTheme.colors.accentOrange}`, borderRight: `3px solid ${OFurryTheme.colors.accentOrange}` }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, width: 24, height: 24, borderBottom: `3px solid ${OFurryTheme.colors.accentOrange}`, borderLeft: `3px solid ${OFurryTheme.colors.accentOrange}` }} />
          <div style={{ position: 'absolute', bottom: 16, right: 16, width: 24, height: 24, borderBottom: `3px solid ${OFurryTheme.colors.accentOrange}`, borderRight: `3px solid ${OFurryTheme.colors.accentOrange}` }} />

          {/* Anéis orbitais do cofre */}
          <div
            style={{
              position: 'absolute',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              border: '2px dashed rgba(255, 153, 0, 0.3)',
              transform: `rotate(${frame * 0.8}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '460px',
              height: '460px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transform: `rotate(${-frame * 0.5}deg)`,
            }}
          />

          {/* Ícone central do Cofre / Escudo */}
          <div
            style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 153, 0, 0.1)',
              border: `2px solid ${OFurryTheme.colors.accentOrange}`,
              boxShadow: OFurryTheme.effects.glowOrangeStrong,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lucide.ShieldCheck size={100} color={OFurryTheme.colors.accentOrange} strokeWidth={2.2} />
          </div>

          <div
            style={{
              marginTop: '32px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '28px',
              color: '#FFFFFF',
              letterSpacing: '0.08em',
              textAlign: 'center',
            }}
          >
            PRODUTO ESTRUTURADO
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: '15px',
              color: OFurryTheme.colors.secondary,
              letterSpacing: '0.15em',
              marginTop: '6px',
            }}
          >
            CAPITAL PROTEGIDO // EMISSÃO BANCÁRIA
          </div>

          {/* CARIMBO COLOSSAL QUE DESPENCA COM FORÇA (FRAME 42+) */}
          {frame >= 42 && (
            <div
              style={{
                position: 'absolute',
                top: '40%',
                backgroundColor: OFurryTheme.colors.accentOrange,
                color: '#000000',
                padding: '18px 42px',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '44px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
                opacity: stampOpacity,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 153, 0, 0.8)',
                border: '4px solid #000000',
                zIndex: 10,
                textAlign: 'center',
              }}
            >
              VENDIDO COMO SEGURO
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 2: "TARDE DEMAIS -> RESGATE BLOQUEADO 0%" (3.0s / 90 frames)
// Metáfora: O cofre fecha travas de titânio, cadeado gigante e rentabilidade zerada
// =========================================================================
export const Scene2ArmadilhaBloqueada: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.0, amplitudeX: 1.0, periodFrames: 50 });

  // Travas de segurança entrando violentamente nos primeiros 15 frames
  const lockSpring = getSpringProgress(frame, fps, 2, MotionPresets.snappy);
  const lockSlide = interpolate(lockSpring, [0, 1], [-180, 0]);

  // Cadeado monumental central batendo aos 12 frames
  const padlockSpring = getSpringProgress(frame, fps, 10, MotionPresets.bouncy);
  const padlockScale = interpolate(padlockSpring, [0, 1], [2.5, 1]);
  const padlockOpacity = interpolate(padlockSpring, [0, 0.3, 1], [0, 0.95, 1]);

  // Faixa de alerta descendo
  const bannerSpring = getSpringProgress(frame, fps, 24, MotionPresets.snappy);
  const bannerY = interpolate(bannerSpring, [0, 1], [80, 0]);
  const bannerOpacity = interpolate(bannerSpring, [0, 0.4, 1], [0, 0.95, 1]);

  // Queda violenta do rendimento de verde para 0%
  const chartDrop = interpolate(frame, [18, 48], [14.5, 0.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => Math.pow(t, 2),
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
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.5} />

      <div
        style={{
          position: 'relative',
          width: '1680px',
          height: '860px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '70px',
          alignItems: 'center',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          zIndex: 2,
        }}
      >
        {/* COLUNA ESQUERDA: CADEADO GIGANTE & COFRE LACRADO */}
        <div
          style={{
            position: 'relative',
            height: '620px',
            border: `2px solid ${OFurryTheme.colors.danger}`,
            backgroundColor: 'rgba(25, 10, 12, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            overflow: 'hidden',
          }}
        >
          {/* Travas mecânicas horizontais */}
          <div
            style={{
              position: 'absolute',
              top: '25%',
              left: 0,
              width: '100%',
              height: '14px',
              backgroundColor: OFurryTheme.colors.danger,
              boxShadow: `0 0 20px ${OFurryTheme.colors.danger}`,
              transform: `translateX(${lockSlide}px)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '25%',
              right: 0,
              width: '100%',
              height: '14px',
              backgroundColor: OFurryTheme.colors.danger,
              boxShadow: `0 0 20px ${OFurryTheme.colors.danger}`,
              transform: `translateX(${-lockSlide}px)`,
            }}
          />

          {/* CADEADO MONUMENTAL DE IMPACTO */}
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: `4px solid ${OFurryTheme.colors.danger}`,
              boxShadow: `0 0 60px ${OFurryTheme.colors.danger}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${padlockScale})`,
              opacity: padlockOpacity,
              zIndex: 5,
            }}
          >
            <Lucide.Lock size={130} color={OFurryTheme.colors.danger} strokeWidth={2.4} />
          </div>

          <div
            style={{
              marginTop: '34px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '52px',
              color: '#FFFFFF',
              letterSpacing: '0.04em',
              textAlign: 'center',
            }}
          >
            TARDE DEMAIS
          </div>
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.tech,
              fontSize: '18px',
              color: OFurryTheme.colors.danger,
              letterSpacing: '0.2em',
              marginTop: '8px',
              fontWeight: 700,
            }}
          >
            RESGATE ANTECIPADO IMPOSSÍVEL
          </div>
        </div>

        {/* COLUNA DIREITA: MEDIDOR DE RETORNO EM QUEDA PARA 0% E ALERTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Card de Rendimento Real */}
          <div
            style={{
              backgroundColor: '#0F0F0F',
              border: `2px solid ${OFurryTheme.colors.borderLight}`,
              padding: '40px 48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '16px', color: OFurryTheme.colors.secondary, letterSpacing: '0.14em' }}>
                GANHO REAL ACIMA DA INFLAÇÃO
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(255, 51, 75, 0.2)',
                  color: OFurryTheme.colors.danger,
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: `1px solid ${OFurryTheme.colors.danger}`,
                }}
              >
                5 ANOS PERDIDOS
              </div>
            </div>

            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: '110px',
                fontWeight: 900,
                color: chartDrop === 0 ? OFurryTheme.colors.danger : OFurryTheme.colors.primary,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                textShadow: chartDrop === 0 ? `0 0 30px ${OFurryTheme.colors.danger}` : 'none',
              }}
            >
              +{chartDrop.toFixed(2)}%
            </div>

            <div style={{ fontSize: '15px', color: OFurryTheme.colors.muted }}>
              *Retorno nominal devolvido integralmente sem correção do poder de compra
            </div>
          </div>

          {/* TARJA SÓLIDA DE BLOQUEIO */}
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '24px 36px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '32px',
              fontWeight: 900,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `translateY(${bannerY}px)`,
              opacity: bannerOpacity,
              boxShadow: OFurryTheme.effects.solidBadgeShadow,
            }}
          >
            <span>CAPITAL BLOQUEADO</span>
            <Lucide.AlertOctagon size={42} color="#000000" strokeWidth={2.8} />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CENA 3: "A ENGRENAGEM DE VENDAS -> POR QUE CONTINUA?" (3.5s / 105 frames)
// Metáfora: Queixas explodindo vs Máquina contínua de comissões bancárias
// =========================================================================
export const Scene3MaquinaDeVendas: React.FC<BespokeSceneProps> = ({ transparent = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ambient = getAmbientDrift(frame, { amplitudeY: 2.5, amplitudeX: 1.2, periodFrames: 55 });

  // Contador acelerado de reclamações
  const complaints = interpolate(frame, [0, 80], [120, 4850], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 2),
  });

  // Pergunta monumental do topo
  const questionSpring = getSpringProgress(frame, fps, 0, MotionPresets.snappy);
  const questionY = interpolate(questionSpring, [0, 1], [-50, 0]);
  const questionOpacity = interpolate(questionSpring, [0, 0.4, 1], [0, 0.95, 1]);

  // Rotação contínua da mega engrenagem central
  const gearRotation = frame * 1.8;

  // Fluxo de comissões saindo da esteira
  const beltOffset = (frame * 12) % 360;

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
      <ParticleField showGrid showCorners showCrosshairs transparent={transparent} speed={1.8} />

      <div
        style={{
          position: 'relative',
          width: '1720px',
          height: '880px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '40px 0',
          transform: `translate3d(${ambient.translateX}px, ${ambient.translateY}px, 0)`,
          zIndex: 2,
        }}
      >
        {/* TOPO: PERGUNTA MONUMENTAL DE IMPACTO */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            transform: `translateY(${questionY}px)`,
            opacity: questionOpacity,
          }}
        >
          <div
            style={{
              fontFamily: OFurryTheme.typography.families.conceptual,
              fontSize: '88px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              textShadow: '0 0 40px rgba(255, 153, 0, 0.5)',
            }}
          >
            POR QUE CONTINUA SENDO VENDIDO?
          </div>
          <div
            style={{
              backgroundColor: OFurryTheme.colors.accentOrange,
              color: '#000000',
              padding: '6px 24px',
              fontFamily: OFurryTheme.typography.families.hero,
              fontSize: '16px',
              fontWeight: 900,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            A ENGRENAGEM DE INCENTIVOS DO MERCADO
          </div>
        </div>

        {/* CENTRO: INFOGRÁFICO CINÉTICO (RECLAMAÇÕES VS COMISSÕES) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr 1fr',
            gap: '50px',
            width: '100%',
            alignItems: 'center',
          }}
        >
          {/* BLOCO 1: RECLAMAÇÕES ACUMULADAS */}
          <div
            style={{
              backgroundColor: 'rgba(20, 10, 10, 0.8)',
              border: `2px solid ${OFurryTheme.colors.danger}`,
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lucide.Users size={24} color={OFurryTheme.colors.danger} />
              <div style={{ color: OFurryTheme.colors.danger, fontSize: '15px', fontWeight: 700, letterSpacing: '0.12em' }}>
                RECLAME AQUI & QUEIXAS
              </div>
            </div>
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: '68px',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              +{Math.round(complaints).toLocaleString('pt-BR')}
            </div>
            <div style={{ fontSize: '14px', color: OFurryTheme.colors.secondary }}>
              Clientes de múltiplos bancos relatando a mesma frustração
            </div>
          </div>

          {/* BLOCO 2 (CENTRAL): MEGA ENGRENAGEM TÉCNICA HOLOGRÁFICA */}
          <div
            style={{
              position: 'relative',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Anel de laser exterior */}
            <div
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                border: `2px dashed ${OFurryTheme.colors.accentOrange}`,
                transform: `rotate(${gearRotation}deg)`,
                boxShadow: OFurryTheme.effects.glowOrange,
              }}
            />
            {/* Engrenagem interior */}
            <div
              style={{
                position: 'absolute',
                width: '210px',
                height: '210px',
                borderRadius: '50%',
                border: '4px solid #FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                transform: `rotate(${-gearRotation * 1.5}deg)`,
              }}
            >
              <Lucide.RefreshCw size={90} color={OFurryTheme.colors.accentOrange} strokeWidth={2.4} />
            </div>

            {/* Ponto de Interrogação Monumental */}
            <div
              style={{
                position: 'absolute',
                fontFamily: OFurryTheme.typography.families.hero,
                fontSize: '80px',
                color: '#FFFFFF',
                fontWeight: 900,
                textShadow: '0 0 30px #FF9900',
              }}
            >
              ?
            </div>
          </div>

          {/* BLOCO 3: FLUXO DE COMISSÕES DIÁRIAS */}
          <div
            style={{
              backgroundColor: 'rgba(10, 20, 15, 0.8)',
              border: `2px solid ${OFurryTheme.colors.success}`,
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lucide.DollarSign size={24} color={OFurryTheme.colors.success} />
              <div style={{ color: OFurryTheme.colors.success, fontSize: '15px', fontWeight: 700, letterSpacing: '0.12em' }}>
                ALTA RENTABILIDADE PRO BANCO
              </div>
            </div>
            <div
              style={{
                fontFamily: OFurryTheme.typography.families.tech,
                fontSize: '68px',
                fontWeight: 800,
                color: OFurryTheme.colors.success,
                lineHeight: 1,
              }}
            >
              COMISSÕES
            </div>
            <div style={{ fontSize: '14px', color: OFurryTheme.colors.secondary }}>
              Um dos produtos com maior margem de lucro para a corretora
            </div>
          </div>
        </div>

        {/* RODAPÉ: TICKER CINÉTICO DE FLUXO CONTÍNUO */}
        <div
          style={{
            width: '100%',
            height: '46px',
            backgroundColor: '#111111',
            borderTop: `1px solid ${OFurryTheme.colors.borderLight}`,
            borderBottom: `1px solid ${OFurryTheme.colors.borderLight}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            fontSize: '15px',
            fontWeight: 700,
            color: OFurryTheme.colors.secondary,
            letterSpacing: '0.16em',
          }}
        >
          <span>● VENDA ATIVA DIÁRIA</span>
          <span style={{ color: OFurryTheme.colors.accentOrange }}>● MARGEM ELEVADA</span>
          <span>● ZERO RISCO PARA O EMISSOR</span>
          <span style={{ color: OFurryTheme.colors.danger }}>● CLIENTE TRAVADO</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SEQUÊNCIA COMPLETA UNIFICADA DO BLOCO 2 (10 SEGUNDOS / 300 FRAMES)
// =========================================================================
export const BespokeBloco2Sequence: React.FC<BespokeSceneProps> = ({ transparent = false }) => {
  return (
    <Series>
      {/* Cena 1: 105 frames (3.5s) */}
      <Series.Sequence durationInFrames={105} name="Bespoke-01-Patrimonio-Seguro">
        <Scene1PatrimonioSeguro transparent={transparent} />
      </Series.Sequence>

      {/* Cena 2: 90 frames (3.0s) */}
      <Series.Sequence durationInFrames={90} name="Bespoke-02-Armadilha-Bloqueada">
        <Scene2ArmadilhaBloqueada transparent={transparent} />
      </Series.Sequence>

      {/* Cena 3: 105 frames (3.5s) */}
      <Series.Sequence durationInFrames={105} name="Bespoke-03-Maquina-De-Vendas">
        <Scene3MaquinaDeVendas transparent={transparent} />
      </Series.Sequence>
    </Series>
  );
};
