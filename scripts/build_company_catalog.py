from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Nexavoris_Company_Catalog_2026.pdf"
W, H = landscape(letter)
TOTAL_PAGES = 26

IVORY = HexColor("#F4F0E8")
STONE = HexColor("#D9D2C5")
WALNUT = HexColor("#5A4031")
CHARCOAL = HexColor("#181A1D")
BRONZE = HexColor("#8E7156")
CHAMPAGNE = HexColor("#B6A17E")
WHITE = HexColor("#FFFFFF")
GREEN = HexColor("#1F5C4D")
SLATE = HexColor("#56605D")

pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Italic", r"C:\Windows\Fonts\georgiai.ttf"))

def p(path): return str(ROOT / "public" / path)

IMAGE_CACHE = ROOT / "tmp" / "pdfs" / "catalog-assets"

def prepared_image(path):
    source = Path(path)
    IMAGE_CACHE.mkdir(parents=True, exist_ok=True)
    target = IMAGE_CACHE / f"{source.parent.name}-{source.stem}.jpg"
    if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            image.save(target, "JPEG", quality=87, optimize=True, progressive=True)
    return target

def image_cover(c, path, x, y, w, h, anchor="center"):
    path = prepared_image(path)
    with Image.open(path) as im:
        iw, ih = im.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    dx = x + (w - dw) / 2
    dy = y + (h - dh) / 2
    if anchor == "top": dy = y + h - dh
    c.saveState(); c.rect(x, y, w, h); c.clipPath(c.beginPath()) if False else None
    path_obj = c.beginPath(); path_obj.rect(x, y, w, h); c.clipPath(path_obj, stroke=0)
    c.drawImage(path, dx, dy, dw, dh, preserveAspectRatio=True, mask="auto")
    c.restoreState()

def text(c, value, x, y, font="Helvetica", size=10, color=CHARCOAL, tracking=0):
    c.setFillColor(color)
    # Character spacing is part of the PDF text state and can otherwise leak
    # from tracked labels into headings/body copy rendered afterward.
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setCharSpace(tracking)
    t.textLine(value)
    c.drawText(t)

def lines(c, value, x, y, width, font="Helvetica", size=10, leading=15, color=SLATE, max_lines=20):
    words=value.split(); rows=[]; row=""
    for word in words:
        test=(row+" "+word).strip()
        if pdfmetrics.stringWidth(test,font,size)<=width: row=test
        else:
            if row: rows.append(row)
            row=word
    if row: rows.append(row)
    for i,row in enumerate(rows[:max_lines]): text(c,row,x,y-i*leading,font,size,color)
    return y-len(rows[:max_lines])*leading

def label(c, value, x, y, color=BRONZE): text(c,value.upper(),x,y,"Helvetica-Bold",7.2,color,1.25)

def rule(c, x1, y, x2, color=STONE, width=.6): c.setStrokeColor(color); c.setLineWidth(width); c.line(x1,y,x2,y)

def footer(c, page, dark=False):
    color = HexColor("#DED8CE") if dark else HexColor("#706C65")
    text(c,"NEXAVORIS AI & ERP SYSTEMS",38,20,"Helvetica-Bold",6.5,color,1)
    text(c,"NEXAVORIS.AI",W-112,20,"Helvetica-Bold",6.5,color,1)
    text(c,f"{page:02d} / {TOTAL_PAGES}",W-54,20,"Helvetica",6.5,color)

def title(c, value, x, y, width, size=36, color=CHARCOAL):
    return lines(c,value,x,y,width,"Georgia",size,size*1.02,color,6)

def pill(c, value, x, y, fill=GREEN, color=WHITE):
    w=pdfmetrics.stringWidth(value,"Helvetica-Bold",7)+22
    c.setFillColor(fill); c.roundRect(x,y-8,w,20,10,fill=1,stroke=0); text(c,value,x+11,y-1,"Helvetica-Bold",7,color)
    return w

def page_bg(c, color=IVORY): c.setFillColor(color); c.rect(0,0,W,H,fill=1,stroke=0)

