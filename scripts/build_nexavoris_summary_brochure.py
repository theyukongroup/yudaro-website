from pathlib import Path

from PIL import Image, ImageOps
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Nexavoris_Four_Page_Summary_Brochure_2026.pdf"
TEMP_OUTPUT = ROOT / "tmp" / "pdfs" / "nexavoris-summary-brochure.pdf"
CACHE = ROOT / "tmp" / "pdfs" / "brochure-assets"

# US Letter trim plus 0.125-inch bleed on every side.
BLEED = 9
TRIM_W, TRIM_H = 612, 792
W, H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
SAFE = 36

IVORY = HexColor("#F4F0E8")
STONE = HexColor("#D9D2C5")
CHARCOAL = HexColor("#181A1D")
BRONZE = HexColor("#8E7156")
CHAMPAGNE = HexColor("#B6A17E")
WHITE = HexColor("#FFFFFF")
GREEN = HexColor("#1F5C4D")
SLATE = HexColor("#56605D")

pdfmetrics.registerFont(TTFont("Georgia", r"C:\Windows\Fonts\georgia.ttf"))
pdfmetrics.registerFont(TTFont("Georgia-Bold", r"C:\Windows\Fonts\georgiab.ttf"))


def asset(relative):
    return ROOT / "public" / relative


def prepared(path):
    source = Path(path)
    CACHE.mkdir(parents=True, exist_ok=True)
    target = CACHE / f"{source.parent.name}-{source.stem}.jpg"
    if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((2200, 2200), Image.Resampling.LANCZOS)
            image.save(target, "JPEG", quality=89, optimize=True, progressive=True)
    return target


def image_cover(c, path, x, y, width, height, focus_y=0.5):
    path = prepared(path)
    with Image.open(path) as image:
        image_width, image_height = image.size
    scale = max(width / image_width, height / image_height)
    draw_width, draw_height = image_width * scale, image_height * scale
    draw_x = x + (width - draw_width) / 2
    draw_y = y + (height - draw_height) * focus_y
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0)
    c.drawImage(str(path), draw_x, draw_y, draw_width, draw_height, mask="auto")
    c.restoreState()


def image_contain(c, path, x, y, width, height):
    with Image.open(path) as image:
        image_width, image_height = image.size
    scale = min(width / image_width, height / image_height)
    draw_width, draw_height = image_width * scale, image_height * scale
    c.drawImage(str(path), x + (width - draw_width) / 2, y + (height - draw_height) / 2,
                draw_width, draw_height, preserveAspectRatio=True, mask="auto")


def text(c, value, x, y, font="Helvetica", size=10, color=CHARCOAL, tracking=0):
    c.setFillColor(color)
    object_ = c.beginText(x, y)
    object_.setFont(font, size)
    object_.setCharSpace(tracking)
    object_.textLine(value)
    c.drawText(object_)


def wrap(c, value, x, y, width, font="Helvetica", size=10, leading=15,
         color=SLATE, max_lines=20):
    words, rows, row = value.split(), [], ""
    for word in words:
        candidate = (row + " " + word).strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= width:
            row = candidate
        else:
            if row:
                rows.append(row)
            row = word
    if row:
        rows.append(row)
    for index, row in enumerate(rows[:max_lines]):
        text(c, row, x, y - index * leading, font, size, color)
    return y - len(rows[:max_lines]) * leading


def label(c, value, x, y, color=BRONZE):
    text(c, value.upper(), x, y, "Helvetica-Bold", 7.3, color, 1.2)


def heading(c, value, x, y, width, size=36, color=CHARCOAL, max_lines=5):
    return wrap(c, value, x, y, width, "Georgia", size, size * 1.03, color, max_lines)


def rule(c, x1, y, x2, color=STONE, width=0.6):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


def footer(c, page, dark=False):
    color = HexColor("#D7D4CD") if dark else HexColor("#706C65")
    x = BLEED + SAFE
    text(c, "NEXAVORIS AI & ERP SYSTEMS", x, BLEED + 18, "Helvetica-Bold", 6.2, color, 0.8)
    text(c, f"{page} / 4", W - BLEED - SAFE - 24, BLEED + 18, "Helvetica", 6.2, color)


def crop_marks(c):
    c.setStrokeColor(HexColor("#222222"))
    c.setLineWidth(0.25)
    mark = 6
    for x in (BLEED, W - BLEED):
        c.line(x, 0, x, mark)
        c.line(x, H - mark, x, H)
    for y in (BLEED, H - BLEED):
        c.line(0, y, mark, y)
        c.line(W - mark, y, W, y)


