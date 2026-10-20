/**
 * Animated page backgrounds.
 *
 * Each page gets its own scene, each based on a real HVAC idea, drawn on a <canvas>
 * behind the content. A section opts in with  data-fx="<scene>"  (see SCENES below).
 * Optional attributes: data-fx-density="0.8" (amount), data-fx-warm="0" (no warm lines).
 *
 * The engine handles size, sharpness, light/dark theme, pausing when off screen or in a
 * background tab, and reduced motion (one still frame instead of animation).
 */

type Cleanup = () => void;
type Rgb = [number, number, number];

interface Palette { heat: Rgb; air: Rgb; leaf: Rgb; ink: Rgb; dark: boolean; a: number }

/** Logo colours, tuned for dark and light backgrounds. `a` scales opacity per theme. */
const DARK: Palette = { heat: [245, 154, 134], air: [130, 182, 242], leaf: [141, 181, 106], ink: [228, 238, 236], dark: true, a: 1 };
const LIGHT: Palette = { heat: [196, 78, 48], air: [47, 109, 181], leaf: [75, 116, 52], ink: [26, 61, 74], dark: false, a: 0.72 };

const rgba = (c: Rgb, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a)).toFixed(3)})`;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export interface SceneCtx {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** milliseconds since start */
  t: number;
  /** milliseconds since previous frame (capped) */
  dt: number;
  p: Palette;
  density: number;
  warm: boolean;
}

interface Scene {
  /** Called on start and on every resize. */
  setup(c: SceneCtx): void;
  /** Draw one frame. */
  frame(c: SceneCtx): void;
  /** Leave soft trails instead of clearing (value = fade per frame). */
  trails?: number;
  /** Frames per second (default 60). */
  fps?: number;
  /** Has a meaningful still frame for reduced motion (default true). */
  still?: boolean;
}

/* ================================================================== */
/* Scenes                                                             */
/* ================================================================== */

/** Air streamlines: lines drift left to right in slow waves, like air leaving a diffuser. */
function air(): Scene {
  interface P { x: number; y: number; age: number; life: number; warm: boolean; speed: number }
  let ps: P[] = [];
  const spawn = (c: SceneCtx, q: P) => {
    q.x = rand(-0.05, 0.3) * c.w; q.y = Math.random() * c.h; q.age = 0;
    q.life = rand(220, 480); q.warm = c.warm && Math.random() < 0.22; q.speed = rand(0.55, 1.3);
  };
  return {
    trails: 0.06,
    still: false,
    setup(c) {
      const n = Math.round(Math.min(110, (c.w * c.h) / 9000) * c.density);
      ps = Array.from({ length: n }, () => {
        const q = {} as P; spawn(c, q); q.x = Math.random() * c.w; q.age = Math.random() * q.life; return q;
      });
    },
    frame(c) {
      const { ctx, t, p } = c;
      ctx.lineWidth = p.dark ? 1.2 : 1.1;
      ctx.lineCap = 'round';
      for (const q of ps) {
        const ang = Math.sin(q.y * 0.006 + t * 0.0006) * 0.55 + Math.cos(q.x * 0.004 - t * 0.0004) * 0.35 + Math.sin((q.x + q.y) * 0.002) * 0.2;
        const nx = q.x + Math.cos(ang) * q.speed * 1.6, ny = q.y + Math.sin(ang) * q.speed * 1.6;
        const fade = Math.sin((q.age / q.life) * Math.PI);
        ctx.strokeStyle = rgba(q.warm ? p.heat : p.air, (p.dark ? 0.32 : 0.28) * fade * p.a);
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(nx, ny); ctx.stroke();
        q.x = nx; q.y = ny; q.age++;
        if (q.age > q.life || q.x > c.w + 10 || q.y < -10 || q.y > c.h + 10) spawn(c, q);
      }
    },
  };
}

/** Convection: warm air rises (red), cool air sinks (blue), swaying as it goes. */
function convection(): Scene {
  interface P { x: number; y: number; vy: number; warm: boolean; ph: number; age: number; life: number }
  let ps: P[] = [];
  const spawn = (c: SceneCtx, q: P, anywhere = false) => {
    q.warm = Math.random() < 0.5;
    q.x = Math.random() * c.w;
    q.y = anywhere ? Math.random() * c.h : q.warm ? c.h + 8 : -8;
    q.vy = (q.warm ? -1 : 1) * rand(0.35, 0.9);
    q.ph = Math.random() * Math.PI * 2;
    q.age = 0; q.life = rand(300, 700);
  };
  return {
    trails: 0.07,
    still: false,
    setup(c) {
      const n = Math.round(Math.min(120, (c.w * c.h) / 8000) * c.density);
      ps = Array.from({ length: n }, () => { const q = {} as P; spawn(c, q, true); return q; });
    },
    frame(c) {
      const { ctx, t, p } = c;
      ctx.lineWidth = 1.6; ctx.lineCap = 'round';
      for (const q of ps) {
        // Columns of rising/sinking air bend towards each other like convection cells.
        const sway = Math.sin(t * 0.0012 + q.ph + q.y * 0.01) * 0.5 + Math.sin(q.x * 0.008) * 0.25 * (q.warm ? 1 : -1);
        const nx = q.x + sway, ny = q.y + q.vy;
        const heightFade = q.warm ? Math.min(1, q.y / (c.h * 0.6)) : Math.min(1, (c.h - q.y) / (c.h * 0.6));
        const fade = Math.min(1, q.age / 40) * Math.max(0, heightFade);
        ctx.strokeStyle = rgba(q.warm ? p.heat : p.air, 0.6 * fade * p.a);
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(nx, ny); ctx.stroke();
        q.x = nx; q.y = ny; q.age++;
        if (q.y < -10 || q.y > c.h + 10 || q.age > q.life) spawn(c, q);
      }
    },
  };
}

/** Thermal contour map: isotherms of a slowly moving temperature field (marching squares). */
function isotherm(): Scene {
  let cell = 24, cols = 0, rows = 0;
  let field = new Float32Array(0);
  const blobs = Array.from({ length: 6 }, (_, i) => ({
    sign: i % 2 ? -1 : 1, ax: rand(0.15, 0.45), ay: rand(0.2, 0.45), fx: rand(0.00004, 0.00009), fy: rand(0.00004, 0.00009),
    px: Math.random() * 6.28, py: Math.random() * 6.28, cx: rand(0.2, 0.8), cy: rand(0.2, 0.8), r: rand(0.22, 0.38),
  }));
  const LEVELS = [-0.75, -0.55, -0.38, -0.22, -0.08, 0.08, 0.22, 0.38, 0.55, 0.75];
  return {
    fps: 30,
    setup(c) {
      cell = c.w < 700 ? 20 : 24;
      cols = Math.ceil(c.w / cell) + 1; rows = Math.ceil(c.h / cell) + 1;
      field = new Float32Array(cols * rows);
    },
    frame(c) {
      const { ctx, w, h, t, p } = c;
      const m = Math.min(w, h * 1.6);
      const bs = blobs.map((b) => ({
        x: (b.cx + Math.sin(t * b.fx + b.px) * b.ax) * w,
        y: (b.cy + Math.cos(t * b.fy + b.py) * b.ay) * h,
        r2: (b.r * m) ** 2, s: b.sign,
      }));
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell, y = j * cell;
          let v = 0.12 * Math.sin(x * 0.004 + t * 0.00018) * Math.cos(y * 0.006 - t * 0.00013);
          for (const b of bs) { const dx = x - b.x, dy = y - b.y; v += b.s * Math.exp(-(dx * dx + dy * dy) / b.r2); }
          field[j * cols + i] = v;
        }
      }
      LEVELS.forEach((lv, li) => {
        const k = li / (LEVELS.length - 1);
        const col = k < 0.5 ? mix(p.air, p.ink, k * 2) : mix(p.ink, p.heat, (k - 0.5) * 2);
        const strong = Math.abs(lv) > 0.5;
        ctx.strokeStyle = rgba(col, (strong ? 0.62 : 0.38) * p.a);
        ctx.lineWidth = strong ? 1.4 : 1.1;
        ctx.setLineDash(Math.abs(lv) < 0.1 ? [3, 5] : []);
        ctx.beginPath();
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i], b = field[j * cols + i + 1], cc = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
            const idx = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (cc > lv ? 2 : 0) | (d > lv ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x = i * cell, y = j * cell;
            const lerp = (v1: number, v2: number) => (lv - v1) / (v2 - v1);
            const top: [number, number] = [x + cell * lerp(a, b), y];
            const right: [number, number] = [x + cell, y + cell * lerp(b, cc)];
            const bottom: [number, number] = [x + cell * lerp(d, cc), y + cell];
            const left: [number, number] = [x, y + cell * lerp(a, d)];
            const seg = (p1: [number, number], p2: [number, number]) => { ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); };
            switch (idx) {
              case 1: case 14: seg(left, bottom); break;
              case 2: case 13: seg(bottom, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(top, right); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, top); break;
              case 5: seg(left, top); seg(bottom, right); break;
              case 10: seg(top, right); seg(left, bottom); break;
            }
          }
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
      // Small temperature labels on the strongest hot and cold spots, like a survey drawing.
      ctx.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
      bs.slice(0, 2).forEach((b, i) => {
        if (b.x < 40 || b.x > w - 80 || b.y < 30 || b.y > h - 20) return;
        ctx.fillStyle = rgba(i === 0 ? p.heat : p.air, 0.55 * p.a);
        ctx.beginPath(); ctx.arc(b.x, b.y, 2.5, 0, 6.283); ctx.fill();
        ctx.fillText(i === 0 ? '+24 °C' : '+18 °C', b.x + 8, b.y - 6);
      });
    },
  };
}

/** Blueprint routing: duct/pipe routes draw themselves with joints, ticks and equipment nodes. */
function blueprint(): Scene {
  interface Route { pts: [number, number][]; len: number; born: number; dur: number; hold: number; tone: 'air' | 'heat' | 'ink' }
  let routes: Route[] = [];
  let next = 0;
  const make = (c: SceneCtx, born: number): Route => {
    const g = 24;
    const snap = (v: number) => Math.round(v / g) * g;
    let x = snap(rand(0.05, 0.95) * c.w), y = snap(rand(0.1, 0.9) * c.h);
    const pts: [number, number][] = [[x, y]];
    let horiz = Math.random() < 0.6, len = 0;
    for (let s = 0, n = Math.floor(rand(3, 6)); s < n; s++) {
      const d = snap(rand(60, 240)) * (Math.random() < 0.5 ? -1 : 1);
      if (horiz) x = Math.max(g, Math.min(c.w - g, x + d)); else y = Math.max(g, Math.min(c.h - g, y + d));
      const [px, py] = pts[pts.length - 1];
      len += Math.abs(x - px) + Math.abs(y - py);
      pts.push([x, y]); horiz = !horiz;
    }
    const r = Math.random();
    return { pts, len, born, dur: rand(1800, 3200), hold: rand(1500, 3000), tone: r < 0.45 ? 'air' : r < 0.7 ? 'heat' : 'ink' };
  };
  return {
    setup(c) {
      routes = [];
      const n = Math.round(Math.max(4, Math.min(9, (c.w * c.h) / 90000)) * c.density);
      for (let i = 0; i < n; i++) { const r = make(c, -rand(0, 4000)); routes.push(r); }
      next = 0;
    },
    frame(c) {
      const { ctx, t, p } = c;
      if (t > next) { routes.push(make(c, t)); next = t + rand(600, 1100); }
      const max = Math.round(Math.max(4, Math.min(10, (c.w * c.h) / 80000)) * c.density);
      routes = routes.filter((r) => t - r.born < r.dur + r.hold + 1200).slice(-max - 2);
      ctx.lineCap = 'square';
      for (const r of routes) {
        const age = t - r.born;
        const prog = Math.max(0, Math.min(1, age / r.dur));
        const fade = age > r.dur + r.hold ? 1 - (age - r.dur - r.hold) / 1200 : 1;
        const col = r.tone === 'air' ? p.air : r.tone === 'heat' ? p.heat : p.ink;
        const alpha = 0.42 * fade * p.a;
        // Draw the route up to the current progress, with ticks every 24px like a dimension line.
        let left = r.len * prog;
        ctx.strokeStyle = rgba(col, alpha); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(r.pts[0][0], r.pts[0][1]);
        let tip = r.pts[0];
        const ticks: [number, number, boolean][] = [];
        for (let i = 1; i < r.pts.length && left > 0; i++) {
          const [ax, ay] = r.pts[i - 1], [bx, by] = r.pts[i];
          const segLen = Math.abs(bx - ax) + Math.abs(by - ay);
          const k = Math.min(1, left / segLen);
          const ex = ax + (bx - ax) * k, ey = ay + (by - ay) * k;
          ctx.lineTo(ex, ey);
          const horiz = ay === by;
          for (let s = 24; s < segLen * k; s += 24) ticks.push([ax + Math.sign(bx - ax) * (horiz ? s : 0), ay + Math.sign(by - ay) * (horiz ? 0 : s), horiz]);
          tip = [ex, ey]; left -= segLen;
        }
        ctx.stroke();
        ctx.strokeStyle = rgba(col, alpha * 0.55); ctx.lineWidth = 1;
        ctx.beginPath();
        for (const [tx, ty, horiz] of ticks) { if (horiz) { ctx.moveTo(tx, ty - 3); ctx.lineTo(tx, ty + 3); } else { ctx.moveTo(tx - 3, ty); ctx.lineTo(tx + 3, ty); } }
        ctx.stroke();
        // Joints at reached corners, equipment square at the end, glowing pen tip while drawing.
        ctx.fillStyle = rgba(col, alpha);
        let reached = r.len * prog;
        for (let i = 1; i < r.pts.length - 1; i++) {
          const [ax, ay] = r.pts[i - 1], [bx, by] = r.pts[i];
          reached -= Math.abs(bx - ax) + Math.abs(by - ay);
          if (reached < 0) break;
          ctx.beginPath(); ctx.arc(bx, by, 2.6, 0, 6.283); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(r.pts[0][0], r.pts[0][1], 3, 0, 6.283); ctx.fill();
        if (prog >= 1) {
          const [ex, ey] = r.pts[r.pts.length - 1];
          ctx.strokeStyle = rgba(col, alpha); ctx.lineWidth = 1.4;
          ctx.strokeRect(ex - 7, ey - 7, 14, 14);
          ctx.beginPath(); ctx.moveTo(ex - 7, ey - 7); ctx.lineTo(ex + 7, ey + 7); ctx.stroke();
        } else {
          ctx.fillStyle = rgba(col, 0.9 * fade * p.a);
          ctx.beginPath(); ctx.arc(tip[0], tip[1], 3.2, 0, 6.283); ctx.fill();
        }
      }
    },
  };
}

/** Heat shimmer: wavy lines rise like warm air above a radiator, growing as they climb. */
function heat(): Scene {
  let lines: { y: number; ph: number; sp: number }[] = [];
  return {
    setup(c) {
      const n = Math.round(Math.max(8, Math.min(18, c.h / 26)) * c.density);
      lines = Array.from({ length: n }, (_, i) => ({ y: (i / n) * c.h, ph: Math.random() * 6.28, sp: rand(0.012, 0.022) }));
    },
    frame(c) {
      const { ctx, w, h, t, dt, p } = c;
      ctx.lineWidth = 1.5;
      for (const l of lines) {
        l.y -= l.sp * dt;
        if (l.y < -30) { l.y = h + 20; l.ph = Math.random() * 6.28; }
        const k = 1 - Math.max(0, Math.min(1, l.y / h)); // 0 at bottom, 1 at top
        const amp = 3 + k * 16;
        const alpha = Math.sin(Math.max(0, Math.min(1, l.y / h)) * Math.PI) * 0.6 * p.a;
        const col = mix(p.heat, p.ink, k * 0.6);
        ctx.strokeStyle = rgba(col, alpha);
        ctx.beginPath();
        for (let x = -10; x <= w + 10; x += 10) {
          const y = l.y + Math.sin(x * 0.012 + t * 0.0016 + l.ph) * amp + Math.sin(x * 0.031 - t * 0.0022) * amp * 0.25;
          if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // Radiator fins along the bottom edge, as the heat source.
      ctx.fillStyle = rgba(p.heat, 0.18 * p.a);
      for (let x = 12; x < w; x += 16) ctx.fillRect(x, h - 10, 6, 10);
    },
  };
}

/** Energy cells: a honeycomb grid where cells light up in green and fade, like a smart grid. */
function hex(): Scene {
  let centers: [number, number][] = [];
  let grid: HTMLCanvasElement | null = null;
  let r = 28;
  const pulses: { i: number; born: number; life: number }[] = [];
  let next = 0;
  const hexPath = (ctx: CanvasRenderingContext2D, x: number, y: number, rr: number) => {
    ctx.moveTo(x + rr, y);
    for (let k = 1; k <= 6; k++) ctx.lineTo(x + rr * Math.cos((k * Math.PI) / 3), y + rr * Math.sin((k * Math.PI) / 3));
  };
  return {
    setup(c) {
      r = c.w < 700 ? 22 : 28;
      centers = [];
      const dx = r * 1.5, dy = r * Math.sqrt(3);
      for (let i = 0, x = 0; x < c.w + r; i++, x += dx)
        for (let y = i % 2 ? dy / 2 : 0; y < c.h + r; y += dy) centers.push([x, y]);
      // Draw the static grid once into an offscreen canvas.
      grid = document.createElement('canvas');
      const dpr = c.ctx.getTransform().a;
      grid.width = Math.round(c.w * dpr); grid.height = Math.round(c.h * dpr);
      const g = grid.getContext('2d')!;
      g.scale(dpr, dpr);
      g.strokeStyle = rgba(c.p.leaf, 0.13 * c.p.a); g.lineWidth = 1;
      g.beginPath(); for (const [x, y] of centers) hexPath(g, x, y, r - 2); g.stroke();
      pulses.length = 0;
    },
    frame(c) {
      const { ctx, t, p } = c;
      if (grid) ctx.drawImage(grid, 0, 0, c.w, c.h);
      if (t > next && centers.length) {
        const i = Math.floor(Math.random() * centers.length);
        pulses.push({ i, born: t, life: rand(1600, 2800) });
        // Energy spreads to a neighbour now and then.
        if (Math.random() < 0.5) {
          const [x, y] = centers[i];
          const nb = centers.findIndex(([nx, ny], k) => k !== i && Math.hypot(nx - x, ny - y) < r * 1.8);
          if (nb >= 0) pulses.push({ i: nb, born: t + 300, life: rand(1400, 2400) });
        }
        next = t + rand(90, 200) / c.density;
      }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const q = pulses[k];
        const age = t - q.born;
        if (age < 0) continue;
        if (age > q.life) { pulses.splice(k, 1); continue; }
        const s = Math.sin((age / q.life) * Math.PI);
        const [x, y] = centers[q.i];
        ctx.beginPath(); hexPath(ctx, x, y, r - 2);
        ctx.fillStyle = rgba(p.leaf, 0.16 * s * p.a); ctx.fill();
        ctx.strokeStyle = rgba(p.leaf, 0.6 * s * p.a); ctx.lineWidth = 1.4; ctx.stroke();
      }
    },
  };
}

/** Signal ripples: rings spread out from one point (behind the photo), like a call going out. */
function ripples(): Scene {
  let ox = 0, oy = 0, maxR = 0;
  let rings: { born: number; tone: number }[] = [];
  let next = 0, n = 0;
  return {
    setup(c) {
      const wide = c.w >= 1000;
      ox = c.w * (wide ? 0.78 : 0.82); oy = c.h * (wide ? 0.5 : 0.22);
      maxR = Math.hypot(Math.max(ox, c.w - ox), Math.max(oy, c.h - oy));
      rings = [];
      // Start with rings already spread out so the first frame is not empty.
      for (let i = 0; i < 5; i++) rings.push({ born: -i * 1500, tone: i % 3 });
      next = 0;
    },
    frame(c) {
      const { ctx, t, p } = c;
      if (t > next) { rings.push({ born: t, tone: n++ % 3 }); next = t + 1500 / c.density; }
      // Faint compass grid: spokes and fixed dotted circles.
      ctx.strokeStyle = rgba(p.ink, 0.07 * p.a); ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k < 16; k++) { const a = (k / 16) * Math.PI * 2; ctx.moveTo(ox, oy); ctx.lineTo(ox + Math.cos(a) * maxR, oy + Math.sin(a) * maxR); }
      ctx.stroke();
      ctx.setLineDash([1, 7]);
      for (let k = 1; k <= 6; k++) { ctx.beginPath(); ctx.arc(ox, oy, (k * maxR) / 6, 0, 6.283); ctx.stroke(); }
      ctx.setLineDash([]);
      rings = rings.filter((r) => (t - r.born) * 0.07 < maxR);
      for (const r of rings) {
        const rad = (t - r.born) * 0.07;
        if (rad <= 0) continue;
        const k = rad / maxR;
        const col = r.tone === 0 ? p.air : r.tone === 1 ? p.leaf : p.heat;
        ctx.strokeStyle = rgba(col, Math.pow(1 - k, 1.4) * 0.62 * p.a);
        ctx.lineWidth = 2 - k;
        ctx.setLineDash(r.tone === 2 ? [4, 8] : []);
        ctx.beginPath(); ctx.arc(ox, oy, rad, 0, 6.283); ctx.stroke();
      }
      ctx.setLineDash([]);
      // Pulsing source point.
      const s = (Math.sin(t * 0.004) + 1) / 2;
      ctx.fillStyle = rgba(p.leaf, (0.35 + s * 0.35) * p.a);
      ctx.beginPath(); ctx.arc(ox, oy, 4 + s * 2, 0, 6.283); ctx.fill();
    },
  };
}

/** Dot-matrix wave: a calm grid of dots swelling with a slow travelling wave. */
function dots(): Scene {
  let gap = 22;
  return {
    fps: 30,
    setup(c) { gap = c.w < 700 ? 18 : 22; },
    frame(c) {
      const { ctx, w, h, t, p } = c;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const v = (Math.sin(x * 0.011 + y * 0.007 - t * 0.0011) + Math.sin(x * 0.004 - y * 0.013 + t * 0.0007)) / 4 + 0.5;
          const rr = 0.6 + v * v * 1.9;
          ctx.fillStyle = rgba(v > 0.72 ? p.air : p.ink, (0.08 + v * v * 0.32) * p.a);
          ctx.beginPath(); ctx.arc(x, y, rr, 0, 6.283); ctx.fill();
        }
      }
    },
  };
}

export const SCENES = { air, convection, isotherm, blueprint, heat, hex, ripples, dots } as const;
export type SceneName = keyof typeof SCENES;

/* ================================================================== */
/* Engine                                                             */
/* ================================================================== */

export function mountBackground(host: HTMLElement, still: boolean): Cleanup {
  const name = host.dataset.fx as SceneName;
  const make = SCENES[name];
  if (!make) return () => {};
  const scene = make();
  if (still && scene.still === false) return () => {};

  const canvas = document.createElement('canvas');
  canvas.className = 'fx-air';
  canvas.dataset.scene = name;
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return () => {}; }

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  // Theme is read from the first ancestor that actually paints a background.
  const isDark = () => {
    let el: HTMLElement | null = host;
    while (el) {
      const m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
      if (m) {
        const [r, g, b, a = 1] = m.map(Number);
        if (a >= 0.5) return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128;
      }
      el = el.parentElement;
    }
    return matchMedia('(prefers-color-scheme: dark)').matches;
  };
  const c: SceneCtx = {
    ctx, w: 0, h: 0, t: 0, dt: 16, p: isDark() ? DARK : LIGHT,
    density: host.dataset.fxDensity ? Number(host.dataset.fxDensity) : 1,
    warm: host.dataset.fxWarm !== '0',
  };

  let raf = 0, visible = true, last = 0, start = 0;
  const minGap = 1000 / (scene.fps ?? 60) - 2;

  const clear = () => { ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, c.w, c.h); };
  const draw = () => {
    if (scene.trails) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${scene.trails})`;
      ctx.fillRect(0, 0, c.w, c.h);
    } else clear();
    ctx.globalCompositeOperation = c.p.dark ? 'lighter' : 'source-over';
    scene.frame(c);
  };

  const resize = () => {
    const r = host.getBoundingClientRect();
    if (Math.abs(r.width - c.w) < 1 && Math.abs(r.height - c.h) < 1) return;
    c.w = r.width; c.h = r.height;
    canvas.width = Math.round(c.w * dpr); canvas.height = Math.round(c.h * dpr);
    canvas.style.width = c.w + 'px'; canvas.style.height = c.h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scene.setup(c);
    if (still) { c.t = 4000; draw(); }
  };

  const loop = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    if (!start) start = now - 16;
    if (now - last >= minGap) {
      c.dt = Math.min(50, now - (last || now - 16));
      c.t = now - start;
      last = now;
      draw();
    }
    raf = requestAnimationFrame(loop);
  };
  const play = () => { if (!still && !raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : stop(); });
  io.observe(host);
  const onVis = () => (document.hidden ? stop() : play());
  document.addEventListener('visibilitychange', onVis);
  const scheme = matchMedia('(prefers-color-scheme: dark)');
  const onScheme = () => requestAnimationFrame(() => {
    c.p = isDark() ? DARK : LIGHT; clear(); c.w = 0; resize();
  });
  scheme.addEventListener('change', onScheme);
  requestAnimationFrame(() => canvas.classList.add('is-on'));
  play();

  return () => {
    stop(); ro.disconnect(); io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    scheme.removeEventListener('change', onScheme);
    canvas.remove();
  };
}
