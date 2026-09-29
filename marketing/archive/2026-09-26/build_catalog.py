from pathlib import Path
import io,json,re
import pymupdf as fitz
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
S=Path(__file__).resolve().parent; R=S.parent.parent; O=R/'output/pdf';O.mkdir(parents=True,exist_ok=True)
D=json.loads((S/'culture-content.json').read_text(encoding='utf-8'))
BG='#F5FBFB';NAVY='#0D2C43';TEAL='#087F8C';MUTED='#566C79';WHITE='#FFFFFF'
for name,file in [('Regular','arial.ttf'),('Bold','arialbd.ttf')]:pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
LOGO=S/'assets/logo.png'
def p(c,x,y,w,s,size=10,bold=False,color=NAVY,maxh=700):
 st=ParagraphStyle('t',fontName='Bold' if bold else 'Regular',fontSize=size,leading=size*1.34,textColor=HexColor(color))
 q=Paragraph(s,st);_,h=q.wrap(w,700);assert h<=maxh,(s,h,maxh);q.drawOn(c,x,792-y-h);return h

def rect(c,x,y,w,h,color=WHITE,r=10):
 c.setFillColor(HexColor(color));c.roundRect(x,792-y-h,w,h,r,fill=1,stroke=0)
def line(c,x,y,x2,y2,col='#DCE8EB'):
 c.setStrokeColor(HexColor(col));c.setLineWidth(1);c.line(x,792-y,x2,792-y2)
def header(c,kicker,title,sub):
 rect(c,0,0,612,792,BG,0);c.drawImage(str(LOGO),42,736,115,35,preserveAspectRatio=True,mask='auto')
 p(c,384,35,185,'COMPANY CATALOG / 2026',7,color=MUTED);line(c,42,74,570,74)
 p(c,42,93,528,kicker,8,color=TEAL);p(c,42,117,528,title,29,True,maxh=80)
 p(c,42,203,528,sub,10,color=MUTED,maxh=42)
 line(c,42,742,570,742);p(c,42,752,65,'Yudaro',8);p(c,111,752,150,'www.yudaro.com',8,color=MUTED);p(c,447,752,50,'Contents',8,color=TEAL)
