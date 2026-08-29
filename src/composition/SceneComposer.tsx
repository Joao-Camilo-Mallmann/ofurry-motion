import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { SceneSpec, VisualElement } from '../director/schema';
import { OFurryTheme } from '../theme/ofurry';
import {
  TextReveal,
  Icon,
  AnimatedNumber,
  ConnectedNodes,
  DynamicChart,
  ParticleField,
} from '../primitives';
import { MotionPresets, getSpringProgress } from '../theme/motion';

export interface SceneComposerProps {
  scene: SceneSpec;
}

export const SceneComposer: React.FC<SceneComposerProps> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // Choreography entry calculation with safe defaults
  const { entryDirection = 'bottom-up', ambientMotion = 'gentle-float' } = scene.choreography ?? {};

  const entrySpring = getSpringProgress(frame, fps, 0, MotionPresets.smooth);
  const opacity = interpolate(entrySpring, [0, 0.4, 1], [0, 0.9, 1]);

  let entryTranslateX = 0;
  let entryTranslateY = 0;

  if (entryDirection === 'bottom-up') {
    entryTranslateY = interpolate(entrySpring, [0, 1], [50, 0]);
  } else if (entryDirection === 'left-glide') {
    entryTranslateX = interpolate(entrySpring, [0, 1], [-60, 0]);
  } else if (entryDirection === 'diagonal-flow') {
    entryTranslateX = interpolate(entrySpring, [0, 1], [-40, 0]);
    entryTranslateY = interpolate(entrySpring, [0, 1], [40, 0]);
  }

  // Render individual visual element
  const renderElement = (el: VisualElement, index: number) => {
    switch (el.type) {
      case 'text':
        return (
          <TextReveal
            key={`el-${index}`}
            text={el.text}
            subtitle={el.subtitle}
            variant={el.variant}
            highlightWords={el.highlightWords}
            align={el.align}
            delay={el.delay}
            glow={el.glow}
          />
        );

      case 'icon':
        return (
          <Icon
            key={`el-${index}`}
            name={el.name}
            size={el.size}
            color={el.color}
            accentColor={el.accentColor}
            delay={el.delay}
            showRing={el.showRing}
            showGlow={el.showGlow}
          />
        );

      case 'number':
        return (
          <AnimatedNumber
            key={`el-${index}`}
            value={el.value}
            startValue={el.startValue}
            prefix={el.prefix}
            suffix={el.suffix}
            label={el.label}
            decimals={el.decimals}
            durationInFrames={el.durationInFrames}
            delay={el.delay}
            variant={el.variant}
          />
        );

      case 'nodes':
        return (
          <ConnectedNodes
            key={`el-${index}`}
            nodes={el.nodes}
            connections={el.connections}
            delay={el.delay}
            drawDuration={el.drawDuration}
            width={el.width}
            height={el.height}
          />
        );

      case 'chart':
        return (
          <DynamicChart
            key={`el-${index}`}
            data={el.data}
            type={el.chartType}
            delay={el.delay}
            drawDuration={el.drawDuration}
            width={el.width}
            height={el.height}
            showGrid={el.showGrid}
            highlightLast={el.highlightLast}
          />
        );

      default:
        return null;
    }
  };

  // Render layout container structure
  const renderLayoutContent = () => {
    const { layout = 'centered-hero', elements } = scene;

    switch (layout) {
      case 'split-left': {
        const textElements = elements.filter((e) => e.type === 'text');
        const visualElements = elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: '60px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {textElements.map(renderElement)}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
              }}
            >
              {visualElements.map(renderElement)}
            </div>
          </div>
        );
      }

      case 'split-right': {
        const textElements = elements.filter((e) => e.type === 'text');
        const visualElements = elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.1fr',
              gap: '60px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
              }}
            >
              {visualElements.map(renderElement)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {textElements.map(renderElement)}
            </div>
          </div>
        );
      }

      case 'radial-network':
      case 'bottom-heavy': {
        const textElements = elements.filter((e) => e.type === 'text');
        const otherElements = elements.filter((e) => e.type !== 'text');

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '36px',
              width: '100%',
            }}
          >
            {textElements.map(renderElement)}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {otherElements.map(renderElement)}
            </div>
          </div>
        );
      }

      case 'dual-compare': {
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '48px',
              width: '100%',
              alignItems: 'center',
            }}
          >
            {elements.map((el, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {renderElement(el, i)}
              </div>
            ))}
          </div>
        );
      }

      case 'centered-hero':
      case 'freeform':
      default: {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px',
              width: '100%',
            }}
          >
            {elements.map(renderElement)}
          </div>
        );
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        backgroundColor: OFurryTheme.colors.background,
        overflow: 'hidden',
      }}
    >
      {/* Background Atmosphere */}
      <ParticleField
        showGrid={true}
        speed={ambientMotion === 'grid-drift' ? 1.5 : 0.8}
      />

      {/* Main Content Area in Safe Bounds */}
      <div
        style={{
          position: 'absolute',
          top: OFurryTheme.layout.safeArea.top,
          bottom: OFurryTheme.layout.safeArea.bottom,
          left: OFurryTheme.layout.safeArea.left,
          right: OFurryTheme.layout.safeArea.right,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate3d(${entryTranslateX}px, ${entryTranslateY}px, 0)`,
          opacity,
        }}
      >
        {renderLayoutContent()}
      </div>
    </div>
  );
};