def page_one(c):
    image_cover(c, asset("ai-erp/connection-works.webp"), 0, 0, W, H)
    c.setFillColor(CHARCOAL)
    c.setFillAlpha(0.62)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillAlpha(1)
    c.setFillColor(IVORY)
    c.rect(0, 0, 16, H, fill=1, stroke=0)
    image_contain(c, asset("nexavoris-logo.png"), W - BLEED - SAFE - 188, H - 138, 188, 72)
    label(c, "COMPANY SUMMARY / 2026", BLEED + 42, H - 170, CHAMPAGNE)
    heading(c, "AI that understands your business. ERP that runs it.", BLEED + 42,
            H - 226, 500, 46, WHITE)
    wrap(c, "Private AI, Odoo ERP, connected operations, and business-first implementation for growing companies.",
         BLEED + 44, 132, 470, "Helvetica", 11, 17, HexColor("#E5E1D9"), 4)
    label(c, "PRIVATE BY DESIGN / BUILT FOR OPERATIONS", BLEED + 44, 76, CHAMPAGNE)
    footer(c, 1, True)
    crop_marks(c)


def feature(c, number, title_, body, x, y, width):
    text(c, f"0{number}", x, y, "Helvetica-Bold", 7, BRONZE)
    wrap(c, title_, x + 37, y, width - 37, "Georgia-Bold", 15, 18, CHARCOAL, 2)
    wrap(c, body, x + 37, y - 39, width - 37, "Helvetica", 8.7, 13, SLATE, 5)


def page_two(c):
    c.setFillColor(IVORY); c.rect(0, 0, W, H, fill=1, stroke=0)
    left = BLEED + SAFE
    label(c, "ONE CONNECTED OPERATING SYSTEM", left, H - BLEED - 54)
    heading(c, "Knowledge, operations, and action in one governed path.", left,
            H - BLEED - 96, 520, 35)
    wrap(c, "Nexavoris combines private enterprise AI with Odoo ERP and practical workflow design. The result is a more dependable way for people to find approved knowledge, work from current operational records, and act with the right controls.",
         left, H - BLEED - 215, 510, "Helvetica", 9.5, 14, SLATE, 7)
    image_cover(c, asset("ai-solutions/company-knowledge-ai.webp"), left, 300, 247, 205)
    image_cover(c, asset("erp-solutions/odoo-implementation.webp"), left + 263, 300, 247, 205)
    c.setFillColor(CHARCOAL); c.setFillAlpha(.62); c.rect(left,300,247,39,fill=1,stroke=0); c.rect(left+263,300,247,39,fill=1,stroke=0); c.setFillAlpha(1)
    text(c,"Private enterprise AI",left+13,316,"Helvetica-Bold",8.5,WHITE)
    text(c,"Odoo ERP implementation",left+276,316,"Helvetica-Bold",8.5,WHITE)
    feature(c,1,"Controlled company knowledge","Answers are grounded in approved documents, procedures, and information.",left,258,247)
    feature(c,2,"One operational record","Customers, orders, purchasing, inventory, projects, field work, and reporting stay connected.",left+263,258,247)
    feature(c,3,"Governed AI + ERP","AI helps people understand context and prepare actions while human approvals remain in consequential decisions.",left,145,247)
    feature(c,4,"Implementation that fits","Discovery, workflow design, migration, integration, training, and ongoing improvement support adoption.",left+263,145,247)
    footer(c,2); crop_marks(c)


