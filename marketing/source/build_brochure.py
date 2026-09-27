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

SOURCE=Path(__file__).resolve().parent
ROOT=SOURCE.parent.parent
OUT=ROOT/'output/pdf/Yudaro_Brochure_2026_Corporate_Culture_4_Pages.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
URL='https://yudaro.com/catalog/yudaro-catalog-2026-corporate-culture.pdf'
W,H=612,792
NAVY=HexColor('#092B46'); BLUE=HexColor('#08649E'); CYAN=HexColor('#00C7D5'); TEAL=HexColor('#007B8C'); MIST=HexColor('#F0F7FB'); INK=HexColor('#183B51'); MUTED=HexColor('#52677B'); LINE=HexColor('#D9E5EE')
pdfmetrics.registerFont(TTFont('A',r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('AB',r'C:\Windows\Fonts\arialbd.ttf'))
c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
c.setTitle('Yudaro | Corporate Culture Intelligence')
c.setAuthor('Yudaro AI & ERP Systems')
c.setSubject('Corporate Culture Intelligence within Private AI + ERP - September 26, 2026')

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
 im=Image.open(SOURCE/'assets'/name).convert('RGB')
 im=ImageOps.fit(im,(int(w*3),int(h*3)),method=Image.Resampling.LANCZOS)
 buf=BytesIO();im.save(buf,format="JPEG",quality=90,optimize=True);buf.seek(0)
 c.drawImage(ImageReader(buf),x,y,w,h)
def logo(x,y,w):
 im=Image.open(SOURCE/'assets/logo.png').convert('RGBA')
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


# 01 — Preserve the original cover composition, rebalanced for the new message.
box(0,0,W,H,NAVY);box(0,704,W,88,white);logo(40,716,155)
label('CORPORATE CULTURE INTELLIGENCE',40,670,CYAN)
for title,y,col in [('Build a Corporate AI',618,white),('That Reflects How',574,white),('Your Company',522,CYAN),('Thinks',478,CYAN)]:text(title,38,y,37,'AB',col)
wrap('Turn your company’s experience, values, and way of solving problems into intelligence every employee can use.',40,433,516,13,19,'A',white)
photo('ai-erp/connection-works.webp',0,49,612,302)
box(32,76,548,79,white,8)
for x,title,sub in [(49,'Preserve knowledge','Keep experience available'),(229,'Align decisions','Across departments'),(409,'Strengthen culture','As your company grows')]:
 text(title,x,126,12,'AB',NAVY);wrap(sub,x,105,150,9,13)
footer(1,True);c.showPage()

# 02 — Knowledge has an owner, and feedback has a visible approval checkpoint.
head('PRIVATE AI + ERP / GOVERNED IMPROVEMENT')
text('Your knowledge.',40,657,37,'AB',NAVY);text('Your way of working.',40,611,37,'AB',TEAL)
wrap('Yudaro combines approved company knowledge, leadership principles, operating experience, and governed employee feedback to create more consistent, company-aligned guidance across every department.',40,574,525,12,18)
box(40,355,532,131,MIST,12)
for x,title in [(60,'Company knowledge'),(231,'Leadership principles'),(402,'ERP context')]:
 text(title,x,462,10,'AB',TEAL);line(x+63,449,x+63,431,TEAL,1)
box(68,382,476,47,NAVY,9);text('Approved knowledge → role-appropriate guidance',88,410,13,'AB',white)
text('Administrators decide what becomes shared organizational knowledge.',88,392,9,'A',white)
label('ASK. LEARN. REVIEW. IMPROVE.',40,326)
steps=[('Ask','A workplace question'),('Answer','Source-based guidance'),('Review','People give feedback'),('Approve','Authorized leaders decide'),('Improve','Update approved knowledge'),('Share','Guidance for each role')]
for i,(title,body) in enumerate(steps):
 x=40+(i%3)*183;y=221-(i//3)*76
 box(x,y,166,64,HexColor('#E1F3F3') if title=='Approve' else MIST,8)
 text(f'{i+1:02}  {title}',x+11,y+41,13,'AB',TEAL);wrap(body,x+11,y+21,144,9,12)
wrap('Private, permission-controlled, source-based, and guided by human approval.',40,123,532,11,15,'AB',NAVY)
wrap('Implementation scope is agreed and tested. Sensitive conversations can be excluded; feedback is not automatic training. Leaders can correct, retire or update knowledge as culture evolves.',40,83,532,9,13)
footer(2);c.showPage()

# 03 — Existing industry imagery and layout, with practical culture examples.
head('BUILT AROUND YOUR WORKDAY')
text('See your business',40,655,35,'AB',NAVY);text('in the possibilities.',40,613,35,'AB',TEAL)
wrap('Private AI guidance. Connected ERP records. Decisions led by your people.',40,577,525,11,18)
examples=[(403,'industries/wholesale-distribution.webp','DISTRIBUTION','Protect the relationship.','Use approved margin and delivery policies when an urgent customer request arrives.'),(263,'industries/hvac-field-service.webp','HVAC + FIELD SERVICE','Give every visit context.','Connect service history with approved escalation and customer-care practices.'),(123,'restaurants/chinese-buffet.png','RESTAURANTS','Make service consistent.','Connect POS and ERP with approved training, complaint handling and service standards.')]
for y,im,tag,title,body in examples:
 photo(im,40,y,235,125);label(tag,295,y+102);wrap(title,295,y+74,275,20,24,'AB',NAVY);wrap(body,295,y+23,270,10,14)
text('Also built for',40,91,9,'AB',TEAL)
text('Construction  /  Retail  /  Manufacturing  /  Professional services',40,72,10,'A',NAVY)
text('Illustrative workflows. Sources, permissions and controls are scoped for each deployment.',40,51,8.5,'A',MUTED)
footer(3);c.showPage()

# 04 — Keep the three engagement illustrations and give the QR a versioned destination.
head('YOUR NEXT STEP')
text('Turn Your Company’s',40,660,31,'AB',NAVY)
text('Experience Into',40,621,31,'AB',NAVY)
text('Corporate Intelligence.',40,582,31,'AB',TEAL)
for x,num,title,kind in [(40,'01','Understand','understand'),(223,'02','Build','build'),(406,'03','Improve','improve')]:
 box(x,402,166,156,MIST,10);scene(kind,x+3,435,160,101)
 label(num,x+12,540);text(title,x+14,418,18,'AB',NAVY)
box(40,200,532,186,NAVY,10)
label('EXPLORE THE NEW CATALOG',62,361,CYAN)
text('48 pages.',62,321,36,'AB',white);text('Your next idea.',62,281,29,'AB',white)
wrap('Private AI. Corporate Culture Intelligence. Connected ERP.',62,249,280,11,16,'A',white)
box(404,232,145,145,white,6);qr_code(409,237,135)
text('OPEN THE FULL CATALOG',411,215,7.7,'AB',white)
c.linkURL(URL,(40,200,572,386),relative=0)
text('Schedule a Corporate AI Assessment',40,170,21,'AB',NAVY)
text('www.yudaro.com/contact',40,147,12,'A',TEAL)
c.linkURL('https://yudaro.com/contact',(40,138,540,188),relative=0)
line(40,126,572,126)
text('info@yudaro.com',40,103,15,'AB',TEAL);text('281-258-8000',351,103,14,'AB',NAVY)
c.linkURL('mailto:info@yudaro.com',(40,95,240,119),relative=0);c.linkURL('tel:+12812588000',(345,95,530,119),relative=0)
text('www.yudaro.com',40,80,10,'A',NAVY)
c.linkURL('https://yudaro.com',(40,74,300,91),relative=0)
text('13366 Murphy Road, Stafford, TX 77477',40,59,9,'A',MUTED)
footer(4);c.save();print(OUT)
