from pathlib import Path
import io,json,shutil,html
import pymupdf as f
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
R=Path(__file__).resolve().parents[2]; S=R/'marketing/restaurant-release'; O=R/'output/restaurant-release';O.mkdir(exist_ok=True,parents=True)
D=json.loads((R/'lib/restaurant-offer.json').read_text(encoding='utf-8-sig'))
NAVY='#0D2C43';TEAL='#087F8C';BLUE='#08649E';VIOLET='#6653B9';MUTED='#566C79';BG='#F5FBFB';WHITE='#FFFFFF'
LOGO=R/'marketing/source/assets/logo.png';HW=R/'public/promotions/restaurant-pos-hardware.png';URL='https://yudaro.com/catalog/yudaro-catalog-2026-pos-erp.pdf'
for n,fn in [('A','arial.ttf'),('B','arialbd.ttf')]:pdfmetrics.registerFont(TTFont(n,'C:/Windows/Fonts/'+fn))
def p(c,x,y,w,s,size=10,b=False,col=NAVY,maxh=700):
 st=ParagraphStyle('x',fontName='B' if b else 'A',fontSize=size,leading=size*1.28,textColor=HexColor(col))
 pa=Paragraph(s,st);_,h=pa.wrap(w,700);assert h<=maxh,(s,h,maxh);pa.drawOn(c,x,792-y-h);return h
def box(c,x,y,w,h,col=WHITE,r=8):
 c.setFillColor(HexColor(col));c.roundRect(x,792-y-h,w,h,r,fill=1,stroke=0)
def head(c,k,title,sub='',page=None):
 box(c,0,0,612,792,BG,0);c.drawImage(str(LOGO),42,736,115,35,preserveAspectRatio=True,mask='auto')
 p(c,374,36,195,'YUDARO / RESTAURANT SOLUTIONS',7,col=MUTED)
 box(c,42,74,528,1,'#DCE8EB',0);p(c,42,94,528,k,8,True,TEAL);p(c,42,117,528,title,27,True,maxh=76)
 if sub:p(c,42,191,528,sub,10,col=MUTED,maxh=43)
 box(c,42,742,528,1,'#DCE8EB',0);p(c,42,752,400,'Yudaro  /  www.yudaro.com  /  281-258-8000',8,col=MUTED)
 if page:p(c,515,752,60,f'{page:02} / 48',8,col=MUTED)
 c.linkURL('https://yudaro.com/industries/restaurants',(42,20,400,44))
def bullets(c,x,y,w,items,size=10,gap=8,col=NAVY):
 for t in items:
  h=p(c,x,y,w,'• '+html.escape(t),size,col=col);y+=h+gap
 return y
def qr_draw(c,x,y,size):
 w=qr.QrCodeWidget(URL,barLevel='M');a=w.getBounds();d=Drawing(size,size,transform=[size/(a[2]-a[0]),0,0,size/(a[3]-a[1]),0,0]);d.add(w);renderPDF.draw(d,c,x,792-y-size);c.linkURL(URL,(x,792-y-size,x+size,792-y))
def pos(c,page=16):
 head(c,'01 / RESTAURANT POS','Restaurant POS Package<br/>$899 + tax','Everything you need to start taking orders and payments.',page)
 box(c,42,228,528,45,NAVY);p(c,56,237,500,'Restaurant ERP implementation is not included<br/>in the $899 Restaurant POS Package.',12,True,WHITE,maxh=33)
 c.drawImage(str(HW),42,792-455,257,173,preserveAspectRatio=True,anchor='c',mask='auto')
 p(c,49,453,245,'Hardware illustration; final equipment may vary.',7.5,col=MUTED)
 p(c,320,291,246,'HARDWARE INCLUDED',9,True,TEAL)
 bullets(c,320,315,244,D['pos']['hardware'],10,9)
 box(c,42,480,528,72,'#E1F3F3');p(c,56,491,498,'$29.99/user/month',20,True,TEAL);p(c,56,519,498,'POS Support &amp; Platform Service',12,True);p(c,56,537,498,'POS support and maintenance only. Minimum one-year subscription.',8.2,col=MUTED)
 p(c,42,570,245,'SET UP FOR THE FRONT OF HOUSE',9,True,TEAL)
 bullets(c,42,594,250,['POS installation and initial setup','Menu/product configuration within agreed scope','Printer/device and user setup','Basic POS training'],9.5,6)
 p(c,320,570,250,'A STANDALONE POS SOLUTION',9,True,TEAL)
 p(c,320,594,250,html.escape(D['pos']['longDisclaimer']),9.5,maxh=95)
 p(c,42,714,528,'Get the $899 Restaurant POS Package  →  www.yudaro.com/contact',9,True,TEAL,maxh=24)
 c.linkURL('https://yudaro.com/contact?service=restaurant-pos',(42,54,570,81))
