import ExplodedPhone from '../components/ExplodedPhone';
import Counter from '../components/Counter';
import { BrandWall, CategoryPanels, SymptomCards, TrustStrip } from '../components/HomeSections';

export default function Home() {
  return (
    <main>
      <ExplodedPhone />
      <Counter />
      <SymptomCards />
      <CategoryPanels />
      <div id="brands">
        <BrandWall />
      </div>
      <TrustStrip />
    </main>
  );
}