def feature_card(c, item, x, y, w, h, n):
    c.setFillColor(WHITE); c.rect(x,y,w,h,fill=1,stroke=0)
    c.setStrokeColor(STONE); c.rect(x,y,w,h,fill=0,stroke=1)
    label(c,f"0{n}",x+16,y+h-20,BRONZE)
    lines(c,item,x+16,y+h-42,w-32,"Georgia",13,15,CHARCOAL,3)

def editorial_grid(c, page, kicker, heading, intro, images, items, dark=False):
    page_bg(c, CHARCOAL if dark else IVORY)
    fg=WHITE if dark else CHARCOAL; muted=HexColor("#C8C5BE") if dark else SLATE
    label(c,kicker,38,H-48,CHAMPAGNE if dark else BRONZE)
    title(c,heading,38,H-78,330,34,fg)
    lines(c,intro,38,H-190,310,"Helvetica",9.2,14,muted,6)
    x0=390; gap=10; cols=2; iw=(W-x0-38-gap)/2; ih=134
    for i,img in enumerate(images[:4]):
        x=x0+(i%2)*(iw+gap); y=H-48-(i//2)*(ih+10)-ih
        image_cover(c,p(img),x,y,iw,ih)
        c.setFillColor(HexColor("#000000")); c.setFillAlpha(.44); c.rect(x,y,iw,34,fill=1,stroke=0); c.setFillAlpha(1)
        text(c,items[i],x+12,y+12,"Helvetica-Bold",8,WHITE)
    footer(c,page,dark)

def full_bleed(c, page, kicker, heading, body, img, darken=.44, align="left"):
    image_cover(c,p(img),0,0,W,H)
    c.setFillColor(HexColor("#101513")); c.setFillAlpha(darken); c.rect(0,0,W,H,fill=1,stroke=0); c.setFillAlpha(1)
    x=48 if align=="left" else 420
    label(c,kicker,x,H-54,CHAMPAGNE)
    title(c,heading,x,H-96,325,39,WHITE)
    body_width = 280 if align == "right" else 315
    lines(c,body,x,120,body_width,"Helvetica",10,15,HexColor("#E7E4DE"),7)
    footer(c,page,True)

def split_page(c,page,kicker,heading,body,img,benefits):
    page_bg(c); image_cover(c,p(img),W*.48,0,W*.52,H)
    c.setFillColor(IVORY); c.rect(0,0,W*.51,H,fill=1,stroke=0)
    label(c,kicker,42,H-48); title(c,heading,42,H-87,318,35)
    y=lines(c,body,42,H-190,300,"Helvetica",9.4,14,SLATE,8)-8
    rule(c,42,y,338,STONE); y-=29
    for i,b in enumerate(benefits,1):
        text(c,f"0{i}",42,y,"Helvetica-Bold",7,BRONZE); lines(c,b,72,y,250,"Helvetica-Bold",8.5,12,CHARCOAL,2); y-=42
    footer(c,page)

def close_page(c,page):
    page_bg(c,CHARCOAL)
    c.setFillColor(BRONZE); c.rect(0,0,14,H,fill=1,stroke=0)
    label(c,"LET'S CONNECT",56,H-62,CHAMPAGNE)
    title(c,"Build the operating system your business needs next.",56,H-110,470,43,WHITE)
    lines(c,"Schedule a conversation about Private AI, Odoo ERP, connected operations, website design, or a tailored industry assessment.",56,202,390,"Helvetica",11,17,HexColor("#D9D8D2"),5)
    rule(c,56,148,500,HexColor("#5B625F"))
    text(c,"13366 Murphy Road, Stafford, TX 77477",56,119,"Helvetica-Bold",9,WHITE)
    text(c,"281-258-8000",56,96,"Helvetica",9,WHITE)
    text(c,"info@nexavoris.ai",171,96,"Helvetica",9,WHITE)
    c.setFillColor(WHITE); c.roundRect(560,74,175,56,2,fill=1,stroke=0)
    text(c,"NEXAVORIS.AI",584,97,"Helvetica-Bold",13,GREEN,1.2)
    footer(c,page,True)

def build():
    OUT.parent.mkdir(parents=True,exist_ok=True)
    c=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)

    # 1 Cover
    image_cover(c,p("ai-erp/connection-works.webp"),0,0,W,H)
    c.setFillColor(CHARCOAL); c.setFillAlpha(.66); c.rect(0,0,W,H,fill=1,stroke=0); c.setFillAlpha(1)
    c.setFillColor(IVORY); c.rect(0,0,21,H,fill=1,stroke=0)
    label(c,"COMPANY CATALOG / 2026",54,H-55,CHAMPAGNE)
    title(c,"AI that understands your business. ERP that runs it.",54,H-105,510,46,WHITE)
    lines(c,"Private AI, Odoo ERP, connected operations, and business-first implementation for growing companies.",56,112,440,"Helvetica",11,17,HexColor("#E4E0D8"),4)
    text(c,"STAFFORD, TEXAS",56,48,"Helvetica-Bold",7,CHAMPAGNE,1.5); c.showPage()

    split_page(c,2,"THE NEXAVORIS IDEA","Connect company knowledge to daily operations.","Nexavoris combines private enterprise AI, Odoo ERP, workflow automation, and practical implementation. The goal is not more software. It is a dependable operating system built around the way your company actually works.","about/business-before-software.webp",["Company information remains controlled.","ERP supplies a dependable operational record.","AI helps people act on approved information.","Human review stays in the decisions that matter."]); c.showPage()

    editorial_grid(c,3,"01 / THE OPPORTUNITY","Where growing businesses lose time and control.","Operational friction rarely comes from one dramatic failure. It accumulates in handoffs, duplicate records, delayed answers, and knowledge that only one person can find.",["opportunity/scattered-data.webp","opportunity/information-search.webp","opportunity/disconnected-systems.webp","opportunity/management-insight.webp"],["Scattered data","Slow information search","Disconnected systems","Limited management insight"]); c.showPage()

    full_bleed(c,4,"02 / PRIVATE ENTERPRISE AI","AI grounded in your business.","Private AI works from approved company knowledge, policies, procedures, and documents. It helps employees retrieve useful answers without turning public consumer AI into the operating memory of the business.","ai-solutions/company-knowledge-ai.webp",.49); c.showPage()

    editorial_grid(c,5,"PRIVATE AI / CAPABILITIES","Useful answers. Controlled context.","Start with a defined knowledge problem. Control the sources, permissions, and operating boundaries. Expand only after the team can measure accuracy and value.",["ai-solutions/management-ai-assistant.webp","ai-solutions/document-intelligence.webp","ai-solutions/ai-business-automation.webp","ai-solutions/private-ai-server.webp"],["Management assistant","Document intelligence","Business automation","Private AI server"],True); c.showPage()

    split_page(c,6,"OPEN WEBUI / EXPERIENCE","A familiar workspace for private AI.","A clean conversational interface gives teams one place to work with approved models and company knowledge. Administrators retain control over access, sources, and model behavior.","showcase/open-webui/chat-dashboard.png",["Conversational workspace","Controlled knowledge libraries","Model and access administration","Working notes and usage visibility"]); c.showPage()

    full_bleed(c,7,"03 / ERP SYSTEMS","ERP that makes operations visible.","Odoo connects customers, orders, purchasing, inventory, field work, projects, billing, and reporting around one shared operational record.","erp-solutions/odoo-implementation.webp",.52,"right"); c.showPage()

    editorial_grid(c,8,"ODOO ERP / SERVICES","Implementation beyond installation.","Software only becomes useful when the data, workflows, roles, and training fit the operation. Nexavoris designs the foundation and stays through adoption.",["erp-solutions/erp-consulting-workflow-design.webp","erp-solutions/data-migration-training.webp","erp-solutions/dashboards-reporting.webp","erp-solutions/third-party-integrations.webp"],["Workflow design","Migration + training","Dashboards + reporting","Third-party integrations"]); c.showPage()

    page_bg(c,CHARCOAL); label(c,"ERP / BUSINESS MODULES",42,H-48,CHAMPAGNE); title(c,"One connected operational record.",42,H-88,410,37,WHITE)
    modules=["Sales","CRM","Inventory","Purchasing","Accounting","Field service","Projects","Employees","Memberships","Website","Reporting"]
    for i,m in enumerate(modules):
        col=i%4; row=i//4; x=42+col*182; y=292-row*76
        c.setStrokeColor(HexColor("#505552")); c.rect(x,y,166,58,fill=0,stroke=1); label(c,f"{i+1:02d}",x+14,y+38,CHAMPAGNE); text(c,m,x+14,y+17,"Helvetica-Bold",10,WHITE)
    footer(c,9,True); c.showPage()

    editorial_grid(c,10,"ODOO / PRODUCT EXPERIENCE","Operational work, clearly organized.","Role-based workspaces keep each team focused while the underlying records remain connected. The result is less re-entry and a clearer path from activity to reporting.",["showcase/odoo/sales.webp","showcase/odoo/crm.webp","showcase/odoo/inventory.webp","showcase/odoo/manufacturing.webp"],["Sales","CRM","Inventory","Manufacturing"]); c.showPage()

    split_page(c,11,"04 / AI + ERP","One governed path from question to action.","ERP supplies operational truth. Private knowledge supplies context. AI makes both easier to understand and use, while approvals keep people responsible for consequential decisions.","ai-erp/connection-works.webp",["Live operational data","Company knowledge","Controlled execution","Traceable human approval"]); c.showPage()

    full_bleed(c,12,"AI + ERP / VALUE","Understand. Decide. Execute. Improve.","Ask operational questions. Find what needs attention. Prepare accurate records. Maintain accountability. Automate across teams. Improve continuously from measured outcomes.","ai-erp/creates-value.webp",.5); c.showPage()

    editorial_grid(c,13,"05 / INDUSTRIES","Designed around real operating workflows.","Every organization has different constraints. Nexavoris starts with how work actually moves, then chooses the AI, ERP, and automation that support it.",["industries/wholesale-distribution.webp","industries/hvac-field-service.webp","industries/construction.webp","industries/manufacturing.webp"],["Wholesale distribution","HVAC + field service","Construction","Manufacturing"],True); c.showPage()

    split_page(c,14,"INDUSTRY FOCUS / WHOLESALE DISTRIBUTION","Inventory, fulfillment, and margin in one view.","Connect sales, customer pricing, purchasing, warehouse activity, returns, and reporting around one dependable operational record.","industries/wholesale-distribution.webp",["Reliable inventory availability","Demand-based purchasing","Clear warehouse execution","Customer and margin visibility"]); c.showPage()

    split_page(c,15,"INDUSTRY FOCUS / HVAC + FIELD SERVICE","Give the field team the full service picture.","Connect CRM, dispatch, work orders, equipment history, parts, memberships, estimates, invoicing, and approved service knowledge.","industries/hvac-field-service.webp",["Current equipment history","Cleaner dispatch and work orders","Parts and membership visibility","Approved knowledge in the field"]); c.showPage()

    split_page(c,16,"INDUSTRY FOCUS / CONSTRUCTION","Keep project facts current and accessible.","Bring projects, commitments, purchasing, documents, change activity, and job-cost visibility into a controlled operating workflow.","industries/construction.webp",["Current project documents","Commitment and purchasing control","Earlier job-cost visibility","Clearer change-order workflow"]); c.showPage()

    split_page(c,17,"INDUSTRY FOCUS / RETAIL","Connect products, customers, and locations.","Unify point of sale, inventory, purchasing, transfers, returns, ecommerce, and customer records across stores and channels.","industries/retail.webp",["Shared product and stock view","Multi-location inventory control","Demand-based replenishment","Practical customer follow-up"]); c.showPage()

    split_page(c,18,"INDUSTRY FOCUS / MANUFACTURING","Align materials, production, and instructions.","Connect bills of materials, work orders, inventory, purchasing, quality procedures, and production reporting on one ERP foundation.","industries/manufacturing.webp",["Material requirements visibility","Controlled BOM revisions","Current work and quality instructions","Production status reporting"]); c.showPage()

    split_page(c,19,"INDUSTRY FOCUS / PROFESSIONAL SERVICES","Move cleanly from engagement to delivery.","Connect CRM, projects, resources, time, approved templates, recurring work, billing, and client reporting without repeated data entry.","industries/service-companies.webp",["Consistent client handoffs","Project and capacity visibility","Time-to-billing workflow","Private team knowledge"]); c.showPage()

    split_page(c,20,"INDUSTRY FOCUS / RESTAURANTS","Restaurant profit and AI readiness.","A tailored diagnostic identifies hidden profit leakage across food cost, labor, purchasing, inventory, waste, training, and management visibility.","restaurants/chinese-buffet.png",["Food-cost and recipe controls","Buffet waste and demand visibility","Purchasing and inventory discipline","Owner independence and employee knowledge"]); c.showPage()

    editorial_grid(c,21,"06 / WEBSITE DESIGN","Business websites built to work.","Strategy, content, technology, and ongoing care come together in a site designed for credibility and practical business results.",["website-design/strategy-ux.webp","website-design/responsive-design.webp","website-design/business-integrations.webp","website-design/search-foundations.webp"],["Strategy + UX","Responsive design","Business integrations","Search foundations"]); c.showPage()

    full_bleed(c,22,"07 / EQUIPMENT","Infrastructure matched to the workload.","From compact business systems to dedicated AI workstations and ERP servers, equipment is selected around the application, user load, security requirements, and expected growth.","equipment/nexavoris-enterprise.webp",.52,"right"); c.showPage()

    page_bg(c); label(c,"08 / HOW IT WORKS",42,H-50); title(c,"Understand. Design. Implement. Improve.",42,H-92,525,38)
    phases=[("01","Understand","Discovery and business-process analysis"),("02","Design","System architecture, workflow, and controls"),("03","Implement","Configuration, migration, integration, and training"),("04","Improve","Ongoing support and measured refinement")]
    for i,(n,h,b) in enumerate(phases):
        x=42+i*183; y=155 if i%2==0 else 115
        c.setFillColor(WHITE); c.rect(x,y,165,205,fill=1,stroke=0); c.setStrokeColor(STONE); c.rect(x,y,165,205,fill=0,stroke=1)
        label(c,n,x+18,y+175); lines(c,h,x+18,y+141,130,"Georgia",20,23,CHARCOAL,2); rule(c,x+18,y+112,x+145); lines(c,b,x+18,y+90,130,"Helvetica",8.5,13,SLATE,6)
    footer(c,23); c.showPage()

    split_page(c,24,"09 / ABOUT NEXAVORIS","Business-first technology partnership.","Nexavoris helps growing companies combine private AI, Odoo ERP, workflow automation, infrastructure, and web systems without losing sight of how the business operates.","about/long-term-partnership.webp",["Business before software","Integration over novelty","Privacy and control","Long-term partnership"]); c.showPage()

    page_bg(c); label(c,"10 / SERVICES + ENGAGEMENT",42,H-49); title(c,"A practical path to measurable improvement.",42,H-89,500,37)
    c.setFillColor(WHITE); c.rect(42,80,430,260,fill=1,stroke=0); c.setStrokeColor(STONE); c.rect(42,80,430,260,fill=0,stroke=1)
    label(c,"CORE ENGAGEMENTS",64,312)
    engagements=["AI implementation and private knowledge systems","Odoo ERP setup and workflow design","AI + ERP integration and automation","Website design and business integrations"]
    y=278
    for i,e in enumerate(engagements,1): text(c,f"0{i}",64,y,"Helvetica-Bold",7,BRONZE); lines(c,e,94,y,340,"Helvetica-Bold",9,13,CHARCOAL,2); y-=47
    c.setFillColor(CHARCOAL); c.rect(495,80,255,260,fill=1,stroke=0); label(c,"ONGOING CARE",518,312,CHAMPAGNE)
    for i,(name,price) in enumerate([("Essential Care","$300 / month"),("Managed Operations","$800 / month"),("Priority Partnership","$1,500 / month")]):
        yy=270-i*67; text(c,name,518,yy,"Georgia",15,WHITE); text(c,price,518,yy-22,"Helvetica-Bold",8,CHAMPAGNE)
    lines(c,"Implementation scope and pricing are confirmed after discovery. Every engagement is shaped around the current operation, risks, priorities, and desired outcomes.",42,57,708,"Helvetica",7.5,11,SLATE,3)
    footer(c,25); c.showPage()

    close_page(c,26); c.showPage(); c.save()
    print(OUT)

if __name__ == "__main__": build()
