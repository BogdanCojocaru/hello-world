# Inlines the downloaded fonts into src.html -> ghinda-fermecata.html
import re,base64,pathlib
d=pathlib.Path(__file__).parent
css=(d/'fonts/fonts-local.css').read_text()
css=re.sub(r'url\((.*?\.woff2)\)',lambda m:'url(data:font/woff2;base64,'+base64.b64encode((d/'fonts'/m.group(1)).read_bytes()).decode()+')',css)
src=(d/'src.html').read_text()
(d/'ghinda-fermecata.html').write_text(src.replace('/*FONTS*/',css))
print('ok')
