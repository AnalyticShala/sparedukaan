import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { CategoryId } from '../data/catalog';

export interface Selection {
  brandId: string | null;
  modelId: string | null;
  category: CategoryId;
  partId: string | null;
  // 'phone' when the buyer started by clicking a part of the exploded phone
  startedFrom: 'phone' | 'counter' | null;
}

interface SelectionApi {
  sel: Selection;
  pickBrand: (brandId: string) => void;
  pickModel: (modelId: string) => void;
  pickCategory: (category: CategoryId) => void;
  pickPart: (partId: string | null, category: CategoryId, from?: Selection['startedFrom']) => void;
  reset: () => void;
}

const initial: Selection = { brandId: null, modelId: null, category: 'parts', partId: null, startedFrom: null };

const Ctx = createContext<SelectionApi | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [sel, setSel] = useState<Selection>(initial);

  const api = useMemo<SelectionApi>(
    () => ({
      sel,
      pickBrand: (brandId) => setSel((s) => ({ ...s, brandId, modelId: null, startedFrom: s.startedFrom ?? 'counter' })),
      pickModel: (modelId) => setSel((s) => ({ ...s, modelId })),
      pickCategory: (category) => setSel((s) => ({ ...s, category, partId: null })),
      pickPart: (partId, category, from = 'counter') => setSel((s) => ({ ...s, partId, category, startedFrom: s.startedFrom ?? from })),
      reset: () => setSel(initial),
    }),
    [sel],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useSelection(): SelectionApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useSelection must be used inside SelectionProvider');
  return v;
}
