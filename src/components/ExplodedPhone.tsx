import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import type { CategoryId } from '../data/catalog';
import { useSelection } from '../store/selection';
import { useSmoothScroll } from '../lib/smoothScroll';
import { Icon } from './Icon';

// Each layer of the phone. Assembled, every layer sits centred so they stack
// into one phone; as the hero scrolls, each one travels to (tx, ty), rotates,
// and scales. `delay` staggers the start so the glass lifts before the battery.
interface Layer {
  id: string;
  partId: string; // part type in the catalogue
  category: CategoryId;
  label: string;
  sub: string;
  w: number;
  h: number;
  radius: number;
  z: number;
  skin: string; // css class for the look
  tx: number;
  ty: number;
  rot: number;
  scale: number;
  delay: number;
}

const LAYERS: Layer[] = [
  { id: 'cover', partId: 'cover', category: 'acc', label: 'Back cover', sub: 'accessory', w: 250, h: 490, radius: 36, z: 1, skin: 'skin-cover', tx: 500, ty: -110, rot: 10, scale: 0.55, delay: 0.05 },
  { id: 'frame', partId: 'frame', category: 'parts', label: 'Frame / back panel', sub: 'body', w: 250, h: 490, radius: 36, z: 4, skin: 'skin-frame', tx: 0, ty: 0, rot: 0, scale: 0.72, delay: 0 },
  { id: 'battery', partId: 'battery', category: 'parts', label: 'Battery', sub: 'with adhesive', w: 150, h: 230, radius: 14, z: 2, skin: 'skin-part', tx: 270, ty: -60, rot: -6, scale: 1, delay: 0.1 },
  { id: 'camera', partId: 'camera', category: 'parts', label: 'Cameras', sub: 'rear / front', w: 120, h: 84, radius: 18, z: 2, skin: 'skin-camera', tx: -300, ty: -235, rot: -8, scale: 1, delay: 0.15 },
  { id: 'speaker', partId: 'speaker', category: 'parts', label: 'Speaker', sub: 'loud / ear', w: 170, h: 54, radius: 12, z: 2, skin: 'skin-part', tx: 320, ty: 215, rot: 8, scale: 1, delay: 0.2 },
  { id: 'mic', partId: 'speaker', category: 'parts', label: 'Mic', sub: 'bottom / top', w: 80, h: 44, radius: 10, z: 2, skin: 'skin-part', tx: 120, ty: 265, rot: -4, scale: 1, delay: 0.25 },
  { id: 'port', partId: 'port', category: 'parts', label: 'Charging port', sub: 'flex board', w: 160, h: 64, radius: 12, z: 2, skin: 'skin-part', tx: 500, ty: 90, rot: 6, scale: 1, delay: 0.3 },
  { id: 'display', partId: 'display', category: 'parts', label: 'Display', sub: 'OLED / LCD', w: 226, h: 466, radius: 28, z: 5, skin: 'skin-display', tx: -255, ty: 30, rot: 0, scale: 0.6, delay: 0.02 },
  { id: 'glass', partId: 'glass', category: 'acc', label: 'Tempered glass', sub: 'accessory', w: 226, h: 466, radius: 28, z: 6, skin: 'skin-glass', tx: -500, ty: -70, rot: -12, scale: 0.52, delay: 0.08 },
];

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function PhoneLayer({
  layer,
  progress,
  spread,
  onPick,
  active,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  spread: number;
  onPick: (l: Layer) => void;
  active: boolean;
}) {
  const range: [number, number] = [layer.delay, 1];
  const x = useTransform(progress, range, [0, layer.tx * spread], { ease: easeInOut });
  const y = useTransform(progress, range, [0, layer.ty * Math.min(1, spread + 0.25)], { ease: easeInOut });
  const rotate = useTransform(progress, range, [0, layer.rot], { ease: easeInOut });
  const scale = useTransform(progress, range, [1, layer.scale], { ease: easeInOut });
  const shadow = useTransform(progress, range, [0, 1], { ease: easeInOut });
  const boxShadow = useTransform(shadow, (s) => `0 ${18 * s}px ${44 * s}px rgba(42,26,18,${0.38 * s})`);
  const labelOpacity = useTransform(progress, [0.6, 0.85], [0, 1]);
  const labelY = useTransform(progress, [0.6, 0.85], [8, 0]);
  // keep labels readable on layers that shrink as they explode
  const labelScale = useTransform(scale, (s) => 1 / Math.max(0.3, s));

  return (
    <motion.button
      type="button"
      className={`phone-layer ${layer.skin}${active ? ' is-active' : ''}`}
      aria-label={`${layer.label}: start from this part`}
      onClick={() => onPick(layer)}
      style={{
        width: layer.w,
        height: layer.h,
        borderRadius: layer.radius,
        zIndex: layer.z,
        x,
        y,
        rotate,
        scale,
        boxShadow,
      }}
    >
      <motion.span className="phone-layer__label" style={{ opacity: labelOpacity, y: labelY, scale: labelScale }}>
        <span>{layer.label}</span>
        <small>{layer.sub}</small>
      </motion.span>
      <span className="phone-layer__detail" aria-hidden="true" />
    </motion.button>
  );
}

