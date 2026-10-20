import type { ProjectCategory } from '../content/projects';
import { tx } from '../i18n';

/** Numbered callouts of the system drawing; the legend is rendered as HTML text. */
export const SYSTEM_CALLOUTS: { title: string; text: string; tone: 'heat' | 'air' }[] = tx([
  { title: 'Ջերմային պոմպ', text: 'Արտաքին բլոկը վերցնում է ջերմությունը արտաքին օդից և տաքացնում ջեռուցման ջուրը։', tone: 'heat' },
  { title: 'Օդափոխման կայանք ռեկուպերատորով', text: 'Մաքուր օդ է մատակարարում և արտածվող օդից վերադարձնում ջերմության մեծ մասը։', tone: 'air' },
  { title: 'Օդատարներ', text: 'Ուղղաձիգ և հորիզոնական ցանց, որով օդը հասնում է յուրաքանչյուր հարկ։', tone: 'air' },
  { title: 'Ներհոսքային օդաբաշխիչներ', text: 'Օդը բաշխում են սենյակում հավասարաչափ՝ առանց միջանցիկ քամու։', tone: 'air' },
  { title: 'Տաք հատակ', text: 'Ցածր ջերմաստիճանի ջեռուցում, որը լավ է աշխատում ջերմային պոմպի հետ։', tone: 'heat' },
], [
  { title: 'Heat pump', text: 'The outdoor unit takes heat from the outside air and warms the heating water.', tone: 'heat' },
  { title: 'Ventilation unit with heat recovery', text: 'Supplies fresh air and recovers most of the heat from the extracted air.', tone: 'air' },
  { title: 'Ductwork', text: 'A vertical and horizontal network that carries air to every floor.', tone: 'air' },
  { title: 'Supply air diffusers', text: 'Spread the air evenly through the room, without draughts.', tone: 'air' },
  { title: 'Underfloor heating', text: 'Low-temperature heating that works well with a heat pump.', tone: 'heat' },
]);

/**
 * System drawing: schematic building section with rooftop heat pump, air-handling unit,
 * vertical shaft, supply ducts with diffusers and underfloor heating.
 * Heat is drawn in the logo's red, air in the logo's blue. Labels live in an HTML
 * legend (numbered callouts) so they stay readable at any size.
 */
