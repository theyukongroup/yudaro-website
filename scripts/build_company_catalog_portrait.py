from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Nexavoris_Company_Catalog_2026_Portrait.pdf"
W, H = letter
TOTAL = 26

IVORY=HexColor("#F4F0E8"); STONE=HexColor("#D9D2C5"); CHARCOAL=HexColor("#181A1D")
BRONZE=HexColor("#8E7156"); CHAMPAGNE=HexColor("#B6A17E"); WHITE=HexColor("#FFFFFF")
GREEN=HexColor("#1F5C4D"); SLATE=HexColor("#56605D")
pdfmetrics.registerFont(TTFont("Georgia",r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold",r"C:\Windows\Fonts\georgiab.ttf"))

CACHE=ROOT/"tmp"/"pdfs"/"catalog-assets-portrait"
def asset(path): return ROOT/"public"/path
def prepared(path):
    source=Path(path); CACHE.mkdir(parents=True,exist_ok=True); target=CACHE/f"{source.parent.name}-{source.stem}.jpg"
    if not target.exists() or target.stat().st_mtime<source.stat().st_mtime:
        with Image.open(source) as original:
            im=ImageOps.exif_transpose(original).convert("RGB"); im.thumbnail((1800,1800),Image.Resampling.LANCZOS)
            im.save(target,"JPEG",quality=87,optimize=True,progressive=True)
    return target

def image_cover(c,path,x,y,w,h):
    path=prepared(path)
    with Image.open(path) as im: iw,ih=im.size
    scale=max(w/iw,h/ih); dw,dh=iw*scale,ih*scale; dx=x+(w-dw)/2; dy=y+(h-dh)/2
    c.saveState(); clip=c.beginPath(); clip.rect(x,y,w,h); c.clipPath(clip,stroke=0)
    c.drawImage(str(path),dx,dy,dw,dh,preserveAspectRatio=True,mask="auto"); c.restoreState()

def text(c,value,x,y,font="Helvetica",size=10,color=CHARCOAL,tracking=0):
    c.setFillColor(color); t=c.beginText(x,y); t.setFont(font,size); t.setCharSpace(tracking); t.textLine(value); c.drawText(t)

def wrap(c,value,x,y,width,font="Helvetica",size=10,leading=15,color=SLATE,max_lines=20):
    words=value.split(); rows=[]; row=""
    for word in words:
        candidate=(row+" "+word).strip()
        if pdfmetrics.stringWidth(candidate,font,size)<=width: row=candidate
        else:
            if row: rows.append(row)
            row=word
    if row: rows.append(row)
    for i,row in enumerate(rows[:max_lines]): text(c,row,x,y-i*leading,font,size,color)
    return y-len(rows[:max_lines])*leading

def label(c,value,x,y,color=BRONZE): text(c,value.upper(),x,y,"Helvetica-Bold",7.2,color,1.2)
def rule(c,x1,y,x2,color=STONE): c.setStrokeColor(color); c.setLineWidth(.6); c.line(x1,y,x2,y)
def bg(c,color=IVORY): c.setFillColor(color); c.rect(0,0,W,H,fill=1,stroke=0)
def footer(c,page,dark=False):
    color=HexColor("#D8D3CB") if dark else HexColor("#706C65")
    text(c,"NEXAVORIS AI & ERP SYSTEMS",34,18,"Helvetica-Bold",6,color,.8)
    text(c,f"{page:02d} / {TOTAL}",W-65,18,"Helvetica",6,color)

def heading(c,value,x,y,width,size=36,color=CHARCOAL): return wrap(c,value,x,y,width,"Georgia",size,size*1.04,color,6)

def cover(c):
    image_cover(c,asset("ai-erp/connection-works.webp"),0,0,W,H); c.setFillColor(CHARCOAL); c.setFillAlpha(.68); c.rect(0,0,W,H,fill=1,stroke=0); c.setFillAlpha(1)
    c.setFillColor(IVORY); c.rect(0,0,16,H,fill=1,stroke=0); label(c,"COMPANY CATALOG / 2026",46,H-56,CHAMPAGNE)
    heading(c,"AI that understands your business. ERP that runs it.",46,H-112,500,47,WHITE)
    wrap(c,"Private AI, Odoo ERP, connected operations, and business-first implementation for growing companies.",48,125,450,"Helvetica",11,17,HexColor("#E4E0D8"),4)
    text(c,"STAFFORD, TEXAS",48,54,"Helvetica-Bold",7,CHAMPAGNE,1.4)

def portrait_detail(c,page,kicker,title,body,img,benefits):
    bg(c); image_cover(c,asset(img),0,407,W,385)
    c.setFillColor(CHARCOAL); c.setFillAlpha(.12); c.rect(0,407,W,385,fill=1,stroke=0); c.setFillAlpha(1)
    c.setFillColor(IVORY); c.rect(0,0,W,422,fill=1,stroke=0)
    label(c,kicker,38,384); heading(c,title,38,346,520,30)
    y=wrap(c,body,38,263,520,"Helvetica",9.5,14,SLATE,5); rule(c,38,y-2,574); y-=34
    for i,item in enumerate(benefits,1):
        row=y-(i-1)*41; text(c,f"0{i}",38,row,"Helvetica-Bold",7,BRONZE); wrap(c,item,78,row,480,"Helvetica-Bold",9,12,CHARCOAL,2)
    footer(c,page)

def image_grid(c,page,kicker,title,intro,images,labels,dark=False):
    bg(c,CHARCOAL if dark else IVORY); fg=WHITE if dark else CHARCOAL; muted=HexColor("#C9C7C0") if dark else SLATE
    label(c,kicker,38,H-48,CHAMPAGNE if dark else BRONZE); heading(c,title,38,H-88,530,34,fg)
    wrap(c,intro,38,H-190,530,"Helvetica",9.4,14,muted,6)
    gap=10; x0=38; w=(W-76-gap)/2; h=174; y0=58
    for i,img in enumerate(images[:4]):
        x=x0+(i%2)*(w+gap); y=y0+(1-i//2)*(h+gap); image_cover(c,asset(img),x,y,w,h)
        c.setFillColor(CHARCOAL); c.setFillAlpha(.56); c.rect(x,y,w,33,fill=1,stroke=0); c.setFillAlpha(1)
        text(c,labels[i],x+12,y+12,"Helvetica-Bold",8,WHITE)
    footer(c,page,dark)

def full_bleed(c,page,kicker,title,body,img):
    image_cover(c,asset(img),0,0,W,H); c.setFillColor(CHARCOAL); c.setFillAlpha(.57); c.rect(0,0,W,H,fill=1,stroke=0); c.setFillAlpha(1)
    label(c,kicker,42,H-55,CHAMPAGNE); heading(c,title,42,H-106,515,40,WHITE)
    wrap(c,body,42,132,500,"Helvetica",10,15,HexColor("#E7E4DE"),7); footer(c,page,True)

def modules_page(c,page):
    bg(c,CHARCOAL); label(c,"ERP / BUSINESS MODULES",38,H-48,CHAMPAGNE); heading(c,"One connected operational record.",38,H-89,500,36,WHITE)
    modules=["Sales","CRM","Inventory","Purchasing","Accounting","Field service","Projects","Employees","Memberships","Website","Reporting"]
    for i,m in enumerate(modules):
        col=i%2; row=i//2; x=38+col*272; y=515-row*73
        c.setStrokeColor(HexColor("#515652")); c.rect(x,y,254,58,fill=0,stroke=1); label(c,f"{i+1:02d}",x+14,y+38,CHAMPAGNE); text(c,m,x+14,y+17,"Helvetica-Bold",10,WHITE)
    footer(c,page,True)

def process_page(c,page):
    bg(c); label(c,"08 / HOW IT WORKS",38,H-48); heading(c,"Understand. Design. Implement. Improve.",38,H-90,520,36)
    phases=[("01","Understand","Discovery and business-process analysis"),("02","Design","System architecture, workflow, and controls"),("03","Implement","Configuration, migration, integration, and training"),("04","Improve","Ongoing support and measured refinement")]
    for i,(n,h,b) in enumerate(phases):
        x=38+(i%2)*272; y=384-(i//2)*225; c.setFillColor(WHITE); c.rect(x,y,254,197,fill=1,stroke=0); c.setStrokeColor(STONE); c.rect(x,y,254,197,fill=0,stroke=1)
        label(c,n,x+18,y+166); wrap(c,h,x+18,y+129,210,"Georgia",21,24,CHARCOAL,2); rule(c,x+18,y+98,x+232); wrap(c,b,x+18,y+73,210,"Helvetica",9,13,SLATE,5)
    footer(c,page)

def services_page(c,page):
    bg(c); label(c,"10 / SERVICES + ENGAGEMENT",38,H-48); heading(c,"A practical path to measurable improvement.",38,H-89,520,36)
    c.setFillColor(WHITE); c.rect(38,314,536,250,fill=1,stroke=0); c.setStrokeColor(STONE); c.rect(38,314,536,250,fill=0,stroke=1); label(c,"CORE ENGAGEMENTS",58,535)
    engagements=["AI implementation and private knowledge systems","Odoo ERP setup and workflow design","AI + ERP integration and automation","Website design and business integrations"]
    y=496
    for i,e in enumerate(engagements,1): text(c,f"0{i}",58,y,"Helvetica-Bold",7,BRONZE); wrap(c,e,91,y,450,"Helvetica-Bold",9,13,CHARCOAL,2); y-=49
    c.setFillColor(CHARCOAL); c.rect(38,74,536,215,fill=1,stroke=0); label(c,"ONGOING CARE",58,260,CHAMPAGNE)
    for i,(name,price) in enumerate([("Essential Care","$300 / month"),("Managed Operations","$800 / month"),("Priority Partnership","$1,500 / month")]):
        yy=220-i*51; text(c,name,58,yy,"Georgia",15,WHITE); text(c,price,345,yy,"Helvetica-Bold",9,CHAMPAGNE)
    footer(c,page)

def close(c,page):
    bg(c,CHARCOAL); c.setFillColor(BRONZE); c.rect(0,0,13,H,fill=1,stroke=0); label(c,"LET'S CONNECT",46,H-60,CHAMPAGNE)
    heading(c,"Build the operating system your business needs next.",46,H-116,500,42,WHITE)
    wrap(c,"Schedule a conversation about Private AI, Odoo ERP, connected operations, website design, or a tailored industry assessment.",46,250,500,"Helvetica",11,17,HexColor("#D9D8D2"),6)
    rule(c,46,176,556,HexColor("#59605D")); text(c,"13366 Murphy Road, Stafford, TX 77477",46,142,"Helvetica-Bold",9,WHITE)
    text(c,"281-258-8000",46,116,"Helvetica",9,WHITE); text(c,"info@nexavoris.ai",168,116,"Helvetica",9,WHITE)
    c.setFillColor(WHITE); c.roundRect(46,48,188,45,2,fill=1,stroke=0); text(c,"NEXAVORIS.AI",69,65,"Helvetica-Bold",13,GREEN,1.1); footer(c,page,True)

def build():
    OUT.parent.mkdir(parents=True,exist_ok=True); c=canvas.Canvas(str(OUT),pagesize=letter,pageCompression=1)
    cover(c); c.showPage()
    portrait_detail(c,2,"THE NEXAVORIS IDEA","Connect company knowledge to daily operations.","Nexavoris combines private enterprise AI, Odoo ERP, workflow automation, and practical implementation around the way your company actually works.","about/business-before-software.webp",["Company information remains controlled.","ERP supplies a dependable operational record.","AI helps people act on approved information.","Human review stays in important decisions."]); c.showPage()
    image_grid(c,3,"01 / THE OPPORTUNITY","Where growing businesses lose time and control.","Operational friction accumulates in handoffs, duplicate records, delayed answers, and knowledge that only one person can find.",["opportunity/scattered-data.webp","opportunity/information-search.webp","opportunity/disconnected-systems.webp","opportunity/management-insight.webp"],["Scattered data","Slow information search","Disconnected systems","Limited management insight"]); c.showPage()
    full_bleed(c,4,"02 / PRIVATE ENTERPRISE AI","AI grounded in your business.","Private AI works from approved company knowledge, policies, procedures, and documents so employees can retrieve useful answers while the business retains control.","ai-solutions/company-knowledge-ai.webp"); c.showPage()
    image_grid(c,5,"PRIVATE AI / CAPABILITIES","Useful answers. Controlled context.","Start with a defined knowledge problem. Control the sources, permissions, and operating boundaries. Expand after the team can measure accuracy and value.",["ai-solutions/management-ai-assistant.webp","ai-solutions/document-intelligence.webp","ai-solutions/ai-business-automation.webp","ai-solutions/private-ai-server.webp"],["Management assistant","Document intelligence","Business automation","Private AI server"],True); c.showPage()
    portrait_detail(c,6,"OPEN WEBUI / EXPERIENCE","A familiar workspace for private AI.","A conversational interface gives teams one place to work with approved models and company knowledge while administrators retain access control.","showcase/open-webui/chat-dashboard.png",["Conversational workspace","Controlled knowledge libraries","Model and access administration","Working notes and usage visibility"]); c.showPage()
    full_bleed(c,7,"03 / ERP SYSTEMS","ERP that makes operations visible.","Odoo connects customers, orders, purchasing, inventory, field work, projects, billing, and reporting around one shared operational record.","erp-solutions/odoo-implementation.webp"); c.showPage()
    image_grid(c,8,"ODOO ERP / SERVICES","Implementation beyond installation.","Software becomes useful when data, workflows, roles, and training fit the operation. Nexavoris designs the foundation and stays through adoption.",["erp-solutions/erp-consulting-workflow-design.webp","erp-solutions/data-migration-training.webp","erp-solutions/dashboards-reporting.webp","erp-solutions/third-party-integrations.webp"],["Workflow design","Migration + training","Dashboards + reporting","Third-party integrations"]); c.showPage()
    modules_page(c,9); c.showPage()
    image_grid(c,10,"ODOO / PRODUCT EXPERIENCE","Operational work, clearly organized.","Role-based workspaces keep each team focused while underlying records remain connected, reducing re-entry and clarifying the path from activity to reporting.",["showcase/odoo/sales.webp","showcase/odoo/crm.webp","showcase/odoo/inventory.webp","showcase/odoo/manufacturing.webp"],["Sales","CRM","Inventory","Manufacturing"]); c.showPage()
    portrait_detail(c,11,"04 / AI + ERP","One governed path from question to action.","ERP supplies operational truth. Private knowledge supplies context. AI makes both easier to understand while approvals keep people responsible.","ai-erp/connection-works.webp",["Live operational data","Company knowledge","Controlled execution","Traceable human approval"]); c.showPage()
    full_bleed(c,12,"AI + ERP / VALUE","Understand. Decide. Execute. Improve.","Ask operational questions. Find what needs attention. Prepare accurate records. Maintain accountability. Automate across teams. Improve from measured outcomes.","ai-erp/creates-value.webp"); c.showPage()
    image_grid(c,13,"05 / INDUSTRIES","Designed around real operating workflows.","Nexavoris starts with how work actually moves, then chooses the AI, ERP, and automation that support it.",["industries/wholesale-distribution.webp","industries/hvac-field-service.webp","industries/construction.webp","industries/manufacturing.webp"],["Wholesale distribution","HVAC + field service","Construction","Manufacturing"],True); c.showPage()
    details=[
      (14,"INDUSTRY FOCUS / WHOLESALE DISTRIBUTION","Inventory, fulfillment, and margin in one view.","Connect sales, customer pricing, purchasing, warehouse activity, returns, and reporting around one dependable operational record.","industries/wholesale-distribution.webp",["Reliable inventory availability","Demand-based purchasing","Clear warehouse execution","Customer and margin visibility"]),
      (15,"INDUSTRY FOCUS / HVAC + FIELD SERVICE","Give the field team the full service picture.","Connect CRM, dispatch, work orders, equipment history, parts, memberships, estimates, invoicing, and approved service knowledge.","industries/hvac-field-service.webp",["Current equipment history","Cleaner dispatch and work orders","Parts and membership visibility","Approved knowledge in the field"]),
      (16,"INDUSTRY FOCUS / CONSTRUCTION","Keep project facts current and accessible.","Bring projects, commitments, purchasing, documents, change activity, and job-cost visibility into a controlled operating workflow.","industries/construction.webp",["Current project documents","Commitment and purchasing control","Earlier job-cost visibility","Clearer change-order workflow"]),
      (17,"INDUSTRY FOCUS / RETAIL","Connect products, customers, and locations.","Unify point of sale, inventory, purchasing, transfers, returns, ecommerce, and customer records across stores and channels.","industries/retail.webp",["Shared product and stock view","Multi-location inventory control","Demand-based replenishment","Practical customer follow-up"]),
      (18,"INDUSTRY FOCUS / MANUFACTURING","Align materials, production, and instructions.","Connect bills of materials, work orders, inventory, purchasing, quality procedures, and production reporting on one ERP foundation.","industries/manufacturing.webp",["Material requirements visibility","Controlled BOM revisions","Current work and quality instructions","Production status reporting"]),
      (19,"INDUSTRY FOCUS / PROFESSIONAL SERVICES","Move cleanly from engagement to delivery.","Connect CRM, projects, resources, time, approved templates, recurring work, billing, and client reporting without repeated data entry.","industries/service-companies.webp",["Consistent client handoffs","Project and capacity visibility","Time-to-billing workflow","Private team knowledge"]),
      (20,"INDUSTRY FOCUS / RESTAURANTS","Restaurant profit and AI readiness.","A tailored diagnostic identifies hidden profit leakage across food cost, labor, purchasing, inventory, waste, training, and management visibility.","restaurants/chinese-buffet.png",["Food-cost and recipe controls","Buffet waste and demand visibility","Purchasing and inventory discipline","Owner independence and employee knowledge"]),
    ]
    for args in details: portrait_detail(c,*args); c.showPage()
    image_grid(c,21,"06 / WEBSITE DESIGN","Business websites built to work.","Strategy, content, technology, and ongoing care come together in a site designed for credibility and practical business results.",["website-design/strategy-ux.webp","website-design/responsive-design.webp","website-design/business-integrations.webp","website-design/search-foundations.webp"],["Strategy + UX","Responsive design","Business integrations","Search foundations"]); c.showPage()
    full_bleed(c,22,"07 / EQUIPMENT","Infrastructure matched to the workload.","Equipment is selected around the application, user load, security requirements, and expected growth - from compact business systems to dedicated AI and ERP servers.","equipment/nexavoris-enterprise.webp"); c.showPage()
    process_page(c,23); c.showPage()
    portrait_detail(c,24,"09 / ABOUT NEXAVORIS","Business-first technology partnership.","Nexavoris combines private AI, Odoo ERP, workflow automation, infrastructure, and web systems without losing sight of how the business operates.","about/long-term-partnership.webp",["Business before software","Integration over novelty","Privacy and control","Long-term partnership"]); c.showPage()
    services_page(c,25); c.showPage(); close(c,26); c.showPage(); c.save(); print(OUT)

if __name__=="__main__": build()
