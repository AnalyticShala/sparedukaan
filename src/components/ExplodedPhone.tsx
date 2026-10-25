import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
  motion,
  useMotionTemplate,
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
import {
  BackGlass,
  Battery,
  CameraModule,
  ChargingPort,
  DisplayPanel,
  MainBoard,
  MidFrame,
  Speaker,
  TemperedGlass,
} from './PhoneParts';

// The phone is a stack of flat layers in one 3D space. Assembled, they sit on
// top of each other and read as a phone seen from the front. As the hero
// scrolls, the whole stack tilts into an isometric view and each layer slides
// along the depth axis to its exploded position (a teardown diagram).
interface Layer {
  id: string;
  partId: string;
  category: CategoryId;
  label: string;
  sub: string;
  Art: ComponentType;
  depth: number; // exploded position along the depth axis, px (negative = behind)
  side: 'left' | 'right'; // where the label sits
  labelY: number; // label anchor, in the 260x540 layer space
}

const LAYERS: Layer[] = [
  { id: 'back', partId: 'frame', category: 'parts', label: 'Back glass', sub: 'back panel', Art: BackGlass, depth: -200, side: 'right', labelY: 300 },
  { id: 'frame', partId: 'frame', category: 'parts', label: 'Mid-frame', sub: 'body, buttons', Art: MidFrame, depth: -150, side: 'right', labelY: 470 },
  { id: 'board', partId: 'port', category: 'parts', label: 'Main board', sub: 'logic board', Art: MainBoard, depth: -100, side: 'right', labelY: 100 },
  { id: 'battery', partId: 'battery', category: 'parts', label: 'Battery', sub: 'with adhesive', Art: Battery, depth: -50, side: 'left', labelY: 215 },
  { id: 'camera', partId: 'camera', category: 'parts', label: 'Camera module', sub: 'rear lenses', Art: CameraModule, depth: -10, side: 'left', labelY: 76 },
  { id: 'speaker', partId: 'speaker', category: 'parts', label: 'Loudspeaker', sub: 'bottom', Art: Speaker, depth: 30, side: 'right', labelY: 484 },
  { id: 'port', partId: 'port', category: 'parts', label: 'Charging port', sub: 'USB-C sub-board', Art: ChargingPort, depth: 75, side: 'left', labelY: 500 },
  { id: 'display', partId: 'display', category: 'parts', label: 'Display', sub: 'OLED / LCD', Art: DisplayPanel, depth: 135, side: 'right', labelY: 260 },
  { id: 'glass', partId: 'glass', category: 'acc', label: 'Tempered glass', sub: 'accessory', Art: TemperedGlass, depth: 200, side: 'left', labelY: 180 },
];

const TILT_X = 56; // degrees, final isometric tilt
const TILT_Z = -24;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const PERSPECTIVE = 1500;
const PERSPECTIVE_ORIGIN_Y = -54; // 40% of 540, relative to centre
const SCENE_W = 260;
const SCENE_H = 540;

function PhoneLayer({
  layer,
  progress,
  onPick,
  active,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  onPick: (l: Layer) => void;
  active: boolean;
}) {
  const z = useTransform(progress, [0.08, 1], [0, layer.depth], { ease: easeInOut });
  const transform = useMotionTemplate`translateZ(${z}px)`;
  return (
    <motion.button
      type="button"
      className={`layer3d${active ? ' is-active' : ''}`}
      aria-label={`${layer.label}: start from this part`}
      onClick={() => onPick(layer)}
      style={{ transform }}
    >
      <layer.Art />
    </motion.button>
  );
}