export default function ExplodedPhone() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { sel, pickPart } = useSelection();
  const { scrollTo } = useSmoothScroll();

  // 0 when the hero's top hits the viewport top, 1 when its bottom does.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  // Spring smoothing removes the stepped feel of wheel events; still tracks scroll closely.
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.5, restDelta: 0.0005 });
  const still = useTransform(() => 1);
  const progress = reduceMotion ? still : smooth;

  const [opened, setOpened] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => setOpened(v > 0.15));
  useEffect(() => {
    if (reduceMotion) setOpened(true);
  }, [reduceMotion]);

  // Horizontal spread shrinks on narrow stages so parts stay inside the viewport.
  const [spread, setSpread] = useState(1);
  useEffect(() => {
    const update = () => setSpread(Math.min(1, Math.max(0.42, (sectionRef.current?.clientWidth ?? 1280) / 1240)));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const scrollHintOpacity = useTransform(progress, [0, 0.12], [1, 0]);
  const pickHintOpacity = useTransform(progress, [0.75, 0.95], [0, 1]);
  const pickHintY = useTransform(progress, [0.75, 0.95], [12, 0]);

  const onPick = (l: Layer) => {
    pickPart(l.partId, l.category, 'phone');
    scrollTo('#counter', -90);
  };

  return (
    <section ref={sectionRef} className="hero" aria-label="Find the part that is broken">
      <div className="hero__stage">
        <div className="container hero__top">
          <div className="hero__copy">
            <h1 className="hero__title">{opened ? 'Kya kharab hai?' : 'Bolo, kaunsa phone?'}</h1>
            <p className="hero__sub">
              {opened
                ? 'Click the part that is broken. Then tell us the company and model, and we show only what fits your exact model code.'
                : 'Scroll karo, phone khulta hai. Pick the broken part first, or start from your phone company below.'}
            </p>
          </div>
          <div className="hero__badges">
            <span className="pill pill--ghost">
              <Icon name="check" size={16} strokeWidth={3} /> Verified fit, or wapas
            </span>
            <span className="pill pill--ghost">
              <Icon name="box" size={16} /> Ships across India
            </span>
          </div>
        </div>

        <div className="hero__phone">
          {LAYERS.map((l) => (
            <PhoneLayer
              key={l.id}
              layer={l}
              progress={progress}
              spread={spread}
              onPick={onPick}
              active={sel.startedFrom === 'phone' && sel.partId === l.partId}
            />
          ))}

          <motion.div className="hero__hint" style={{ opacity: scrollHintOpacity }} aria-hidden="true">
            <span>Scroll karo</span>
            <Icon name="arrowDown" size={22} strokeWidth={2.6} />
          </motion.div>
          <motion.div className="hero__pick" style={{ opacity: pickHintOpacity, y: pickHintY }} aria-hidden="true">
            Kisi bhi part pe click karo, ya neeche company se shuru karo
          </motion.div>
        </div>
      </div>
    </section>
  );
}
