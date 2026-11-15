# Nucu & Bobo în „Ghinda Fermecată”

Desen animat de 5 minute pentru copii, fără dialog, în stilul desenelor animate din anii 1940
(culori calde, contururi groase, ochi mari, mănuși albe, granulație de peliculă, cartoane cu text, „iris” la final).

**Ce învață copiii:** ce îi trebuie unei ghinde ca să devină stejar: pământ, apă, soare și răbdare (plus anotimpurile).

| Timp | Scena |
|---|---|
| 0:00 | Numărătoare de peliculă și titlul |
| 0:20 | Dimineața: Nucu se trezește, găsește o ghindă, își rupe dinții în ea și o aruncă în capul lui Bobo |
| 1:08 | Lecția 1, Pământul: Nucu sapă și îl umple pe Bobo de pământ |
| 1:40 | Lecția 2, Apa: găleata e găurită, norișorul plouă întâi pe Bobo, apoi ghinda încolțește |
| 2:25 | Lecția 3, Soarele: norii gri acoperă soarele, cei doi suflă și îi alungă |
| 3:05 | Lecția 4, Răbdarea: Bobo trage de lăstar, apoi anii trec (vară, toamnă, iarnă, primăvară) |
| 3:52 | Stejarul mare: ghinde în capul lui Bobo, se plantează ghinde noi |
| 4:22 | Recapitulare, apoi „Sfârșit” |

## Fișiere
- `ghinda-fermecata.html`: filmul, se deschide în browser (buton Play; muzica și efectele sunt generate în timp real).
- `ghinda-fermecata.mp4`: același film ca video (1280×720, 24 fps, cu sunet).
- `src.html` + `build.py`: sursa; `python3 build.py` include fonturile în pagină.
- `render.js`: `node render.js` randează MP4-ul (necesită Playwright și ffmpeg).