def compare(c):
 head(c,'02 / CHOOSE YOUR SCOPE','Three levels. Separate purchases.','Start with the operation you need today. Add ERP or Private AI only under a separate agreement.',17)
 cols=[('01 / RESTAURANT POS',TEAL,'$899 + tax','$29.99/user/month','POS Support &amp;<br/>Platform Service','Front-of-house',['Ordering','Checkout','Receipts','Payment workflow','POS users','POS reporting'],'Get the $899 POS Package'),('02 / RESTAURANT ERP',BLUE,'$5,000','$300/month · up to 5 users','ERP Management,<br/>Maintenance &amp; Support','Back-office',['Inventory','Purchasing + vendors','Reporting','Management workflows','Multi-location support','ERP integration'],'Schedule an ERP Consultation'),('03 / PRIVATE AI',VIOLET,'Custom pricing','Separate scope','Private AI +<br/>Automation','Intelligence',['SOP search','Business Q&A','ERP data queries','Management insights','Workflow automation','Corporate knowledge'],'Explore Private AI & Automation')]
 for i,(tag,col,price,monthly,svc,scope,items,cta) in enumerate(cols):
  x=42+i*180;box(c,x,242,168,377);box(c,x,242,168,6,col,0);p(c,x+12,261,144,tag,8,True,col)
  p(c,x+12,291,144,price,21 if i<2 else 17,True,col);p(c,x+12,322,144,'One-time'+(' implementation' if i==1 else '') if i<2 else 'Agreed independently',8.5,col=MUTED)
  p(c,x+12,356,144,monthly,9.4,True);p(c,x+12,383,144,svc,9.4,True,col,maxh=40)
  p(c,x+12,438,144,scope,12,True);bullets(c,x+12,467,144,items,9,8)
  p(c,x+12,588,144,html.escape(cta),8,True,col,maxh=23)
 box(c,42,635,528,51,NAVY);p(c,56,646,500,'POS runs the checkout counter. ERP runs the business.<br/>AI helps the business understand and improve.',12,True,WHITE,maxh=34)
 p(c,42,699,528,'ERP is an optional separate purchase. All implementation follows agreed scope. Additional customization may be quoted separately. Private AI and automation use custom pricing.',9,col=MUTED,maxh=35)
def erp(c):
 head(c,'RESTAURANTS / ERP IMPLEMENTATION','Run the business.<br/>Beyond the checkout counter.','A separate professional implementation service for connected back-office operations.',41)
 box(c,42,240,528,95,BLUE);p(c,58,253,232,'$5,000',31,True,WHITE);p(c,58,294,232,'One-time implementation',11,col=WHITE)
 p(c,315,254,238,'$300/month',25,True,WHITE);p(c,315,291,238,'Up to 5 users',11,True,WHITE);p(c,315,309,238,'ERP Management, Maintenance &amp; Support',8.7,col=WHITE)
 p(c,42,356,528,'BACK-OFFICE SCOPE, AGREED BEFORE IMPLEMENTATION',9,True,BLUE)
 bullets(c,42,382,247,D['erp']['scope'][:4],10,11);bullets(c,318,382,252,D['erp']['scope'][4:],10,11)
 box(c,42,518,528,68,'#E7EFF8');p(c,56,531,500,'Made-to-order: orders → ingredients → purchasing → reporting<br/>Chinese buffet: guest counts → production → waste → replenishment',10,True,BLUE,maxh=37)
 p(c,42,604,528,html.escape(D['erp']['disclaimer']),10,True,maxh=50)
 p(c,42,659,528,'Additional customization may be quoted separately. Workflow automation, customized modules, accounting and Private AI integrations require agreed scope; Private AI has separate custom pricing.',9,col=MUTED,maxh=36)
 p(c,42,714,528,'Schedule an ERP Consultation  →  www.yudaro.com/contact',10,True,BLUE)
 c.linkURL('https://yudaro.com/contact?service=restaurant-erp',(42,54,570,83))
