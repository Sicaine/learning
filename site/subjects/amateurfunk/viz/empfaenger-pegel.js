// Empfänger-Pegel-Labor: (1) AGC bei Fading und bei CW, (2) Dämpfungsglied gegen Übersteuerung, (3) Ort des Vorverstärkers.
// Vereinfachte Modelle mit typischen Zahlen. params: { start?: 'agc' | 'att' | 'pre' }
import { controls, readout, goals } from '../../../assets/js/vizkit/controls.js';
import { chart, h, txt, line, rect, poly, dec, trimDec } from './_funk.js';

const lin = db => 10 ** (db / 10), dbOf = x => 10 * Math.log10(x);

export default function mount(stage, { params = {}, complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const wrap = h('div'); root.append(wrap);
  let ch = null;
  const ui = controls(root, [
    { id: 'm', type: 'seg', label: 'Experiment', options: [['agc', 'AGC'], ['att', 'Dämpfungsglied'], ['pre', 'Vorverstärker']], value: params.start ?? 'agc' },
    { id: 'sig', type: 'seg', label: 'Signal', options: [['fade', 'SSB mit Fading'], ['cw', 'CW: stark, dann schwach']], value: 'fade' },
    { id: 'agc', type: 'seg', label: 'AGC', options: [['off', 'aus'], ['slow', 'slow'], ['fast', 'fast']], value: 'slow' },
    { id: 'strong', label: 'Pegel des starken Senders', min: -60, max: -10, step: 5, value: -20, format: v => v + ' dBm', digits: 0 },
    { id: 'att', label: 'Dämpfungsglied', type: 'seg', options: [[0, '0 dB'], [10, '10 dB'], [20, '20 dB'], [30, '30 dB']], value: 0 },
    { id: 'loss', label: 'Kabeldämpfung', min: 1, max: 12, step: 1, value: 6, format: v => v + ' dB', digits: 0 },
    { id: 'pos', type: 'seg', label: 'Vorverstärker (20 dB, NF 1,5 dB) sitzt …', options: [['rx', 'am Empfängereingang'], ['ant', 'direkt an der Antenne']], value: 'rx' },
  ], run);
  const out = readout(root, [{ id: 'a', label: '', hl: true }, { id: 'b', label: '' }, { id: 'c', label: '' }]);
  const note = h('div', { class: 'vz-note', style: 'line-height:1.55;margin:6px 0;min-height:3.2em' }); root.append(note);
  const g = goals(root, [
    { id: 'off', label: 'AGC aus: die Lautstärke schwankt voll mit dem Fading' },
    { id: 'on', label: 'AGC an: Schwankung am Ausgang unter 6 dB' },
    { id: 'cw', label: 'CW: erst mit schneller AGC bleibt das schwache Signal nach dem starken hörbar' },
    { id: 'att', label: 'Dämpfungsglied beseitigt die Übersteuerung, das Nutzsignal bleibt hörbar' },
    { id: 'pre', label: 'Vorverstärker an die Antenne: Rauschzahl des Systems unter 3 dB' },
  ], () => complete?.());
  const lab = (a, b, c) => { const cells = out.el.querySelectorAll('.vz-stat'); [a, b, c].forEach((t, i) => { cells[i].firstChild.textContent = t[0]; cells[i].querySelector('b').textContent = t[1]; }); };
  const seen = {};

  function run(v, id) {
    ch?.svg.remove(); wrap.replaceChildren();
    const VIS = { agc: ['sig', 'agc'], att: ['strong', 'att'], pre: ['loss', 'pos'] };
    for (const k of ['sig', 'agc', 'strong', 'att', 'loss', 'pos']) { const bx = ui.el.querySelector(`[data-id="${k}"]`); if (bx) bx.style.display = VIS[v.m].includes(k) ? '' : 'none'; }
    if (v.m === 'agc') {
      ch = chart(wrap, { h: 230, x: [0, 10], y: [-60, 10], xticks: [0, 2, 4, 6, 8, 10], xfmt: t => t + ' s', yticks: [-60, -40, -20, 0], yfmt: t => t + ' dB', aria: 'Eingangspegel und Lautstärke am Ausgang des Empfängers über der Zeit' });
      const N = 400, dt = 10 / N, thr = -30, slope = 0.08, tau = v.agc === 'fast' ? 0.08 : 0.35;
      const inp = t => v.sig === 'fade' ? -10 + 11 * Math.sin(t * 0.7) + 6 * Math.sin(t * 1.5 + 1) : (t < 2 ? -80 : t < 3.2 ? -4 : t < 3.4 ? -80 : t < 7 ? -36 : -80);
      const sigAbs = t => v.sig === 'fade' ? t >= 0.5 : (t >= 2 && t < 3.2) || (t >= 3.4 && t < 7);
      const tg0 = x => (v.agc === 'off' ? 0 : -Math.max(0, x - thr) * (1 - slope)); let gain = tg0(inp(0)); const A = [], B = [];
      let mnIn = 1e9, mxIn = -1e9, mnOut = 1e9, mxOut = -1e9, weakOut = [];
      for (let i = 0; i <= N; i++) {
        const t = i * dt, x = inp(t);
        let target = 0; if (v.agc !== 'off') target = -Math.max(0, x - thr) * (1 - slope);
        gain = target < gain ? target : gain + (target - gain) * (1 - Math.exp(-dt / tau));
        const y = x + gain;
        A.push([ch.X(t), ch.Y(Math.max(-60, x))]); B.push([ch.X(t), ch.Y(Math.max(-60, y))]);
        if (sigAbs(t)) { mnIn = Math.min(mnIn, x); mxIn = Math.max(mxIn, x); mnOut = Math.min(mnOut, y); mxOut = Math.max(mxOut, y); }
        if (v.sig === 'cw' && t >= 3.5 && t < 4.0) weakOut.push(y);
      }
      ch.add(line(ch.X(0), ch.Y(thr), ch.X(10), ch.Y(thr), { color: 'var(--muted)', w: 1, dash: '4 4' }), txt(ch.X(10) - 4, ch.Y(thr) - 4, 'AGC-Schwelle', { anchor: 'end', size: 10.5 }), line(ch.X(0), ch.Y(-45), ch.X(10), ch.Y(-45), { color: 'var(--bad)', w: 1, dash: '2 4', opacity: 0.6 }), txt(ch.X(0) + 4, ch.Y(-45) - 4, 'Hörschwelle', { size: 10.5, fill: 'var(--bad)' }),
        poly(A, { color: 'var(--muted)', w: 1.8, dash: '5 4' }), poly(B, { color: 'var(--accent)', w: 2.4 }));
      const dIn = mxIn - mnIn, dOut = mxOut - mnOut, wMin = weakOut.length ? Math.min(...weakOut) : 0;
      lab(['Schwankung Eingang', dec(dIn, 0) + ' dB'], ['Schwankung Ausgang', dec(dOut, 0) + ' dB'], v.sig === 'cw' ? ['schwaches Signal', wMin > -45 ? 'hörbar' : 'überdeckt'] : ['AGC', v.agc]);
      note.innerHTML = 'Die <b>AGC</b> (Automatic Gain Control) regelt die Verstärkung im <b>Empfangszweig</b> so, dass die Lautstärke bei schwankendem Eingangssignal (Fading) nahezu konstant bleibt. Die ALC gehört dagegen zum Sendezweig. Bei <b>SSB</b> passen „slow“ oder „normal“, bei <b>CW</b> „fast“ oder „normal“: Eine zu träge AGC lässt ein starkes Signal das schwache dahinter überdecken.';
      if (id) {
        if (v.sig === 'fade' && v.agc === 'off' && dOut > 25) g.reach('off');
        if (v.sig === 'fade' && v.agc !== 'off' && dOut < 6) g.reach('on');
        if (v.sig === 'cw') { if (v.agc === 'slow') seen.slowMasked = wMin <= -45; if (v.agc === 'fast' && wMin > -45 && seen.slowMasked) g.reach('cw'); }
      }
    } else if (v.m === 'att') {
      ch = chart(wrap, { h: 230, x: [0, 10], y: [-130, 0], xticks: [], yticks: [-120, -90, -60, -30, 0], yfmt: t => t + ' dBm', aria: 'Pegel am Empfängereingang: starker Sender, Nutzsignal, Eigenrauschen und Übersteuerungsgrenze' });
      const strong = v.strong - v.att, wanted = -100 - v.att, noise = -125, limit = -30;
      const over = strong > limit, margin = wanted - noise;
      ch.add(rect(ch.m.l, ch.m.t, ch.W - ch.m.l - ch.m.r, ch.Y(limit) - ch.m.t, { fill: 'var(--bad)', fo: 0.08 }), line(ch.m.l, ch.Y(limit), ch.W - ch.m.r, ch.Y(limit), { color: 'var(--bad)', w: 1.5, dash: '5 4' }), txt(ch.m.l + 4, ch.Y(limit) - 5, 'Eingangsstufe und 1. Mischer übersteuert', { size: 10.5, fill: 'var(--bad)' }),
        rect(ch.m.l, ch.Y(noise), ch.W - ch.m.l - ch.m.r, ch.Y(-130) - ch.Y(noise), { fill: 'var(--muted)', fo: 0.15 }), txt(ch.m.l + 4, ch.Y(noise) + 13, 'Eigenrauschen des Empfängers', { size: 10.5 }));
      const bar = (x, val, col, lbl) => ch.add(rect(ch.X(x), ch.Y(val), ch.X(x + 2.6) - ch.X(x), ch.Y(-130) - ch.Y(val), { fill: col, fo: 0.55, stroke: col }), txt(ch.X(x + 1.3), ch.Y(val) - 5, lbl, { anchor: 'middle', size: 11, fill: col, bold: true }));
      bar(1.2, strong, over ? 'var(--bad)' : 'var(--warn)', 'starker Sender ' + strong + ' dBm'); bar(5.6, wanted, margin >= 10 ? 'var(--good)' : 'var(--accent)', 'Nutzsignal ' + wanted + ' dBm');
      lab(['Übersteuerung', over ? 'ja (verzerrt)' : 'nein'], ['Nutzsignal über Rauschen', margin + ' dB'], ['Dämpfungsglied', v.att + ' dB']);
      note.innerHTML = over ? 'Der starke Sender übersteuert den Eingang: Das gewünschte Signal klingt <b>verzerrt und unverständlich</b>. Ein <b>Dämpfungsglied</b> (Abschwächer, ATT) schwächt alle Eingangssignale um denselben Betrag: Der starke Sender rutscht aus dem Übersteuerungsbereich, das Nutzsignal sinkt, bleibt aber über dem Rauschen.' : 'Kein Problem mit der Aussteuerung. Auf Kurzwelle kann man mit dem Dämpfungsglied bewusst Übersteuerung vermeiden, bei VHF/UHF dagegen verstärkt man lieber.';
      if (id && !over && v.att > 0 && margin >= 10 && v.strong >= -30) g.reach('att');
    } else {
      const L = v.loss, Gp = 20, Fp = 1.5, Fr = 8;   // dB
      const Ll = lin(L), Gl = lin(Gp), Fpl = lin(Fp), Frl = lin(Fr);
      const F = v.pos === 'ant' ? Fpl + (Ll - 1) / Gl + (Frl - 1) * Ll / Gl : Ll * (Fpl + (Frl - 1) / Gl);
      const Fdb = dbOf(F), Frx = dbOf(Ll * Frl);
      ch = chart(wrap, { h: 190, x: [0, 10], y: [0, 16], xticks: [], yticks: [0, 4, 8, 12, 16], yfmt: t => t + ' dB', aria: 'Rauschzahl des Empfangssystems mit und ohne Vorverstärker an der Antenne' });
      const bar = (x, val, col, lbl) => ch.add(rect(ch.X(x), ch.Y(val), ch.X(x + 2.6) - ch.X(x), ch.Y(0) - ch.Y(val), { fill: col, fo: 0.55, stroke: col }), txt(ch.X(x + 1.3), ch.Y(val) - 5, trimDec(val, 1) + ' dB', { anchor: 'middle', size: 12, fill: col, bold: true }), txt(ch.X(x + 1.3), ch.Y(0) + 15, lbl, { anchor: 'middle', size: 10.5 }));
      bar(1.2, Frx, 'var(--bad)', 'ohne Vorverstärker'); bar(5.6, Fdb, v.pos === 'ant' ? 'var(--good)' : 'var(--warn)', 'mit Vorverstärker (' + (v.pos === 'ant' ? 'an der Antenne' : 'am Empfänger') + ')');
      lab(['Rauschzahl System', trimDec(Fdb, 1) + ' dB'], ['ohne Vorverstärker', trimDec(Frx, 1) + ' dB'], ['Kabeldämpfung', L + ' dB']);
      note.innerHTML = 'Hinter dem Kabel kann der Vorverstärker nur noch ein Signal verstärken, das das Kabel schon abgeschwächt (und relativ verrauscht) hat: Die Kabeldämpfung geht voll in die Rauschzahl ein. <b>Direkt an der Antenne</b> verstärkt er das noch unverfälschte Signal, die Kabelverluste spielen kaum noch eine Rolle. Er muss beim Senden abgeschaltet werden (PTT-gesteuert).';
      if (id && v.pos === 'ant' && Fdb < 3) g.reach('pre');
    }
  }
  run(ui.values);
}
