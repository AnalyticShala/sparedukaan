// Catalogue data. This mirrors the starter import files in the project
// document (brands.csv, devices.csv, products.csv, variants.csv,
// compatibility.csv). Replace with real, verified data before launch.

export type CategoryId = 'parts' | 'acc';

export interface Brand {
  id: string;
  name: string;
}

export interface DeviceModel {
  id: string;
  brandId: string;
  name: string;
  code: string; // exact model code, e.g. SM-A546E
}

export interface PartType {
  id: string;
  category: CategoryId;
  name: string;
  hint: string;
  symptom?: string; // the problem the buyer notices, in their words
}

export type FitStatus = 'verified' | 'unverified' | 'incompatible';

export interface Variant {
  sku: string;
  partId: string;
  title: string;
  chips: string[];
  priceMinor: number | null; // INR paise; null = not yet set
  inStock: boolean;
  fit: FitStatus;
}

export const CATEGORIES: Record<CategoryId, { name: string; slipLabel: string }> = {
  parts: { name: 'Spare Parts', slipLabel: 'Spare part' },
  acc: { name: 'Accessories', slipLabel: 'Accessory' },
};

export const BRANDS: Brand[] = [
  { id: 'samsung', name: 'Samsung' },
  { id: 'xiaomi', name: 'Xiaomi' },
  { id: 'vivo', name: 'Vivo' },
  { id: 'oppo', name: 'Oppo' },
  { id: 'realme', name: 'Realme' },
  { id: 'apple', name: 'Apple' },
  { id: 'oneplus', name: 'OnePlus' },
  { id: 'motorola', name: 'Motorola' },
];

// Model codes are illustrative examples; verify every one against supplier data.
export const MODELS: DeviceModel[] = [
  { id: 'a54', brandId: 'samsung', name: 'Galaxy A54 5G', code: 'SM-A546E' },
  { id: 'm34', brandId: 'samsung', name: 'Galaxy M34 5G', code: 'SM-M346B' },
  { id: 's23', brandId: 'samsung', name: 'Galaxy S23', code: 'SM-S911B' },
  { id: 'a15', brandId: 'samsung', name: 'Galaxy A15', code: 'SM-A155F' },
  { id: 'rn13', brandId: 'xiaomi', name: 'Redmi Note 13', code: '2312DRAABI' },
  { id: 'rn12', brandId: 'xiaomi', name: 'Redmi Note 12', code: '23021RAAEG' },
  { id: 'r13c', brandId: 'xiaomi', name: 'Redmi 13C', code: '23100RN82I' },
  { id: 'y200', brandId: 'vivo', name: 'Vivo Y200', code: 'V2307' },
  { id: 't2', brandId: 'vivo', name: 'Vivo T2 5G', code: 'V2247' },
  { id: 'a78', brandId: 'oppo', name: 'Oppo A78', code: 'CPH2565' },
  { id: 'f25', brandId: 'oppo', name: 'Oppo F25 Pro', code: 'CPH2603' },
  { id: 'n60', brandId: 'realme', name: 'Realme Narzo 60', code: 'RMX3750' },
  { id: '11x', brandId: 'realme', name: 'Realme 11x', code: 'RMX3785' },
  { id: 'ip13', brandId: 'apple', name: 'iPhone 13', code: 'A2633' },
  { id: 'ip11', brandId: 'apple', name: 'iPhone 11', code: 'A2221' },
  { id: 'ip15', brandId: 'apple', name: 'iPhone 15', code: 'A3090' },
  { id: 'nce3', brandId: 'oneplus', name: 'OnePlus Nord CE 3', code: 'CPH2569' },
  { id: 'op11', brandId: 'oneplus', name: 'OnePlus 11', code: 'CPH2447' },
  { id: 'g54', brandId: 'motorola', name: 'Moto G54', code: 'XT2343-1' },
  { id: 'e13', brandId: 'motorola', name: 'Moto E13', code: 'XT2345-3' },
];

