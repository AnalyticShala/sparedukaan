import csv, os, re
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.table import Table, TableStyleInfo
import models as M

OUT = os.path.dirname(os.path.abspath(__file__))
FONT = 'Arial'
HEAD_FILL = PatternFill('solid', fgColor='0F1113')
HEAD_FONT = Font(name=FONT, bold=True, color='F2F1EC', size=10)
BODY = Font(name=FONT, size=10)
BOLD = Font(name=FONT, size=10, bold=True)
YELLOW = PatternFill('solid', fgColor='FFF2B0')
VERIFY_FONT = Font(name=FONT, size=10, color='0000FF')
AVAIL = {'H': 'High', 'M': 'Medium', 'L': 'Low'}
PORT_CABLE = {'USB-C': 'USB-C to USB-C (also USB-A to USB-C)', 'Micro-USB': 'USB-A to Micro-USB', 'Lightning': 'USB-C to Lightning (also USB-A to Lightning)'}

def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

brands = M.BRANDS
brand_name = {b[0]: b[1] for b in brands}

rows = []
for bid, txt in M.MODELS.items():
    for line in txt.strip().splitlines():
        name, year, code, disp, batt, port, back, wireless, fp, avail = [x.strip() for x in line.split('|')]
        batt_i = int(batt) if batt else None
        is_feature = batt_i is not None and batt_i <= 2000 and fp == 'none' and disp == 'LCD' and port == 'Micro-USB' and bid in ('nokia', 'jio', 'itel')
        rows.append(dict(
            model_id=f'{bid}-{slug(name)}', brand_id=bid, brand=brand_name[bid], model_name=name, launch_year=int(year),
            model_code=code, code_status='verify' if code else 'unknown - fill in', device_type='feature phone' if is_feature else 'smartphone',
            display_tech=disp, battery_mah=batt_i, charging_port=port, back_material=back, wireless_charging='Yes' if wireless == 'Y' else 'No',
            fingerprint=fp, parts_availability=AVAIL[avail],
        ))

# ---------- parts matrix ----------
def applies(pt, r):
    rule = pt[3]
    sp = r['device_type'] == 'smartphone'
    if rule == 'all':
        return True
    if rule == 'smartphone':
        return sp
    if rule == 'fp':
        return r['fingerprint'] in ('rear', 'side', 'in-display')
    if rule == 'wireless':
        return r['wireless_charging'] == 'Yes'
    if rule == 'nfc-only':
        return sp and r['wireless_charging'] == 'No' and r['display_tech'] == 'OLED'
    return False

def variant(pt, r):
    pid = pt[0]
    if pid == 'display':
        base = f"{r['display_tech']} display assembly"
        return f"{base}; sell with-frame and without-frame as separate SKUs" if r['device_type'] == 'smartphone' else base
    if pid == 'battery':
        return f"{r['battery_mah']} mAh battery with adhesive" if r['battery_mah'] else 'Battery (capacity to confirm)'
    if pid == 'port':
        return f"{r['charging_port']} charging port sub-board"
    if pid == 'fpsensor':
        return {'rear': 'Rear-mounted fingerprint sensor flex', 'side': 'Side-key fingerprint flex', 'in-display': 'In-display fingerprint sensor (optical/ultrasonic, confirm)'}[r['fingerprint']]
    if pid == 'backpanel':
        return f"{r['back_material'].capitalize()} back panel with adhesive"
    if pid == 'nfc':
        return 'NFC antenna (confirm the model has NFC)'
    if pid == 'cable':
        return PORT_CABLE[r['charging_port']]
    if pid == 'charger':
        return f"{r['charging_port']} charger; wattage to match the phone's fast-charge standard (confirm)"
    if pid == 'cover':
        return 'Silicone / hard / transparent / flip case, cutouts matched to this model'
    if pid == 'glass':
        return 'Tempered glass, full cover; also matte and privacy variants'
    if pid == 'lensprotector':
        return 'Camera lens glass protector cut for this model'
    if pid == 'camera':
        return 'Rear camera module(s); list main / ultra-wide / macro separately where supplier does'
    if pid == 'frame':
        return f"{'Metal' if r['back_material'] in ('glass', 'metal', 'ceramic') else 'Plastic'} mid-frame (confirm material); with button flex"
    return pt[2]

parts_rows = []
for r in rows:
    for pt in M.PART_TYPES:
        if applies(pt, r):
            parts_rows.append(dict(
                brand=r['brand'], model_name=r['model_name'], model_code=r['model_code'], model_id=r['model_id'],
                category='Spare Parts' if pt[1] == 'parts' else 'Accessories', part_type_id=pt[0], part_type=pt[2],
                suggested_variant=variant(pt, r), sku='', supplier='', price_inr='', stock='', fit_status='unverified', evidence='',
            ))

# ---------- workbook ----------
wb = Workbook()

def style_header(ws, ncols):
    for c in range(1, ncols + 1):
        cell = ws.cell(row=1, column=c)
        cell.font = HEAD_FONT; cell.fill = HEAD_FILL; cell.alignment = Alignment(vertical='center', wrap_text=True)
    ws.freeze_panes = 'A2'
    ws.row_dimensions[1].height = 30

