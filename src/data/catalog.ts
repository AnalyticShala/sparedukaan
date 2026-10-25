// Catalogue for the India storefront. Brands, models and part types come from
// data/source/models.py (regenerated into src/data/generated/*.json). The
// parts that apply to a model, and the suggested variant for each, are derived
// here from the model's attributes. Every fit is "unverified" until the
// catalogue manager records evidence; prices are not set yet.

import brandsJson from './generated/brands.json';
import modelsJson from './generated/models.json';
import partTypesJson from './generated/partTypes.json';

export type CategoryId = 'parts' | 'acc';

export interface Brand {
  id: string;
  name: string;
  status: 'active' | 'legacy';
  note: string;
}

export interface DeviceModel {
  id: string;
  brandId: string;
  name: string;
  year: number;
  code: string; // exact model code where known; '' = unknown
  type: 'smartphone' | 'feature';
  display: 'OLED' | 'LCD';
  battery: number | null;
  port: 'USB-C' | 'Micro-USB' | 'Lightning';
  back: string;
  wireless: boolean;
  fp: 'in-display' | 'side' | 'rear' | 'front' | 'face' | 'none';
  avail: 'high' | 'medium' | 'low';
}

export interface PartType {
  id: string;
  category: CategoryId;
  name: string;
  applies: 'all' | 'smartphone' | 'fp' | 'wireless' | 'nfc-only';
  notes: string;
  hint: string; // one short line for the counter tiles
  symptom?: string;
}

export type FitStatus = 'verified' | 'unverified' | 'incompatible';

export interface Variant {
  sku: string;
  partId: string;
  title: string;
  chips: string[];
  priceMinor: number | null;
  inStock: boolean;
  fit: FitStatus;
}

export const CATEGORIES: Record<CategoryId, { name: string; slipLabel: string }> = {
  parts: { name: 'Spare Parts', slipLabel: 'Spare part' },
  acc: { name: 'Accessories', slipLabel: 'Accessory' },
};

export const BRANDS = brandsJson as Brand[];
export const MODELS = modelsJson as DeviceModel[];

const SYMPTOMS: Record<string, string> = {
  display: 'Screen toota',
  battery: 'Battery jaldi khatam',
  port: 'Charge nahi hota',
  camera: 'Camera dhundla',
};
const HINTS: Record<string, string> = {
  display: 'OLED / LCD, frame',
  adhesive: 'foam gasket / glue',
  frame: 'body, button flex',
  simtray: 'single / dual / hybrid',
  buttons: 'power, volume flex',
  frontcam: 'selfie camera',
  earpiece: 'top speaker',
  board: 'by RAM / storage',
  camera: 'main, wide, macro',
  lens: 'camera glass',
  battery: 'with adhesive',
  port: 'USB-C / Micro / Lightning',
  speaker: 'bottom speaker',
  haptic: 'haptic engine',
  fpsensor: 'rear / side / in-display',
  coil: 'charging coil, antenna',
  nfc: 'antenna only',
  backpanel: 'rear glass, adhesive',
  flex: 'board to sub-board',
  proximity: 'sensor flex',
  glass: 'full, matte, privacy',
  cover: 'silicone, hard, flip',
  lensprotector: 'camera ring glass',
  charger: 'wattage matched',
  cable: 'USB-C / Lightning',
  audio: 'wired, TWS',
  holder: 'car, desk',
  powerbank: 'by capacity',
  skin: 'vinyl wrap',
};
export const PART_TYPES: PartType[] = (partTypesJson as Omit<PartType, 'symptom' | 'hint'>[]).map((p) => ({ ...p, hint: HINTS[p.id] ?? '', symptom: SYMPTOMS[p.id] }));

// Brands shown first in the counter: the ones with the most repair volume in India.
export const TOP_BRAND_IDS = ['samsung', 'xiaomi', 'vivo', 'oppo', 'realme', 'oneplus', 'apple', 'motorola'];

export const brandById = (id: string | null) => BRANDS.find((b) => b.id === id) ?? null;
export const modelById = (brandId: string | null, id: string | null) => MODELS.find((m) => m.brandId === brandId && m.id === id) ?? null;
export const modelsForBrand = (brandId: string | null) =>
  MODELS.filter((m) => m.brandId === brandId).sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
export const partById = (id: string | null) => PART_TYPES.find((p) => p.id === id) ?? null;
export const partsForCategory = (cat: CategoryId) => PART_TYPES.filter((p) => p.category === cat);

export function partApplies(p: PartType, m: DeviceModel): boolean {
  const sp = m.type === 'smartphone';
  switch (p.applies) {
    case 'all':
      return true;
    case 'smartphone':
      return sp;
    case 'fp':
      return m.fp === 'rear' || m.fp === 'side' || m.fp === 'in-display';
    case 'wireless':
      return m.wireless;
    case 'nfc-only':
      return sp && !m.wireless && m.display === 'OLED';
  }
}

export const partsForModel = (m: DeviceModel, cat?: CategoryId) =>
  PART_TYPES.filter((p) => (!cat || p.category === cat) && partApplies(p, m));

const CABLE: Record<DeviceModel['port'], string> = {
  'USB-C': 'USB-C to USB-C cable',
  'Micro-USB': 'USB-A to Micro-USB cable',
  Lightning: 'USB-C to Lightning cable',
};