def flyer(c):
 head(c,'YUDARO / RESTAURANT POS','Restaurant POS Package<br/>$899 + tax','Everything you need to start taking orders and payments.')
 p(c,42,228,528,D['pos']['disclaimer'],12,True,TEAL,maxh=33)
 c.drawImage(str(HW),42,792-449,268,179,preserveAspectRatio=True,mask='auto')
 p(c,48,448,268,'Hardware illustration; final equipment may vary.',7,col=MUTED)
 p(c,325,280,244,'HARDWARE + SETUP',10,True,TEAL)
 bullets(c,325,306,244,['15.6-inch touchscreen computer','Cash drawer + Epson receipt printer','Credit card reader','POS, menu, printer and user setup','Basic training; agreed POS scope'],9.7,7)
 box(c,42,480,528,63,'#E1F3F3');p(c,56,490,500,'$29.99/user/month',22,True,TEAL);p(c,56,520,500,'POS Support &amp; Platform Service · POS support and maintenance only',9.2,True)
 box(c,42,559,528,148,NAVY);p(c,56,571,500,'Need More Than POS?',19,True,WHITE);p(c,56,598,500,'Upgrade to Yudaro Restaurant ERP',12,True,'#61D7E4')
 p(c,56,622,500,'$5,000 implementation + $300/month for up to 5 users',12,True,WHITE)
 p(c,56,644,500,'ERP Management, Maintenance &amp; Support',9.5,True,WHITE)
 p(c,56,664,500,'Inventory · purchasing · vendors · reporting · multi-location operations.<br/>Automation and Private AI integration: separate/custom scope.',9,col=WHITE,maxh=25)
 p(c,42,717,260,'Get the $899 Restaurant POS Package',8.8,True,TEAL);p(c,322,717,248,'Schedule an ERP Consultation',8.8,True,BLUE)
 c.linkURL('https://yudaro.com/contact?service=restaurant-pos',(42,55,310,79));c.linkURL('https://yudaro.com/contact?service=restaurant-erp',(311,55,570,79))
def brochure4(c):
 head(c,'YOUR NEXT STEP','Your experience.<br/>Your next opportunity.','Private AI. Corporate Culture Intelligence. Connected ERP. Separate, clearly scoped services.')
 p(c,42,244,528,'BUILT AROUND YOUR WORKDAY',9,True,TEAL)
 for i,(title,body) in enumerate([('Distribution','Protect relationships with approved margin and delivery policies.'),('HVAC + field service','Give every visit context with service history and approved escalation practices.'),('Restaurants','Support consistent service with approved training and complaint-handling standards.')]):
  x=42+180*i;box(c,x,268,168,118);p(c,x+12,281,144,title,12,True,TEAL);p(c,x+12,315,144,body,9.4,col=MUTED,maxh=65)
 p(c,42,400,528,'Also built for construction, retail, manufacturing and professional services.',9,col=MUTED)
 box(c,42,433,528,164,NAVY);p(c,59,448,303,'48 pages.<br/>Explore the full catalog.',25,True,WHITE)
 p(c,59,523,294,'POS → optional ERP → custom Private AI',10,True,'#61D7E4');p(c,59,552,290,'Scan for this updated online edition.',10,col=WHITE)
 box(c,410,451,142,132,WHITE);qr_draw(c,418,451,126)
 p(c,42,620,528,'Understand. Build. Improve.',19,True)
 p(c,42,652,528,'Schedule a Corporate AI Assessment  →  yudaro.com/contact',11,True,TEAL)
 c.linkURL('https://yudaro.com/contact',(42,112,570,147))
 p(c,42,682,528,'info@yudaro.com  /  281-258-8000',12,True);p(c,42,707,528,'13366 Murphy Road, Stafford, TX 77477',9,col=MUTED)

def make(fn):
 b=io.BytesIO();c=canvas.Canvas(b,pagesize=(612,792));fn(c);c.save();return f.open(stream=b.getvalue(),filetype='pdf')
def replace(d,n,r,s,size=10,b=False,col=NAVY):
 pg=d[n-1];rr=f.Rect(r);pg.add_redact_annot(rr,fill=None);pg.apply_redactions(images=0,graphics=0)
 def layer(c):p(c,rr.x0,rr.y0,rr.width,s,size,b,col,maxh=rr.height)
 ov=make(layer);pg.show_pdf_page(pg.rect,ov,0)