def write_table(ws, headers, data, widths, name):
    ws.append(headers)
    for d in data:
        ws.append([d.get(h, '') for h in headers])
    style_header(ws, len(headers))
    for i, w in enumerate(widths, 1):
        ws.column_dimensions[get_column_letter(i)].width = w
    for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
        for cell in row:
            cell.font = BODY
    if ws.max_row > 1:
        t = Table(displayName=name, ref=f"A1:{get_column_letter(len(headers))}{ws.max_row}")
        t.tableStyleInfo = TableStyleInfo(name='TableStyleLight1', showRowStripes=True)
        ws.add_table(t)

# README
ws = wb.active; ws.title = 'README'
readme = [
    ('SpareDukaan catalogue seed', BOLD),
    ('Prepared 26 October 2026 from general product knowledge. It is a starting list for the catalogue manager, not verified supplier data.', BODY),
    ('', BODY),
    ('Sheets', BOLD),
    ('Brands: phone companies sold in India, with status and a note on how common spares are.', BODY),
    ('Models: 856 models from roughly 2018 onward (plus evergreen older ones), one row each, with the attributes that decide which parts fit.', BODY),
    ('Part types: the 29 spare-part and accessory types SpareDukaan sells, with the rule for which models they apply to.', BODY),
    ('Model parts: one row per model per applicable part type (the Accessories and Spare Parts catalogue skeleton). Fill SKU, supplier, price and fit evidence here.', BODY),
    ('Summary: counts by brand, computed with formulas from the other sheets.', BODY),
    ('', BODY),
    ('How to read the columns', BOLD),
    ('model_code: the exact code shown in Settings > About phone. Blue text = filled from memory, must be verified. Blank = not known, fill in.', VERIFY_FONT),
    ('Yellow cells are for you to fill: SKU, supplier, price, stock, fit evidence.', BOLD),
    ('parts_availability: High = displays, batteries, ports and accessories are widely stocked in India; Medium = common; Low = mostly display and battery only, often on order.', BODY),
    ('fit_status: starts as "unverified" everywhere. Change to "verified" only after a physical fit check or trusted supplier confirmation, and record the evidence.', BODY),
    ('display_tech, charging_port, battery_mah, wireless_charging, fingerprint, back_material: used to suggest the right variant for each part row.', BODY),
    ('', BODY),
    ('What this list is not', BOLD),
    ('Not every model ever sold in India: regional variants (e.g. SM-A546B vs SM-A546E), carrier versions and very low-volume models are left out on purpose; add them as rows when a supplier lists parts.', BODY),
    ('Model codes, battery capacities and launch years are from memory and can be wrong. Treat every value as "to be verified" until matched against the supplier sheet or the device itself.', BODY),
    ('Prices are intentionally blank.', BODY),
]
for text, font in readme:
    ws.append([text]); ws.cell(row=ws.max_row, column=1).font = font
ws.column_dimensions['A'].width = 140
for row in ws.iter_rows():
    for c in row:
        c.alignment = Alignment(wrap_text=True, vertical='top')

# Brands
ws = wb.create_sheet('Brands')
bh = ['brand_id', 'brand', 'country', 'status', 'india_note', 'models_listed']
bdata = [dict(brand_id=b[0], brand=b[1], country=b[2], status=b[3], india_note=b[4]) for b in brands]
write_table(ws, bh, bdata, [14, 20, 22, 10, 90, 14], 'Brands')
for i in range(2, ws.max_row + 1):
    ws.cell(row=i, column=6, value=f'=COUNTIF(Models!$B:$B,A{i})').font = BODY

# Models
ws = wb.create_sheet('Models')
mh = ['model_id', 'brand_id', 'brand', 'model_name', 'launch_year', 'model_code', 'code_status', 'device_type', 'display_tech', 'battery_mah', 'charging_port', 'back_material', 'wireless_charging', 'fingerprint', 'parts_availability', 'notes']
write_table(ws, mh, rows, [30, 12, 16, 28, 11, 18, 18, 14, 12, 12, 13, 13, 16, 13, 17, 30], 'Models')
for i in range(2, ws.max_row + 1):
    ws.cell(row=i, column=6).font = VERIFY_FONT
    if not ws.cell(row=i, column=6).value:
        ws.cell(row=i, column=6).fill = YELLOW
    ws.cell(row=i, column=16).fill = YELLOW

# Part types
ws = wb.create_sheet('Part types')
ph = ['part_type_id', 'category', 'part_type', 'applies_to', 'notes']
pdata = [dict(part_type_id=p[0], category='Spare Parts' if p[1] == 'parts' else 'Accessories', part_type=p[2], applies_to={'all': 'every model', 'smartphone': 'smartphones only', 'fp': 'models with a fingerprint sensor', 'wireless': 'models with wireless charging', 'nfc-only': 'OLED models without wireless charging (confirm NFC)'}[p[3]], notes=p[4]) for p in M.PART_TYPES]
write_table(ws, ph, pdata, [16, 14, 32, 40, 80], 'PartTypes')