const skuFor = (m: DeviceModel, partId: string, suffix = '') =>
  `SD-${partId.toUpperCase().slice(0, 4)}-${m.brandId.slice(0, 3).toUpperCase()}-${m.id.replace(/[^a-z0-9]/g, '').slice(-6).toUpperCase()}${suffix}`;

// The sellable variants we expect to list for a model and part type. Supplier
// data will replace these; the shapes stay the same.
export function variantsForModel(m: DeviceModel, partId: string): Variant[] {
  const base = { partId, priceMinor: null, inStock: true, fit: 'unverified' as FitStatus };
  const metal = m.back === 'glass' || m.back === 'metal' || m.back === 'ceramic';
  switch (partId) {
    case 'display':
      return m.type === 'smartphone'
        ? [
            { ...base, sku: skuFor(m, partId, '-F'), title: `${m.display} display assembly with frame`, chips: [m.display, 'Frame included'] },
            { ...base, sku: skuFor(m, partId, '-N'), title: `${m.display} display assembly, no frame`, chips: [m.display, 'Reuse your frame', 'Adhesive included'] },
          ]
        : [{ ...base, sku: skuFor(m, partId), title: `${m.display} display`, chips: [m.display] }];
    case 'battery':
      return [{ ...base, sku: skuFor(m, partId), title: m.battery ? `Battery, ${m.battery.toLocaleString('en-IN')} mAh` : 'Battery', chips: ['Adhesive strips included'] }];
    case 'port':
      return [{ ...base, sku: skuFor(m, partId), title: `${m.port} charging port sub-board`, chips: [m.port, 'With microphone'] }];
    case 'fpsensor':
      return [{ ...base, sku: skuFor(m, partId), title: { rear: 'Rear fingerprint sensor flex', side: 'Side-key fingerprint flex', 'in-display': 'In-display fingerprint sensor' }[m.fp as 'rear' | 'side' | 'in-display'], chips: [m.fp] }];
    case 'backpanel':
      return [{ ...base, sku: skuFor(m, partId), title: `${m.back[0].toUpperCase() + m.back.slice(1)} back panel`, chips: [m.back, 'Adhesive included'] }];
    case 'frame':
      return [{ ...base, sku: skuFor(m, partId), title: `${metal ? 'Metal' : 'Plastic'} mid-frame`, chips: ['Button flex included', 'SIM tray separate'] }];
    case 'camera':
      return [{ ...base, sku: skuFor(m, partId), title: 'Rear camera module', chips: ['Main camera'] }];
    case 'coil':
      return [{ ...base, sku: skuFor(m, partId), title: 'Wireless charging coil with NFC', chips: ['Adhesive backed'] }];
    case 'nfc':
      return [{ ...base, sku: skuFor(m, partId), title: 'NFC antenna', chips: ['Confirm NFC on this model'] }];
    case 'cable':
      return [{ ...base, sku: skuFor(m, partId), title: CABLE[m.port], chips: ['1 m'] }];
    case 'charger':
      return [{ ...base, sku: skuFor(m, partId), title: `${m.port} charger adapter`, chips: ['Wattage matched to phone'] }];
    case 'cover':
      return [
        { ...base, sku: skuFor(m, partId, '-S'), title: 'Silicone back case', chips: ['Camera lip', 'Matte'] },
        { ...base, sku: skuFor(m, partId, '-C'), title: 'Clear hard case', chips: ['Anti-yellow'] },
        { ...base, sku: skuFor(m, partId, '-W'), title: 'Flip wallet case', chips: ['Card slots'] },
      ];
    case 'glass':
      return [
        { ...base, sku: skuFor(m, partId, '-F'), title: 'Tempered glass, full cover', chips: ['9H', 'Edge to edge'] },
        { ...base, sku: skuFor(m, partId, '-P'), title: 'Tempered glass, privacy', chips: ['9H', 'Privacy'] },
      ];
    case 'lensprotector':
      return [{ ...base, sku: skuFor(m, partId), title: 'Camera lens protector', chips: ['Tempered glass ring'] }];
    case 'audio':
      return [{ ...base, sku: skuFor(m, partId), title: m.port === 'Lightning' ? 'Wired Lightning earphones' : 'Wired earphones', chips: ['In-line mic'] }];
    default: {
      const p = partById(partId);
      return p ? [{ ...base, sku: skuFor(m, partId), title: p.name, chips: [] }] : [];
    }
  }
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// Exact-code lookup for the "model code already pata hai?" box. Returns all
// models sharing the code (regional variants can share one), or by name.
export function findByCode(query: string): DeviceModel[] {
  const q = norm(query);
  if (q.length < 3) return [];
  const byCode = MODELS.filter((m) => m.code && norm(m.code) === q);
  if (byCode.length) return byCode;
  const partial = MODELS.filter((m) => m.code && norm(m.code).includes(q));
  if (partial.length) return partial.slice(0, 8);
  return MODELS.filter((m) => norm(m.name).includes(q)).slice(0, 8);
}

export const formatPrice = (minor: number | null) =>
  minor === null ? 'Price on request' : `₹${(minor / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