def page_three(c):
    c.setFillColor(CHARCOAL); c.rect(0,0,W,H,fill=1,stroke=0)
    left=BLEED+SAFE
    label(c,"DESIGNED AROUND REAL OPERATING WORKFLOWS",left,H-BLEED-54,CHAMPAGNE)
    heading(c,"Technology shaped around the work your team already does.",left,H-BLEED-96,510,35,WHITE)
    wrap(c,"Nexavoris starts with operational friction, information handoffs, and the decisions each role needs to make. The system follows the business - not the other way around.",left,H-BLEED-205,510,"Helvetica",9.5,14,HexColor("#CFD2CD"),6)
    items=[
        ("Wholesale distribution","industries/wholesale-distribution.webp"),
        ("HVAC + field service","industries/hvac-field-service.webp"),
        ("Construction","industries/construction.webp"),
        ("Manufacturing","industries/manufacturing.webp"),
        ("Retail","industries/retail.webp"),
        ("Professional services","industries/service-companies.webp"),
        ("Restaurants","restaurants/chinese-buffet.png"),
    ]
    gap=9; cell_w=(510-gap)/2; cell_h=79; top=495
    for index,(name,path) in enumerate(items):
        is_restaurant=index == len(items)-1
        x=left if is_restaurant else left+(index%2)*(cell_w+gap)
        y=top-3*(cell_h+gap)-cell_h if is_restaurant else top-(index//2)*(cell_h+gap)-cell_h
        width=510 if is_restaurant else cell_w
        image_cover(c,asset(path),x,y,width,cell_h)
        c.setFillColor(CHARCOAL); c.setFillAlpha(.58); c.rect(x,y,width,30,fill=1,stroke=0); c.setFillAlpha(1)
        text(c,name,x+11,y+11,"Helvetica-Bold",8,WHITE)
    rule(c,left,116,left+510,HexColor("#565B58"))
    label(c,"A PRACTICAL DELIVERY PATH",left,91,CHAMPAGNE)
    process=["Understand","Design","Implement","Improve"]
    for index,name in enumerate(process):
        x=left+index*127.5; text(c,f"0{index+1}",x,61,"Helvetica-Bold",7,CHAMPAGNE); text(c,name,x+23,61,"Helvetica-Bold",8.5,WHITE)
    footer(c,3,True); crop_marks(c)


def draw_qr(c, url, x, y, size):
    widget=qr.QrCodeWidget(url)
    bounds=widget.getBounds(); width=bounds[2]-bounds[0]; height=bounds[3]-bounds[1]
    drawing=Drawing(size,size,transform=[size/width,0,0,size/height,0,0]); drawing.add(widget); drawing.drawOn(c,x,y)


def page_four(c):
    c.setFillColor(IVORY); c.rect(0,0,W,H,fill=1,stroke=0)
    left=BLEED+SAFE
    label(c,"START WITH THE BUSINESS",left,H-BLEED-54)
    heading(c,"A practical path to measurable improvement.",left,H-BLEED-96,505,36)
    wrap(c,"Every engagement is shaped around the current operation, risks, priorities, and desired outcomes. Scope and implementation pricing are confirmed after discovery.",left,H-BLEED-190,500,"Helvetica",9.5,14,SLATE,6)
    c.setFillColor(WHITE); c.rect(left,414,510,152,fill=1,stroke=0); c.setStrokeColor(STONE); c.rect(left,414,510,152,fill=0,stroke=1)
    label(c,"CORE ENGAGEMENTS",left+18,539)
    engagements=["Private AI and company knowledge","Odoo ERP setup and workflow design","AI + ERP integration and automation","Website design and business integrations"]
    for i,item in enumerate(engagements):
        x=left+18+(i%2)*247; y=500-(i//2)*55; text(c,f"0{i+1}",x,y,"Helvetica-Bold",7,BRONZE); wrap(c,item,x+27,y,197,"Helvetica-Bold",8.6,12,CHARCOAL,2)
    c.setFillColor(CHARCOAL); c.rect(left,231,510,158,fill=1,stroke=0); label(c,"ONGOING CARE",left+18,361,CHAMPAGNE)
    care=[("Essential Care","$300 / month"),("Managed Operations","$800 / month"),("Priority Partnership","$1,500 / month")]
    for i,(name,price) in enumerate(care):
        y=324-i*43; text(c,name,left+18,y,"Georgia",13,WHITE); text(c,price,left+328,y,"Helvetica-Bold",8.5,CHAMPAGNE)
    label(c,"LET'S CONNECT",left,197)
    heading(c,"Build the operating system your business needs next.",left,169,360,24)
    text(c,"13366 Murphy Road, Stafford, TX 77477",left,91,"Helvetica-Bold",8.4,CHARCOAL)
    text(c,"281-258-8000  /  info@nexavoris.ai",left,70,"Helvetica",8.4,SLATE)
    text(c,"www.nexavoris.ai",left,49,"Helvetica-Bold",8.4,GREEN)
    qr_size=88; qr_x=left+419; qr_y=67; draw_qr(c,"https://www.nexavoris.ai",qr_x,qr_y,qr_size)
    text(c,"SCAN TO VISIT",qr_x+9,50,"Helvetica-Bold",6,BRONZE,.8)
    c.linkURL("https://www.nexavoris.ai",(qr_x,qr_y,qr_x+qr_size,qr_y+qr_size),relative=0)
    c.linkURL("mailto:info@nexavoris.ai",(left,61,left+175,84),relative=0)
    c.linkURL("tel:+12812588000",(left,61,left+70,84),relative=0)
    footer(c,4); crop_marks(c)


def add_print_boxes():
    reader=PdfReader(str(TEMP_OUTPUT)); writer=PdfWriter()
    trim=RectangleObject([BLEED,BLEED,W-BLEED,H-BLEED]); bleed=RectangleObject([0,0,W,H])
    for page in reader.pages:
        page.trimbox=trim; page.bleedbox=bleed; page.cropbox=bleed; writer.add_page(page)
    with OUTPUT.open("wb") as stream: writer.write(stream)


def build():
    TEMP_OUTPUT.parent.mkdir(parents=True,exist_ok=True); OUTPUT.parent.mkdir(parents=True,exist_ok=True)
    c=canvas.Canvas(str(TEMP_OUTPUT),pagesize=(W,H),pageCompression=1)
    for renderer in (page_one,page_two,page_three,page_four): renderer(c); c.showPage()
    c.save(); add_print_boxes(); print(OUTPUT)


if __name__=="__main__": build()
