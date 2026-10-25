import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, brandById, formatPrice, modelById, partsForModel, variantsForModel, type CategoryId } from '../data/catalog';
import { useSelection } from '../store/selection';
import { Icon } from '../components/Icon';

const AVAIL_COPY = {
  high: 'Parts for this model are widely stocked in India.',
  medium: 'Parts for this model are available; some may take a few days.',
  low: 'Limited parts for this model: mostly display and battery, often on order.',
} as const;

export default function ModelPage() {
  const { brandId = '', modelId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const { pickBrand, pickModel } = useSelection();
  const brand = brandById(brandId);
  const model = modelById(brandId, modelId);

  const cat = (params.get('cat') === 'acc' ? 'acc' : 'parts') as CategoryId;
  const partId = params.get('part');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (model) {
      pickBrand(model.brandId);
      pickModel(model.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandId, modelId]);

  const parts = useMemo(() => (model ? partsForModel(model, cat) : []), [model, cat]);
  const part = parts.find((p) => p.id === partId) ?? null;
  const variants = useMemo(() => {
    if (!model) return [];
    const list = part ? [part] : parts;
    return list.flatMap((p) => variantsForModel(model, p.id));
  }, [model, parts, part]);

  if (!brand || !model) return <Navigate to="/" replace />;

  const setCat = (c: CategoryId) => setParams({ cat: c });
  const setPart = (id: string | null) => setParams(id ? { cat, part: id } : { cat });
  const countFor = (id: string) => variantsForModel(model, id).length;
  const codeText = model.code || 'model code to be confirmed';

  return (
    <main>
      <div className="pinbar">
        <div className="container pinbar__inner">
          <span className="eyebrow eyebrow--tan">Aapka phone</span>
          <nav className="crumbs" aria-label="Your selection">
            <Link to="/#counter" className="crumb">
              {brand.name}
            </Link>
            <Icon name="chevronRight" size={14} strokeWidth={3} />
            <Link to="/#counter" className="crumb">
              {model.name} <span className="crumb__code">· {model.code || 'code?'}</span>
            </Link>
            <Icon name="chevronRight" size={14} strokeWidth={3} />
            <span className="crumb crumb--current">{part?.name ?? CATEGORIES[cat].name}</span>
          </nav>
          <Link to="/#counter" className="link-tan">
            Change phone
          </Link>
        </div>
      </div>

      <div className="container model">
        <div className="model__head">
          <div>
            <h1 className="h1">{model.name} ke parts</h1>
            <p className="muted">
              {model.year} · {model.display} display · {model.port} · {model.battery ? `${model.battery.toLocaleString('en-IN')} mAh` : 'battery to confirm'}. {AVAIL_COPY[model.avail]}
              {model.code ? ` Listed against model code ${model.code}; regional variants may differ.` : ' Confirm the exact model code in Settings > About phone before ordering.'}
            </p>
          </div>
          <div className="segmented segmented--lg" role="tablist" aria-label="Category">
            {(Object.keys(CATEGORIES) as CategoryId[]).map((c) => (
              <button key={c} type="button" role="tab" aria-selected={cat === c} className={cat === c ? 'is-on' : ''} onClick={() => setCat(c)}>
                {CATEGORIES[c].name}
              </button>
            ))}
          </div>
        </div>

        <div className="model__body">
          <aside className="rail">
            <div className="rail__group">
              <span className="rail__title">{cat === 'parts' ? 'Kya kharab hai?' : 'Kya chahiye?'}</span>
              <nav className="rail__nav" aria-label="Part type">
                <button type="button" className={`rail__item${!part ? ' is-on' : ''}`} onClick={() => setPart(null)}>
                  <span>All {CATEGORIES[cat].name.toLowerCase()}</span>
                </button>
                {parts.map((p) => (
                  <button key={p.id} type="button" className={`rail__item${part?.id === p.id ? ' is-on' : ''}`} onClick={() => setPart(p.id)}>
                    <span>{p.name}</span>
                    <span className="rail__count">{countFor(p.id)}</span>
                  </button>
                ))}
              </nav>
            </div>
            {cat === 'parts' && (!part || part.id === 'display') && model.type === 'smartphone' && (
              <div className="rail__group">
                <span className="rail__title">Frame</span>
                <label className="check">
                  <input id="f-with" type="checkbox" defaultChecked /> With frame
                </label>
                <label className="check">
                  <input id="f-without" type="checkbox" defaultChecked /> Without frame
                </label>
              </div>
            )}
            <div className="rail__group">
              <span className="rail__title">Availability</span>
              <label className="check">
                <input id="f-stock" type="checkbox" defaultChecked /> In stock only
              </label>
            </div>
            <div className="note">
              <span className="note__title">{model.display === 'OLED' ? 'OLED ya LCD?' : 'LCD display'}</span>
              <span className="note__text">
                {model.display === 'OLED'
                  ? 'This phone shipped with an OLED panel. An LCD replacement is cheaper but dimmer, with no always-on display.'
                  : 'This phone shipped with an LCD panel. Match the panel type on the replacement.'}{' '}
                <a href="#oled-lcd">Read the difference</a>
              </span>
            </div>
          </aside>

          <section className="results">
            <div className="results__bar">
              <span className="muted">
                {variants.length} {part ? part.name.toLowerCase() : CATEGORIES[cat].name.toLowerCase()} for {model.name}
              </span>
              <label className="sort">
                Sort
                <select id="sort">
                  <option>Recommended</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </label>
            </div>

            <div className="grid-3">
              {variants.map((v, i) => (
                <motion.article key={v.sku} className="product" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: Math.min(i, 12) * 0.03 }}>
                  <div className="product__media">
                    <span className="product__placeholder">[PRODUCT PHOTO]</span>
                    {v.fit === 'verified' ? (
                      <span className="badge badge--verified">
                        <Icon name="check" size={12} strokeWidth={3} /> Verified fit
                      </span>
                    ) : (
                      <span className="badge badge--review">
                        <Icon name="info" size={12} strokeWidth={3} /> Fit under review
                      </span>
                    )}
                  </div>
                  <span className="product__title">{v.title}</span>
                  <span className="product__sku">
                    SKU {v.sku} · {v.fit === 'verified' ? `fits ${codeText}` : `for ${model.name} (${codeText})`}
                  </span>
                  <ul className="chips">
                    {v.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <div className="product__foot">
                    <div className="product__price">
                      <span>{formatPrice(v.priceMinor)}</span>
                      <small className={v.inStock ? 'ok' : 'muted'}>{v.fit !== 'verified' ? 'Ask us to confirm fit' : v.inStock ? 'In stock' : 'Out of stock'}</small>
                    </div>
                    {v.fit === 'verified' ? (
                      <button type="button" className="btn btn--primary btn--sm" disabled={!v.inStock}>
                        Add to cart
                      </button>
                    ) : (
                      <a href="#ask" className="btn btn--outline btn--sm">
                        Poocho
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="askbar">
              <span className="trust__icon">
                <Icon name="chat" size={22} />
              </span>
              <div className="askbar__copy">
                <span className="askbar__title">Sure nahi ho? Photo bhejo.</span>
                <span className="askbar__text">Send a photo of your old part's flex connector or your About-phone screen. We confirm the right SKU before you pay.</span>
              </div>
              <a href="#whatsapp" className="btn btn--cream">
                Ask on [SUPPORT CHANNEL]
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
