from pathlib import Path
import json,re,hashlib
import pymupdf as f
from PIL import Image
import zxingcpp
R=Path('C:/Users/l.leung/Documents/yudaro-website');O=R/'output/pdf';report=[]
for name,count in [('Yudaro_Catalog_2026_Corporate_Culture_48_Pages.pdf',48),('Yudaro_Brochure_2026_Corporate_Culture_4_Pages.pdf',4)]:
 d=f.open(O/name);assert len(d)==count
 assert all(tuple(p.rect)==(0,0,612,792) for p in d)
 alltext='\n'.join(p.get_text() for p in d);assert '44 pages' not in alltext and '46 pages' not in alltext
 bad=[]
 for i,p in enumerate(d):
  for l in p.get_links():
   if l['kind']==1 and not 0<=l['page']<count:bad.append([i,l])
  if count==48:assert f'{i+1:02} / 48' in p.get_text(),i
 assert not bad
 if count==48:
  assert len(d.get_toc())==13
  assert d.get_toc()[2][2]==10
  assert len([l for l in d[1].get_links() if l['kind']==1 and l['from'].x0>380 and l['from'].y0<650])==13
  assert 'corporate culture' in d[9].get_text().lower() and 'Built on Trust' in d[10].get_text()
 else:
  pix=d[3].get_pixmap(matrix=f.Matrix(2,2));im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);codes=zxingcpp.read_barcodes(im)
  assert len(codes)==1
  url=codes[0].text;assert url=='https://yudaro.com/catalog/yudaro-catalog-2026-corporate-culture.pdf'
  report.append({'test':'Brochure QR decoded','url':url,'pass':True})
 report.append({'file':name,'pages':count,'dimensions':'US Letter 612 x 792 pt','internalLinks':'valid','sha256':hashlib.sha256((O/name).read_bytes()).hexdigest(),'pass':True})
(R/'output/culture-pdf-validation.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2))

