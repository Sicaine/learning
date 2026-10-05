// Fall-Simulator „Darf ich das?“: Situation → Rechtsfolge einordnen, mit Paragraph zum Nachlesen.
// Quellen (Stand 05.10.2026): AFuG §§ 3, 5, 7, 9; AFuV §§ 9, 15, 16; TTDSG/TDDDG §§ 5, 8, 27; FuAG § 2; TKG (Bußgeld Frequenznutzung ohne Zuteilung); VwVG; DARC 50ohm.de (CC BY 4.0).
// params: { need?: 11 }  — richtige Zuordnungen von 14
import { h } from '../../../assets/js/vizkit/base.js';
import { goals } from '../../../assets/js/vizkit/controls.js';

const CATS = [
  ['ok', 'Erlaubt / kein Verstoß'],
  ['owi', 'Ordnungswidrigkeit: Geldbuße'],
  ['straf', 'Straftat: Freiheits- oder Geldstrafe'],
  ['mass', 'Verstoß: Betrieb einschränken, außer Betrieb nehmen, bei Fortsetzung Widerruf der Zulassung'],
  ['voll', 'Vollstreckung nach dem Verwaltungs-Vollstreckungsgesetz'],
];
const SC = [
  { id: 'selbstbau', t: 'Du baust dir einen Transceiver selbst und gehst damit auf Sendung.', c: 'ok', p: 'AFuG § 5 Abs. 2, FuAG § 2 Abs. 1 Nr. 1', why: 'Funkamateure dürfen im Handel erhältliche, selbstgefertigte oder umgebaute Amateurfunkstellen betreiben. Das FuAG gilt für Selbstbau und Umbau nicht, es ist weder CE-Kennzeichnung noch Konformitätsbewertung nötig.' },
  { id: 'ohne-zul', t: 'Du hast die Prüfung bestanden, aber noch keine Zulassung mit Rufzeichen erhalten. Du gehst trotzdem auf Sendung.', c: 'owi', p: 'AFuG § 3 Abs. 3, § 9 Abs. 1 Nr. 1a und Abs. 2', why: 'Betrieb ohne Zulassung und Rufzeichen ist eine Ordnungswidrigkeit; Geldbuße bis 5.000 €.' },
  { id: 'geschaeft', t: 'Du bietest gegen Bezahlung über deine Amateurfunkstelle einen Nachrichtendienst für Firmenkunden an.', c: 'owi', p: 'AFuG § 5 Abs. 4 Nr. 2, § 9 Abs. 1 Nr. 1b und Abs. 2', why: 'Geschäftsmäßiges Erbringen von Telekommunikationsdiensten ist eine Ordnungswidrigkeit; Geldbuße bis 10.000 €.' },
  { id: 'dritte', t: 'Du leitest per Funk eine private Terminabsprache zwischen zwei Nicht-Funkamateuren weiter (kein Amateurfunk-Inhalt). Es ist kein Notfall.', c: 'owi', p: 'AFuG § 5 Abs. 5 Satz 2, § 9 Abs. 1 Nr. 2', why: 'Nachrichten, die nicht den Amateurfunkdienst betreffen, für oder an Dritte zu übermitteln, ist eine Ordnungswidrigkeit; Geldbuße bis 5.000 €.' },
  { id: 'notfall', t: 'Nach einem Hochwasser übermittelst du für die Einsatzleitung Meldungen an Dritte, obwohl sie nicht den Amateurfunkdienst betreffen.', c: 'ok', p: 'AFuG § 5 Abs. 5 Satz 3', why: 'Das Verbot der Nachrichtenübermittlung für Dritte gilt nicht in Not- und Katastrophenfällen.' },
  { id: 'abhoeren', t: 'Du hörst mit einem Empfänger die Gespräche eines Taxi-Betriebsfunks ab.', c: 'straf', p: 'TTDSG/TDDDG § 5 Abs. 1, § 27 Abs. 1 Nr. 1', why: 'Abgehört werden dürfen nur Nachrichten für den Betreiber der Funkanlage, für Funkamateure, die Allgemeinheit oder einen unbestimmten Personenkreis. Verstoß: Freiheitsstrafe bis zu zwei Jahren oder Geldstrafe.' },
  { id: 'weitersagen', t: 'Beim Abstimmen fängst du zufällig ein privates Betriebsfunkgespräch auf. Am Stammtisch erzählst du, was du gehört hast.', c: 'straf', p: 'TTDSG/TDDDG § 5 Abs. 2, § 27 Abs. 1 Nr. 2', why: 'Inhalt und Tatsache des Empfangs dürfen auch bei unbeabsichtigtem Empfang nicht mitgeteilt werden (Ausnahme: Not- und Katastrophenfälle). Die Mitteilung ist strafbar.' },
  { id: 'band', t: 'Du sendest auf 146,5 MHz, knapp oberhalb der Bandgrenze von 146 MHz.', c: 'owi', p: 'TKG (Bußgeldvorschrift), AFuG § 3 Abs. 5', why: 'Als zugeteilt gelten nur die im Frequenzplan für den Amateurfunkdienst ausgewiesenen Frequenzen. Wer Frequenzen ohne Zuteilung nutzt, handelt ordnungswidrig nach dem TKG.' },
  { id: 'verschl', t: 'Du verschlüsselst deine Verbindung, damit niemand mithören kann.', c: 'mass', p: 'AFuV § 16 Abs. 8; AFuG § 3 Abs. 4; Betriebseinschränkung/Außerbetriebnahme', why: 'Verschlüsselung zur Verschleierung des Inhalts verstößt gegen die AFuV. Sie steht nicht im Bußgeldkatalog des § 9 AFuG; die BNetzA kann den Betrieb einschränken oder die Station außer Betrieb nehmen, bei fortgesetzten Verstößen die Zulassung widerrufen.' },
  { id: 'gewerblich', t: 'Du wirbst über deine Amateurfunkstelle für deinen Handwerksbetrieb.', c: 'mass', p: 'AFuG § 5 Abs. 4 Nr. 1 (nicht zu gewerblich-wirtschaftlichen Zwecken)', why: 'Die Amateurfunkstelle darf nicht zu gewerblich-wirtschaftlichen Zwecken betrieben werden. Im Bußgeldkatalog des § 9 AFuG ist nur das geschäftsmäßige Erbringen von Telekommunikationsdiensten genannt; hier greifen die Maßnahmen der BNetzA bis zum Widerruf.' },
  { id: 'fortgesetzt', t: 'Trotz Abmahnung hältst du dich über Monate weiter nicht an AFuG und AFuV.', c: 'mass', p: 'AFuG § 3 Abs. 4 Satz 2', why: 'Bei fortgesetzten Verstößen kann die BNetzA die Zulassung widerrufen. Das Amateurfunkzeugnis bleibt dir erhalten; nur der Funkbetrieb ist beendet.' },
  { id: 'nachbar', t: 'Deine Station ist vorschriftsmäßig. Der Fernseher des Nachbarn ist nicht störfest genug und flimmert, obwohl deine Feldstärke unter dem Normwert liegt.', c: 'ok', p: 'AFuG § 7 Abs. 2, EMVG § 4', why: 'Verantwortung beim Betreiber des Geräts; du darfst weitersenden. Höflich Hilfe anzubieten ist trotzdem klug.' },
  { id: 'umzug', t: 'Du bist umgezogen und meldest die neue Anschrift der Bundesnetzagentur unverzüglich nach dem Umzug.', c: 'ok', p: 'AFuV § 9 Abs. 4', why: 'Änderungen von Name und Anschrift sind unverzüglich nach der Änderung anzuzeigen, auch wenn du gar keine Amateurfunkstelle betreibst. Es gilt keine Vorab-Frist.' },
  { id: 'gebuehr', t: 'Du zahlst den Gebührenbescheid der Bundesnetzagentur (Jahresbeitrag) nicht.', c: 'voll', p: 'Verwaltungs-Vollstreckungsgesetz (VwVG)', why: 'Nicht gezahlte Gebühren und Beiträge werden nach dem Verwaltungs-Vollstreckungsgesetz eingetrieben. Kein Bußgeld, kein Entzug des Zeugnisses.' },
];

