const { chromium } = require('playwright');
const fs = require('fs');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.env.QA_BASE || 'http://localhost:4173';
const results = [];
const ok = (name, pass, detail = '') => results.push({ name, pass, detail });

async function scrollHero(p, n = 11) {
  for (let i = 0; i < n; i++) { await p.mouse.wheel(0, 150); await p.waitForTimeout(80); }
  await p.waitForTimeout(1500);
}

async function axe(p, label) {
  await p.addScriptTag({ content: AXE });
  const r = await p.evaluate(async () => {
    const res = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'best-practice'] });
    return res.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) , count: v.nodes.length }));
  });
  ok(`axe ${label}`, r.filter((v) => v.impact === 'critical' || v.impact === 'serious').length === 0, JSON.stringify(r));
  return r;
}

(async () => {
  const browser = await chromium.launch();

  // ---------- Desktop ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const errors = []; p.on('pageerror', (e) => errors.push('pageerror: ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
    const failed = []; p.on('requestfailed', (r) => failed.push(r.url()));
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    ok('home loads', (await p.title()) === 'SpareDukaan');
    ok('fonts self-hosted (no google fonts requests)', !(await p.evaluate(() => performance.getEntriesByType('resource').some((r) => r.name.includes('fonts.g')))));
    const hintVisible = await p.locator('.hero__hint').evaluate((el) => { const r = el.getBoundingClientRect(); return r.bottom <= window.innerHeight && getComputedStyle(el).opacity === '1'; });
    ok('scroll hint visible at rest', hintVisible);
    // layer count
    ok('14 phone layers rendered', (await p.locator('.layer3d').count()) === 14);
    // scroll performance: measure long frames during explosion
    const longFrames = await p.evaluate(async () => {
      let frames = 0, long = 0, last = performance.now();
      const tick = (t) => { if (t - last > 34) long++; frames++; last = t; if (frames < 90) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      for (let i = 0; i < 10; i++) { window.scrollBy(0, 150); await new Promise((r) => setTimeout(r, 90)); }
      await new Promise((r) => setTimeout(r, 700));
      return { frames, long };
    });
    ok('scroll explosion: no more than 5 frames over 34ms', longFrames.long <= 5, JSON.stringify(longFrames));
    await p.waitForTimeout(800);
    const exploded = await p.locator('.plabels').evaluate((el) => getComputedStyle(el).opacity);
    ok('labels visible when exploded', Number(exploded) > 0.9, `opacity ${exploded}`);
    const labels = await p.locator('.plabel__chip').allTextContents();
    ok('all 14 labels present', labels.length === 14, labels.join(' | '));
    // label overlap check
    const boxes = await p.locator('.plabel__chip').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }));
    let overlaps = 0;
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const a = boxes[i], b = boxes[j]; if (a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3]) overlaps++; }
    ok('no overlapping labels', overlaps === 0, `${overlaps} overlaps`);
    const inside = boxes.every((b) => b[0] >= 0 && b[2] <= 1440 && b[1] >= 72 && b[3] <= 900);
    ok('labels inside viewport', inside);
    // hero text changed
    ok('hero headline switches to Kya kharab hai?', (await p.locator('.hero__title').textContent()).includes('Kya kharab hai'));
    // click a part's label -> counter (the battery itself is partly behind the display)
    await p.locator('.plabel__btn', { hasText: 'Battery' }).click();
    await p.waitForTimeout(1800);
    const slip = await p.locator('.slip__row--last .slip__v').textContent();
    ok('clicking Battery pre-fills slip', slip.trim() === 'Battery', slip);
    const counterTop = await p.locator('#counter').evaluate((el) => el.getBoundingClientRect().top);
    ok('counter scrolled into view below header', counterTop > 60 && counterTop < 140, `top=${counterTop}`);
    ok('counter heading adapts', (await p.locator('.counter__title').textContent()).includes('Ab company'));
    // counter flow
    await p.getByRole('button', { name: 'Samsung', exact: true }).first().click();
    ok('models appear after brand (Samsung has 100+)', (await p.locator('.choice--row').count()) > 100, String(await p.locator('.choice--row').count()));
    await p.locator('#model-search').fill('a54'); await p.waitForTimeout(400);
    ok('model search filters', (await p.locator('.choice--row').count()) === 1);
    await p.locator('.choice--row').first().click();
    const cta = await p.locator('.slip a.btn').textContent().catch(() => '');
    ok('Dikhao enabled after model', cta.includes('Dikhao'));
    // tabs
    await p.getByRole('tab', { name: 'Accessories' }).click();
    ok('accessories tab shows 9 part types', (await p.locator('.counter__col .choice--tall').count()) === 9);
    ok('switching category clears part', (await p.locator('.slip__row--last .slip__v').textContent()).includes('All accessories'));
    await p.getByRole('tab', { name: 'Spare Parts' }).click();
    ok('spare parts tab shows 20 part types', (await p.locator('.counter__col .choice--tall').count()) === 20);
    await p.locator('.counter__col .choice--tall', { hasText: 'Display assembly' }).click();
    await p.locator('.slip a.btn').click();
    await p.waitForURL(/\/parts\/samsung\/galaxy-a54-5g/);
    ok('navigates to model page with query', p.url().includes('cat=parts') && p.url().includes('part=display'), p.url());
    ok('model page scrolled to top', (await p.evaluate(() => window.scrollY)) < 5);
    ok('pinned bar shows code', (await p.locator('.crumbs').textContent()).includes('SM-A546E'));
    ok('rail highlights display', (await p.locator('.rail__item.is-on').textContent()).includes('Display'));
    ok('2 display variants (with / without frame)', (await p.locator('.product').count()) === 2);
    ok('every product shows a fit badge', (await p.locator('.badge').count()) === (await p.locator('.product').count()));
    await p.getByRole('tab', { name: 'Accessories' }).click();
    ok('accessories tab on model page lists products', (await p.locator('.product').count()) >= 5);
    await p.locator('.rail__item', { hasText: 'Tempered glass' }).click();
    ok('rail filter narrows', (await p.locator('.product').count()) === 2);
    // every part type has at least one product
    const emptyTypes = await p.evaluate(() => {
      const items = [...document.querySelectorAll('.rail__item')].slice(1);
      return items.filter((i) => i.querySelector('.rail__count')?.textContent === '0').map((i) => i.textContent.trim());
    });
    ok('no accessory type without sample product', emptyTypes.length === 0, emptyTypes.join(', '));
    await p.getByRole('tab', { name: 'Spare Parts' }).click();
    const emptyParts = await p.evaluate(() => [...document.querySelectorAll('.rail__item')].slice(1).filter((i) => i.querySelector('.rail__count')?.textContent === '0').map((i) => i.textContent.trim()));
    ok('no spare part type without sample product', emptyParts.length === 0, emptyParts.join(', '));
    // change phone keeps state
    await p.locator('text=Change phone').click();
    await p.waitForURL(/\/(#counter)?$/);
    ok('change phone returns home', new URL(p.url()).pathname === '/');
    const keptBrand = await p.locator('.slip__row').first().textContent();
    ok('selection kept after returning', keptBrand.includes('Samsung'), keptBrand);
    // bad url
    await p.goto(BASE + '/parts/samsung/nope');
    await p.waitForTimeout(500);
    ok('bad model url redirects home', new URL(p.url()).pathname === '/');
    await p.goto(BASE + '/parts/apple/a54');
    await p.waitForTimeout(500);
    ok('mismatched brand/model redirects home', new URL(p.url()).pathname === '/');
    // keyboard: tab to first layer and press enter
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await scrollHero(p);
    let focusedLayer = false;
    for (let i = 0; i < 12; i++) { await p.keyboard.press('Tab'); if (await p.evaluate(() => document.activeElement?.classList.contains('layer3d'))) { focusedLayer = true; break; } }
    ok('phone layers reachable by keyboard', focusedLayer);
    if (focusedLayer) { await p.keyboard.press('Enter'); await p.waitForTimeout(1500); ok('Enter on a layer selects it', (await p.locator('.slip__row--last .slip__v').textContent()).trim() !== 'All spare parts'); }
    // drag does not select
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await scrollHero(p);
    await p.mouse.move(700, 500); await p.mouse.down(); for (let i = 1; i <= 10; i++) { await p.mouse.move(700 + i * 15, 500); await p.waitForTimeout(16); } await p.mouse.up();
    await p.waitForTimeout(600);
    ok('drag does not select a part', (await p.locator('.slip__row--last .slip__v').textContent()).includes('All spare parts'));
    ok('drag rotates (rotateZ changed)', await p.locator('.phone3d').evaluate((el) => !el.style.transform.includes('rotateZ(-24deg)')), await p.locator('.phone3d').evaluate((el) => el.style.transform));
    // symptom card -> counter
    await p.locator('.card--symptom').first().click(); await p.waitForTimeout(1500);
    ok('symptom card selects display', (await p.locator('.slip__row--last .slip__v').textContent()).includes('Display'));
    // model-code search navigates
    await p.locator('#code-search').fill('sm-a546e'); await p.locator('.codebar__form button').click();
    await p.waitForURL(/\/parts\/samsung\/galaxy-a54-5g/); ok('model-code search finds Galaxy A54 5G', p.url().includes('galaxy-a54-5g'));
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p.locator('#code-search').fill('zzz999'); await p.locator('.codebar__form button').click(); await p.waitForTimeout(300);
    ok('unknown code shows a message', (await p.locator('.codehits').textContent()).includes('No model found'));
    ok('top 8 brands shown by default', (await p.locator('.brands .choice').count()) === 8);
    await p.locator('.linkbtn').click();
    ok('all 25 brands after toggle', (await p.locator('.brands .choice').count()) === 25);
    await p.locator('#brand-search').fill('lava');
    ok('brand search filters', (await p.locator('.brands .choice').count()) === 1);
    await p.locator('#brand-search').fill('');
    // a feature phone has no front camera part
    await p.goto(BASE + '/parts/jio/jiophone-prima-4g?cat=parts', { waitUntil: 'networkidle' });
    ok('feature phone omits smartphone-only parts', !(await p.locator('.rail').textContent()).includes('Front camera'));
    await p.goto(BASE + '/parts/apple/iphone-15?cat=parts', { waitUntil: 'networkidle' });
    ok('iPhone 15 lists wireless coil', (await p.locator('.rail').textContent()).includes('Wireless charging coil'));
    await p.goto(BASE + '/parts/apple/iphone-15?cat=acc&part=cable', { waitUntil: 'networkidle' });
    ok('iPhone 15 cable is USB-C', (await p.locator('.product__title').first().textContent()).includes('USB-C to USB-C'));
    await p.goto(BASE + '/parts/apple/iphone-13?cat=acc&part=cable', { waitUntil: 'networkidle' });
    ok('iPhone 13 cable is Lightning', (await p.locator('.product__title').first().textContent()).includes('Lightning'));
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    // axe
    const v1 = await axe(p, 'home');
    await p.goto(BASE + '/parts/samsung/galaxy-a54-5g?cat=parts&part=display', { waitUntil: 'networkidle' });
    const v2 = await axe(p, 'model page');
    fs.writeFileSync('qa/axe.json', JSON.stringify({ home: v1, model: v2 }, null, 2));
    ok('no JS/console errors (desktop)', errors.length === 0, errors.join('\n'));
    ok('no failed requests', failed.length === 0, failed.join('\n'));
    await ctx.close();
  }

  // ---------- Tablet ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const p = await ctx.newPage();
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    const hs = await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    ok('tablet: no horizontal scroll', hs);
    await scrollHero(p, 9);
    const boxes = await p.locator('.plabel__chip').evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom]; }));
    ok('tablet: labels inside viewport', boxes.every((b) => b[0] >= 0 && b[2] <= 1024), JSON.stringify(boxes.filter((b) => b[0] < 0 || b[2] > 1024)));
    await p.screenshot({ path: 'qa/shots/qa-tablet.png' });
    await ctx.close();
  }

  // ---------- Mobile ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    const p = await ctx.newPage();
    const errors = []; p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    ok('mobile: no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth));
    const phoneBox = await p.locator('.phone3d__scene').boundingBox();
    ok('mobile: phone fits viewport width', phoneBox && phoneBox.x >= 0 && phoneBox.x + phoneBox.width <= 390, JSON.stringify(phoneBox));
    await p.screenshot({ path: 'qa/shots/qa-mobile-0.png' });
    await p.evaluate(async () => { for (let i = 0; i < 12; i++) { window.scrollBy(0, 120); await new Promise((r) => setTimeout(r, 80)); } });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: 'qa/shots/qa-mobile-1.png' });
    const clipped = await p.locator('.layer3d').evaluateAll((els) => els.map((e) => e.getBoundingClientRect()).filter((r) => r.left < -20 || r.right > 410).length);
    ok('mobile: exploded parts stay within the screen', clipped === 0, `${clipped} layers clipped`);
    ok('mobile: labels hidden', await p.locator('.plabels').evaluate((el) => getComputedStyle(el).display === 'none'));
    await p.locator('button[aria-label^="Display"]').first().tap({ force: true });
    await p.waitForTimeout(1500);
    ok('mobile: tap selects a part', !(await p.locator('.slip__row--last .slip__v').textContent()).includes('All '), await p.locator('.slip__row--last .slip__v').textContent());
    await p.screenshot({ path: 'qa/shots/qa-mobile-2.png' });
    const slipBox = await p.locator('.slip').boundingBox();
    ok('mobile: counter card fits', slipBox && slipBox.x + slipBox.width <= 390, JSON.stringify(slipBox));
    const smallTargets = await p.evaluate(() => [...document.querySelectorAll('a,button')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 32; }).map((e) => (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30)));
    ok('mobile: tap targets at least 32px tall', smallTargets.length === 0, smallTargets.join(' | '));
    await p.goto(BASE + '/parts/samsung/galaxy-a54-5g?cat=parts', { waitUntil: 'networkidle' });
    await p.screenshot({ path: 'qa/shots/qa-mobile-3.png', fullPage: false });
    ok('mobile model page: no horizontal scroll', await p.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), await p.evaluate(() => document.documentElement.scrollWidth));
    ok('mobile: no JS errors', errors.length === 0, errors.join('\n'));
    await ctx.close();
  }

  // ---------- Reduced motion ----------
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const p = await ctx.newPage();
    const errors = []; p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(BASE + '/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    ok('reduced motion: labels shown without scrolling', Number(await p.locator('.plabels').evaluate((el) => getComputedStyle(el).opacity)) > 0.9);
    ok('reduced motion: headline already Kya kharab hai?', (await p.locator('.hero__title').textContent()).includes('Kya kharab'));
    ok('reduced motion: no errors', errors.length === 0, errors.join('\n'));
    await p.screenshot({ path: 'qa/shots/qa-reduced.png' });
    await ctx.close();
  }

  await browser.close();
  const pass = results.filter((r) => r.pass).length;
  console.log(`\n${pass}/${results.length} passed\n`);
  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.pass ? '' : '  -> ' + r.detail}`);
  fs.writeFileSync('qa/results.json', JSON.stringify(results, null, 2));
})();
