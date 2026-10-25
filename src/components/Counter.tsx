import { useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BRANDS,
  CATEGORIES,
  MODELS,
  TOP_BRAND_IDS,
  brandById,
  findByCode,
  modelById,
  modelsForBrand,
  partById,
  partsForCategory,
  type CategoryId,
  type DeviceModel,
} from '../data/catalog';
import { useSelection } from '../store/selection';
import { Icon } from './Icon';

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.18 },
};

const AVAIL_LABEL = { high: 'Parts common', medium: 'Parts available', low: 'Limited parts' } as const;

export default function Counter() {
  const { sel, pickBrand, pickModel, pickCategory, pickPart } = useSelection();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [brandQuery, setBrandQuery] = useState('');
  const [allBrands, setAllBrands] = useState(false);
  const [code, setCode] = useState('');
  const [codeResult, setCodeResult] = useState<{ q: string; hits: DeviceModel[] } | null>(null);

  const brand = brandById(sel.brandId);
  const model = modelById(sel.brandId, sel.modelId);
  const part = partById(sel.partId);

  const brandList = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (q) return BRANDS.filter((b) => b.name.toLowerCase().includes(q));
    const top = TOP_BRAND_IDS.map((id) => BRANDS.find((b) => b.id === id)!).filter(Boolean);
    if (!allBrands && !(sel.brandId && !TOP_BRAND_IDS.includes(sel.brandId))) return top;
    const rest = BRANDS.filter((b) => !TOP_BRAND_IDS.includes(b.id)).sort((a, b) => (a.status === b.status ? a.name.localeCompare(b.name) : a.status === 'active' ? -1 : 1));
    return [...top, ...rest];
  }, [brandQuery, allBrands, sel.brandId]);

  const allModels = useMemo(() => modelsForBrand(sel.brandId), [sel.brandId]);
  const models = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? allModels.filter((m) => `${m.name} ${m.code} ${m.year}`.toLowerCase().includes(q)) : allModels;
  }, [allModels, query]);
  const parts = partsForCategory(sel.category);
  const ready = !!(brand && model);

  const startedFromPart = !!part && !brand;
  const href = ready ? `/parts/${brand!.id}/${model!.id}?cat=${sel.category}${part ? `&part=${part.id}` : ''}` : '#';

  const onCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hits = findByCode(code);
    if (hits.length === 1) {
      pickBrand(hits[0].brandId);
      pickModel(hits[0].id);
      navigate(`/parts/${hits[0].brandId}/${hits[0].id}?cat=${sel.category}${part ? `&part=${part.id}` : ''}`);
      return;
    }
    setCodeResult({ q: code, hits });
  };

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
            {startedFromPart ? `Starting from: ${part!.name}. Pick the company, then the model.` : brand ? `${brand.name}: ${allModels.length} models listed. Pick the model, then the part.` : `${BRANDS.length} companies, ${MODELS.length} models sold in India. Company, phir model, phir part.`}
          </span>
        </div>

        <div className="counter__card">
          <div className="counter__col">
            <div className="counter__step">
              <span className="counter__num">1</span>
              <span className="counter__label">Company</span>
            </div>
            <label className="field">
              <Icon name="search" size={18} strokeWidth={2.2} />
              <input id="brand-search" type="text" value={brandQuery} onChange={(e) => setBrandQuery(e.target.value)} placeholder="Search 25 companies" aria-label="Search companies" />
            </label>
            <div className="grid-2 brands">
              {brandList.map((b) => (
                <button key={b.id} type="button" className={`choice${sel.brandId === b.id ? ' is-on' : ''}${b.status === 'legacy' ? ' choice--muted' : ''}`} aria-pressed={sel.brandId === b.id} onClick={() => pickBrand(b.id)}>
                  {b.name}
                </button>
              ))}
            </div>
            {!brandQuery && (
              <button type="button" className="linkbtn" onClick={() => setAllBrands((v) => !v)}>
                {allBrands ? 'Show main companies only' : `Sabhi ${BRANDS.length} companies dikhao`}
              </button>
            )}
          </div>

          <div className="counter__divider" aria-hidden="true" />

          <div className="counter__col">
            <div className="counter__step">
              <span className="counter__num">2</span>
              <span className="counter__label">Phone model</span>
              {brand && <span className="counter__count">{allModels.length}</span>}
            </div>
            <label className="field">
              <Icon name="search" size={18} strokeWidth={2.2} />
              <input
                id="model-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={brand ? `Search ${brand.name} models or codes` : 'Pick a company first'}
                disabled={!brand}
                aria-label="Search models"
              />
            </label>
            <div className="stack stack--scroll">
              <AnimatePresence initial={false}>
                {models.map((m) => (
                  <motion.button
                    key={m.id}
                    type="button"
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`choice choice--row${sel.modelId === m.id ? ' is-on' : ''}`}
                    aria-pressed={sel.modelId === m.id}
                    onClick={() => pickModel(m.id)}
                  >
                    <span className="choice__main">
                      <span>{m.name}</span>
                      <small>{m.year} · {AVAIL_LABEL[m.avail]}</small>
                    </span>
                    <span className="choice__code">{m.code || 'code?'}</span>
                  </motion.button>
                ))}
              </AnimatePresence>
              {brand && models.length === 0 && (
                <p className="muted">
                  No match. Try the exact model code, or <a href="#model-help">find it in Settings</a>.
                </p>
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
                <button key={c} type="button" role="tab" aria-selected={sel.category === c} className={sel.category === c ? 'is-on' : ''} onClick={() => pickCategory(c)}>
                  {CATEGORIES[c].name}
                </button>
              ))}
            </div>
            <div className="grid-2 stack--scroll">
              {parts.map((p) => (
                <button key={p.id} type="button" className={`choice choice--tall${sel.partId === p.id ? ' is-on' : ''}`} aria-pressed={sel.partId === p.id} onClick={() => pickPart(sel.partId === p.id ? null : p.id, sel.category)}>
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
                {model && <span className="slip__code">{model.code ? `Code ${model.code}` : 'Model code to confirm'}</span>}
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
                {brand ? 'Pick a model' : 'Pick a company'}
              </span>
            )}
          </aside>
        </div>

        <div className="codebar">
          <span>Model code already pata hai?</span>
          <form className="codebar__form" onSubmit={onCodeSubmit}>
            <span className="codebar__k">Code</span>
            <input id="code-search" type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="SM-A546E, 2312DRAABI, A2633" aria-label="Model code" />
            <button type="submit" className="btn btn--cream btn--sm">
              Dhoondo
            </button>
          </form>
          <a href="#model-help" className="link-cream">
            Where is my model code?
          </a>
        </div>
        {codeResult && (
          <div className="codehits" role="status">
            {codeResult.hits.length === 0 ? (
              <span>
                No model found for "{codeResult.q}". Check the code in Settings &gt; About phone, or pick the company and model above.
              </span>
            ) : (
              <>
                <span>Did you mean:</span>
                {codeResult.hits.map((m) => (
                  <button
                    key={`${m.brandId}-${m.id}`}
                    type="button"
                    className="pill pill--cream"
                    onClick={() => {
                      pickBrand(m.brandId);
                      pickModel(m.id);
                      setCodeResult(null);
                    }}
                  >
                    {brandById(m.brandId)?.name} {m.name} {m.code && <small>· {m.code}</small>}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