export const PART_TYPES: PartType[] = [
  { id: 'display', category: 'parts', name: 'Display', hint: 'OLED / LCD, frame', symptom: 'Screen toota' },
  { id: 'battery', category: 'parts', name: 'Battery', hint: 'with adhesive', symptom: 'Battery jaldi khatam' },
  { id: 'port', category: 'parts', name: 'Charging port', hint: 'flex / sub-board', symptom: 'Charge nahi hota' },
  { id: 'camera', category: 'parts', name: 'Cameras', hint: 'rear, front, lens', symptom: 'Camera dhundla' },
  { id: 'frame', category: 'parts', name: 'Frame and back panel', hint: 'body, glass back' },
  { id: 'speaker', category: 'parts', name: 'Speaker and mic', hint: 'ear, loud, mic' },
  { id: 'cover', category: 'acc', name: 'Covers', hint: 'cutouts matched' },
  { id: 'glass', category: 'acc', name: 'Tempered glass', hint: 'full / edge' },
  { id: 'charger', category: 'acc', name: 'Chargers', hint: 'wattage matched' },
  { id: 'cable', category: 'acc', name: 'Cables', hint: 'USB-C / Lightning' },
  { id: 'audio', category: 'acc', name: 'Earphones', hint: 'wired, TWS' },
  { id: 'holder', category: 'acc', name: 'Holders and stands', hint: 'car, desk' },
];

// Sample variants for the demo model page. In production these come from the
// commerce platform, keyed by SKU, with compatibility resolved per model code.
export const SAMPLE_VARIANTS: Variant[] = [
  { sku: 'SD-SCR-0412', partId: 'display', title: 'OLED display with frame', chips: ['OLED', 'Frame included', 'Black'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-SCR-0413', partId: 'display', title: 'OLED display, no frame', chips: ['OLED', 'Reuse your frame', 'Adhesive included'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-SCR-0420', partId: 'display', title: 'LCD display with frame', chips: ['LCD', 'Frame included', 'No always-on display'], priceMinor: null, inStock: true, fit: 'unverified' },
  { sku: 'SD-BAT-0097', partId: 'battery', title: 'Battery, 5000 mAh', chips: ['Adhesive strips', 'Connector rev. A'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-CHG-0211', partId: 'port', title: 'Charging port flex board', chips: ['USB-C', 'With microphone'], priceMinor: null, inStock: false, fit: 'verified' },
  { sku: 'SD-CAM-0140', partId: 'camera', title: 'Rear main camera module', chips: ['50 MP', 'OIS'], priceMinor: null, inStock: true, fit: 'unverified' },
  { sku: 'SD-FRM-0061', partId: 'frame', title: 'Back glass panel', chips: ['Glass', 'Awesome Graphite'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-SPK-0033', partId: 'speaker', title: 'Loudspeaker module', chips: ['Bottom'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-COV-0501', partId: 'cover', title: 'Silicone back cover', chips: ['Camera lip', 'Matte'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-COV-0502', partId: 'cover', title: 'Clear hard cover', chips: ['Anti-yellow'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-GLS-0301', partId: 'glass', title: 'Tempered glass, full cover', chips: ['9H', 'Edge to edge'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-CHR-0120', partId: 'charger', title: '25 W USB-C charger', chips: ['PD 3.0'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-CBL-0010', partId: 'cable', title: 'USB-C to USB-C cable, 1 m', chips: ['60 W'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-AUD-0007', partId: 'audio', title: 'Wired USB-C earphones', chips: ['In-line mic'], priceMinor: null, inStock: true, fit: 'verified' },
  { sku: 'SD-HLD-0002', partId: 'holder', title: 'Car vent holder', chips: ['Magnetic'], priceMinor: null, inStock: true, fit: 'verified' },
];

export const brandById = (id: string | null) => BRANDS.find((b) => b.id === id) ?? null;
export const modelById = (id: string | null) => MODELS.find((m) => m.id === id) ?? null;
export const modelsForBrand = (brandId: string | null) => MODELS.filter((m) => m.brandId === brandId);
export const partById = (id: string | null) => PART_TYPES.find((p) => p.id === id) ?? null;
export const partsForCategory = (cat: CategoryId) => PART_TYPES.filter((p) => p.category === cat);

export const formatPrice = (minor: number | null) =>
  minor === null ? 'Price on request' : `₹${(minor / 100).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
