// Remote-Station zusammenstellen und prüfen: erfüllt die Konfiguration § 13a AFuV? Jede Bedingung mit Paragraph und Begründung.
import { h } from '../../../assets/js/vizkit/base.js';
import { controls, goals } from '../../../assets/js/vizkit/controls.js';

export default function mount(stage, { complete }) {
  const root = h('div', { class: 'vz vk' }); stage.append(root);
  const ui = controls(root, [
    { id: 'kind', type: 'seg', label: 'Station', options: [['pz', 'persönliches Rufzeichen'], ['ksA', 'Klubstation Klasse A'], ['ksE', 'Klubstation Klasse E']], value: 'pz' },
    { id: 'cls', type: 'seg', label: 'Zulassung des Betreibers', options: [['N', 'Klasse N'], ['E', 'Klasse E'], ['A', 'Klasse A']], value: 'E' },
    { id: 'who', type: 'seg', label: 'Wer darf senden?', options: [['mine', 'berechtigte Funkamateure Klasse A'], ['e', 'berechtigte Funkamateure Klasse E'], ['members', 'nur Mitglieder der Klubgruppe'], ['all', 'offen für alle, die sich einloggen']], value: 'mine' },
    { id: 'notify', type: 'seg', label: 'Betriebsmeldung an die BNetzA', options: [['op', 'durch den Betreiber'], ['user', 'durch die Nutzer'], ['none', 'keine']], value: 'none' },
    { id: 'phone', type: 'toggle', label: 'Kontaktdaten angegeben, Betreiber telefonisch erreichbar', value: false },
    { id: 'safe', type: 'toggle', label: 'Station geht bei Verbindungsverlust in sicheren Zustand (z. B. Netz aus), Abschaltung jederzeit möglich', value: false },
  ], run);
  const list = h('div', { style: 'display:grid;gap:6px;margin:10px 0' }); root.append(list);
  const verdict = h('div', { class: 'vz-stat', style: 'display:block;padding:12px 16px;font-size:1rem' }); root.append(verdict);
  const g = goals(root, [
    { id: 'ok', label: 'zulässige Remote-Station zusammenstellen' },
    { id: 'e', label: 'Betreiber nur Klasse E: Verstoß finden' },
    { id: 'club', label: 'Klubstation mit offenem Zugang: Verstoß finden' },
    { id: 'ks-e', label: 'Klubstation der Klasse E im Remote-Betrieb: Verstoß finden' },
  ], () => complete?.());

  function run() {
    const v = ui.values;
    const club = v.kind !== 'pz';
    const checks = [];
    const opClass = club ? (v.kind === 'ksA' ? 'A' : 'E') : v.cls;
    checks.push([opClass === 'A', club ? 'Die Klubstation hat die Klasse A.' : 'Der Betreiber hat eine Zulassung der Klasse A.', `Remote-Betrieb ist nur mit dem Berechtigungsumfang der Klasse A gestattet (§ 13a Abs. 1). Hier: Klasse ${opClass}.`]);
    const whoOk = club ? v.who === 'members' : v.who === 'mine';
    checks.push([whoOk, club ? 'Zugriff nur für Mitglieder der Gruppe, die die Klubstation betreibt.' : 'Es senden nur vom Betreiber berechtigte Funkamateure mit Klasse A.',
      club ? 'Bei Klubstationen ist der Zugriff auf die Mitglieder der Gruppe zu beschränken (§ 13a Abs. 1 Satz 2).' : v.who === 'e' ? 'Wer im Remote-Betrieb sendet, braucht selbst die Klasse A (Klasse E reicht nicht).' : 'Der Betreiber muss sicherstellen, dass nur von ihm berechtigte Funkamateure die Station nutzen; offen für alle geht nicht (§ 13a Abs. 5).']);
    checks.push([v.notify === 'op', 'Der Betreiber hat Betriebsmeldung (§ 9 Abs. 4) erstattet.', 'Die Betriebsmeldung ist Sache des Betreibers der Remote-Station — nicht der Nutzer — und nötig (§ 13a Abs. 3).']);
    checks.push([v.phone, 'Kontaktdaten angegeben, Betreiber ist erreichbar.', 'Mit der Anzeige sind Kontaktdaten für Störungsfälle anzugeben; der Betreiber muss während des Betriebs unverzüglich telefonisch erreichbar sein (§ 13a Abs. 3, 5).']);
    checks.push([v.safe, 'Mittelbare Kontrolle: Station lässt sich jederzeit abschalten.', 'Ununterbrochene, mittelbare und vollständige Kontrolle (§ 2 Nr. 6a) heißt auch: bei Störung oder Verbindungsverlust sicherer Zustand; Abschaltung auf Anforderung der BNetzA (§ 13a Abs. 5).']);
    list.replaceChildren(...checks.map(([ok, txt, why]) => h('div', { style: `display:grid;grid-template-columns:auto 1fr;gap:4px 10px;padding:8px 12px;border-radius:10px;border:1px solid ${ok ? 'var(--good)' : 'var(--bad)'};background:${ok ? 'var(--good-soft)' : 'var(--bad-soft)'};font-size:.9rem` },
      h('b', { text: ok ? '✓' : '✗', style: `color:var(--${ok ? 'good' : 'bad'})` }), h('div', {}, h('div', { text: txt, style: 'font-weight:600' }), ok ? null : h('div', { text: why, style: 'color:var(--ink-2);margin-top:2px' })))));
    const all = checks.every(c => c[0]);
    verdict.innerHTML = all ? '<b style="color:var(--good)">Zulässig.</b> Alle Voraussetzungen sind erfüllt.' : `<b style="color:var(--bad)">Nicht zulässig</b> — ${checks.filter(c => !c[0]).length} Bedingung(en) verletzt.`;
    if (all) g.reach('ok');
    if (!club && v.cls === 'E' && !checks[0][0]) g.reach('e');
    if (club && v.who === 'all') g.reach('club');
    if (v.kind === 'ksE') g.reach('ks-e');
  }
  run();
}
