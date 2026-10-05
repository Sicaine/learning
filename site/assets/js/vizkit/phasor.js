// vizkit/phasor.js — Zeigerdiagramm (SVG): rotierende Zeiger, Zeigeraddition (Spitze an Fuß), Zeitverlauf-Projektion, Impedanzdreieck.
//
//   const ph = phasor(stage, { unit: 'V', wave: true, rotate: true });
//   ph.set([
//     { id: 'UR', mag: 6, phase: 0,  label: 'U_R', color: 'var(--accent)' },
//     { id: 'UL', mag: 8, phase: 90, label: 'U_L', color: 'var(--accent-2)', from: 'UR' },   // Spitze an Spitze von UR
//   ], { sum: { id: 'U', of: ['UR', 'UL'], label: 'U', color: 'var(--ink)' }, arc: 'U' });
//   ph.setAngle(0.5);   // Drehwinkel ωt in rad (wenn rotate:false)
//
// Phase in Grad (mathematisch positiv = gegen den Uhrzeigersinn). Mit wave:true erscheint rechts u(ωt) = û·sin(ωt + φ).
import { fmt } from './si.js';
import { ensureCss, h, s, esc, PALETTE, boxWidth } from './base.js';
import { animate } from './anim.js';

const RAD = Math.PI / 180;
const niceMax = v => { const e = 10 ** Math.floor(Math.log10(v)), f = v / e; return ([1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(x => f <= x + 1e-9)) * e; };

function arrowPath(x1, y1, x2, y2, head = 9) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (L < 1) return { line: `M${x1} ${y1}L${x2} ${y2}`, head: '' };
  const ux = dx / L, uy = dy / L, hl = Math.min(head, L * 0.45), bx = x2 - ux * hl, by = y2 - uy * hl;
  return { line: `M${x1.toFixed(2)} ${y1.toFixed(2)}L${bx.toFixed(2)} ${by.toFixed(2)}`, head: `M${x2.toFixed(2)} ${y2.toFixed(2)}L${(bx - uy * hl * 0.42).toFixed(2)} ${(by + ux * hl * 0.42).toFixed(2)}L${(bx + uy * hl * 0.42).toFixed(2)} ${(by - ux * hl * 0.42).toFixed(2)}Z` };
}

