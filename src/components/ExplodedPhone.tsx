import { useEffect, useRef, useState, type ComponentType, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from 'react';
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
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
  DisplayAdhesive,
  DisplayPanel,
  FrontCameraEarpiece,
  MainBoard,
  MidFrame,
  PhoneCase,
  Speaker,
  TemperedGlass,
  VibrationMotor,
  WirelessCoil,
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
  anchorX: number; // where the leader line lands, in layer space
}

// Front (viewer side) to back. Positive depth = towards the viewer.
const LAYERS: Layer[] = [
  { id: 'glass', partId: 'glass', category: 'acc', label: 'Tempered glass', sub: 'screen protector', Art: TemperedGlass, depth: 185, side: 'left', labelY: 150, anchorX: 14 },
  { id: 'display', partId: 'display', category: 'parts', label: 'Display assembly', sub: 'glass + digitiser + panel', Art: DisplayPanel, depth: 135, side: 'right', labelY: 200, anchorX: 244 },
  { id: 'adhesive', partId: 'adhesive', category: 'parts', label: 'Display adhesive', sub: 'foam gasket', Art: DisplayAdhesive, depth: 95, side: 'left', labelY: 330, anchorX: 16 },
  { id: 'frontcam', partId: 'frontcam', category: 'parts', label: 'Front camera + earpiece', sub: 'top of frame', Art: FrontCameraEarpiece, depth: 60, side: 'right', labelY: 30, anchorX: 170 },
  { id: 'frame', partId: 'frame', category: 'parts', label: 'Mid-frame / chassis', sub: 'SIM tray, button flex', Art: MidFrame, depth: 20, side: 'right', labelY: 470, anchorX: 256 },
  { id: 'board', partId: 'board', category: 'parts', label: 'Logic board', sub: 'CPU, memory, modem', Art: MainBoard, depth: -25, side: 'right', labelY: 90, anchorX: 232 },
  { id: 'battery', partId: 'battery', category: 'parts', label: 'Battery', sub: 'with adhesive', Art: Battery, depth: -25, side: 'left', labelY: 210, anchorX: 36 },
  { id: 'port', partId: 'port', category: 'parts', label: 'Sub-board / charging port', sub: 'USB-C, mic, bottom flex', Art: ChargingPort, depth: -25, side: 'left', labelY: 500, anchorX: 42 },
  { id: 'speaker', partId: 'speaker', category: 'parts', label: 'Loudspeaker', sub: 'bottom', Art: Speaker, depth: -25, side: 'right', labelY: 490, anchorX: 232 },
  { id: 'haptic', partId: 'haptic', category: 'parts', label: 'Vibration motor', sub: 'haptic engine', Art: VibrationMotor, depth: -25, side: 'left', labelY: 432, anchorX: 46 },
  { id: 'camera', partId: 'camera', category: 'parts', label: 'Rear camera module', sub: 'main, wide, macro', Art: CameraModule, depth: -65, side: 'left', labelY: 70, anchorX: 26 },
  { id: 'coil', partId: 'coil', category: 'parts', label: 'Wireless coil + NFC', sub: 'inside back panel', Art: WirelessCoil, depth: -105, side: 'right', labelY: 290, anchorX: 218 },
  { id: 'back', partId: 'backpanel', category: 'parts', label: 'Back panel / rear glass', sub: 'lens cover, adhesive', Art: BackGlass, depth: -150, side: 'right', labelY: 380, anchorX: 254 },
  { id: 'case', partId: 'cover', category: 'acc', label: 'Phone case', sub: 'back cover / wallet', Art: PhoneCase, depth: -200, side: 'left', labelY: 380, anchorX: 2 },
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

// Labels live in a flat overlay above the 3D scene (so no layer can hide them).
// Each anchor is projected with the same transform the scene uses, then the
// chips are laid out in two columns (left / right) with a minimum gap, and a
// leader line joins each chip to its part.
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const LABEL_GAP = 46;

interface LabelPos {
  ax: number;
  ay: number;
  cx: number;
  cy: number;
  side: 'left' | 'right';
}

function projectAnchor(layer: Layer, p: number, rotXDeg: number, rotZDeg: number, sceneScale: number) {
  const a = (rotXDeg * Math.PI) / 180;
  const b = (rotZDeg * Math.PI) / 180;
  const d = layer.depth * easeInOut(clamp01((p - 0.08) / 0.92));
  const l = -30 * p;
  const g = 1 + 0.12 * p;
  const ax = layer.anchorX - SCENE_W / 2;
  const ay = layer.labelY - SCENE_H / 2;
  const x1 = ax * Math.cos(b) - ay * Math.sin(b);
  const y1 = ax * Math.sin(b) + ay * Math.cos(b);
  const y2 = y1 * Math.cos(a) - d * Math.sin(a);
  const z2 = y1 * Math.sin(a) + d * Math.cos(a);
  const x3 = x1 * g;
  const y3 = y2 * g + l;
  const z3 = z2 * g;
  const k = PERSPECTIVE / Math.max(200, PERSPECTIVE - z3);
  return { x: x3 * k * sceneScale, y: (PERSPECTIVE_ORIGIN_Y + (y3 - PERSPECTIVE_ORIGIN_Y) * k) * sceneScale };
}

function layoutLabels(p: number, rotXDeg: number, rotZDeg: number, sceneScale: number, colX: number, maxY: number): LabelPos[] {
  // The side is chosen from where the part currently is on screen, so labels
  // swap columns as the phone turns instead of crossing over it.
  const out: LabelPos[] = LAYERS.map((layer) => {
    const pt = projectAnchor(layer, p, rotXDeg, rotZDeg, sceneScale);
    const side = pt.x < 0 ? 'left' : 'right';
    return { ax: pt.x, ay: pt.y, cx: side === 'left' ? -colX : colX, cy: pt.y, side };
  });
  (['left', 'right'] as const).forEach((side) => {
    const idx = out.map((l, i) => (l.side === side ? i : -1)).filter((i) => i >= 0).sort((i, j) => out[i].ay - out[j].ay);
    if (idx.length === 0) return;
    // push down to keep the gap, then push back up if the column runs off the stage
    for (let k = 1; k < idx.length; k++) out[idx[k]].cy = Math.max(out[idx[k]].cy, out[idx[k - 1]].cy + LABEL_GAP);
    const last = idx[idx.length - 1];
    if (out[last].cy > maxY) out[last].cy = maxY;
    for (let k = idx.length - 2; k >= 0; k--) out[idx[k]].cy = Math.min(out[idx[k]].cy, out[idx[k + 1]].cy - LABEL_GAP);
  });
  return out;
}

function LabelOverlay({
  progress,
  rotX,
  rotZ,
  sceneScale,
  stageW,
  stageH,
}: {
  progress: MotionValue<number>;
  rotX: MotionValue<number>;
  rotZ: MotionValue<number>;
  sceneScale: number;
  stageW: number;
  stageH: number;
}) {
  const colX = Math.min(330, stageW / 2 - 100);
  const maxY = stageH / 2 - 60;
  const layout = useTransform([progress, rotX, rotZ], (v) => {
    const [p, a, b] = v as number[];
    return layoutLabels(p, a, b, sceneScale, colX, maxY);
  });
  const opacity = useTransform(progress, [0.62, 0.85], [0, 1]);
  return (
    <motion.div className="plabels" style={{ opacity }} aria-hidden="true">
      <svg className="plabels__lines" width={stageW} height={stageH} viewBox={`${-stageW / 2} ${-stageH / 2} ${stageW} ${stageH}`}>
        {LAYERS.map((layer, i) => (
          <LeaderLine key={layer.id} layout={layout} index={i} />
        ))}
      </svg>
      {LAYERS.map((layer, i) => (
        <LabelChip key={layer.id} layer={layer} layout={layout} index={i} />
      ))}
    </motion.div>
  );
}

function LeaderLine({ layout, index }: { layout: MotionValue<LabelPos[]>; index: number }) {
  const x1 = useTransform(layout, (l) => l[index].cx + (l[index].side === 'left' ? 4 : -4));
  const y1 = useTransform(layout, (l) => l[index].cy);
  const x2 = useTransform(layout, (l) => l[index].ax);
  const y2 = useTransform(layout, (l) => l[index].ay);
  return (
    <>
      <motion.line x1={x1} y1={y1} x2={x2} y2={y2} className="plabels__line" />
      <motion.circle cx={x2} cy={y2} r={3} className="plabels__dot" />
    </>
  );
}

function LabelChip({ layer, layout, index }: { layer: Layer; layout: MotionValue<LabelPos[]>; index: number }) {
  const x = useTransform(layout, (l) => l[index].cx);
  const y = useTransform(layout, (l) => l[index].cy);
  const shift = useTransform(layout, (l) => (l[index].side === 'left' ? '-100%' : '0%'));
  return (
    <motion.div className="plabel" style={{ x, y }}>
      <motion.span className="plabel__chip" style={{ x: shift, y: '-50%' }}>
        <span>{layer.label}</span>
        <small>{layer.sub}</small>
      </motion.span>
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

  const baseRotX = useTransform(progress, [0, 0.9], [0, TILT_X], { ease: easeInOut });
  const baseRotZ = useTransform(progress, [0, 0.9], [0, TILT_Z], { ease: easeInOut });
  // User rotation: yaw spins the exploded stack like a turntable (full 360),
  // pitch tilts it. Both fade in with the explosion so the resting phone
  // still faces the viewer squarely.
  const yaw = useMotionValue(0);
  const pitch = useMotionValue(0);
  const userWeight = useTransform(progress, [0.3, 0.9], [0, 1]);
  const rotX = useTransform([baseRotX, pitch, userWeight], (v) => {
    const [b, pt, w] = v as number[];
    return Math.min(82, Math.max(8, b + pt * w));
  });
  const rotZ = useTransform([baseRotZ, yaw, userWeight], (v) => {
    const [b, y, w] = v as number[];
    return b + y * w;
  });
  const lift = useTransform(progress, [0, 1], [0, -30]);
  const grow = useTransform(progress, [0, 1], [1, 1.12]);
  const stackTransform = useMotionTemplate`translateY(${lift}px) scale(${grow}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
  const shadowOpacity = useTransform(progress, [0.1, 0.8], [0.15, 0.6]);
  const shadowScale = useTransform(progress, [0, 1], [0.6, 1.25]);

  const phoneRef = useRef<HTMLDivElement>(null);
  const [sceneScale, setSceneScale] = useState(0.8);
  const [stage, setStage] = useState({ w: 1280, h: 650 });
  useEffect(() => {
    const update = () => {
      setSceneScale(window.innerWidth <= 640 ? 0.6 : 0.8);
      const el = phoneRef.current;
      if (el) setStage({ w: el.clientWidth, h: el.clientHeight });
    };
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

  const dragging = useRef(false);
  const movedRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, yaw: 0, pitch: 0, t: 0, vx: 0, lastX: 0, lastT: 0 });
  const idleTimer = useRef<number | undefined>(undefined);
  const autoSpin = useRef<ReturnType<typeof animate> | null>(null);

  const stopAutoSpin = () => {
    autoSpin.current?.stop();
    autoSpin.current = null;
  };
  const startAutoSpin = () => {
    if (reduceMotion || autoSpin.current || dragging.current) return;
    autoSpin.current = animate(yaw, yaw.get() + 360, { duration: 60, ease: 'linear', repeat: Infinity, repeatType: 'loop' });
  };
  const scheduleAutoSpin = () => {
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      if (progress.get() > 0.85) startAutoSpin();
    }, 4000);
  };
  // Auto-rotate slowly once the phone is fully open and nobody is touching it.
  useMotionValueEvent(progress, 'change', (v) => {
    if (v > 0.85) {
      if (!autoSpin.current && !dragging.current) scheduleAutoSpin();
    } else {
      stopAutoSpin();
      window.clearTimeout(idleTimer.current);
    }
  });
  useEffect(() => () => {
    stopAutoSpin();
    window.clearTimeout(idleTimer.current);
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.button !== 0) return;
    stopAutoSpin();
    window.clearTimeout(idleTimer.current);
    dragging.current = true;
    movedRef.current = false;
    const now = performance.now();
    dragStart.current = { x: e.clientX, y: e.clientY, yaw: yaw.get(), pitch: pitch.get(), t: now, vx: 0, lastX: e.clientX, lastT: now };
    const el = e.currentTarget;
    const onMove = (ev: PointerEvent) => {
      if (!dragging.current) return;
      const d = dragStart.current;
      const dx = ev.clientX - d.x;
      const dy = ev.clientY - d.y;
      if (!movedRef.current && Math.hypot(dx, dy) > 6) {
        movedRef.current = true;
        el.classList.add('is-dragging');
      }
      if (!movedRef.current) return;
      yaw.set(d.yaw + dx * 0.45);
      pitch.set(d.pitch - dy * 0.25);
      const t = performance.now();
      const dt = Math.max(1, t - d.lastT);
      d.vx = ((ev.clientX - d.lastX) / dt) * 1000 * 0.45;
      d.lastX = ev.clientX;
      d.lastT = t;
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      if (!dragging.current) return;
      dragging.current = false;
      el.classList.remove('is-dragging');
      if (movedRef.current) {
        animate(yaw, yaw.get(), { type: 'inertia', velocity: dragStart.current.vx, power: 0.6, timeConstant: 350 });
        // let the synthetic click that follows the drag be swallowed, then reset
        window.setTimeout(() => {
          movedRef.current = false;
        }, 0);
      }
      scheduleAutoSpin();
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };
  const onClickCapture = (e: ReactMouseEvent<HTMLDivElement>) => {
    // a drag must not count as a click on the part underneath
    if (movedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

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

        <div
          className="hero__phone"
          ref={phoneRef}
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
        >
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
          <LabelOverlay progress={progress} rotX={rotX} rotZ={rotZ} sceneScale={sceneScale} stageW={stage.w} stageH={stage.h} />
          <motion.div className="hero__spin" style={{ opacity: pickHintOpacity }} aria-hidden="true">
            <Icon name="refresh" size={16} /> Drag to rotate
          </motion.div>

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
