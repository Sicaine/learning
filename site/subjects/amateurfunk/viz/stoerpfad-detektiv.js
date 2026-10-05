// Beeinflussungs-Detektiv: Szenario lesen, Eindringweg der HF bestimmen (Einstrahlung über Antenne / Direkteinstrahlung / Einströmung über Leitungen)
// und die passende Abhilfe wählen. Fakten: DARC 50ohm.de (CC BY 4.0), BNetzA-Fragenkatalog 3. Aufl. (Kapitel NJ/EJ).
// params: { need?: 6 }  — so viele Szenarien müssen gelöst werden
import { h, s } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const WEGE = [
  ['ant', 'Einstrahlung über die Empfangsantenne'],
  ['direkt', 'Direkteinstrahlung durch das Gehäuse'],
  ['leitung', 'Einströmung über Anschlussleitungen'],
];
const MASS = [
  ['hp', 'Hochpassfilter vor den Antenneneingang'],
  ['mws', 'Mantelwellensperre (Ferrit-Ringkern) in die Zuleitung'],
  ['schirm', 'Geschirmte Leitung verwenden'],
  ['aussen', 'Außenantenne statt Zimmerantenne'],
  ['metall', 'Geschlossenes Metallgehäuse'],
];
const SC = [
  { id: 'zimmer', t: 'Zimmerantenne', txt: 'Der Nachbar empfängt Fernsehen über eine **Zimmerantenne**. Sobald du auf 2 m sendest, ist das Bild gestört. Die HF dringt über die Empfangsantenne des Fernsehers ein.', weg: 'ant', mass: 'aussen',
    why: 'Der Empfang über die Zimmerantenne ist schwach und damit empfindlich: Die Empfangsantenne sammelt dein Signal mit ein. Eine außen angebrachte Fernsehantenne mit gutem Nutzsignal verbessert die Lage.' },
  { id: 'kw-tv', t: 'KW-Sender, DVB-T2-Fernseher', txt: 'Dein **28-MHz-Sender** beeinflusst einen **DVB-T2-Fernseher** über dessen **Antenneneingang**: Das starke Kurzwellensignal gelangt über das Antennenkabel in den Eingang und übersteuert ihn.', weg: 'ant', mass: 'hp',
    why: 'Das Nutzband (470–690 MHz) liegt weit über dem Störsignal. Ein Hochpassfilter vor dem Antenneneingang lässt das Fernsehband durch und sperrt die Kurzwelle.' },
  { id: 'mantel', t: 'Signal im Kabelmantel', txt: 'Das Signal deines **144-MHz-Senders** wird in das **Koax-Antennenkabel** eines UKW/DAB-Rundfunkempfängers **induziert** und fließt als Gleichtaktstrom auf dem Kabelmantel zum Gerät.', weg: 'leitung', mass: 'mws',
    why: 'Gleichtakt-HF auf dem Kabelmantel blockiert eine Mantelwellensperre (Ferrit-Ringkern oder Klappferrit), ohne das Nutzsignal im Innenleiter zu bedämpfen.' },
  { id: 'hifi', t: 'Hi-Fi-Anlage', txt: 'Aus den Lautsprechern der Musikanlage des Nachbarn hörst du bei jeder Aussendung dein Signal. Es wird **Einströmung in die NF-Endstufe** festgestellt: Die HF läuft über die Lautsprecherleitungen in den Verstärker.', weg: 'leitung', mass: 'schirm',
    why: 'Die Lautsprecherleitungen wirken wie Antennen. Geschirmte Lautsprecherleitungen verringern die Einkopplung.' },
  { id: 'tuer', t: 'Türsprechanlage', txt: 'Die **Türsprechanlage** im Einfamilienhaus knackt, wenn dein Sender in der Nähe in Betrieb ist. Die Anlage hat lange, ungeschirmte Verbindungsleitungen.', weg: 'leitung', mass: 'schirm',
    why: 'Steuer- und Verbindungsleitungen sammeln HF ein. Ein geschirmtes Verbindungskabel verringert die Beeinflussung; Kabel verlängern, dünner machen oder versilbern hilft nicht.' },
  { id: 'netz', t: 'Antenne parallel zum Netzkabel', txt: 'Deine **Kurzwellen-Sendeantenne** verläuft in der Nähe und **parallel zu einer 230-V-Leitung**. Geräte am Netz melden Störungen, die HF-Ströme sind ins Stromnetz eingekoppelt.', weg: 'leitung', mass: 'mws',
    why: 'Die HF fließt über die Netzleitung ins Gerät. Filter bzw. Mantelwellensperren (Verdrosselung) in der Zuleitung des betroffenen Geräts unterdrücken sie; die Antenne sollte außerdem nicht parallel zur Netzleitung verlaufen.' },
  { id: 'selbstbau', t: 'Selbstbau-Endstufe', txt: 'Deine selbstgebaute **HF-Endstufe** steckt in einem **Kunststoffgehäuse**. Der Vorverstärker daneben bekommt HF-Anteile ab, obwohl keine Leitung dazwischen verläuft.', weg: 'direkt', mass: 'metall',
    why: 'Ohne Kabelverbindung bleibt nur die direkte Einstrahlung durch das Gehäuse. HF-Baugruppen gehören in ein möglichst geschlossenes Metallgehäuse.' },
];