export function phasor(container, o = {}) {
  ensureCss();
  const unit = o.unit ?? 'V', wave = !!o.wave && boxWidth(container, 0, 2000) >= 520;
  const D = 300, W = wave ? 640 : D, H = D, cx = D / 2, cy = D / 2, R0 = D / 2 - 26;
  const root = h('div', { class: 'vk-phasor' });
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Zeigerdiagramm' });
  root.append(svg); container.append(root);
  let vecs = [], opt = {}, theta = o.theta ?? 0, maxR = o.max ?? 1;
  const st = { rotate: o.rotate ?? false };

  function resolve() {
    const by = {}, out = [];
    for (const v of vecs) {
      const ang = v.phase * RAD, dx = v.mag * Math.cos(ang), dy = v.mag * Math.sin(ang);
      const o0 = v.from && by[v.from] ? by[v.from].tip : [0, 0];
      const r = { ...v, tail: o0, tip: [o0[0] + dx, o0[1] + dy], dx, dy };
      by[v.id] = r; out.push(r);
    }
    if (opt.sum) {
      const sm = opt.sum; let sx = 0, sy = 0;
      for (const id of sm.of) { const r = by[id]; if (r) { sx += r.dx; sy += r.dy; } }
      const r = { id: sm.id ?? 'sum', mag: Math.hypot(sx, sy), phase: Math.atan2(sy, sx) / RAD, label: sm.label ?? sm.id ?? 'Σ', color: sm.color ?? 'var(--ink)', dashed: sm.dashed ?? false, width: 3, tail: [0, 0], tip: [sx, sy], dx: sx, dy: sy, isSum: true };
      by[r.id] = r; out.push(r);
    }
    return { out, by };
  }

  function draw() {
    const { out, by } = resolve();
    // Maßstab
    let m = o.max ?? 0;
    if (!o.max) for (const r of out) m = Math.max(m, Math.hypot(r.tip[0], r.tip[1]), Math.hypot(r.tail[0], r.tail[1]));
    m = niceMax((m || 1) * 1.08);
    maxR = m;
    const k = R0 / m, P = (x, y) => [cx + x * k, cy - y * k];
    const rot = (x, y) => [x * Math.cos(theta) - y * Math.sin(theta), x * Math.sin(theta) + y * Math.cos(theta)];
    let g = '';
    // Kreise
    const rings = m >= 1 ? [0.5, 1] : [0.5, 1];
    for (const f of rings) g += `<circle cx="${cx}" cy="${cy}" r="${(R0 * f).toFixed(1)}" fill="none" stroke="var(--line-2)" ${f === 1 ? '' : 'stroke-dasharray="3 4"'}/>`;
    g += `<text x="${cx + R0 * 0.707 + 4}" y="${cy - R0 * 0.707 - 2}" style="font:11px var(--mono)">${esc(fmt(m, unit))}</text>`;
    g += `<line x1="${cx - R0 - 10}" x2="${cx + R0 + 12}" y1="${cy}" y2="${cy}" stroke="var(--ink-2)" stroke-opacity=".55"/><line x1="${cx}" x2="${cx}" y1="${cy - R0 - 12}" y2="${cy + R0 + 10}" stroke="var(--ink-2)" stroke-opacity=".55"/>`;
    g += `<text x="${cx + R0 + 12}" y="${cy + 15}" text-anchor="end" style="font:600 11px var(--sans)">Re</text><text x="${cx + 8}" y="${cy - R0 - 3}" style="font:600 11px var(--sans)">Im</text>`;
    // Winkelbogen
    if (opt.arc && by[opt.arc]) {
      const r = by[opt.arc], a = r.phase * RAD, rr = R0 * 0.28, [ax, ay] = rot(Math.cos(0), Math.sin(0));
      const [x0, y0] = [cx + rr * Math.cos(-theta * 0) , cy];
      void ax; void ay; void x0; void y0;
      const a0 = theta, a1 = theta + a;
      const sx = cx + rr * Math.cos(a0), sy = cy - rr * Math.sin(a0), ex = cx + rr * Math.cos(a1), ey = cy - rr * Math.sin(a1);
      if (Math.abs(r.phase) > 0.5) g += `<path d="M${sx.toFixed(1)} ${sy.toFixed(1)}A${rr} ${rr} 0 ${Math.abs(a) > Math.PI ? 1 : 0} ${a > 0 ? 0 : 1} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${r.color}" stroke-width="1.6"/><text x="${(cx + (rr + 12) * Math.cos((a0 + a1) / 2)).toFixed(1)}" y="${(cy - (rr + 12) * Math.sin((a0 + a1) / 2) + 4).toFixed(1)}" text-anchor="middle" style="font:600 11px var(--mono);fill:${r.color}">${esc((r.phase > 0 ? '+' : '') + r.phase.toFixed(0) + '°')}</text>`;
    }
    // Zeiger (Kette zuerst, Summe zuletzt)
    for (const r of out) {
      const [tx, ty] = rot(...r.tail), [hx, hy] = rot(...r.tip);
      const [x1, y1] = P(tx, ty), [x2, y2] = P(hx, hy), a = arrowPath(x1, y1, x2, y2, r.isSum ? 11 : 10);
      if (r.from && !r.isSum) g += `<line x1="${x1}" x2="${x1}" y1="${y1}" y2="${y1}"/>`;
      g += `<path d="${a.line}" fill="none" stroke="${r.color}" stroke-width="${r.width ?? 2.6}" stroke-linecap="round" ${r.dashed ? 'stroke-dasharray="6 4"' : ''}/><path d="${a.head}" fill="${r.color}"/>`;
      if (r.label && r.mag > 1e-9) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
        g += `<text x="${(mx - dy / L * 14).toFixed(1)}" y="${(my + dx / L * 14 + 4).toFixed(1)}" text-anchor="middle" style="font:700 12px var(--sans);fill:${r.color}">${esc(r.label)}<tspan style="font:500 10.5px var(--mono);fill:var(--muted)" dx="4">${esc(fmt(r.mag, unit, 3))}</tspan></text>`;
      }
    }
    // Zeitverlauf rechts
    if (wave) {
      const wx = D + 24, ww = W - wx - 14, wy = cy, wh = R0;
      g += `<line x1="${wx}" x2="${wx + ww}" y1="${wy}" y2="${wy}" stroke="var(--ink-2)" stroke-opacity=".55"/><line x1="${wx}" x2="${wx}" y1="${wy - wh - 10}" y2="${wy + wh + 10}" stroke="var(--ink-2)" stroke-opacity=".55"/>`;
      g += `<text x="${wx + ww}" y="${wy + 15}" text-anchor="end" style="font:600 11px var(--sans)">ωt</text>`;
      for (let q = 1; q <= 4; q++) g += `<line x1="${wx + ww * q / 4}" x2="${wx + ww * q / 4}" y1="${wy - 4}" y2="${wy + 4}" stroke="var(--ink-2)" stroke-opacity=".55"/><text x="${wx + ww * q / 4}" y="${wy + 17}" text-anchor="middle" style="font:10px var(--mono)">${['π/2', 'π', '3π/2', '2π'][q - 1]}</text>`;
      const th = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      for (const r of out) {
        if (r.from && !r.isSum && false) continue;
        // u(ωt) = Im{ r e^{jωt} } → Projektion auf die Im-Achse
        let d = '';
        for (let i = 0; i <= 120; i++) { const a = i / 120 * 2 * Math.PI, y = wy - r.mag * Math.sin(a + r.phase * RAD) * k; d += (i ? 'L' : 'M') + (wx + ww * i / 120).toFixed(1) + ' ' + y.toFixed(1); }
        g += `<path d="${d}" fill="none" stroke="${r.color}" stroke-width="${r.isSum ? 2.6 : 2}" opacity="${r.from && !r.isSum ? 0.55 : 1}" ${r.dashed ? 'stroke-dasharray="6 4"' : ''}/>`;
        if (!r.from || r.isSum) {
          const yy = wy - r.mag * Math.sin(th + r.phase * RAD) * k, [, hy] = [0, P(...rot(...r.tip))[1]];
          const xx = wx + ww * th / (2 * Math.PI);
          g += `<line x1="${P(...rot(...r.tip))[0].toFixed(1)}" x2="${xx.toFixed(1)}" y1="${hy.toFixed(1)}" y2="${yy.toFixed(1)}" stroke="${r.color}" stroke-opacity=".4" stroke-dasharray="2 4"/><circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="4.2" fill="var(--surface)" stroke="${r.color}" stroke-width="2.2"/>`;
        }
      }
    }
    svg.innerHTML = g;
  }

  let loop = null;
  const P = {
    el: root, svg,
    /** Zeigerliste setzen. opts: { sum: { id, of: [ids], label, color, dashed }, arc: id (Winkelbogen) } */
    set(list, options = {}) { vecs = list.map((v, i) => ({ color: PALETTE[i % PALETTE.length], ...v })); opt = options; draw(); return P; },
    setAngle(a) { theta = a; draw(); return P; },
    get angle() { return theta; },
    rotate(on = true) { st.rotate = on; if (on) { loop ||= animate(root, dt => { theta += dt * 2 * Math.PI * (o.rps ?? 0.2); draw(); }); loop.play(); } else loop?.pause(); return P; },
    get loop() { return loop; },
    destroy() { loop?.stop(); root.remove(); },
  };
  if (st.rotate) P.rotate(true);
  draw();
  return P;
}