def replace_page(d,n,fn):
 pg=d[n-1]
 for link in pg.get_links():pg.delete_link(link)
 pg.add_redact_annot(pg.rect,fill=(1,1,1));pg.apply_redactions(images=2,graphics=2)
 ov=make(fn);pg.show_pdf_page(pg.rect,ov,0)
 for li in ov[0].get_links():
  if li.get('uri'):pg.insert_link({'kind':f.LINK_URI,'from':li['from'],'uri':li['uri']})
# Preserve the last approved edition as the reproducible base.
for nm in ['catalog','brochure']:
 target=S/(nm+'-base-2026-09-26.pdf')
 if not target.exists():shutil.copy2(R/'tmp/restaurant-release'/f'{nm}-before.pdf',target)
d=f.open(S/'catalog-base-2026-09-26.pdf');assert len(d)==48
replace_page(d,16,pos);replace_page(d,17,compare);replace_page(d,41,erp)
replace(d,9,(42,709,571,736),'Fictional demonstration data. ERP and Private AI require separate implementation scope and configured connectors. Human approval remains required for payments, stock adjustments and order changes.',8.2)
replace(d,39,(42,685,570,730),'Separate POS, ERP and Private AI offers: see pages 16–17.<br/>ERP is optional: $5,000 implementation + $300/month for up to 5 users.',9,False,TEAL)
replace(d,40,(42,675,570,692),'Private AI + Automation: custom pricing and separate scope. ERP access is scoped separately.',9,True,TEAL)
replace(d,42,(42,203,570,241),'The Yu Kitchen illustrates configured buffet, sushi-bar and gift-shop workflows. This demonstration combines POS with separately scoped ERP integration; it is not the $899 POS package.',10)
replace(d,42,(42,683,570,706),'POS service → checkout  |  Optional separate ERP: inventory, purchasing and management review.',9,True,TEAL)
replace(d,42,(42,715,570,739),'Fictional Odoo demonstration, not a customer success claim. ERP implementation is a separate purchase; features depend on the agreed modules and configuration. Private AI has separate scope.',8.2)
replace(d,47,(56,558,551,594),'',9)
replace(d,47,(58,559,382,592),'ERP Management, Maintenance &amp; Support<br/>Restaurant ERP · according to agreed scope',10,True)
replace(d,47,(406,559,552,592),'$300/month<br/>Up to 5 users',10,True)
cat=O/'Yudaro_Catalog_2026_POS_ERP_48_Pages.pdf';d.set_metadata({'title':'Yudaro Catalog 2026 | POS, ERP and Private AI','author':'Yudaro','subject':'Separate restaurant POS and ERP pricing - September 29, 2026'});d.save(cat,garbage=4,deflate=True)
b=f.open(S/'brochure-base-2026-09-26.pdf');replace_page(b,3,flyer);replace_page(b,4,brochure4)
br=O/'Yudaro_Brochure_2026_POS_ERP_4_Pages.pdf';b.set_metadata({'title':'Yudaro | Private AI, ERP and Restaurant POS','author':'Yudaro'});b.save(br,garbage=4,deflate=True)
fl=make(flyer);fl.save(O/'Yudaro_Restaurant_POS_ERP_Flyer.pdf')
for name,doc in [('catalog',d),('brochure',b),('flyer',fl)]:
 dr=R/'tmp/restaurant-release'/('qa-'+name);dr.mkdir(exist_ok=True)
 for i,pg in enumerate(doc):pg.get_pixmap(matrix=f.Matrix(1.25,1.25)).save(dr/f'{i+1:02}.png')
from PIL import Image
pix=fl[0].get_pixmap(matrix=f.Matrix(2,2));im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
im.save(R/'public/promotions/restaurant-pos-package.webp',quality=91);im.save(O/'Yudaro_Restaurant_POS_ERP_Promotion.png')
for name in ['yudaro-catalog-2026.pdf','yudaro-catalog-2026-pos-erp.pdf','yudaro-catalog-2026-46-pages-september.pdf','yudaro-catalog-2026-corporate-culture.pdf']:shutil.copy2(cat,R/'public/catalog'/name)
for name in ['yudaro-brochure-2026.pdf','yudaro-brochure-2026-pos-erp.pdf','yudaro-brochure-2026-corporate-culture.pdf','yudaro-brochure-2026-qr-updated.pdf']:shutil.copy2(br,R/'public/catalog'/name)
print('Created 48-page catalog, 4-page brochure and 1-page flyer. QR:',URL)
