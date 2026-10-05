# Quellenvermerke und Lizenzhinweise (Fach Amateurfunk)

Stand: 05.10.2026. Dieser Text ist Markdown und gehört in die Quellen-/Impressumsangaben des Fachs.

## 1. Amtliche Prüfungsfragen (Bundesnetzagentur)

Die Prüfungsfragen, Antworten und Abbildungen stammen aus:

> Prüfungsfragen zum Erwerb von Amateurfunkprüfungsbescheinigungen, Bundesnetzagentur, 3. Auflage, März 2024, (www.bundesnetzagentur.de/amateurfunk), Datenlizenz Deutschland – Namensnennung – Version 2.0 (www.govdata.de/dl-de/by-2-0)

(Dies ist der von der Bundesnetzagentur in der README der Datenlieferung vorgeschriebene Quellenvermerk im exakten Wortlaut. Lizenztext: https://www.govdata.de/dl-de/by-2-0.)

**Daten geändert.** Gegenüber der maschinenlesbaren Originaldatei (`fragenkatalog3b.json` und SVG-Dateien) wurden folgende Änderungen vorgenommen:

- Umwandlung in das Datenformat dieser Lernplattform (JavaScript-Module mit Feldern `id`, `topic`, `q`, `answers`, `figure`, `explain`, `lesson`, `source`); Zuordnung zu Themen (Katalogkapitel) und Lektionen.
- Typografie: „Ohm“ nach Zahlenwerten durch das Zeichen Ω ersetzt (in Formeln `\Omega`); ausgeschriebene LaTeX-Reste (`\mOhm`, `\milliOhm`, `\kiloOhm`, `\glqq`, `pla\^it`) durch mΩ, kΩ, „ “ und î ersetzt; LaTeX-Anzeigeformeln `\[…\]` als `$$…$$` geschrieben; Zeilenumbrüche in einzelnen Antworten durch Leerzeichen bzw. Zeilentrenner ersetzt; Leerraum an Rändern entfernt.
- Abbildungen (SVG): Attribut `viewBox` ergänzt und alle `id`-Attribute mit einem eindeutigen Präfix versehen (Inhalt der Zeichnungen unverändert).
- Die Reihenfolge der Antworten ist im Original „richtige Antwort zuerst“ und wird in der Anwendung zufällig gemischt.
- Einzelne Fragen erhalten eine ergänzende Erklärung (siehe 2.); alle Alternativtexte zu Abbildungen sind von uns ergänzt.

Die Formelsammlung (Anhang des Katalogs, bzw. Hilfsmittel der Bundesnetzagentur vom 12.06.2024) wird nur verlinkt/als Seitenbild beigelegt und ist unverändert.

## 2. Erklärungen und Kursstruktur (DARC e. V., 50ohm.de)

Einzelne Erklärungen („Lösungswege“) sowie die Gliederung der Lektionen orientieren sich an den Inhalten von 50ohm.de:

> 50ohm.de-Autorenteam, koordiniert durch das AJW-Referat des DARC e. V., Lizenz CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/deed.de), Quelle: https://github.com/DARC-e-V/50ohm-contents-dl

**Änderungen:** Aus dem DARC-Markup („DARCdown“) in Markdown/KaTeX umgewandelt (Einheitenbefehle `\qty`, `\unit` usw. in KaTeX-Schreibweise; Abbildungs-, Tabellen- und Randbemerkungs-Befehle entfernt bzw. in Fließtext umgesetzt), gekürzt und mit einem Hinweis auf die Quelle versehen. Die Zuordnung der Prüfungsfragen zu Lektionen beruht auf der DARC-Kursstruktur (Gesamtkurs E), wurde aber von uns neu zugeschnitten. Der DARC unterstützt oder befürwortet diese Nutzung nicht.

## 3. Weitere Quellen

Amateurfunkverordnung, Amateurfunkgesetz, BEMFV und EMVG (gesetze-im-internet.de), Prüfungsordnung Vfg. 29/2024, Rufzeichenplan Vfg. 15/2025 und Gebührenverordnung (jeweils Bundesnetzagentur bzw. Bundesministerium) sind amtliche Werke und werden zitiert bzw. inhaltlich wiedergegeben. Videokurse (DL2YMR; Computer Engineering @ JMU Würzburg) werden nur in der Quellenliste verlinkt, nicht eingebettet oder kopiert.
