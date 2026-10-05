// QSO-Simulator: ein Funkgespräch Schritt für Schritt führen (Frequenz prüfen, CQ, Antwort, Inhalt, Ende, neuer Anrufer).
// Regeln: AFuV § 11 (Rufzeichen), § 16 Abs. 7–9, AFuG (nur Amateurfunkstellen, keine Nachrichten an Dritte); Ablauf nach DARC-Kurs 50ohm.de (CC BY 4.0).
// params: { maxErrors?: 2 }
import { h } from '../../../assets/js/vizkit/base.js';
import { goals, readout } from '../../../assets/js/vizkit/controls.js';

const ME = 'DL1PZ', OTHER = 'DL9MJ';
const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const STEPS = [
  { say: null, prompt: 'Du hast auf 145,4xx MHz (2 m, FM) eine Frequenz gefunden, auf der du nichts hörst. Wie gehst du vor?', opts: [
    { t: `„Ist die Frequenz frei? ${ME}“ — zwei- bis dreimal, mit Pausen zum Hören`, ok: true, you: `Ist diese Frequenz frei? ${ME}` },
    { t: 'Ich höre ein paar Sekunden zu und rufe dann sofort CQ.', why: 'Es könnte eine Station sein, die du nur nicht hörst (verdeckte Station, andere Richtung). Zwei- bis dreimal nachfragen gehört dazu.' },
    { t: 'Ich sende kurz einen Träger, um zu sehen, ob das S-Meter reagiert.', why: 'Dauerträger und „Probesenden“ ohne Rufzeichen sind unzulässig (§ 16 Abs. 9 AFuV); Abgleich nur ohne freies Abstrahlen (Abs. 6).' },
    { t: 'Ich rufe „QRZ?“, damit sich jemand meldet.', why: 'QRZ? heißt „Von wem werde ich gerufen?“ — es hat dich ja noch niemand gerufen.' },
  ] },
  { say: '(keine Antwort)', prompt: 'Niemand meldet sich. Du willst eine Verbindung beginnen. Was sendest du?', opts: [
    { t: `„CQ CQ CQ, hier ist ${ME}, ${ME}, allgemeiner Anruf, bitte kommen.“`, ok: true, you: `CQ CQ, hier ist ${ME} mit einem allgemeinen Anruf, hier ist ${ME} und hört.` },
    { t: `„QRZ? QRZ? hier ${ME}“`, why: 'QRZ? ist keine Aufforderung an alle. Der allgemeine Anruf ist CQ (englisch gesprochen „seek you“).' },
    { t: `„CQ CQ ${ME} QTH QSL“`, why: 'QTH (mein Standort) und QSL (Empfangsbestätigung) gehören nicht in den Anruf.' },
    { t: `„${ME}, 1750 Hz Auftastton“`, why: 'Der Rufton 1750 Hz öffnet Relais; er ersetzt keinen Anruf auf einer Simplexfrequenz.' },
  ] },
  { say: `${ME}, hier ist ${OTHER}, bitte kommen.`, prompt: 'Eine Station antwortet. Wie reagierst du?', opts: [
    { t: `Rufzeichen der Gegenstation einmal nennen, dann: „Hier ist ${ME}, Ihr Rapport 59, mein Name Sigi, QTH Kassel, bitte kommen.“`, ok: true, you: `${OTHER}, hier ist ${ME}. Vielen Dank für den Anruf. Sie sind 59, mein Name ist Sigi, mein QTH ist Kassel, bitte kommen.` },
    { t: `Ich nenne „${OTHER}“ mindestens fünfmal und dann einmal mein Rufzeichen.`, why: 'Einmal reicht: erst das Rufzeichen der gerufenen Station, dann „hier ist“ und das eigene — buchstabiert, wenn nötig.' },
    { t: 'Ich rufe weiter CQ, damit alle wissen, dass die Frequenz besetzt ist.', why: 'Du hast eine Antwort — du antwortest direkt darauf.' },
    { t: 'Ich bitte ihn, auf einer anderen Frequenz zu rufen.', why: 'Das wäre unhöflich und unnötig; erst nach dem Kontakt wechselt man bei Bedarf (QSY).' },
  ] },
  { say: `Danke ${ME}, Sie sind bei mir 59 plus. Mein Name ist Matthias, QTH Baunatal. Sag mal, meine Frau hört gerade am Scanner mit — kannst du ihr Grüße von mir ausrichten? Sie hat keine Amateurfunkzulassung.`, prompt: 'Wie antwortest du?', opts: [
    { t: 'Das darf ich nicht: Nachrichten an Nicht-Funkamateure übermittle ich nur in Not- und Katastrophenfällen.', ok: true, you: 'Das geht leider nicht, Matthias: Grüße an Nicht-Funkamateure darf ich nur im Notfall übermitteln. Sag sie ihr bitte selbst.' },
    { t: 'Klar, kein Problem — ist ja nur ein kurzer Gruß.', why: 'Der Amateurfunkdienst ist auf Funkamateure beschränkt; Nachrichten für Dritte sind nur in Not- und Katastrophenfällen erlaubt (AFuG).' },
    { t: 'Ja, aber nur wenn ich vorher die Bundesnetzagentur informiere.', why: 'Es gibt keine Anzeige, die das ermöglicht.' },
    { t: 'Ich verschlüssele den Gruß, damit niemand sonst mithört.', why: 'Verschleierung des Inhalts ist verboten — Amateurfunk läuft in offener Sprache (§ 16 Abs. 7, 8 AFuV).' },
  ] },
  { say: 'Alles klar. Dann wollen wir langsam Schluss machen. Vielen Dank für das QSO!', prompt: 'Du beendest die Verbindung. Was gehört unbedingt dazu?', opts: [
    { t: `Verabschiedung, 73 — und mein Rufzeichen am Ende: „… hier war ${ME}.“`, ok: true, you: `Danke für das QSO, Matthias. 73 und alles Gute. ${OTHER} von ${ME}, Ende.` },
    { t: 'Nur „73“, das Rufzeichen kam ja schon am Anfang.', why: 'Nach § 11 Abs. 1 AFuV wird das Rufzeichen bei Beginn und Beendigung jeder Verbindung genannt — und mindestens alle zehn Minuten dazwischen.' },
    { t: 'Das Rufzeichen nenne ich nur, wenn jemand danach fragt.', why: 'Das Rufzeichen identifiziert die Station; die Pflicht besteht von selbst.' },
    { t: 'Ich nenne das Rufzeichen spätestens 15 Minuten nach dem Beginn.', why: 'Die Frist beträgt höchstens zehn Minuten.' },
  ] },
  { say: `(Eine dritte Station ruft dich:) ${ME} von DK5WP, bitte kommen.`, prompt: 'Du hast das QSO beendet. Wie verfährst du mit dem neuen Anrufer?', opts: [
    { t: 'Ich verständige mich kurz mit ihm auf eine andere Frequenz und führe das QSO dort weiter.', ok: true, you: 'DK5WP von DL1PZ — wir gehen bitte auf 145,450 MHz, QSY, ich rufe dich dort.' },
    { t: 'Ich bleibe auf der Frequenz und mache das QSO hier.', why: 'Die Frequenz gehört der Station, die den Anruf gestartet hat — und die Anruffrequenz sollte frei bleiben.' },
    { t: 'Ich ignoriere den Anruf, die Frequenz ist ja besetzt.', why: 'Das wäre unfreundlich; ein kurzer Frequenzwechsel löst es.' },
    { t: 'Ich gehe etwa 1 kHz neben die Frequenz und rufe ihn dort.', why: 'Direkt daneben störst du das Nachbarqso und die Rufstation — verständige dich auf eine freie Frequenz.' },
  ] },
];

