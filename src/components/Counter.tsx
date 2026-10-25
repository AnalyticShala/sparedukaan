import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BRANDS,
  CATEGORIES,
  brandById,
  modelById,
  modelsForBrand,
  partById,
  partsForCategory,
  type CategoryId,
} from '../data/catalog';
import { useSelection } from '../store/selection';
import { Icon } from './Icon';

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.18 },
};

export default function Counter() {
  const { sel, pickBrand, pickModel, pickCategory, pickPart } = useSelection();
  const [query, setQuery] = useState('');

  const brand = brandById(sel.brandId);
  const model = modelById(sel.modelId);
  const part = partById(sel.partId);
  const models = useMemo(() => {
    const list = modelsForBrand(sel.brandId);
    const q = query.trim().toLowerCase();
    return q ? list.filter((m) => `${m.name} ${m.code}`.toLowerCase().includes(q)) : list;
  }, [sel.brandId, query]);
  const parts = partsForCategory(sel.category);
  const ready = !!(brand && model);

  const startedFromPart = !!part && !brand;
  const href = ready
    ? `/parts/${brand!.id}/${model!.id}?cat=${sel.category}${part ? `&part=${part.id}` : ''}`
    : '#';

  return (
    <section id="counter" className="counter">
      <div className="container counter__inner">
        <div className="counter__head">
          <AnimatePresence mode="wait">
            <motion.h2 key={startedFromPart ? 'from-part' : 'default'} className="counter__title" {...fade}>
              {startedFromPart ? 'Ab company aur model batao' : 'Ya yahan se shuru karo'}
            </motion.h2>
          </AnimatePresence>
          <span className="counter__sub">
            {startedFromPart ? `Starting from: ${part!.name}. Pick the company, then the model.` : 'Company, phir model, phir part. Teen steps.'}
          </span>
        </div>

        <div className="counter__card">
          <div className="counter__col">
            <div className="counter__step">
              <span className="counter__num">1</span>
              <span className="counter__label">Company</span>
            </div>
            <div className="grid-2">
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  className={`choice${sel.brandId === b.id ? ' is-on' : ''}`}
                  aria-pressed={sel.brandId === b.id}
                  onClick={() => pickBrand(b.id)}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div className="counter__divider" aria-hidden="true" />

          <div className="counter__col">
            <div className="counter__step">
              <span className="counter__num">2</span>
              <span className="counter__label">Phone model</span>
            </div>
            <label className="field">
              <Icon name="search" size={18} strokeWidth={2.2} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={brand ? `Search ${brand.name} models` : 'Pick a company first'}
                disabled={!brand}
                aria-label="Search models"
              />
            </label>
            <div className="stack">
              <AnimatePresence initial={false}>
                {models.map((m) => (
                  <motion.button
                    key={m.id}
                    type="button"
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className={`choice choice--row${sel.modelId === m.id ? ' is-on' : ''}`}
                    aria-pressed={sel.modelId === m.id}
                    onClick={() => pickModel(m.id)}
                  >
                    <span>{m.name}</span>
                    <span className="choice__code">{m.code}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
              {brand && models.length === 0 && (
                <p className="muted">No match. Try the exact model code, or <a href="#model-help">find it in Settings</a>.</p>
              )}
              {!brand && <p className="muted">Models appear once you pick a company.</p>}
            </div>
          </div>

          <div className="counter__divider" aria-hidden="true" />

          <div className="counter__col">
            <div className="counter__step">
              <span className="counter__num">3</span>
              <span className="counter__label">Kya chahiye?</span>
            </div>
            <div className="segmented" role="tablist" aria-label="Category">
              {(Object.keys(CATEGORIES) as CategoryId[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={sel.category === c}
                  className={sel.category === c ? 'is-on' : ''}
                  onClick={() => pickCategory(c)}
                >
                  {CATEGORIES[c].name}
                </button>
              ))}
            </div>
            <div className="grid-2">
              {parts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`choice choice--tall${sel.partId === p.id ? ' is-on' : ''}`}
                  aria-pressed={sel.partId === p.id}
                  onClick={() => pickPart(sel.partId === p.id ? null : p.id, sel.category)}
                >
                  <span>{p.name}</span>
                  <small>{p.hint}</small>
                </button>
              ))}
            </div>
          </div>

          <aside className="slip" aria-label="Your selection">
            <span className="slip__title">Aapki parchi</span>
            <div className="slip__rows">
              <div className="slip__row">
                <span className="slip__k">Company</span>
                <span className="slip__v">{brand?.name ?? 'Not chosen'}</span>
              </div>
              <div className="slip__row">
                <span className="slip__k">Model</span>
                <span className="slip__v">{model?.name ?? 'Not chosen'}</span>
                {model && <span className="slip__code">Code {model.code}</span>}
              </div>
              <div className="slip__row slip__row--last">
                <span className="slip__k">{CATEGORIES[sel.category].slipLabel}</span>
                <span className="slip__v">{part?.name ?? `All ${CATEGORIES[sel.category].name.toLowerCase()}`}</span>
              </div>
            </div>
            {ready ? (
              <Link to={href} className="btn btn--primary btn--block">
                Dikhao <Icon name="arrowRight" size={18} strokeWidth={2.4} />
              </Link>
            ) : (
              <span className="btn btn--disabled btn--block" aria-disabled="true">
                Pick a model
              </span>
            )}
          </aside>
        </div>

        <div className="codebar">
          <span>Model code already pata hai?</span>
          <form
            className="codebar__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="codebar__k">Code</span>
            <input type="text" placeholder="SM-A546E, 2312DRAABI, A2633" aria-label="Model code" />
            <button type="submit" className="btn btn--cream btn--sm">
              Dhoondo
            </button>
          </form>
          <a href="#model-help" className="link-cream">
            Where is my model code?
          </a>
        </div>
      </div>
    </section>
  );
}