export function systemDrawing(): string {
  const floors = [178, 318, 458];
  const xs = [390, 530, 670, 810];
  let diffusers = '';
  let flows = '';
  for (const y of floors) {
    for (const x of xs) {
      diffusers += `<path class="d-diff" d="M${x - 14} ${y}h28l-6 7h-16z"/>`;
      flows += `<path class="d-flow" d="M${x - 6} ${y + 10}q-14 32 -28 62"/><path class="d-flow" d="M${x + 6} ${y + 10}q14 32 28 62"/><path class="d-flow d-flow--c" d="M${x} ${y + 12}v58"/>`;
    }
  }
  let loops = '';
  for (const y of [272, 412, 552]) {
    let d = `M290 ${y}`;
    for (let x = 290; x < 870; x += 20) d += ' q5 -5 10 0 q5 5 10 0';
    loops += `<path class="d-heat d-loop" d="${d}"/>`;
  }
  // [n, cx, cy, leader path]
  const callouts: [number, number, number, string][] = [
    [1, 290, 78, 'M306 86L330 98'],
    [2, 950, 64, 'M932 70L900 86'],
    [3, 972, 262, 'M954 262H916'],
    [4, 600, 368, 'M600 350V326'],
    [5, 600, 512, 'M600 530V546'],
  ];
  const calls = callouts
    .map(([n, cx, cy, d]) => {
      const c = SYSTEM_CALLOUTS[n - 1];
      return `<path class="d-lead d-lead--${c.tone}" d="${d}"/><g class="d-call d-call--${c.tone}"><title>${n}. ${c.title}</title><circle cx="${cx}" cy="${cy}" r="18"/><text x="${cx}" y="${cy + 6.5}" text-anchor="middle">${n}</text></g>`;
    })
    .join('');

  return `
<svg class="dwg" focusable="false" viewBox="190 40 830 570" role="img" aria-labelledby="dwgT dwgD">
  <title id="dwgT">${tx('Շենքի սխեմատիկ կտրվածք', 'Schematic building section')}</title>
  <desc id="dwgD">${tx('Պայմանական պատկեր․ եռահարկ շենքի կտրվածքում ցույց են տրված ', 'Illustrative diagram of a three-storey building showing ')}${SYSTEM_CALLOUTS.map((c, i) => `${i + 1}: ${c.title.toLowerCase()}`).join(', ')}${tx('։', '.')}</desc>
  <defs>
    <pattern id="dgDots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" class="d-dot"/></pattern>
    <pattern id="dgHatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" class="d-hatch"/></pattern>
    <marker id="dgArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-arrfill"/></marker>
  </defs>
  <rect x="190" y="40" width="830" height="570" fill="url(#dgDots)"/>
  <g class="d-build">
    <rect x="190" y="560" width="830" height="34" fill="url(#dgHatch)"/>
    <line x1="190" y1="560" x2="1020" y2="560" class="d-wall"/>
    <rect x="260" y="140" width="12" height="420" class="d-solid"/>
    <rect x="928" y="140" width="12" height="420" class="d-solid"/>
    <rect x="260" y="140" width="680" height="12" class="d-solid"/>
    <rect x="272" y="280" width="656" height="12" class="d-solid"/>
    <rect x="272" y="420" width="656" height="12" class="d-solid"/>
    <path class="d-wall" d="M260 560V140H940V560M272 560V152H928V560"/>
  </g>
  <g class="d-sys">
    <path class="d-heat" d="M405 140V160H290V552"/>
    <path class="d-heat d-heat--ret" d="M415 140V166H298V552"/>
    <g>${loops}</g>
    <rect x="880" y="96" width="36" height="362" class="d-duct"/>
    <rect x="300" y="160" width="580" height="18" class="d-duct"/>
    <rect x="300" y="300" width="580" height="18" class="d-duct"/>
    <rect x="300" y="440" width="580" height="18" class="d-duct"/>
    <g>${diffusers}${flows}</g>
    <rect x="320" y="98" width="110" height="42" class="d-unit"/>
    <circle cx="358" cy="119" r="15" class="d-thin"/>
    <g class="d-spin"><path class="d-blade" d="M358 119l-3-12a4 4 0 0 1 6 0zM358 119l11 6a4 4 0 0 1-3 5zM358 119l-8 9a4 4 0 0 1-3-5z"/></g>
    <path class="d-thin" d="M386 106V132M394 106V132M402 106V132M410 106V132M418 106V132"/>
    <rect x="700" y="82" width="200" height="58" class="d-unit"/>
    <circle cx="745" cy="111" r="18" class="d-thin"/>
    <g class="d-spin"><path class="d-blade" d="M745 111l-3-14a4 4 0 0 1 6 0zM745 111l13 7a4 4 0 0 1-3 5zM745 111l-10 10a4 4 0 0 1-3-5z"/></g>
    <rect x="790" y="94" width="46" height="34" class="d-thin"/>
    <path class="d-thin" d="M790 94L836 128M836 94L790 128"/>
    <path class="d-thin" d="M856 92l6 6-6 6 6 6-6 6 6 6-6 6"/>
    <line x1="630" y1="100" x2="698" y2="100" class="d-air" marker-end="url(#dgArr)"/>
    <line x1="900" y1="124" x2="1000" y2="124" class="d-air" marker-end="url(#dgArr)"/>
  </g>
  <g class="d-calls">${calls}</g>
</svg>`;
}

/** Line-drawing stand-in for a project photo, by category. */
export function planDrawing(cat: ProjectCategory): string {
  const grid = Array.from({ length: 10 }, (_, i) => `<line x1="${i * 40 + 20}" y1="0" x2="${i * 40 + 20}" y2="300"/>`).join('');
  const body: Record<ProjectCategory, string> = {
    residential:
      '<path class="pl" d="M90 250V130l110-70 110 70v120zM90 190h220"/><rect class="pl-fill" x="90" y="250" width="220" height="6"/><path class="pl-air" d="M120 150h160M120 210h160"/><path class="pl-heat" d="M110 244q5-5 10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0t10 0"/><path class="pl" d="M150 250v-34h30v34M240 170h40v24h-40z"/>',
    commercial:
      '<path class="pl" d="M50 250V90h300v160zM50 130h300"/><path class="pl" d="M80 250V160h240v90M140 160v90M200 160v90M260 160v90"/><path class="pl-air" d="M70 110h260"/><rect class="pl-fill" x="50" y="250" width="300" height="6"/>',
    office:
      '<path class="pl" d="M60 60h280v190H60zM60 140h120M180 60v190M260 140v110M180 140h160"/><path class="pl-air" d="M90 100h70M210 100h110M210 190h40M290 190h30"/><g class="pl-dot"><circle cx="120" cy="100" r="4"/><circle cx="240" cy="100" r="4"/><circle cx="300" cy="100" r="4"/><circle cx="120" cy="195" r="4"/></g>',
    industrial:
      '<path class="pl" d="M40 250V120l60-40v40l60-40v40l60-40v40l60-40v40l60-40v170z"/><rect class="pl-fill" x="40" y="250" width="320" height="6"/><path class="pl-air" d="M60 150h280M110 150v40M200 150v40M290 150v40"/><circle class="pl" cx="320" cy="70" r="14"/><circle class="pl" cx="140" cy="70" r="14"/>',
  };
  return `<svg class="plan" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><g class="pl-grid">${grid}</g>${body[cat]}</svg>`;
}
