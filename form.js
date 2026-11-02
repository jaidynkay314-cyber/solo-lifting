/* Solo Lifting form guides: animated figure engine.
   A pose is a set of joint angles in degrees measured from straight down (0 = down, 90 = toward the figure's front
   in side view or to the viewer's right in front view, 180 = up). Limbs are drawn as tapered capsules.
   Each exercise in window.SL_FORM gives: view ("side" | "front"), keyframes A (start) and B (squeezed),
   a tempo, equipment, the muscles to light up, and optional mistake variants that override A/B. */
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const L = { torso: 56, neck: 8, upper: 33, fore: 28, thigh: 40, shin: 38, foot: 13 };
  const FLOOR = 236;
  const rad = d => d * Math.PI / 180;
  const vec = (a, len) => [Math.sin(rad(a)) * len, Math.cos(rad(a)) * len];
  const add = (p, v) => [p[0] + v[0], p[1] + v[1]];
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const f1 = v => (Math.round(v * 10) / 10).toString();

  /* default standing poses */
  const BASE = {
    side: { px: 170, py: 158, t: 180, h: 0, aN: 5, eN: 5, aF: -5, eF: -5, lN: 3, kN: 0, fN: 90, lF: -3, kF: 0, fF: 90, sN: 1, sF: 1, shrug: 0 },
    front: { px: 170, py: 158, t: 180, h: 0, aL: -12, eL: -8, aR: 12, eR: 8, lL: -6, kL: -3, lR: 6, kR: 3, sL: 1, sR: 1, sLL: 1, sLR: 1, shrug: 0 }
  };

  /* joints for a pose */
  function joints(view, p) {
    const J = {}, u = vec(p.t, 1), n = [-u[1], u[0]]; // n = the figure's front (side view) / right (front view)
    J.pel = [p.px, p.py]; J.u = u; J.n = n;
    J.sh = add(J.pel, vec(p.t, L.torso - p.shrug * .3));
    if (view === "side") {
      J.shN = J.sh; J.shF = add(J.sh, [-n[0] * 1.5, -n[1] * 1.5]);
      J.eN = add(J.shN, vec(p.aN, L.upper * p.sN)); J.hN = add(J.eN, vec(p.eN, L.fore * p.sN));
      J.eF = add(J.shF, vec(p.aF, L.upper * p.sF)); J.hF = add(J.eF, vec(p.eF, L.fore * p.sF));
      J.hipN = J.pel; J.hipF = add(J.pel, [-1, 0]);
      J.kN = add(J.hipN, vec(p.lN, L.thigh)); J.anN = add(J.kN, vec(p.kN, L.shin)); J.toeN = add(J.anN, vec(p.fN, L.foot));
      J.kF = add(J.hipF, vec(p.lF, L.thigh)); J.anF = add(J.kF, vec(p.kF, L.shin)); J.toeF = add(J.anF, vec(p.fF, L.foot));
    } else {
      const sw = 25, hw = 10;
      J.shL = add(J.sh, [-n[0] * sw, -n[1] * sw - p.shrug * .7]); J.shR = add(J.sh, [n[0] * sw, n[1] * sw - p.shrug * .7]);
      J.eL = add(J.shL, vec(p.aL, L.upper * p.sL)); J.hL = add(J.eL, vec(p.eL, L.fore * p.sL));
      J.eR = add(J.shR, vec(p.aR, L.upper * p.sR)); J.hR = add(J.eR, vec(p.eR, L.fore * p.sR));
      J.hipL = add(J.pel, [-n[0] * hw, -n[1] * hw + 6]); J.hipR = add(J.pel, [n[0] * hw, n[1] * hw + 6]);
      J.kL = add(J.hipL, vec(p.lL, L.thigh * p.sLL)); J.anL = add(J.kL, vec(p.kL, L.shin));
      J.kR = add(J.hipR, vec(p.lR, L.thigh * p.sLR)); J.anR = add(J.kR, vec(p.kR, L.shin));
      J.hC = [(J.hL[0] + J.hR[0]) / 2, (J.hL[1] + J.hR[1]) / 2];
    }
    J.neck = add(J.sh, vec(p.t, -2));
    J.head = add(J.sh, vec(p.t + (p.h || 0), L.neck + 13 - p.shrug * .6));
    return J;
  }

  /* a tapered limb: two end circles joined by tangent lines */
  function limb(a, b, r1, r2) {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    return `M${f1(a[0] + nx * r1)} ${f1(a[1] + ny * r1)} L${f1(b[0] + nx * r2)} ${f1(b[1] + ny * r2)} A${r2} ${r2} 0 0 0 ${f1(b[0] - nx * r2)} ${f1(b[1] - ny * r2)} L${f1(a[0] - nx * r1)} ${f1(a[1] - ny * r1)} A${r1} ${r1} 0 0 0 ${f1(a[0] + nx * r1)} ${f1(a[1] + ny * r1)} Z`;
  }
  /* a body outline along the torso axis from (fraction, front width, back width) stations */
  function torsoPath(J, st) {
    const fr = [], bk = [];
    for (const [fq, wf, wb] of st) { const c = add(J.pel, [J.u[0] * L.torso * fq, J.u[1] * L.torso * fq]); fr.push(add(c, [J.n[0] * wf, J.n[1] * wf])); bk.push(add(c, [-J.n[0] * wb, -J.n[1] * wb])); }
    const pts = [...fr, ...bk.reverse()];
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 1; i < pts.length; i++) { const p0 = pts[i - 1], p1 = pts[i]; d += ` Q${f1(p0[0])} ${f1(p0[1])} ${f1((p0[0] + p1[0]) / 2)} ${f1((p0[1] + p1[1]) / 2)}`; }
    return d + ` L${f1(pts[pts.length - 1][0])} ${f1(pts[pts.length - 1][1])} Z`;
  }
  const SIDE_TORSO = [[-.08, 9, 13], [.12, 10, 13], [.38, 9, 9], [.66, 13, 10], [.86, 12, 10], [1, 8, 8]];
  const FRONT_TORSO = [[-.1, 19, 19], [.2, 18, 18], [.42, 16, 16], [.72, 24, 24], [.92, 27, 27], [1.02, 18, 18]];
  const SIDE_SHIRT = [[.02, 10, 13.5], [.38, 9.5, 9.5], [.66, 13.5, 10.5], [.86, 12, 10.5], [.97, 8, 9]];
  const FRONT_SHIRT = [[.0, 19.5, 19.5], [.42, 16.5, 16.5], [.72, 22, 22], [.9, 20, 20], [1.0, 13, 13]];

  /* where each muscle glows: [anchor, along-limb fraction or offset, radius x, radius y] per view */
  function musclePos(view, J, m, p) {
    const T = (fq, off, w = 0) => { const c = add(J.pel, [J.u[0] * L.torso * fq, J.u[1] * L.torso * fq]); return add(c, [J.n[0] * off + w * J.u[0], J.n[1] * off + w * J.u[1]]); };
    const mid = (a, b, t = .5) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
    const out = [];
    if (view === "side") {
      const S = {
        chest: [[T(.74, 9), 9, 7]], frontDelt: [[mid(J.shN, J.eN, .12), 7, 7]], sideDelt: [[mid(J.shN, J.eN, .1), 8, 8]], rearDelt: [[add(mid(J.shN, J.eN, .12), [-J.n[0] * 4, -J.n[1] * 4]), 7, 7]],
        traps: [[T(.98, -4), 8, 5]], lats: [[T(.6, -5), 7, 11]], upperBack: [[T(.82, -7), 8, 8]], lowerBack: [[T(.25, -9), 6, 9]],
        abs: [[T(.38, 7), 6, 10]], obliques: [[T(.35, 2), 6, 9]], biceps: [[mid(J.shN, J.eN, .55), 6, 9]], triceps: [[mid(J.shN, J.eN, .55), 6, 9]],
        forearms: [[mid(J.eN, J.hN, .4), 5, 8]], quads: [[mid(J.hipN, J.kN, .5), 8, 13]], hamstrings: [[mid(J.hipN, J.kN, .55), 8, 13]],
        glutes: [[T(-.02, -9), 9, 9]], calves: [[mid(J.kN, J.anN, .3), 6, 9]], adductors: [[mid(J.hipN, J.kN, .35), 7, 10]], abductors: [[T(-.02, -2), 8, 8]]
      };
      return S[m] || out;
    }
    const F = {
      chest: [[T(.74, -10), 10, 7], [T(.74, 10), 10, 7]], frontDelt: [[mid(J.shL, J.eL, .1), 7, 7], [mid(J.shR, J.eR, .1), 7, 7]],
      sideDelt: [[mid(J.shL, J.eL, .1), 8.5, 8.5], [mid(J.shR, J.eR, .1), 8.5, 8.5]], rearDelt: [[mid(J.shL, J.eL, .1), 7, 7], [mid(J.shR, J.eR, .1), 7, 7]],
      traps: [[T(1.0, -12), 8, 4], [T(1.0, 12), 8, 4]], lats: [[T(.62, -19), 6, 13], [T(.62, 19), 6, 13]], upperBack: [[T(.85, -14), 8, 6], [T(.85, 14), 8, 6]],
      lowerBack: [[T(.25, 0), 12, 7]], abs: [[T(.4, 0), 8, 13]], obliques: [[T(.35, -14), 5, 10], [T(.35, 14), 5, 10]],
      biceps: [[mid(J.shL, J.eL, .55), 6, 9], [mid(J.shR, J.eR, .55), 6, 9]], triceps: [[mid(J.shL, J.eL, .55), 6, 9], [mid(J.shR, J.eR, .55), 6, 9]],
      forearms: [[mid(J.eL, J.hL, .4), 5, 8], [mid(J.eR, J.hR, .4), 5, 8]], quads: [[mid(J.hipL, J.kL, .5), 8, 12], [mid(J.hipR, J.kR, .5), 8, 12]],
      hamstrings: [[mid(J.hipL, J.kL, .5), 7, 11], [mid(J.hipR, J.kR, .5), 7, 11]], glutes: [[T(-.04, -10), 9, 8], [T(-.04, 10), 9, 8]],
      calves: [[mid(J.kL, J.anL, .3), 5, 8], [mid(J.kR, J.anR, .3), 5, 8]],
      adductors: [[mid(J.hipL, J.kL, .3), 5, 8], [mid(J.hipR, J.kR, .3), 5, 8]], abductors: [[mid(J.hipL, J.kL, .15), 6, 8], [mid(J.hipR, J.kR, .15), 6, 8]]
    };
    return F[m] || out;
  }

  /* ---------- drawing ---------- */
  const DEFS = `<defs>
    <linearGradient id="fgSkin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a6fa6"/><stop offset=".55" stop-color="#36588c"/><stop offset="1" stop-color="#253f69"/></linearGradient>
    <linearGradient id="fgSkinV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6fa6"/><stop offset="1" stop-color="#2c4a7a"/></linearGradient>
    <linearGradient id="fgFar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2c4876"/><stop offset="1" stop-color="#1e345a"/></linearGradient>
    <linearGradient id="fgShirt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1d3459"/><stop offset="1" stop-color="#11213d"/></linearGradient>
    <filter id="fgRim" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="1.2" flood-color="#4cc3ff" flood-opacity=".5"/></filter>
    <filter id="fgGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>`;
  const SK = 'fill="url(#fgSkin)" stroke="#5f86c0" stroke-width=".8" stroke-opacity=".55"';
  const FAR = 'fill="url(#fgFar)" stroke="#3d5f93" stroke-width=".7" stroke-opacity=".5"';
  const SHIRT = 'fill="url(#fgShirt)" stroke="#2a6fc4" stroke-width=".8"';
  const SHORTS = 'fill="#0e1a30" stroke="#2a6fc4" stroke-width=".8"';
  const EQ = 'fill="#0a1428" stroke="#2a5a96" stroke-width="1.5"';

  function head(view, J, p, back) {
    const [x, y] = J.head, a = p.t + (p.h || 0) - 180;
    if (view === "front" && back) {
      return `<g transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})"><path d="M${x - 12.5} ${y + 1} q-4 1 -2 6 l2 0 Z M${x + 12.5} ${y + 1} q4 1 2 6 l-2 0 Z" fill="#2f5085"/><path d="M${x} ${y - 15} C${x + 13} ${y - 15} ${x + 13} ${y - 1} ${x + 12} ${y + 4} C${x + 10} ${y + 13} ${x + 5} ${y + 16} ${x} ${y + 16} C${x - 5} ${y + 16} ${x - 10} ${y + 13} ${x - 12} ${y + 4} C${x - 13} ${y - 1} ${x - 13} ${y - 15} ${x} ${y - 15} Z" fill="url(#fgSkinV)" stroke="#5f86c0" stroke-width=".8" stroke-opacity=".55"/><path d="M${x - 12.8} ${y + 6} C${x - 15} ${y - 19} ${x + 15} ${y - 19} ${x + 12.8} ${y + 6} C${x + 8} ${y + 2} ${x - 8} ${y + 2} ${x - 12.8} ${y + 6} Z" fill="#0d1830"/></g>`;
    }
    if (view === "front") {
      return `<g transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})">
        <path d="M${x - 12.5} ${y + 1} q-4 1 -2 6 l2 0 Z M${x + 12.5} ${y + 1} q4 1 2 6 l-2 0 Z" fill="#2f5085"/>
        <path d="M${x} ${y - 15} C${x + 13} ${y - 15} ${x + 13} ${y - 1} ${x + 12} ${y + 4} C${x + 10} ${y + 13} ${x + 5} ${y + 16} ${x} ${y + 16} C${x - 5} ${y + 16} ${x - 10} ${y + 13} ${x - 12} ${y + 4} C${x - 13} ${y - 1} ${x - 13} ${y - 15} ${x} ${y - 15} Z" fill="url(#fgSkinV)" stroke="#5f86c0" stroke-width=".8" stroke-opacity=".55"/>
        <path d="M${x - 12.5} ${y} C${x - 14} ${y - 18} ${x + 14} ${y - 18} ${x + 12.5} ${y} C${x + 10} ${y - 8} ${x - 10} ${y - 8} ${x - 12.5} ${y} Z" fill="#0d1830"/>
        <path d="M${x - 6} ${y + 2} l3 0 M${x + 3} ${y + 2} l3 0 M${x} ${y + 4} l-1 4 l2 0 M${x - 3} ${y + 11} q3 1.5 6 0" stroke="#1a2f52" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>`;
    }
    // side view: facing right
    return `<g transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})">
      <path d="M${x - 11} ${y - 2} C${x - 12} ${y - 15} ${x + 9} ${y - 17} ${x + 11} ${y - 4} L${x + 13.5} ${y + 3} L${x + 11} ${y + 4} L${x + 11} ${y + 9} C${x + 9} ${y + 15} ${x + 2} ${y + 16} ${x - 3} ${y + 14} C${x - 10} ${y + 11} ${x - 11} ${y + 5} ${x - 11} ${y - 2} Z" fill="url(#fgSkinV)" stroke="#5f86c0" stroke-width=".8" stroke-opacity=".55"/>
      <path d="M${x - 11.5} ${y + 2} C${x - 13} ${y - 16} ${x + 9} ${y - 18} ${x + 11} ${y - 5} C${x + 4} ${y - 9} ${x - 3} ${y - 7} ${x - 5} ${y + 3} Z" fill="#0d1830"/>
      <ellipse cx="${x - 2}" cy="${y + 2}" rx="2.6" ry="3.6" fill="#2f5085"/>
      <path d="M${x + 6} ${y - 1} l3 0 M${x + 6} ${y + 10} q2 0 4 -1" stroke="#1a2f52" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>`;
  }

  function equipment(list, J, p, lift) {
    let back = "", front = "";
    const at = k => J[k] || k;
    for (const e of list || []) {
      let s = "";
      if (e.rect) s = `<rect x="${e.rect[0]}" y="${e.rect[1]}" width="${e.rect[2]}" height="${e.rect[3]}" rx="${e.rx || 2}" ${EQ}${e.rot ? ` transform="rotate(${e.rot} ${e.rect[0] + e.rect[2] / 2} ${e.rect[1] + e.rect[3] / 2})"` : ""}/>`;
      if (e.poly) s = `<path d="M${e.poly.map(q => q.join(" ")).join(" L")} Z" ${EQ}/>`;
      if (e.line) s = `<path d="M${e.line.map(q => q.join(" ")).join(" L")}" fill="none" stroke="#2a5a96" stroke-width="${e.w || 3}" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (e.stack) { const [x, y, w, h] = e.stack, rise = (e.rise || 22) * lift; s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${EQ}/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${x + 2}" y="${f1(y + h - 8 - i * 7 - (i === 4 ? rise : 0))}" width="${w - 4}" height="6" fill="#16294a" stroke="#2a5a96" stroke-width=".8"/>`).join(""); }
      if (e.pulley) s = `<circle cx="${e.pulley[0]}" cy="${e.pulley[1]}" r="5" fill="none" stroke="#7f96bd" stroke-width="1.5"/>`;
      if (e.cable) { const a = at(e.cable[0]), b = at(e.cable[1]); s = `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#7f96bd" stroke-width="1.4" stroke-opacity=".85"/>`; }
      if (e.handle) { const h = at(e.handle); s = `<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="4.5" fill="#7f96bd" stroke="#0a1428"/>`; }
      if (e.bar) { const a = at(e.bar[0]), b = at(e.bar[1]), ex = e.ext || 10, dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; s = `<line x1="${f1(a[0] - dx / l * ex)}" y1="${f1(a[1] - dy / l * ex)}" x2="${f1(b[0] + dx / l * ex)}" y2="${f1(b[1] + dy / l * ex)}" stroke="#9fb3cc" stroke-width="3.5" stroke-linecap="round"/>`; }
      if (e.db) { const h = at(e.db); s = `<rect x="${f1(h[0] - 9)}" y="${f1(h[1] - 2)}" width="18" height="4" fill="#9fb3cc"/><rect x="${f1(h[0] - 12)}" y="${f1(h[1] - 6)}" width="5" height="12" rx="1" fill="#7f96bd"/><rect x="${f1(h[0] + 7)}" y="${f1(h[1] - 6)}" width="5" height="12" rx="1" fill="#7f96bd"/>`; }
      if (e.pad) { const h = at(e.pad); s = `<circle cx="${f1(h[0] + (e.dx || 0))}" cy="${f1(h[1] + (e.dy || 0))}" r="${e.r || 7}" fill="#16294a" stroke="#2a5a96" stroke-width="1.5"/>`; }
      if (e.plate) { const a = at(e.plate[0]), b = at(e.plate[1]); s = `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#2a5a96" stroke-width="6" stroke-linecap="round"/>`; }
      if (e.arm) { const a = e.arm[0], b = at(e.arm[1]); s = `<line x1="${a[0]}" y1="${a[1]}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#2a5a96" stroke-width="5" stroke-linecap="round"/><circle cx="${a[0]}" cy="${a[1]}" r="4" fill="#0a1428" stroke="#2a5a96" stroke-width="1.5"/>`; }
      if (e.front) front += s; else back += s;
    }
    return [back, front];
  }

  function figure(view, J, p, opts) {
    const o = [];
    if (view === "side") {
      // far side first, darker
      o.push(`<path d="${limb(J.kF, J.anF, 6.5, 4)}" ${FAR}/><path d="${limb(J.anF, J.toeF, 4, 3)}" fill="#0c1424"/><path d="${limb(J.hipF, J.kF, 10, 6.5)}" ${FAR}/>`);
      o.push(`<path d="${limb(J.shF, J.eF, 7, 5.5)}" ${FAR}/><path d="${limb(J.eF, J.hF, 5.5, 4)}" ${FAR}/>`);
      o.push(`<path d="${torsoPath(J, SIDE_TORSO)}" fill="url(#fgSkinV)"/>`);
      o.push(`<path d="${limb(J.sh, add(J.sh, vec(p.t, 9)), 5.5, 5)}" fill="url(#fgSkinV)"/>`);
      o.push(`<path d="${torsoPath(J, SIDE_SHIRT)}" ${SHIRT}/>`);
      o.push(`<path d="${limb(add(J.pel, [J.u[0] * -3, J.u[1] * -3]), add(J.hipN, vec(p.lN, L.thigh * .42)), 12.5, 10)}" ${SHORTS}/>`);
      o.push(`<path d="${limb(J.kN, J.anN, 6.5, 4)}" ${SK}/><path d="${limb(J.anN, J.toeN, 4.5, 3)}" fill="#0c1424" stroke="#2a6fc4" stroke-width=".8"/>`);
      o.push(`<path d="${limb(add(J.hipN, vec(p.lN, L.thigh * .4)), J.kN, 9, 6.5)}" ${SK}/>`);
      o.push(head(view, J, p));
      o.push(`<path d="${limb(J.shN, J.eN, 7.5, 5.5)}" ${SK}/><path d="${limb(J.eN, J.hN, 5.5, 4)}" ${SK}/><circle cx="${f1(J.shN[0])}" cy="${f1(J.shN[1])}" r="8" ${SK}/><circle cx="${f1(J.hN[0])}" cy="${f1(J.hN[1])}" r="4.6" fill="#3a5d93"/>`);
    } else {
      o.push(`<path d="${limb(J.kL, J.anL, 6.5, 4)}" ${SK}/><path d="${limb(J.kR, J.anR, 6.5, 4)}" ${SK}/>`);
      o.push(`<ellipse cx="${f1(J.anL[0] - 3)}" cy="${f1(J.anL[1] + 4)}" rx="8" ry="3.6" fill="#0c1424" stroke="#2a6fc4" stroke-width=".8"/><ellipse cx="${f1(J.anR[0] + 3)}" cy="${f1(J.anR[1] + 4)}" rx="8" ry="3.6" fill="#0c1424" stroke="#2a6fc4" stroke-width=".8"/>`);
      o.push(`<path d="${limb(J.hipL, J.kL, 10, 6.5)}" ${SK}/><path d="${limb(J.hipR, J.kR, 10, 6.5)}" ${SK}/>`);
      o.push(`<path d="${limb(J.hipL, add(J.hipL, vec(p.lL, L.thigh * .45 * p.sLL)), 11, 10)}" ${SHORTS}/><path d="${limb(J.hipR, add(J.hipR, vec(p.lR, L.thigh * .45 * p.sLR)), 11, 10)}" ${SHORTS}/>`);
      o.push(`<path d="M${f1(J.pel[0] - 20)} ${f1(J.pel[1] - 4)} L${f1(J.pel[0] + 20)} ${f1(J.pel[1] - 4)} L${f1(J.pel[0] + 20)} ${f1(J.pel[1] + 12)} L${f1(J.pel[0] - 20)} ${f1(J.pel[1] + 12)} Z" ${SHORTS}/>`);
      if (opts.armsBehind) o.push(armsF(J));
      o.push(`<path d="${limb(J.sh, J.head, 6.5, 5.5)}" fill="url(#fgSkinV)"/>`);
      o.push(`<path d="${torsoPath(J, FRONT_TORSO)}" fill="url(#fgSkinV)" stroke="#5f86c0" stroke-width=".8" stroke-opacity=".55"/>`);
      o.push(`<path d="${torsoPath(J, FRONT_SHIRT)}" ${SHIRT}/>`);
      const c = add(J.pel, [J.u[0] * L.torso * .66, J.u[1] * L.torso * .66]), w = add(J.pel, [J.u[0] * L.torso * .2, J.u[1] * L.torso * .2]);
      if (!opts.back) o.push(`<path d="M${f1(c[0] - 13)} ${f1(c[1])} Q${f1(c[0])} ${f1(c[1] + 5)} ${f1(c[0] + 13)} ${f1(c[1])} M${f1(c[0])} ${f1(c[1] + 3)} L${f1(w[0])} ${f1(w[1])}" fill="none" stroke="#2a6fc4" stroke-width=".8" stroke-opacity=".6"/>`);
      o.push(`<path class="fgTraps" d="M${f1(J.sh[0] - 7)} ${f1(J.sh[1] - 6)} Q${f1(J.shL[0] + 7)} ${f1(J.shL[1] - 6)} ${f1(J.shL[0])} ${f1(J.shL[1] - 2)} L${f1(J.sh[0] - 8)} ${f1(J.sh[1] + 2)} Z M${f1(J.sh[0] + 7)} ${f1(J.sh[1] - 6)} Q${f1(J.shR[0] - 7)} ${f1(J.shR[1] - 6)} ${f1(J.shR[0])} ${f1(J.shR[1] - 2)} L${f1(J.sh[0] + 8)} ${f1(J.sh[1] + 2)} Z" fill="#ff5d6c" opacity="0"/>`);
      o.push(head(view, J, p, opts.back));
      if (!opts.armsBehind) o.push(armsF(J));
    }
    return o.join("");
    function armsF(J) {
      return `<path d="${limb(J.shL, J.eL, 7.5, 5.5)}" ${SK}/><path d="${limb(J.eL, J.hL, 5.5, 4)}" ${SK}/><circle cx="${f1(J.shL[0])}" cy="${f1(J.shL[1])}" r="8.5" ${SK}/><circle cx="${f1(J.hL[0])}" cy="${f1(J.hL[1])}" r="5" fill="#3a5d93"/>` +
        `<path d="${limb(J.shR, J.eR, 7.5, 5.5)}" ${SK}/><path d="${limb(J.eR, J.hR, 5.5, 4)}" ${SK}/><circle cx="${f1(J.shR[0])}" cy="${f1(J.shR[1])}" r="8.5" ${SK}/><circle cx="${f1(J.hR[0])}" cy="${f1(J.hR[1])}" r="5" fill="#3a5d93"/>`;
    }
  }

  /* pose at time t (seconds) */
  const TEMPO = { up: 1, top: .5, down: 2, bottom: .5 };
  function poseAt(spec, v, t) {
    const tp = { ...TEMPO, ...(spec.tempo || {}), ...((v && v.tempo) || {}) }, PH = [["up", tp.up], ["top", tp.top], ["down", tp.down], ["bottom", tp.bottom]], REP = PH.reduce((s, x) => s + x[1], 0);
    let k = t % REP, i = 0; while (i < 3 && k > PH[i][1]) { k -= PH[i][1]; i++; }
    const fr = PH[i][1] ? k / PH[i][1] : 1, lift = i === 0 ? ease(fr) : i === 1 ? 1 : i === 2 ? 1 - ease(fr) : 0;
    const base = { ...BASE[spec.view], ...(spec.base || {}) };
    const A = { ...base, ...spec.A, ...((v && v.A) || {}) }, B = { ...base, ...spec.A, ...spec.B, ...((v && v.A) || {}), ...((v && v.B) || {}) };
    const P = {}; for (const key of Object.keys(A)) P[key] = typeof A[key] === "number" ? lerp(A[key], B[key] ?? A[key], lift) : A[key];
    if (v && v.wobble) { const w = Math.sin(t * Math.PI * 2 / REP * 2) * v.wobble; for (const [key, amt] of Object.entries(v.wobbleKeys || { t: 1 })) P[key] += w * amt * (i === 0 ? 1 : .3); }
    return { P, lift, phase: i };
  }
  const PHASE = ["Lift", "Squeeze", "Lower slowly", "Reset"];

  function render(svg, spec, v, t) {
    const { P, lift, phase } = poseAt(spec, v, t);
    let J = joints(spec.view, P);
    // anchor: shift the whole body so a joint stays put (feet on a platform, hands on a fixed bar)
    const anc = (v && v.anchor) || spec.anchor;
    if (anc) { const j = J[anc.j], dx = anc.x != null ? anc.x - j[0] : 0, dy = anc.y != null ? anc.y - j[1] : 0; P.px += dx; P.py += dy; J = joints(spec.view, P); }
    const [eqBack, eqFront] = equipment(spec.eq, J, P, lift);
    const red = new Set((v && v.red) || []), work = spec.work || [];
    let glow = "";
    const oneSide = list => spec.oneSide && list.length > 1 ? [list.reduce((x, y) => (spec.oneSide === "R" ? y[0][0] > x[0][0] : y[0][0] < x[0][0]) ? y : x)] : list;
    for (const [m, w] of work) for (const [c, rx, ry] of oneSide(musclePos(spec.view, J, m, P))) {
      const op = (red.size && !red.has(m) ? .25 : .3) + (red.has(m) ? .55 : .6 * w) * lift;
      glow += `<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${rx}" ry="${ry}" fill="${red.has(m) ? "#ff5d6c" : "#4cc3ff"}" opacity="${op.toFixed(2)}" filter="url(#fgGlow)"/>`;
    }
    for (const m of red) if (!work.some(x => x[0] === m)) for (const [c, rx, ry] of musclePos(spec.view, J, m, P)) glow += `<ellipse cx="${f1(c[0])}" cy="${f1(c[1])}" rx="${rx}" ry="${ry}" fill="#ff5d6c" opacity="${(.2 + .7 * lift).toFixed(2)}" filter="url(#fgGlow)"/>`;
    let guide = "";
    if (spec.guide) { const g = spec.guide; guide = `<line x1="${g[0]}" y1="${g[1]}" x2="${g[2]}" y2="${g[3]}" stroke="#ffc861" stroke-width="1" stroke-dasharray="4 4" opacity=".7"/><text x="${g[4]}" y="${g[5]}" fill="#ffc861" font-size="10" font-family="Exo 2, sans-serif">${g[6]}</text>`; }
    svg.innerHTML = DEFS + `<line x1="6" y1="${FLOOR}" x2="314" y2="${FLOOR}" stroke="#183a66" stroke-width="2"/>` + eqBack +
      `<g filter="url(#fgRim)">${figure(spec.view, J, P, spec)}</g>` + glow + eqFront + guide;
    if (v && v.ring && J[v.ring]) svg.insertAdjacentHTML("beforeend", `<circle cx="${f1(J[v.ring][0])}" cy="${f1(J[v.ring][1])}" r="11" fill="none" stroke="#ff5d6c" stroke-width="2" stroke-dasharray="3 3" opacity="${(.4 + .6 * lift).toFixed(2)}"/>`);
    if (P.shrug > 1 && spec.view === "front") { const tr = svg.querySelector(".fgTraps"); if (tr) tr.setAttribute("opacity", Math.min(.85, P.shrug / 10).toFixed(2)); }
    return { lift, phase };
  }

  /* public: play a guide's animation in an <svg>; returns a stop function */
  function play(svg, spec, getVariant, onFrame) {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, t0 = performance.now(), lastV = null;
    const frame = now => {
      const v = getVariant();
      if (v !== lastV) { lastV = v; t0 = now; }
      const r = render(svg, spec, v, still ? 1.2 : (now - t0) / 1000);
      onFrame && onFrame(r);
      if (!still) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }
  window.SL_FORM_ENGINE = { play, render, PHASE, joints };
})();