export default function mount(stage, { params = {}, complete, md }) {
  const need = Math.min(params.need ?? 11, SC.length);
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const prog = h('div', { class: 'vz-note', style: 'margin-bottom:6px' });
  const card = h('div', { class: 'vz-stat', style: 'display:block;padding:14px 16px' });
  const q = h('div', { style: 'font-size:1.05rem;line-height:1.55;margin-bottom:10px' });
  const opts = h('div', { style: 'display:grid;gap:6px' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:10px;line-height:1.55' });
  const nx = h('button', { type: 'button', class: 'btn primary', text: 'Nächste Karte', style: 'display:none;margin-top:10px' });
  card.append(q, opts, fb, nx); root.append(prog, card);
  const g = goals(root, [{ id: 'g', label: `${need} von ${SC.length} richtig eingeordnet` }], () => complete?.());
  let order, i, right, locked;
  function start() { order = shuffle([...SC.keys()]); i = 0; right = 0; locked = false; show(); }
  function show() {
    if (i >= SC.length) {
      q.innerHTML = `<b>Fertig: ${right} von ${SC.length} richtig.</b>`; opts.replaceChildren(); fb.innerHTML = right >= need ? 'Ziel erreicht. Lies bei Unsicherheit die Paragraphen der falsch eingeordneten Karten in der Lektion nach.' : `Für das Ziel brauchst du ${need} richtige. Versuche es noch einmal.`;
      nx.textContent = 'Noch einmal'; nx.style.display = ''; nx.onclick = start; if (right >= need) g.reach('g'); prog.textContent = ''; return;
    }
    const c = SC[order[i]];
    prog.textContent = `Karte ${i + 1} von ${SC.length} · richtig: ${right}`;
    q.innerHTML = md(c.t); fb.textContent = 'Wie ist das rechtlich einzuordnen?'; nx.style.display = 'none'; locked = false;
    opts.replaceChildren(...CATS.map(([k, l]) => h('button', { type: 'button', class: 'btn ghost', style: 'text-align:left;white-space:normal;height:auto;padding:8px 12px', 'data-k': k, text: l, onclick: ev => pick(k, ev.currentTarget) })));
  }
  function pick(k, btn) {
    if (locked) return; locked = true;
    const c = SC[order[i]], ok = k === c.c;
    if (ok) right++;
    [...opts.children].forEach(b => { b.disabled = true; if (b.dataset.k === c.c) b.style.borderColor = 'var(--good)'; });
    if (!ok) btn.style.borderColor = 'var(--bad)';
    fb.innerHTML = `<b style="color:var(--${ok ? 'good' : 'bad'})">${ok ? 'Richtig.' : 'Nicht ganz.'}</b> ${md(c.why)}<br><span style="color:var(--muted)">Paragraph: ${c.p} (Stand 05.10.2026)</span>`;
    nx.textContent = i + 1 >= SC.length ? 'Ergebnis' : 'Nächste Karte'; nx.style.display = ''; nx.onclick = () => { i++; show(); };
    prog.textContent = `Karte ${i + 1} von ${SC.length} · richtig: ${right}`;
  }
  start();
  stage._test = { SC, get cur() { return SC[order[i]]; }, pick: k => pick(k, [...opts.children].find(b => b.dataset.k === k)), next: () => nx.onclick(), all() { for (let n = 0; n < SC.length; n++) { pick(SC[order[i]].c, [...opts.children].find(b => b.dataset.k === SC[order[i]].c)); nx.onclick(); } } };
}
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