// Labels live in a flat overlay above the 3D scene (so no layer can hide them)
// and are positioned by projecting their anchor point with the same transform
// the scene uses: translateY(lift) scale(grow) rotateX(rotX) rotateZ(rotZ) translateZ(depth).
function LayerLabel({
  layer,
  progress,
  rotX,
  rotZ,
  lift,
  grow,
  sceneScale,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  rotX: MotionValue<number>;
  rotZ: MotionValue<number>;
  lift: MotionValue<number>;
  grow: MotionValue<number>;
  sceneScale: number;
}) {
  const z = useTransform(progress, [0.08, 1], [0, layer.depth], { ease: easeInOut });
  const ax = (layer.side === 'left' ? 6 : SCENE_W - 6) - SCENE_W / 2;
  const ay = layer.labelY - SCENE_H / 2;
  const point = useTransform([rotX, rotZ, z, lift, grow], (v) => {
    const [a, b, d, l, g] = v as number[];
    const ra = (a * Math.PI) / 180;
    const rb = (b * Math.PI) / 180;
    const x1 = ax * Math.cos(rb) - ay * Math.sin(rb);
    const y1 = ax * Math.sin(rb) + ay * Math.cos(rb);
    const y2 = y1 * Math.cos(ra) - d * Math.sin(ra);
    const z2 = y1 * Math.sin(ra) + d * Math.cos(ra);
    const x3 = x1 * g;
    const y3 = y2 * g + l;
    const z3 = z2 * g;
    const k = PERSPECTIVE / Math.max(200, PERSPECTIVE - z3);
    const sx = x3 * k;
    const sy = PERSPECTIVE_ORIGIN_Y + (y3 - PERSPECTIVE_ORIGIN_Y) * k;
    return { x: sx * sceneScale, y: sy * sceneScale };
  });
  const x = useTransform(point, (p) => p.x);
  const y = useTransform(point, (p) => p.y);
  const opacity = useTransform(progress, [0.62, 0.85], [0, 1]);
  return (
    <motion.div className={`plabel plabel--${layer.side}`} style={{ x, y, opacity }} aria-hidden="true">
      <span className="plabel__line" />
      <span className="plabel__chip">
        <span>{layer.label}</span>
        <small>{layer.sub}</small>
      </span>
    </motion.div>
  );
}

export default function ExplodedPhone() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { sel, pickPart } = useSelection();
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6, restDelta: 0.0005 });
  const still = useTransform(() => 1);
  const progress = reduceMotion ? still : smooth;

  const rotX = useTransform(progress, [0, 0.9], [0, TILT_X], { ease: easeInOut });
  const rotZ = useTransform(progress, [0, 0.9], [0, TILT_Z], { ease: easeInOut });
  const lift = useTransform(progress, [0, 1], [0, -30]);
  const grow = useTransform(progress, [0, 1], [1, 1.12]);
  const stackTransform = useMotionTemplate`translateY(${lift}px) scale(${grow}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
  const shadowOpacity = useTransform(progress, [0.1, 0.8], [0.15, 0.6]);
  const shadowScale = useTransform(progress, [0, 1], [0.6, 1.25]);

  const [sceneScale, setSceneScale] = useState(0.8);
  useEffect(() => {
    const update = () => setSceneScale(window.innerWidth <= 640 ? 0.6 : 0.8);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const [opened, setOpened] = useState(false);
  useMotionValueEvent(progress, 'change', (v) => setOpened(v > 0.15));
  useEffect(() => {
    if (reduceMotion) setOpened(true);
  }, [reduceMotion]);

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
          <motion.div className="phone3d__shadow" style={{ opacity: shadowOpacity, scale: shadowScale }} aria-hidden="true" />
          <div className="phone3d__scene">
            <motion.div className="phone3d" style={{ transform: stackTransform }}>
              {LAYERS.map((l) => (
                <PhoneLayer
                  key={l.id}
                  layer={l}
                  progress={progress}
                  onPick={onPick}
                  active={sel.startedFrom === 'phone' && sel.partId === l.partId}
                />
              ))}
            </motion.div>
          </div>
          <div className="plabels" aria-hidden="true">
            {LAYERS.map((l) => (
              <LayerLabel key={l.id} layer={l} progress={progress} rotX={rotX} rotZ={rotZ} lift={lift} grow={grow} sceneScale={sceneScale} />
            ))}
          </div>

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