# Model parts
ws = wb.create_sheet('Model parts')
mph = ['brand', 'model_name', 'model_code', 'model_id', 'category', 'part_type_id', 'part_type', 'suggested_variant', 'sku', 'supplier', 'price_inr', 'stock', 'fit_status', 'evidence']
write_table(ws, mph, parts_rows, [16, 28, 16, 30, 13, 14, 30, 60, 16, 16, 11, 8, 12, 30], 'ModelParts')
for i in range(2, ws.max_row + 1):
    for c in (9, 10, 11, 12, 14):
        ws.cell(row=i, column=c).fill = YELLOW
    ws.cell(row=i, column=3).font = VERIFY_FONT
# example row of the expected format (first row, Galaxy A54 display)
ws.cell(row=2, column=9, value='SD-SCR-0412'); ws.cell(row=2, column=10, value='Example Traders, Delhi'); ws.cell(row=2, column=11, value=2499)
ws.cell(row=2, column=12, value=12); ws.cell(row=2, column=13, value='verified'); ws.cell(row=2, column=14, value='EXAMPLE ROW: physically fitted on SM-S938B on 20 Oct 2026; replace with real data')
for c in range(1, 15):
    ws.cell(row=2, column=c).font = Font(name=FONT, size=10, italic=True)
ws.cell(row=2, column=11).number_format = '#,##0'
ws.auto_filter.ref = None

# Summary with formulas
ws = wb.create_sheet('Summary', 1)
ws.append(['Brand', 'Models listed', 'High availability', 'Medium', 'Low', 'Spare-part rows', 'Accessory rows', 'Total part rows'])
for i, b in enumerate(brands, 2):
    ws.append([b[1],
        f'=COUNTIF(Models!$C:$C,A{i})',
        f'=COUNTIFS(Models!$C:$C,A{i},Models!$O:$O,"High")',
        f'=COUNTIFS(Models!$C:$C,A{i},Models!$O:$O,"Medium")',
        f'=COUNTIFS(Models!$C:$C,A{i},Models!$O:$O,"Low")',
        f"=COUNTIFS('Model parts'!$A:$A,A{i},'Model parts'!$E:$E,\"Spare Parts\")",
        f"=COUNTIFS('Model parts'!$A:$A,A{i},'Model parts'!$E:$E,\"Accessories\")",
        f'=F{i}+G{i}'])
n = len(brands) + 1
ws.append(['Total'] + [f'=SUM({get_column_letter(c)}2:{get_column_letter(c)}{n})' for c in range(2, 9)])
style_header(ws, 8)
for row in ws.iter_rows(min_row=2, max_row=ws.max_row):
    for cell in row:
        cell.font = BODY; cell.number_format = '#,##0'
for cell in ws[ws.max_row]:
    cell.font = BOLD
for i, w in enumerate([20, 14, 16, 10, 8, 16, 16, 16], 1):
    ws.column_dimensions[get_column_letter(i)].width = w
ws.freeze_panes = 'A2'
ws.cell(row=ws.max_row + 2, column=1, value='All counts are formulas over the Models and Model parts sheets and update as rows are added or removed.').font = Font(name=FONT, size=9, italic=True)

xlsx = os.path.join(OUT, 'SpareDukaan_Catalogue_Seed.xlsx')
wb.save(xlsx)

# ---------- CSVs in the project document's import format ----------
csvdir = os.path.join(OUT, 'csv'); os.makedirs(csvdir, exist_ok=True)
with open(os.path.join(csvdir, 'brands.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['brand_id', 'name', 'slug', 'aliases', 'status', 'india_note'])
    for b in brands:
        w.writerow([b[0], b[1], b[0], '', b[3], b[4]])
with open(os.path.join(csvdir, 'devices.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['model_id', 'brand_id', 'model_name', 'launch_year', 'exact_code', 'code_status', 'device_type', 'display_tech', 'battery_mah', 'charging_port', 'back_material', 'wireless_charging', 'fingerprint', 'parts_availability'])
    for r in rows:
        w.writerow([r['model_id'], r['brand_id'], r['model_name'], r['launch_year'], r['model_code'], r['code_status'], r['device_type'], r['display_tech'], r['battery_mah'] or '', r['charging_port'], r['back_material'], r['wireless_charging'], r['fingerprint'], r['parts_availability']])
with open(os.path.join(csvdir, 'part_types.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['part_type_id', 'category', 'name', 'applies_to', 'notes'])
    for p in M.PART_TYPES:
        w.writerow([p[0], p[1], p[2], p[3], p[4]])
with open(os.path.join(csvdir, 'model_parts.csv'), 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['model_id', 'brand_id', 'part_type_id', 'category', 'suggested_variant', 'sku', 'price_minor', 'fit_status', 'evidence_reference'])
    for pr in parts_rows:
        w.writerow([pr['model_id'], pr['model_id'].split('-')[0], pr['part_type_id'], pr['category'], pr['suggested_variant'], '', '', 'unverified', ''])

print('models', len(rows), 'part rows', len(parts_rows), 'xlsx', xlsx)