import { adaptive } from './_fit.js';

export default function mount(stage, opts) { adaptive(stage, W => build(stage, opts, W)); }

function build(stage, { params = {}, complete, md }, W) {
  const need = Math.min(params.need ?? 6, SC.length);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const H = 176;
  const svg = s('svg', { class: 'vz-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Sender links, gestörtes Gerät rechts, drei mögliche Wege der HF: über die Antenne, durch das Gehäuse, über Leitungen' });
  root.append(svg);
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px;margin:8px 0' });
  const title = h('div', { style: 'font-weight:700;margin-bottom:4px' }), txt = h('div', { style: 'line-height:1.55' });
  const q1 = h('div', { style: 'margin-top:10px;font-weight:600;font-size:.95rem' }, 'Wie gelangt die HF ins Gerät?');
  const seg1 = h('div', { class: 'vz-seg vk-seg', style: 'flex-wrap:wrap' });
  const q2 = h('div', { style: 'margin-top:10px;font-weight:600;font-size:.95rem' }, 'Welche Abhilfe passt?');
  const seg2 = h('div', { class: 'vz-seg vk-seg', style: 'flex-wrap:wrap' });
  const row = h('div', { style: 'margin-top:12px;display:flex;gap:8px;flex-wrap:wrap' });
  const ok = h('button', { type: 'button', class: 'btn primary', text: 'Prüfen' }), nx = h('button', { type: 'button', class: 'btn ghost', text: 'Nächstes Szenario', style: 'display:none' });
  row.append(ok, nx);
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;line-height:1.5;min-height:2.6em' });
  card.append(title, txt, q1, seg1, q2, seg2, row, fb); root.append(card);
  const g = goals(root, [{ id: 'g', label: `${need} Szenarien gelöst` }], () => complete?.());
  const prog = h('div', { class: 'vz-note', style: 'margin:6px 0' }); root.append(prog);

  let order = shuffle([...SC.keys()]), idx = 0, solved = new Set(), pickW = null, pickM = null, locked = false;
  const mkBtns = (host, list, set) => list.map(([k, l]) => { const b = h('button', { type: 'button', text: l, 'data-k': k, onclick: () => { if (locked) return; set(k); paint(); } }); host.append(b); return b; });
  const bW = mkBtns(seg1, WEGE, k => pickW = k), bM = mkBtns(seg2, MASS, k => pickM = k);
  function paint() {
    bW.forEach(b => b.classList.toggle('on', b.dataset.k === pickW));
    bM.forEach(b => b.classList.toggle('on', b.dataset.k === pickM));
  }
  function scene(hi, chosen) {
    const col = k => hi === k ? 'var(--good)' : chosen === k ? 'var(--bad)' : 'var(--line-2)';
    const wd = k => (hi === k || chosen === k) ? 3 : 1.6;
    const dash = k => hi === k ? '' : '6 5';
    const tcol = k => hi === k ? 'var(--good)' : 'var(--muted)';
    const sx = 34, dx0 = Math.max(W * 0.66, W - 120), dx1 = W - 8, mid = (sx + 24 + dx0) / 2;
    svg.replaceChildren(
      s('rect', { x: 0, y: 0, width: W, height: H, fill: 'var(--surface-2)' }),
      // Sender
      s('line', { x1: sx, y1: 134, x2: sx, y2: 38, stroke: 'var(--ink)', 'stroke-width': 3 }), s('line', { x1: sx - 16, y1: 48, x2: sx + 16, y2: 48, stroke: 'var(--ink)', 'stroke-width': 3 }), s('line', { x1: sx - 11, y1: 60, x2: sx + 11, y2: 60, stroke: 'var(--ink)', 'stroke-width': 2.5 }),
      s('rect', { x: sx - 20, y: 134, width: 40, height: 18, rx: 3, fill: 'var(--surface)', stroke: 'var(--ink-2)' }),
      s('text', { x: 6, y: 170, 'font-size': 12, fill: 'var(--ink)', 'font-weight': 700 }, 'Dein Sender'),
      // Gerät
      s('rect', { x: dx0, y: 80, width: dx1 - dx0, height: 62, rx: 6, fill: 'var(--surface)', stroke: 'var(--ink-2)', 'stroke-width': 2 }),
      s('text', { x: (dx0 + dx1) / 2, y: 106, 'text-anchor': 'middle', 'font-size': 12.5, fill: 'var(--ink)', 'font-weight': 700 }, 'gestörtes'),
      s('text', { x: (dx0 + dx1) / 2, y: 122, 'text-anchor': 'middle', 'font-size': 12.5, fill: 'var(--ink)', 'font-weight': 700 }, 'Gerät'),
      s('line', { x1: dx1 - 22, y1: 80, x2: dx1 - 22, y2: 36, stroke: 'var(--ink)', 'stroke-width': 2.5 }), s('line', { x1: dx1 - 34, y1: 46, x2: dx1 - 10, y2: 46, stroke: 'var(--ink)', 'stroke-width': 2 }),
      // Weg 1: Antenne
      s('path', { d: `M ${sx + 18} 48 C ${mid} 14 ${mid + 40} 14 ${dx1 - 24} 42`, fill: 'none', stroke: col('ant'), 'stroke-width': wd('ant'), 'stroke-dasharray': dash('ant') }),
      s('text', { x: mid, y: 22, 'text-anchor': 'middle', 'font-size': 11.5, fill: tcol('ant'), 'font-weight': 600 }, 'über die Antenne'),
      // Weg 2: Gehäuse direkt
      s('path', { d: `M ${sx + 18} 100 C ${mid} 92 ${mid + 20} 92 ${dx0 - 4} 102`, fill: 'none', stroke: col('direkt'), 'stroke-width': wd('direkt'), 'stroke-dasharray': dash('direkt') }),
      s('text', { x: mid, y: 84, 'text-anchor': 'middle', 'font-size': 11.5, fill: tcol('direkt'), 'font-weight': 600 }, 'durch das Gehäuse'),
      // Weg 3: Leitung
      s('path', { d: `M ${sx + 24} 144 L ${mid + 10} 144 L ${mid + 10} 128 L ${dx0 - 4} 128`, fill: 'none', stroke: col('leitung'), 'stroke-width': wd('leitung'), 'stroke-dasharray': dash('leitung') }),
      s('text', { x: mid, y: 160, 'text-anchor': 'middle', 'font-size': 11.5, fill: tcol('leitung'), 'font-weight': 600 }, 'über Kabel / Leitungen'),
    );
  }
  function load() {
    const c = SC[order[idx]];
    title.textContent = c.t; txt.innerHTML = md(c.txt);
    pickW = pickM = null; locked = false; paint();
    fb.textContent = 'Wähle den Eindringweg und die passende Abhilfe, dann „Prüfen“.';
    ok.style.display = ''; nx.style.display = 'none';
    scene(null, null);
    prog.textContent = `Szenario ${idx + 1} von ${SC.length} · gelöst: ${solved.size}`;
  }
  function check() {
    if (locked) return;
    if (!pickW || !pickM) { fb.textContent = 'Bitte beide Fragen beantworten.'; return; }
    const c = SC[order[idx]];
    const okW = pickW === c.weg, okM = pickM === c.mass;
    scene(c.weg, okW ? null : pickW);
    if (okW && okM) {
      solved.add(c.id); locked = true; ok.style.display = 'none'; nx.style.display = '';
      fb.innerHTML = `<b style="color:var(--good)">Richtig.</b> ${md(c.why)}`;
      if (solved.size >= need) g.reach('g');
    } else {
      fb.innerHTML = `<b style="color:var(--bad)">Noch nicht.</b> ${okW ? 'Der Eindringweg stimmt, die Abhilfe passt aber nicht zu diesem Weg.' : 'Der Eindringweg stimmt nicht: Das Scenario nennt Hinweise (Kabel? Antenne? Gehäuse?).'} Versuche es noch einmal oder lies die Erklärung in der Lektion.`;
      pickW = okW ? pickW : null; pickM = okM ? pickM : null; paint();
    }
    prog.textContent = `Szenario ${idx + 1} von ${SC.length} · gelöst: ${solved.size}`;
  }
  ok.onclick = check;
  nx.onclick = () => { idx = (idx + 1) % SC.length; load(); };
  load();
  stage._test = { solveAll() { for (let i = 0; i < SC.length; i++) { const c = SC[order[idx]]; pickW = c.weg; pickM = c.mass; check(); idx = (idx + 1) % SC.length; load(); } }, SC };
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
