import { useEffect, useMemo } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CATEGORIES,
  SAMPLE_VARIANTS,
  brandById,
  formatPrice,
  modelById,
  partsForCategory,
  type CategoryId,
} from '../data/catalog';
import { Icon } from '../components/Icon';

export default function ModelPage() {
  const { brandId = '', modelId = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const brand = brandById(brandId);
  const model = modelById(modelId);

  const cat = (params.get('cat') === 'acc' ? 'acc' : 'parts') as CategoryId;
  const partId = params.get('part');
  const parts = partsForCategory(cat);
  const part = parts.find((p) => p.id === partId) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [brandId, modelId]);

  const variants = useMemo(() => {
    const ids = new Set(parts.map((p) => p.id));
    return SAMPLE_VARIANTS.filter((v) => ids.has(v.partId) && (!part || v.partId === part.id));
  }, [parts, part]);

  if (!brand || !model || model.brandId !== brand.id) return <Navigate to="/" replace />;

  const setCat = (c: CategoryId) => setParams({ cat: c });
  const setPart = (id: string | null) => setParams(id ? { cat, part: id } : { cat });
  const countFor = (id: string) => SAMPLE_VARIANTS.filter((v) => v.partId === id).length;

  return (
    <main>
      <div className="pinbar">
        <div className="container pinbar__inner">
          <span className="eyebrow eyebrow--tan">Aapka phone</span>
          <nav className="crumbs" aria-label="Your selection">
            <Link to="/" className="crumb">
              {brand.name}
            </Link>
            <Icon name="chevronRight" size={14} strokeWidth={3} />
            <Link to="/" className="crumb">
              {model.name} <span className="crumb__code">· {model.code}</span>
            </Link>
            <Icon name="chevronRight" size={14} strokeWidth={3} />
            <span className="crumb crumb--current">{part?.name ?? CATEGORIES[cat].name}</span>
          </nav>
          <Link to="/" className="link-tan">
            Change phone
          </Link>
        </div>
      </div>

      <div className="container model">
        <div className="model__head">
          <div>
            <h1 className="h1">{model.name} ke parts</h1>
            <p className="muted">
              Everything here has been checked against model code {model.code}. Regional variants are listed separately.
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
              <span className="rail__title">Kya kharab hai?</span>
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
            {cat === 'parts' && (part?.id === 'display' || !part) && (
              <>
                <div className="rail__group">
                  <span className="rail__title">Display type</span>
                  <label className="check">
                    <input type="checkbox" defaultChecked /> OLED (as shipped)
                  </label>
                  <label className="check">
                    <input type="checkbox" defaultChecked /> LCD (budget replacement)
                  </label>
                </div>
                <div className="rail__group">
                  <span className="rail__title">Frame</span>
                  <label className="check">
                    <input type="checkbox" defaultChecked /> With frame
                  </label>
                  <label className="check">
                    <input type="checkbox" defaultChecked /> Without frame
                  </label>
                </div>
              </>
            )}
            <div className="rail__group">
              <span className="rail__title">Availability</span>
              <label className="check">
                <input type="checkbox" defaultChecked /> In stock only
              </label>
            </div>
            <div className="note">
              <span className="note__title">OLED ya LCD?</span>
              <span className="note__text">
                An LCD replacement is cheaper but dimmer, with no always-on display. <a href="#oled-lcd">Read the difference</a>
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
                <select>
                  <option>Recommended</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </label>
            </div>

            <div className="grid-3">
              {variants.map((v, i) => (
                <motion.article
                  key={v.sku}
                  className="product"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
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
                    SKU {v.sku} · {v.fit === 'verified' ? `fits ${model.code}` : `supplier says ${model.code}`}
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