/**
 * Impedanzdreieck: R waagerecht, X senkrecht (induktiv nach oben, kapazitiv nach unten), Z als Hypotenuse, φ als Bogen.
 *   const tri = impedanceTriangle(stage); tri.set({ R: 100, X: 75 });
 */
export function impedanceTriangle(container, o = {}) {
  ensureCss();
  const W = 320, Hh = 220, unit = o.unit ?? 'Ω';
  const root = h('div', { class: 'vk-phasor' }), svg = s('svg', { viewBox: `0 0 ${W} ${Hh}`, role: 'img', 'aria-label': 'Impedanzdreieck' });
  root.append(svg); container.append(root);
  const T = {
    el: root, svg,
    set({ R = 0, X = 0 }) {
      const Z = Math.hypot(R, X), phi = Math.atan2(X, R), m = Math.max(Z, 1e-9), k = Math.min(200 / Math.max(R, 1e-9), 90 / Math.max(Math.abs(X), 1e-9), 200 / m * 1.0) * 0.98;
      const x0 = 44, y0 = Hh / 2, x1 = x0 + R * k, y1 = y0 - X * k;
      const col = { R: 'var(--accent)', X: X >= 0 ? 'var(--accent-2)' : 'var(--warn)', Z: 'var(--ink)' };
      const a1 = arrowPath(x0, y0, x1, y0, 9), a2 = arrowPath(x1, y0, x1, y1, 9), a3 = arrowPath(x0, y0, x1, y1, 10);
      const arc = Math.abs(X) > 1e-9 && R > 1e-9 ? `<path d="M${x0 + 40} ${y0}A40 40 0 0 ${X > 0 ? 0 : 1} ${(x0 + 40 * Math.cos(phi)).toFixed(1)} ${(y0 - 40 * Math.sin(phi)).toFixed(1)}" fill="none" stroke="var(--ink-2)" stroke-width="1.5"/><text x="${x0 + 52}" y="${y0 - (X > 0 ? 8 : -16)}" style="font:600 12px var(--mono);fill:var(--ink)">φ = ${(phi / RAD).toFixed(1)}°</text>` : '';
      svg.innerHTML = `<line x1="${x0 - 14}" x2="${W - 10}" y1="${y0}" y2="${y0}" stroke="var(--line-2)"/>
        <path d="${a1.line}" stroke="${col.R}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="${a1.head}" fill="${col.R}"/>
        <path d="${a2.line}" stroke="${col.X}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="${a2.head}" fill="${col.X}"/>
        <path d="${a3.line}" stroke="${col.Z}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="${a3.head}" fill="${col.Z}"/>${arc}
        <text x="${(x0 + x1) / 2}" y="${y0 + (X >= 0 ? 18 : -9)}" text-anchor="middle" style="font:700 12px var(--sans);fill:${col.R}">R <tspan style="font:500 11px var(--mono);fill:var(--muted)">${esc(fmt(R, unit))}</tspan></text>
        <text x="${x1 + 8}" y="${(y0 + y1) / 2 + 4}" style="font:700 12px var(--sans);fill:${col.X}">X <tspan style="font:500 11px var(--mono);fill:var(--muted)">${esc(fmt(X, unit))}</tspan></text>
        <text x="${(x0 + x1) / 2 - 8}" y="${(y0 + y1) / 2 - (X >= 0 ? 10 : -22)}" text-anchor="end" style="font:700 12px var(--sans);fill:${col.Z}">Z <tspan style="font:500 11px var(--mono);fill:var(--muted)">${esc(fmt(Z, unit))}</tspan></text>`;
      return T;
    },
    destroy() { root.remove(); },
  };
  T.set({ R: o.R ?? 100, X: o.X ?? 60 });
  return T;
}