buf=io.BytesIO();c=canvas.Canvas(buf,pagesize=(612,792))
header(c,'PRIVATE AI + ERP / CORPORATE CULTURE INTELLIGENCE','Turn Corporate Experience Into<br/>Intelligence Everyone Can Use',D['primary'])
p(c,42,258,248,'The knowledge you cannot afford to lose',14,True)
p(c,42,305,248,'Experience often lives in a few people, informal conversations and scattered documents. New employees can receive conflicting guidance. Preserve what works, with owners who keep it current.',10,color=MUTED,maxh=95)
p(c,316,258,254,'Your culture, ready to guide daily work',14,True)
p(c,316,305,254,'Your company already has a culture. Yudaro helps capture it, strengthen it, and make it available at the moment every employee needs guidance.',10,color=MUTED,maxh=95)
# Branded vector contributors. Human review visibly separates input from shared knowledge.
roles=['Sales','Operations','HR','Finance','Customer service','Management']
for i,role in enumerate(roles):
 x=42+(i%3)*180;y=397+(i//3)*39
 rect(c,x,y,168,31);c.setFillColor(HexColor(TEAL));c.circle(x+15,792-y-11,3.4,fill=1,stroke=0);rect(c,x+10,y+17,10,7,TEAL,2)
 p(c,x+29,y+8,132,role,9,True)
p(c,42,478,528,'Eligible questions + corrections • SOPs + training • values + leadership decisions • ERP context',8.6,color=MUTED)
line(c,306,497,306,512,TEAL);rect(c,138,512,336,31,'#E1F3F3');p(c,151,520,310,'AUTHORIZED REVIEW + ADMINISTRATIVE APPROVAL',9,True,TEAL)
line(c,306,543,306,554,TEAL);rect(c,42,554,528,77,NAVY)
p(c,62,567,488,'Governed Corporate Intelligence',21,True,WHITE);p(c,62,602,488,'Permission-controlled sources. Role-appropriate, source-based guidance.',10,color='#D2E9EE')
p(c,42,648,528,'Preserve experience. Align decisions. Strengthen culture as you grow.',12,True,TEAL)
p(c,42,683,528,'A Yudaro implementation methodology within Private AI + ERP. Controls and integrations are scoped and tested for each deployment. Authorized leaders can update policies and practices as culture evolves.',9,color=MUTED,maxh=42)
c.showPage()
header(c,'CORPORATE CULTURE INTELLIGENCE / HOW IT WORKS','How Corporate AI<br/>Strengthens Culture','Learns from governed feedback and approved organizational knowledge. People remain responsible for what becomes shared guidance.')
for i,(title,body) in enumerate(D['steps']):
 x=42+(i%3)*180;y=256+(i//3)*74
 rect(c,x,y,168,64,'#E1F3F3' if title=='Approve' else WHITE)
 p(c,x+11,y+8,146,f'{i+1:02} / {title}',11,True,TEAL)
 p(c,x+11,y+28,146,body,8.6,color=MUTED,maxh=35)
p(c,42,420,346,'One culture. Practical questions for every role.',12,True)
for i,(role,question) in enumerate(D['examples']):
 x=42+(i%2)*178;y=453+(i//2)*91
 p(c,x,y,163,role,10,True,TEAL);p(c,x,y+19,162,question,9.2,color=MUTED,maxh=67)
rect(c,408,418,162,285,NAVY)
p(c,422,434,134,'Built on Trust',16,True,WHITE)
p(c,422,471,134,'Private deployment options<br/><br/>Role-based permissions<br/><br/>Admin-controlled approval<br/><br/>Sensitive data exclusions<br/><br/>Source attribution<br/><br/>Versions, expiry and audit history<br/><br/>Correction and retirement<br/><br/>Human oversight',8.8,color=WHITE,maxh=225)
p(c,42,729,528,'Feedback is reviewed, not automatic training on every conversation. AI supports leadership judgment.',7.8,color=MUTED,maxh=12)
c.showPage();c.save();new=fitz.open(stream=buf.getvalue(),filetype='pdf')
d=fitz.open(S/'catalog-base-46.pdf')
# Preserve vector backgrounds and photos; redact only old text and add measured vector text.
def replace(n,r,s,size=10,bold=False,color=NAVY):
 pg=d[n-1];rr=fitz.Rect(r);pg.add_redact_annot(rr,fill=None);pg.apply_redactions(images=0,graphics=0)
 b=io.BytesIO();cc=canvas.Canvas(b,pagesize=(612,792));p(cc,rr.x0,rr.y0,rr.width,s,size,bold,color,maxh=rr.height);cc.save();ov=fitz.open(stream=b.getvalue(),filetype='pdf');pg.show_pdf_page(pg.rect,ov,0)
replace(1,(42,370,570,437),D['primary'],12,False,TEAL)
replace(2,(42,203,570,241),'Yudaro combines Private AI, Corporate Culture Intelligence, Odoo ERP and practical implementation—connecting approved company experience with the way your business works.',10)
replace(4,(42,173,570,215),'Private AI connects approved knowledge, policies and operating experience. Corporate Culture Intelligence adds governed feedback and leadership review to support guidance aligned with your company’s values.',10)
replace(4,(42,658,570,685),'Approved knowledge. Company-aligned guidance. Human oversight.',12,True)
replace(5,(42,696,570,732),'Corporate Culture Intelligence extends knowledge search with approved decisions, leadership principles and reviewed feedback. Explore the governed approach on pages 10–11.',10)
replace(7,(416,602,565,644),'Support onboarding with approved practices and role-appropriate guidance.',9)
replace(7,(42,707,570,732),'Corporate Culture Intelligence: reviewed feedback improves shared guidance. See pages 10–11.',9,False,TEAL)
replace(16,(42,205,570,247),'Connect approved company knowledge and culture with operational ERP context. Yudaro scopes role-appropriate guidance, reviewed feedback and human approval; business transactions keep their own authorization controls.',10)
replace(17,(42,685,570,729),'Preserve institutional knowledge. Align departmental decisions.<br/>Corporate Culture Intelligence helps scale access to approved leadership experience.',10,True,TEAL)
replace(44,(42,204,570,246),'Yudaro helps companies turn experience, values and operational knowledge into useful intelligence. Our Private AI + ERP approach combines Corporate Culture Intelligence, connected systems and practical implementation.',10)
# Service capability summary fits existing spacious engagement cards.
replace(45,(42,254,570,273),'',8)
for x,w,t in [(56,182,'CAPABILITY'),(248,167,'BUSINESS VALUE'),(430,120,'HUMAN CHECKPOINT')]:
 replace(45,(x,254,x+w,276),t,8,True,TEAL)
for y,cap,value,check in [(296,'Private AI + Corporate Culture Intelligence','Company-aligned guidance','Knowledge approval'),(352,'Odoo ERP','Connected operating records','Process ownership'),(408,'AI + ERP integration','Permissioned operational context','Action authorization'),(464,'Website + automation','Connected digital workflows','Scope and release review')]:
 replace(45,(56,y,551,y+29),'',9)
 for x,w,t in [(56,179,cap),(248,165,value),(430,119,check)]:replace(45,(x,y,x+w,y+31),t,9,x==56)
replace(46,(42,114,570,211),'Your Company’s Knowledge<br/>Should Grow With Your Business',29,True)
replace(46,(42,225,570,252),'Turn company experience into Corporate Intelligence.',15,True,TEAL)
replace(46,(42,265,570,317),'Build a practical plan for approved knowledge, company values and governed feedback within Private AI + ERP. Start with one team and one recurring decision.',11,False,MUTED)
replace(46,(64,358,545,393),'Schedule a Corporate AI Assessment',20,True,WHITE)
replace(46,(64,400,542,437),'Scope your knowledge, permissions, review owners and first pilot.',11,False,WHITE)
# Contact CTA replaces prior generic assessment link in the colored card.
for a in d[45].get_links():
 if a['from'].y0>330 and a['from'].y0<460:
  d[45].delete_link(a)
d[45].insert_link({'kind':fitz.LINK_URI,'from':fitz.Rect(42,342,570,461),'uri':'https://yudaro.com/contact'})
replace(37,(42,686,570,728),'Restaurant POS + connected ERP: see pages 16–17.<br/>Retain your existing POS or configure Odoo around your service model.',9,False,TEAL)
for j,start in enumerate([21,24,27,30,33,36,39]):replace(18,(509,271+j*64,560,292+j*64),f'{start}–{start+2}',8.5,False,TEAL)
links=[[dict(a) for a in pg.get_links()] for pg in d]
for pg in d:
 for a in pg.get_links():pg.delete_link(a)
d.insert_pdf(new,start_at=9)
for old,ls in enumerate(links):
 pg=d[old+(2 if old>=9 else 0)]
 for a in ls:
  a.pop('xref',None);a.pop('id',None)
  if a['kind']==fitz.LINK_GOTO and a.get('page',-1)>=9:a['page']+=2
  pg.insert_link(a)
# Page numbers, clickable contents, industry ranges and bookmarks agree.
entries=[('The opportunity',3),('Private enterprise AI',4),('Corporate Culture Intelligence',10),('ERP systems',12),('Restaurant POS',16),('AI + ERP',18),('Industries',20),('Website design',43),('Equipment',44),('How it works',45),('About Yudaro',46),('Services + engagement',47),('Start a conversation',48)]
replace(2,(380,326,557,651),'',9)
for a in d[1].get_links():
 if a['kind']==1 and a['from'].x0>380 and a['from'].y0<650:d[1].delete_link(a)
for i,(label,num) in enumerate(entries):
 y=332+i*24
 replace(2,(384,y,533,y+22),label,8.2)
 replace(2,(537,y,558,y+22),str(num).zfill(2),8.2,False,TEAL)
 d[1].insert_link({'kind':1,'from':fitz.Rect(382,y-1,558,y+22),'page':num-1,'to':fitz.Point(0,0)})
for i in range(len(d)):
 replace(i+1,(519,749,570,770),f'{i+1:02} / 48',8,False,MUTED)
 if i in [9,10]:d[i].insert_link({'kind':1,'from':fitz.Rect(445,749,493,770),'page':1,'to':fitz.Point(0,0)})
d.set_toc([[1,label,num] for label,num in entries]);d.set_metadata({'title':'Yudaro Catalog 2026 | Corporate Culture Intelligence | 48 pages','author':'Yudaro','subject':'Private AI + ERP, approved company knowledge and governed feedback | September 26, 2026'})
d.save(O/'Yudaro_Catalog_2026_Corporate_Culture_48_Pages.pdf',garbage=4,deflate=True)
print('Catalog generated:',len(d),'pages')
