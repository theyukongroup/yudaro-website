from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
from PIL import Image, ImageOps
from io import BytesIO

ROOT=Path(r'C:\Users\l.leung\Documents\yudaro-website')
OUT=ROOT/'output/pdf/Yudaro_4_Page_Brochure_2026_Visual.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
URL='https://www.yudaro.com/catalog/yudaro-catalog-2026.pdf'
W,H=612,792
NAVY=HexColor('#092B46'); BLUE=HexColor('#08649E'); CYAN=HexColor('#00C7D5'); TEAL=HexColor('#007B8C'); MIST=HexColor('#F0F7FB'); INK=HexColor('#183B51'); MUTED=HexColor('#52677B'); LINE=HexColor('#D9E5EE')
pdfmetrics.registerFont(TTFont('A',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('AB',r'C:\Windows\Fonts\arialbd.ttf'))
c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
c.setTitle('Yudaro | Stop chasing information. Start running your business.')
c.setAuthor('Yudaro AI & ERP Systems')
c.setSubject('Private AI, Odoo ERP and business automation - four-page introduction')

def box(x,y,w,h,col,r=0):
 c.setFillColor(col)
 if r:c.roundRect(x,y,w,h,r,stroke=0,fill=1)
 else:c.rect(x,y,w,h,stroke=0,fill=1)
def text(s,x,y,size=11,font='A',col=INK):
 c.setFillColor(col);t=c.beginText(x,y);t.setFont(font,size);t.setCharSpace(0);t.textLine(s);c.drawText(t)
def wrap(s,x,y,width,size=11,leading=16,font='A',col=MUTED):
 row=''
 for word in s.split():
  trial=(row+' '+word).strip()
  if pdfmetrics.stringWidth(trial,font,size)>width:
   text(row,x,y,size,font,col); y-=leading;row=word
  else:row=trial
 if row:text(row,x,y,size,font,col);y-=leading
 return y

def label(s,x,y,col=TEAL):
 c.setFillColor(col);t=c.beginText(x,y);t.setFont('AB',8);t.setCharSpace(1.6);t.textLine(s);c.drawText(t)
def line(x,y,x2,y2,col=LINE,width=1):
 c.setStrokeColor(col);c.setLineWidth(width);c.line(x,y,x2,y2)
def photo(name,x,y,w,h):
 im=Image.open(ROOT/'public'/name).convert('RGB')
 im=ImageOps.fit(im,(int(w*3),int(h*3)),method=Image.Resampling.LANCZOS)
 buf=BytesIO();im.save(buf,format="JPEG",quality=90,optimize=True);buf.seek(0)
 c.drawImage(ImageReader(buf),x,y,w,h)
def logo(x,y,w):
 im=Image.open(ROOT/'public/yudaro-logo.png').convert('RGBA')
 a=im.getchannel('A');bounds=a.getbbox();im=im.crop(bounds)
 c.drawImage(ImageReader(im),x,y,w,w*im.height/im.width,mask='auto')
def footer(n,dark=False):
 col=HexColor('#A9C7D8') if dark else MUTED
 text('YUDARO  /  PRIVATE AI + ERP',40,24,7,'AB',col)
 text('www.yudaro.com',390,24,8,'A',col)
 text(f'{n:02d}',556,24,8,'AB',col)
 c.linkURL('https://www.yudaro.com',(385,18,520,38),relative=0)
def head(k):
 box(0,0,W,H,white);label(k,40,744);logo(454,723,118);line(40,709,572,709)
def qr_code(x,y,size):
 widget=qr.QrCodeWidget(URL,barLevel='M');bounds=widget.getBounds();bw=bounds[2]-bounds[0];bh=bounds[3]-bounds[1]
 d=Drawing(size,size,transform=[size/bw,0,0,size/bh,0,0]);d.add(widget);renderPDF.draw(d,c,x,y)
 c.linkURL(URL,(x,y,x+size,y+size),relative=0)


def circle(x,y,r,col):
 c.setFillColor(col);c.circle(x,y,r,stroke=0,fill=1)
def check(x,y,scale=1):
 line(x,y,x+6*scale,y-6*scale,white,3*scale);line(x+6*scale,y-6*scale,x+17*scale,y+8*scale,white,3*scale)
def sparkle(x,y,col=TEAL):
 line(x-5,y,x+5,y,col,2);line(x,y-5,x,y+5,col,2)
def scene(kind,x,y,w=230,h=145):
 c.saveState();c.translate(x,y);c.scale(w/230,h/145)
 sky=HexColor('#DDF4F8');violet=HexColor('#7866D8');gold=HexColor('#FFBF57');coral=HexColor('#FF826C')
 circle(111,74,65,sky);circle(190,112,11,HexColor('#E7E1FB'));circle(33,29,8,gold)
 if kind=='ai':
  # Friendly assistant, source documents and a floating answer bubble.
  box(20,40,49,68,white,5);box(29,49,49,68,HexColor('#C9DCE9'),5);box(24,54,49,68,white,5)
  for yy in [105,94,83]:line(33,yy,63,yy,BLUE,3)
  box(84,25,84,54,BLUE,17);box(79,69,94,57,NAVY,17);box(87,77,78,40,white,12)
  circle(108,98,5,TEAL);circle(145,98,5,TEAL);line(115,85,137,85,TEAL,3)
  line(127,126,127,135,NAVY,3);circle(127,137,4,gold)
  box(157,24,59,36,white,8);circle(186,42,11,TEAL);check(180,41,.65)
  line(75,55,60,34,BLUE,7);line(177,75,197,90,BLUE,7);sparkle(201,125);sparkle(48,135,violet)
 elif kind=='erp':
  # Four business modules orbit one shared data hub.
  for xx,yy in [(42,106),(189,106),(42,37),(189,37)]:line(115,73,xx,yy,TEAL,3)
  circle(115,73,33,BLUE);circle(115,73,25,NAVY)
  for yy in [61,72,83]:
   box(99,yy,32,8,white,3)
  for xx,yy,col in [(18,88,TEAL),(165,88,violet),(18,14,BLUE),(165,14,coral)]:
   box(xx,yy,48,40,col,8)
   box(xx+12,yy+10,24,21,white,3);line(xx+17,yy+24,xx+31,yy+24,col,2);line(xx+17,yy+17,xx+29,yy+17,col,2)
  sparkle(112,132,violet);sparkle(113,16)
 elif kind=='flow':
  # Work cards travel through a reviewed approval into a launch.
  for xx,yy in [(20,40),(35,52)]:box(xx,yy,51,59,white,5)
  for yy in [95,84,73]:line(45,yy,72,yy,BLUE,3)
  line(85,79,129,79,TEAL,4);line(119,88,131,79,TEAL,4);line(119,70,131,79,TEAL,4)
  circle(119,37,18,TEAL);check(111,36,.9)
  c.saveState();c.translate(170,69);c.rotate(-28)
  path=c.beginPath();path.moveTo(-16,-19);path.lineTo(-21,12);path.curveTo(-20,35,-7,48,0,57);path.curveTo(7,48,20,35,21,12);path.lineTo(16,-19);path.close()
  c.setFillColor(BLUE);c.drawPath(path,stroke=0,fill=1);circle(0,21,11,white);circle(0,21,6,CYAN)
  path=c.beginPath();path.moveTo(-10,-20);path.lineTo(0,-46);path.lineTo(10,-20);path.close();c.setFillColor(gold);c.drawPath(path,stroke=0,fill=1)
  c.restoreState();sparkle(208,126,violet);line(139,20,149,39,CYAN,3);line(151,13,160,32,CYAN,2)
 elif kind=='understand':
  box(37,34,114,83,white,8)
  for xx,hh,col in [(51,24,BLUE),(76,40,TEAL),(101,54,violet)]:box(xx,46,17,hh,col,3)
  circle(153,86,32,NAVY);circle(153,86,24,white);circle(153,86,18,sky);line(174,62,200,33,NAVY,12)
  line(143,86,150,79,TEAL,3);line(150,79,166,97,TEAL,3);sparkle(45,128)
 elif kind=='build':
  # Interlocking blocks with a visible connector and assembly sparks.
  for xx,yy,col in [(50,31,BLUE),(103,31,TEAL),(103,84,violet)]:
   box(xx,yy,47,47,col,7);circle(xx+23,yy+47,8,col)
  box(162,90,39,39,gold,6);circle(181,129,7,gold)
  line(178,74,156,53,TEAL,3);line(156,53,158,67,TEAL,3);line(156,53,170,54,TEAL,3)
  sparkle(67,110);sparkle(191,29,violet)
 else:
  box(36,29,161,97,white,9)
  for xx,hh,col in [(55,22,BLUE),(86,39,TEAL),(117,57,violet),(148,74,BLUE)]:box(xx,39,21,hh,col,3)
  line(47,84,79,98,TEAL,4);line(79,98,112,115,TEAL,4);line(112,115,169,139,TEAL,4)
  line(157,139,169,139,TEAL,4);line(169,139,164,126,TEAL,4)
  circle(191,40,18,TEAL);check(183,39,.9);sparkle(29,116,violet)
 c.restoreState()

# 01 - The three-second hook.
box(0,0,W,H,NAVY);box(0,704,W,88,white);logo(40,716,155)
label('PRIVATE AI. CONNECTED ERP. YOUR BUSINESS.',40,670,CYAN)
for s,y,col in [('Stop chasing',615,white),('information.',564,white),('Start running',502,CYAN),('your business.',451,CYAN)]:text(s,38,y,46,'AB',col)
wrap('Answers for your people. Connected operations. More control.',40,412,500,14,21,'A',white)
photo('ai-erp/connection-works.webp',0,49,612,302)
box(32,76,548,66,white,8)
for x,title,sub in [(49,'Find answers.','Private company knowledge'),(233,'Connect work.','Odoo ERP + automation'),(415,'Keep control.','Your data. Your approvals.')]:
 text(title,x,115,15,'AB',NAVY);text(sub,x,96,8.3,'A',MUTED)
footer(1,True);c.showPage()

# 02 - Large illustrated solution scenes.
head('LESS BUSYWORK. MORE BUSINESS.')
text('Your team,',40,656,38,'AB',NAVY);text('supercharged.',40,612,38,'AB',TEAL)
for y,num,kind,tag,title,body in [
 (420,'01','ai','PRIVATE AI','Find answers.','Your company knowledge. One helpful assistant.'),
 (250,'02','erp','ODOO ERP','Connect work.','Sales, stock and operations. One shared system.'),
 (80,'03','flow','AI + ERP','Move forward.','AI prepares. Your people approve.')]:
 box(40,y,532,153,MIST,12);scene(kind,48,y+4,245,145)
 circle(315,y+123,13,TEAL);text(num,307,y+119,9,'AB',white)
 label(tag,338,y+120);text(title,305,y+79,24,'AB',NAVY)
 wrap(body,305,y+50,245,12,18)
text('Approved knowledge. Controlled access. Human review.',40,52,9,'AB',NAVY)
footer(2);c.showPage()

# 03 - Familiar situations make the offer tangible.
head('BUILT AROUND YOUR WORKDAY')
text('See your business',40,655,35,'AB',NAVY);text('in the possibilities.',40,613,35,'AB',TEAL)
wrap('Built for the way you work.',40,577,510,12,18)
examples=[(403,'industries/wholesale-distribution.webp','DISTRIBUTION','Know what is waiting.','Orders, stock and deliveries. One clear view.'),(263,'industries/hvac-field-service.webp','HVAC + FIELD SERVICE','Give every visit context.','Service history, parts and guidance. Ready for every visit.'),(123,'restaurants/chinese-buffet.png','RESTAURANTS','See more than sales.','Food cost, purchasing and waste. Better visibility.')]
for y,im,tag,title,body in examples:
 photo(im,40,y,235,125);label(tag,295,y+102);wrap(title,295,y+74,275,21,25,'AB',NAVY);wrap(body,295,y+23,270,11,15)
text('Also built for',40,91,9,'AB',TEAL)
text('Construction  /  Retail  /  Manufacturing  /  Professional services',40,72,10,'A',NAVY)
text('Seven industries. More ideas in the full catalog.',40,51,8.5,'A',MUTED)
footer(3);c.showPage()

# 04 - Illustrated engagement steps and scan destination.
head('YOUR NEXT STEP')
text('One better workflow.',40,658,35,'AB',NAVY)
text('Start here.',40,615,35,'AB',TEAL)
for x,num,title,kind in [(40,'01','Understand','understand'),(223,'02','Build','build'),(406,'03','Improve','improve')]:
 box(x,414,166,174,MIST,10);scene(kind,x+3,455,160,111)
 label(num,x+12,569);text(title,x+14,432,18,'AB',NAVY)
box(40,200,532,197,NAVY,10)
label('SCAN. EXPLORE. GET INSPIRED.',62,371,CYAN)
text('44 pages.',62,327,36,'AB',white);text('Your next idea.',62,288,29,'AB',white)
wrap('Discover the full Yudaro catalog.',62,251,280,12,18,'A',white)
box(404,234,145,145,white,6);qr_code(409,239,135)
text('OPEN THE FULL CATALOG',411,217,7.7,'AB',white)
c.linkURL(URL,(40,200,572,397),relative=0)
text('Start your free assessment',40,169,20,'AB',NAVY)
text('www.yudaro.com/assessment',40,147,12,'A',TEAL)
c.linkURL('https://www.yudaro.com/assessment',(40,138,410,186),relative=0)
line(40,126,572,126)
text('info@yudaro.com',40,103,15,'AB',TEAL);text('832-868-2880',351,103,14,'AB',NAVY)
c.linkURL('mailto:info@yudaro.com',(40,95,240,119),relative=0)
c.linkURL('tel:+18328682880',(345,95,530,119),relative=0)
text('www.yudaro.com/contact',40,80,10,'A',NAVY)
c.linkURL('https://www.yudaro.com/contact',(40,74,300,91),relative=0)
text('13366 Murphy Road, Stafford, TX 77477',40,59,9,'A',MUTED)
footer(4);c.save()
print(OUT)