export default function mount(stage, { params = {}, complete }) {
  const maxErr = params.maxErrors ?? 2;
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const chat = h('div', { style: 'display:flex;flex-direction:column;gap:6px;margin-bottom:10px' });
  const prompt = h('div', { class: 'vz-note', style: 'font-size:1rem;line-height:1.5;margin:8px 0' });
  const opts = h('div', { style: 'display:grid;gap:8px' });
  const fb = h('div', { class: 'vz-note', style: 'margin-top:8px;line-height:1.5' });
  root.append(chat, prompt, opts, fb);
  const out = readout(root, [{ id: 'step', label: 'Schritt', hl: true }, { id: 'err', label: 'Fehlgriffe' }]);
  const g = goals(root, [{ id: 'g', label: `QSO mit höchstens ${maxErr} Fehlgriffen führen` }], () => complete?.());
  let i = 0, errs = 0;
  const bubble = (who, text) => chat.append(h('div', { style: `max-width:88%;padding:8px 12px;border-radius:12px;font-size:.95rem;line-height:1.45;${who === 'me' ? 'align-self:flex-end;background:var(--accent-soft);border:1px solid var(--accent)' : 'align-self:flex-start;background:#fff;border:1px solid var(--line)'}`, html: `<span style="font:600 .72rem var(--mono);color:var(--muted)">${who === 'me' ? ME : who === 'sys' ? 'Funkbetrieb' : OTHER}</span><br>${text}` }));
  function show() {
    const st = STEPS[i];
    out.set({ step: `${i + 1} / ${STEPS.length}`, err: errs });
    if (st.say) bubble(i === 5 ? 'other' : st.say.startsWith('(') ? 'sys' : 'other', st.say);
    prompt.textContent = st.prompt; fb.textContent = '';
    opts.replaceChildren(...shuffle(st.opts).map(o => {
      const b = h('button', { type: 'button', class: 'chip', style: 'text-align:left;white-space:normal', html: o.t });
      b.onclick = () => {
        if (o.ok) {
          bubble('me', o.you); opts.replaceChildren(); fb.innerHTML = '<b style="color:var(--good)">Richtig.</b>';
          i++; if (i < STEPS.length) setTimeout(show, 350); else finish();
        } else { errs++; b.disabled = true; b.style.borderColor = 'var(--bad)'; b.style.background = 'var(--bad-soft)'; fb.innerHTML = `<b style="color:var(--bad)">Nicht ganz.</b> ${o.why}`; out.set({ step: `${i + 1} / ${STEPS.length}`, err: errs }); }
      };
      return b;
    }));
  }
  function finish() {
    prompt.textContent = ''; out.set({ step: `${STEPS.length} / ${STEPS.length}`, err: errs });
    fb.innerHTML = errs <= maxErr ? `<b style="color:var(--good)">QSO sauber abgewickelt</b> (${errs} Fehlgriff${errs === 1 ? '' : 'e'}).` : `QSO beendet, aber mit ${errs} Fehlgriffen — probier es noch einmal.`;
    if (errs <= maxErr) g.reach('g');
    const again = h('button', { type: 'button', class: 'btn small', text: 'Noch einmal', style: 'margin-left:10px' });
    again.onclick = () => { chat.replaceChildren(); i = 0; errs = 0; show(); };
    fb.append(again);
  }
  show();
}
