import { BRANDS, PART_TYPES } from '../data/catalog';
import { useSelection } from '../store/selection';
import { useSmoothScroll } from '../lib/smoothScroll';
import { Icon } from './Icon';

const SYMPTOM_ICON: Record<string, 'screen' | 'battery' | 'bolt' | 'camera'> = {
  display: 'screen',
  battery: 'battery',
  port: 'bolt',
  camera: 'camera',
};

const SYMPTOM_COPY: Record<string, string> = {
  display: 'Cracked, black, lines or no touch. Display assemblies, with or without frame.',
  battery: 'Drains fast, swells, or switches off at 30%. Batteries with adhesive.',
  port: 'Loose port, charges only at an angle. Charging flex boards and sub-boards.',
  camera: 'Blurry, shaking or dead. Rear and front camera modules, lens glass.',
};

export function SymptomCards() {
  const { pickPart } = useSelection();
  const { scrollTo } = useSmoothScroll();
  const symptoms = PART_TYPES.filter((p) => p.symptom);
  return (
    <section className="container section">
      <div className="section__head">
        <h2 className="h2">Kya kharab hai?</h2>
        <span className="muted">Start from the problem if you don't know the part's name.</span>
      </div>
      <div className="grid-4">
        {symptoms.map((p) => (
          <button
            key={p.id}
            type="button"
            className="card card--symptom"
            onClick={() => {
              pickPart(p.id, p.category, 'counter');
              scrollTo('#counter', -90);
            }}
          >
            <span className="card__icon">
              <Icon name={SYMPTOM_ICON[p.id]} size={28} />
            </span>
            <span className="card__title">{p.symptom}</span>
            <span className="card__text">{SYMPTOM_COPY[p.id]}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function CategoryPanels() {
  const { pickCategory } = useSelection();
  const { scrollTo } = useSmoothScroll();
  return (
    <section className="container section grid-2 grid-2--wide">
      <button
        type="button"
        className="panel panel--dark"
        onClick={() => {
          pickCategory('parts');
          scrollTo('#counter', -90);
        }}
      >
        <span className="panel__eyebrow">Category 1</span>
        <span className="panel__title">Spare Parts</span>
        <span className="panel__text">Screens, batteries, charging ports, cameras, back panels, speakers. Every one tied to an exact model code.</span>
      </button>
      <button
        type="button"
        className="panel panel--peach"
        onClick={() => {
          pickCategory('acc');
          scrollTo('#counter', -90);
        }}
      >
        <span className="panel__eyebrow">Category 2</span>
        <span className="panel__title">Accessories</span>
        <span className="panel__text">Covers, tempered glass, chargers, cables, earphones. Picked for your model so the cutouts line up.</span>
      </button>
    </section>
  );
}

export function BrandWall() {
  const { pickBrand } = useSelection();
  const { scrollTo } = useSmoothScroll();
  return (
    <section className="container section">
      <h2 className="h2">Phone companies</h2>
      <div className="grid-8">
        {BRANDS.map((b) => (
          <button
            key={b.id}
            type="button"
            className="tile"
            onClick={() => {
              pickBrand(b.id);
              scrollTo('#counter', -90);
            }}
          >
            {b.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section className="container section">
      <div className="trust">
        <div className="trust__item">
          <span className="trust__icon">
            <Icon name="check" size={22} strokeWidth={2.4} />
          </span>
          <span className="trust__title">Verified fit, not "should fit"</span>
          <span className="trust__text">The badge appears only after we have checked the part against your model code. Otherwise we say so.</span>
        </div>
        <div className="trust__item">
          <span className="trust__icon">
            <Icon name="refresh" size={22} />
          </span>
          <span className="trust__title">Galat part? Wapas lo.</span>
          <span className="trust__text">If a verified-fit part doesn't fit, we replace or refund within [RETURN WINDOW] days.</span>
        </div>
        <div className="trust__item">
          <span className="trust__icon">
            <Icon name="chat" size={22} />
          </span>
          <span className="trust__title">Confused? Poocho.</span>
          <span className="trust__text">Send a photo of your old part or your About-phone screen. We'll confirm the right one before you pay.</span>
        </div>
      </div>
    </section>
  );
}
