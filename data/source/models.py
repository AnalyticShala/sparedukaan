# SpareDukaan catalogue seed: phone brands sold in India and their models
# from roughly 2018 onward (the window for which the Indian aftermarket
# commonly stocks spares), plus a few evergreen older models.
#
# Field order per model line:
#   name | year | model_code | display | battery_mAh | port | back | wireless | fingerprint | availability
# display: OLED / LCD        port: USB-C / Micro-USB / Lightning
# back: glass / plastic / leather / metal     wireless: Y / N
# fingerprint: in-display / side / rear / none / face
# availability: H (parts widely stocked), M (common), L (limited, mostly display + battery)
# Blank = not known with confidence; the catalogue manager must fill from supplier data.
# Model codes: only filled where known with reasonable confidence; ALL must be verified
# against the device's About-phone screen or supplier sheet before publishing.

BRANDS = [
    # id, name, country, status, share note
    ("samsung", "Samsung", "South Korea", "active", "Top-2 by volume in India; widest aftermarket for displays and batteries"),
    ("xiaomi", "Xiaomi / Redmi", "China", "active", "Top-3 by volume; Redmi Note series is the most repaired line in India"),
    ("poco", "Poco", "China", "active", "Xiaomi sub-brand; many Poco models share parts with Redmi models"),
    ("vivo", "Vivo", "China", "active", "Top-3 by volume; strong offline/tier-2 presence"),
    ("iqoo", "iQOO", "China", "active", "Vivo sub-brand, online-first; shares parts with Vivo models"),
    ("oppo", "Oppo", "China", "active", "Top-5; offline heavy; A and F series dominate repairs"),
    ("realme", "Realme", "China", "active", "Top-5; very high volume in budget segment, C and Narzo series"),
    ("oneplus", "OnePlus", "China", "active", "Premium mid-range; Nord series high volume"),
    ("apple", "Apple", "USA", "active", "Growing fast; iPhone 11 to 15 dominate repair demand"),
    ("motorola", "Motorola", "USA / Lenovo", "active", "G and Edge series; clean Android; rising share"),
    ("nothing", "Nothing", "UK", "active", "Phone (1), (2), (2a), (3a), CMF; small but loyal base"),
    ("google", "Google", "USA", "active", "Pixel; now assembled in India; parts via iFixit-style channels"),
    ("infinix", "Infinix", "Hong Kong / Transsion", "active", "Budget online; Hot, Note, Smart, Zero series"),
    ("tecno", "Tecno", "Hong Kong / Transsion", "active", "Budget offline; Spark, Pova, Camon series"),
    ("itel", "Itel", "Hong Kong / Transsion", "active", "Entry level and feature phones"),
    ("honor", "Honor", "China", "active", "Re-entered India 2023; small volume"),
    ("nokia", "Nokia (HMD)", "Finland", "active", "Low volume since 2021; older models still in repair"),
    ("lava", "Lava", "India", "active", "Indian brand; Blaze, Yuva, Agni series"),
    ("micromax", "Micromax", "India", "legacy", "IN series 2020-2021; parts limited"),
    ("asus", "Asus", "Taiwan", "legacy", "ROG and Zenfone; niche"),
    ("lenovo", "Lenovo", "China", "legacy", "K series until ~2020; parts limited"),
    ("huawei", "Huawei", "China", "legacy", "Exited India ~2020; parts limited"),
    ("sony", "Sony", "Japan", "legacy", "Exited India ~2019; parts very limited"),
    ("lg", "LG", "South Korea", "legacy", "Exited phones 2021; parts very limited"),
    ("jio", "Jio (Reliance)", "India", "active", "JioPhone Next and JioPhone feature phones"),
]

MODELS = {}

MODELS["samsung"] = """
Galaxy S25 Ultra|2025|SM-S938B|OLED|5000|USB-C|glass|Y|in-display|M
Galaxy S25+|2025|SM-S936B|OLED|4900|USB-C|glass|Y|in-display|M
Galaxy S25|2025|SM-S931B|OLED|4000|USB-C|glass|Y|in-display|M
Galaxy S24 Ultra|2024|SM-S928B|OLED|5000|USB-C|glass|Y|in-display|H
Galaxy S24+|2024|SM-S926B|OLED|4900|USB-C|glass|Y|in-display|M
Galaxy S24|2024|SM-S921B|OLED|4000|USB-C|glass|Y|in-display|H
Galaxy S24 FE|2024|SM-S721B|OLED|4700|USB-C|glass|Y|in-display|M
Galaxy S23 Ultra|2023|SM-S918B|OLED|5000|USB-C|glass|Y|in-display|H
Galaxy S23+|2023|SM-S916B|OLED|4700|USB-C|glass|Y|in-display|M
Galaxy S23|2023|SM-S911B|OLED|3900|USB-C|glass|Y|in-display|H
Galaxy S23 FE|2023|SM-S711B|OLED|4500|USB-C|glass|Y|in-display|M
Galaxy S22 Ultra|2022|SM-S908E|OLED|5000|USB-C|glass|Y|in-display|H
Galaxy S22+|2022|SM-S906E|OLED|4500|USB-C|glass|Y|in-display|M
Galaxy S22|2022|SM-S901E|OLED|3700|USB-C|glass|Y|in-display|H
Galaxy S21 Ultra|2021|SM-G998B|OLED|5000|USB-C|glass|Y|in-display|H
Galaxy S21+|2021|SM-G996B|OLED|4800|USB-C|glass|Y|in-display|M
Galaxy S21|2021|SM-G991B|OLED|4000|USB-C|plastic|Y|in-display|H
Galaxy S21 FE|2022|SM-G990E|OLED|4500|USB-C|plastic|Y|in-display|H
Galaxy S20 Ultra|2020|SM-G988B|OLED|5000|USB-C|glass|Y|in-display|M
Galaxy S20+|2020|SM-G985F|OLED|4500|USB-C|glass|Y|in-display|M
Galaxy S20|2020|SM-G980F|OLED|4000|USB-C|glass|Y|in-display|M
Galaxy S20 FE|2020|SM-G780F|OLED|4500|USB-C|plastic|Y|in-display|H
Galaxy S10+|2019|SM-G975F|OLED|4100|USB-C|glass|Y|in-display|M
Galaxy S10|2019|SM-G973F|OLED|3400|USB-C|glass|Y|in-display|M
Galaxy S10e|2019|SM-G970F|OLED|3100|USB-C|glass|Y|side|L
Galaxy S10 Lite|2020|SM-G770F|OLED|4500|USB-C|plastic|N|in-display|M
Galaxy S9+|2018|SM-G965F|OLED|3500|USB-C|glass|Y|rear|M
Galaxy S9|2018|SM-G960F|OLED|3000|USB-C|glass|Y|rear|M
Galaxy Note 20 Ultra|2020|SM-N985F|OLED|4500|USB-C|glass|Y|in-display|M
Galaxy Note 20|2020|SM-N980F|OLED|4300|USB-C|plastic|Y|in-display|M
Galaxy Note 10+|2019|SM-N975F|OLED|4300|USB-C|glass|Y|in-display|M
Galaxy Note 10|2019|SM-N970F|OLED|3500|USB-C|glass|Y|in-display|M
Galaxy Note 10 Lite|2020|SM-N770F|OLED|4500|USB-C|plastic|N|in-display|M
Galaxy Note 9|2018|SM-N960F|OLED|4000|USB-C|glass|Y|rear|M
Galaxy Z Fold6|2024|SM-F956B|OLED|4400|USB-C|glass|Y|side|L
Galaxy Z Fold5|2023|SM-F946B|OLED|4400|USB-C|glass|Y|side|L
Galaxy Z Fold4|2022|SM-F936B|OLED|4400|USB-C|glass|Y|side|L
Galaxy Z Flip6|2024|SM-F741B|OLED|4000|USB-C|glass|Y|side|L
Galaxy Z Flip5|2023|SM-F731B|OLED|3700|USB-C|glass|Y|side|L
Galaxy Z Flip4|2022|SM-F721B|OLED|3700|USB-C|glass|Y|side|L
Galaxy A56 5G|2025|SM-A566B|OLED|5000|USB-C|glass|N|in-display|H
Galaxy A36 5G|2025|SM-A366B|OLED|5000|USB-C|glass|N|in-display|H
Galaxy A26 5G|2025|SM-A266B|OLED|5000|USB-C|glass|N|side|M
Galaxy A16 5G|2024|SM-A166B|OLED|5000|USB-C|plastic|N|side|H
Galaxy A16|2024|SM-A165F|OLED|5000|USB-C|plastic|N|side|H
Galaxy A06|2024|SM-A065F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A55 5G|2024|SM-A556E|OLED|5000|USB-C|glass|N|in-display|H
Galaxy A35 5G|2024|SM-A356E|OLED|5000|USB-C|glass|N|in-display|H
Galaxy A25 5G|2023|SM-A256E|OLED|5000|USB-C|plastic|N|side|H
Galaxy A15 5G|2023|SM-A156E|OLED|5000|USB-C|plastic|N|side|H
Galaxy A15|2023|SM-A155F|OLED|5000|USB-C|plastic|N|side|H
Galaxy A05s|2023|SM-A057F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A05|2023|SM-A055F|LCD|5000|USB-C|plastic|N|none|H
Galaxy A54 5G|2023|SM-A546E|OLED|5000|USB-C|glass|N|in-display|H
Galaxy A34 5G|2023|SM-A346E|OLED|5000|USB-C|plastic|N|in-display|H
Galaxy A24|2023|SM-A245F|OLED|5000|USB-C|plastic|N|side|H
Galaxy A14 5G|2023|SM-A146B|LCD|5000|USB-C|plastic|N|side|H
Galaxy A14|2023|SM-A145F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A04s|2022|SM-A047F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A04|2022|SM-A045F|LCD|5000|USB-C|plastic|N|none|M
Galaxy A04e|2022|SM-A042F|LCD|5000|Micro-USB|plastic|N|none|M
Galaxy A73 5G|2022|SM-A736B|OLED|5000|USB-C|plastic|N|in-display|M
Galaxy A53 5G|2022|SM-A536E|OLED|5000|USB-C|plastic|N|in-display|H
Galaxy A33 5G|2022|SM-A336E|OLED|5000|USB-C|plastic|N|in-display|H
Galaxy A23|2022|SM-A235F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A13|2022|SM-A135F|LCD|5000|USB-C|plastic|N|side|H
Galaxy A03s|2021|SM-A037F|LCD|5000|Micro-USB|plastic|N|side|H
Galaxy A03|2021|SM-A035F|LCD|5000|Micro-USB|plastic|N|none|M
Galaxy A03 Core|2021|SM-A032F|LCD|5000|Micro-USB|plastic|N|none|M
Galaxy A72|2021|SM-A725F|OLED|5000|USB-C|plastic|N|in-display|M
Galaxy A52s 5G|2021|SM-A528B|OLED|4500|USB-C|plastic|N|in-display|H
Galaxy A52|2021|SM-A525F|OLED|4500|USB-C|plastic|N|in-display|H
Galaxy A32|2021|SM-A325F|OLED|5000|USB-C|plastic|N|in-display|H
Galaxy A22 5G|2021|SM-A226B|LCD|5000|USB-C|plastic|N|side|H
Galaxy A22|2021|SM-A225F|OLED|5000|USB-C|plastic|N|side|H
Galaxy A12|2020|SM-A125F|LCD|5000|USB-C|plastic|N|rear|H
Galaxy A02s|2021|SM-A025F|LCD|5000|USB-C|plastic|N|none|H
Galaxy A02|2021|SM-A022F|LCD|5000|Micro-USB|plastic|N|none|M
Galaxy A71|2020|SM-A715F|OLED|4500|USB-C|plastic|N|in-display|H
Galaxy A51|2020|SM-A515F|OLED|4000|USB-C|plastic|N|in-display|H
Galaxy A31|2020|SM-A315F|OLED|5000|USB-C|plastic|N|in-display|H
Galaxy A21s|2020|SM-A217F|LCD|5000|USB-C|plastic|N|rear|H
Galaxy A11|2020|SM-A115F|LCD|4000|USB-C|plastic|N|rear|M
Galaxy A01|2020|SM-A015F|LCD|3000|Micro-USB|plastic|N|none|M
Galaxy A70|2019|SM-A705F|OLED|4500|USB-C|plastic|N|in-display|H
Galaxy A50s|2019|SM-A507F|OLED|4000|USB-C|plastic|N|in-display|H
Galaxy A50|2019|SM-A505F|OLED|4000|USB-C|plastic|N|in-display|H
Galaxy A30s|2019|SM-A307F|OLED|4000|USB-C|plastic|N|in-display|H
Galaxy A30|2019|SM-A305F|OLED|4000|USB-C|plastic|N|rear|H
Galaxy A20s|2019|SM-A207F|LCD|4000|USB-C|plastic|N|rear|H
Galaxy A20|2019|SM-A205F|OLED|4000|USB-C|plastic|N|rear|H
Galaxy A10s|2019|SM-A107F|LCD|4000|Micro-USB|plastic|N|rear|H
Galaxy A10|2019|SM-A105F|LCD|3400|Micro-USB|plastic|N|none|H
Galaxy A7 (2018)|2018|SM-A750F|OLED|3300|Micro-USB|glass|N|side|M
Galaxy A6+|2018|SM-A605F|OLED|3500|Micro-USB|metal|N|rear|L
Galaxy M56 5G|2025|SM-M566B|OLED|5000|USB-C|plastic|N|in-display|M
Galaxy M36 5G|2025|SM-M366B|OLED|5000|USB-C|plastic|N|side|M
Galaxy M16 5G|2025|SM-M166B|OLED|5000|USB-C|plastic|N|side|M
Galaxy M06 5G|2025|SM-M066B|LCD|5000|USB-C|plastic|N|side|M
Galaxy M55s 5G|2024|SM-M558B|OLED|5000|USB-C|plastic|N|in-display|M
Galaxy M35 5G|2024|SM-M356B|OLED|6000|USB-C|plastic|N|side|H
Galaxy M15 5G|2024|SM-M156B|OLED|6000|USB-C|plastic|N|side|H
Galaxy M05|2024|SM-M055F|LCD|5000|USB-C|plastic|N|none|H
Galaxy M34 5G|2023|SM-M346B|OLED|6000|USB-C|plastic|N|side|H
Galaxy M14 5G|2023|SM-M146B|LCD|6000|USB-C|plastic|N|side|H
Galaxy M04|2022|SM-M045F|LCD|5000|USB-C|plastic|N|none|H
Galaxy M53 5G|2022|SM-M536B|OLED|5000|USB-C|plastic|N|side|M
Galaxy M33 5G|2022|SM-M336B|LCD|6000|USB-C|plastic|N|side|H
Galaxy M13 5G|2022|SM-M136B|LCD|5000|USB-C|plastic|N|side|H
Galaxy M13|2022|SM-M135F|LCD|6000|USB-C|plastic|N|side|H
Galaxy M52 5G|2021|SM-M526B|OLED|5000|USB-C|plastic|N|side|M
Galaxy M32|2021|SM-M325F|OLED|6000|USB-C|plastic|N|side|H
Galaxy M12|2021|SM-M127F|LCD|6000|USB-C|plastic|N|side|H
Galaxy M02s|2021|SM-M025F|LCD|5000|USB-C|plastic|N|none|H
Galaxy M51|2020|SM-M515F|OLED|7000|USB-C|plastic|N|side|H
Galaxy M31s|2020|SM-M317F|OLED|6000|USB-C|plastic|N|side|H
Galaxy M31|2020|SM-M315F|OLED|6000|USB-C|plastic|N|rear|H
Galaxy M21|2020|SM-M215F|OLED|6000|USB-C|plastic|N|rear|H
Galaxy M11|2020|SM-M115F|LCD|5000|USB-C|plastic|N|rear|H
Galaxy M01|2020|SM-M015F|LCD|4000|Micro-USB|plastic|N|rear|M
Galaxy M30s|2019|SM-M307F|OLED|6000|USB-C|plastic|N|rear|H
Galaxy M30|2019|SM-M305F|OLED|5000|USB-C|plastic|N|rear|H
Galaxy M20|2019|SM-M205F|LCD|5000|USB-C|plastic|N|rear|H
Galaxy M10|2019|SM-M105F|LCD|3400|Micro-USB|plastic|N|none|M
Galaxy F55 5G|2024|SM-E556B|OLED|5000|USB-C|leather|N|in-display|M
Galaxy F15 5G|2024|SM-E156B|OLED|6000|USB-C|plastic|N|side|M
Galaxy F54 5G|2023|SM-E546B|OLED|6000|USB-C|plastic|N|in-display|M
Galaxy F34 5G|2023|SM-E346B|OLED|6000|USB-C|plastic|N|side|M
Galaxy F14 5G|2023|SM-E146B|LCD|6000|USB-C|plastic|N|side|H
Galaxy F23 5G|2022|SM-E236B|LCD|5000|USB-C|plastic|N|side|H
Galaxy F13|2022|SM-E135F|LCD|6000|USB-C|plastic|N|side|H
Galaxy F62|2021|SM-E625F|OLED|7000|USB-C|plastic|N|side|M
Galaxy F41|2020|SM-F415F|OLED|6000|USB-C|plastic|N|rear|H
Galaxy J7 Prime|2016|SM-G610F|LCD|3300|Micro-USB|metal|N|front|L
Galaxy J7 Pro|2017|SM-J730G|OLED|3600|Micro-USB|metal|N|front|L
Galaxy J6|2018|SM-J600G|OLED|3000|Micro-USB|plastic|N|rear|L
Galaxy J4|2018|SM-J400F|OLED|3000|Micro-USB|plastic|N|none|L
Galaxy J2 Core|2018|SM-J260G|LCD|2600|Micro-USB|plastic|N|none|L
"""

MODELS["xiaomi"] = """
Redmi Note 14 Pro+ 5G|2024||OLED|6200|USB-C|glass|N|in-display|M
Redmi Note 14 Pro 5G|2024||OLED|5500|USB-C|glass|N|in-display|H
Redmi Note 14 5G|2024||OLED|5110|USB-C|plastic|N|in-display|H
Redmi Note 13 Pro+ 5G|2024||OLED|5000|USB-C|glass|N|in-display|M
Redmi Note 13 Pro 5G|2024||OLED|5100|USB-C|glass|N|in-display|H
Redmi Note 13 5G|2024|2312DRAABI|OLED|5000|USB-C|plastic|N|in-display|H
Redmi Note 12 Pro+ 5G|2023|22101316I|OLED|5000|USB-C|glass|N|side|M
Redmi Note 12 Pro 5G|2023|22101316I|OLED|5000|USB-C|glass|N|side|H
Redmi Note 12 5G|2023|22111317I|OLED|5000|USB-C|plastic|N|side|H
Redmi Note 12|2023|23021RAAEG|OLED|5000|USB-C|plastic|N|side|H
Redmi Note 11 Pro+ 5G|2022|21091116UI|OLED|5000|USB-C|glass|N|side|M
Redmi Note 11 Pro|2022|2201116TI|OLED|5000|USB-C|glass|N|side|H
Redmi Note 11T 5G|2021|21091116AI|LCD|5000|USB-C|plastic|N|side|H
Redmi Note 11|2022|2201117TI|OLED|5000|USB-C|plastic|N|side|H
Redmi Note 11S|2022||OLED|5000|USB-C|plastic|N|side|M
Redmi Note 10 Pro Max|2021|M2101K6I|OLED|5020|USB-C|glass|N|side|H
Redmi Note 10 Pro|2021|M2101K6P|OLED|5020|USB-C|glass|N|side|H
Redmi Note 10|2021|M2101K7AI|OLED|5000|USB-C|plastic|N|side|H
Redmi Note 10S|2021|M2101K7BI|OLED|5000|USB-C|plastic|N|side|H
Redmi Note 10T 5G|2021|M2103K19I|LCD|5000|USB-C|plastic|N|side|H
Redmi Note 10 Lite|2021|M2002F4LG|LCD|5020|USB-C|plastic|N|rear|M
Redmi Note 9 Pro Max|2020|M2003J6B1I|LCD|5020|USB-C|glass|N|side|H
Redmi Note 9 Pro|2020|M2003J6A1I|LCD|5020|USB-C|glass|N|side|H
Redmi Note 9|2020|M2003J15SI|LCD|5020|USB-C|plastic|N|rear|H
Redmi Note 8 Pro|2019|M1906G7I|LCD|4500|USB-C|glass|N|rear|H
Redmi Note 8|2019|M1908C3JI|LCD|4000|USB-C|glass|N|rear|H
Redmi Note 7 Pro|2019|M1901F7S|LCD|4000|USB-C|glass|N|rear|H
Redmi Note 7|2019|M1901F7I|LCD|4000|USB-C|glass|N|rear|H
Redmi Note 7S|2019|M1901F7S|LCD|4000|USB-C|glass|N|rear|H
Redmi Note 6 Pro|2018|M1806E7TI|LCD|4000|Micro-USB|metal|N|rear|M
Redmi Note 5 Pro|2018|MEI7S|LCD|4000|Micro-USB|metal|N|rear|M
Redmi Note 5|2018|MEI7|LCD|4000|Micro-USB|metal|N|rear|M
Redmi 14C 5G|2025||LCD|5160|USB-C|plastic|N|side|H
Redmi 13 5G|2024||LCD|5030|USB-C|glass|N|side|H
Redmi 13C 5G|2023|23100RN82I|LCD|5000|USB-C|plastic|N|side|H
Redmi 13C|2023|23106RN0DA|LCD|5000|USB-C|plastic|N|side|H
Redmi 12 5G|2023|23076RN4BI|LCD|5000|USB-C|glass|N|side|H
Redmi 12|2023|23053RN02I|LCD|5000|USB-C|glass|N|side|H
Redmi 12C|2023|22120RN86I|LCD|5000|Micro-USB|plastic|N|rear|H
Redmi A4 5G|2024||LCD|5160|USB-C|plastic|N|side|H
Redmi A3|2024|23129RN51X|LCD|5000|USB-C|glass|N|side|H
Redmi A2|2023|23028RNCAI|LCD|5000|Micro-USB|plastic|N|none|H
Redmi A1|2022|220733SFG|LCD|5000|Micro-USB|plastic|N|none|H
Redmi 11 Prime 5G|2022|22041219I|LCD|5000|USB-C|plastic|N|side|H
Redmi 11 Prime|2022|22071219AI|LCD|5000|USB-C|plastic|N|side|H
Redmi 10 Prime|2021|21061119BI|LCD|6000|USB-C|plastic|N|side|H
Redmi 10|2022|21061119AG|LCD|6000|USB-C|plastic|N|side|H
Redmi 10A|2022|220233L2I|LCD|5000|Micro-USB|plastic|N|rear|H
Redmi 10 Power|2022|220333QBI|LCD|6000|USB-C|plastic|N|side|M
Redmi 9 Power|2020|M2010J19SI|LCD|6000|USB-C|plastic|N|rear|H
Redmi 9 Prime|2020|M2004J19PI|LCD|5020|USB-C|plastic|N|rear|H
Redmi 9|2020|M2006C3LII|LCD|5000|Micro-USB|plastic|N|none|H
Redmi 9A|2020|M2006C3LI|LCD|5000|Micro-USB|plastic|N|none|H
Redmi 9i|2020|M2006C3LII|LCD|5000|Micro-USB|plastic|N|none|H
Redmi 9 Activ|2021|M2006C3LII|LCD|5000|Micro-USB|plastic|N|none|H
Redmi 8|2019|M1908C3IG|LCD|5000|USB-C|glass|N|rear|H
Redmi 8A|2019|M1908C3KG|LCD|5000|USB-C|plastic|N|none|H
Redmi 8A Dual|2020|M1908C3KH|LCD|5000|USB-C|plastic|N|none|H
Redmi 7|2019|M1810F6LG|LCD|4000|Micro-USB|glass|N|rear|M
Redmi 7A|2019|M1903C3EI|LCD|4000|Micro-USB|plastic|N|none|M
Redmi 6 Pro|2018|M1805D1SI|LCD|4000|Micro-USB|metal|N|rear|M
Redmi 6|2018|M1804C3DI|LCD|3000|Micro-USB|plastic|N|rear|M
Redmi 6A|2018|M1804C3CI|LCD|3000|Micro-USB|plastic|N|none|M
Redmi Y3|2019|M1810F6G|LCD|4000|Micro-USB|glass|N|rear|M
Redmi Y2|2018|M1805D1SI|LCD|3080|Micro-USB|plastic|N|rear|M
Redmi K20 Pro|2019|M1903F11I|OLED|4000|USB-C|glass|N|in-display|H
Redmi K20|2019|M1903F10I|OLED|4000|USB-C|glass|N|in-display|H
Redmi K50i 5G|2022|22041216I|LCD|5080|USB-C|plastic|N|side|M
Xiaomi 15|2025||OLED|5240|USB-C|glass|Y|in-display|L
Xiaomi 14 Ultra|2024||OLED|5000|USB-C|glass|Y|in-display|L
Xiaomi 14|2024|23127PN0CI|OLED|4610|USB-C|glass|Y|in-display|M
Xiaomi 14 CIVI|2024||OLED|4700|USB-C|glass|N|in-display|M
Xiaomi 13 Pro|2023|2210132G|OLED|4820|USB-C|glass|Y|in-display|L
Xiaomi 12 Pro|2022|2201122G|OLED|4600|USB-C|glass|Y|in-display|L
Xiaomi 11T Pro|2022|2107113SI|OLED|5000|USB-C|glass|N|side|M
Xiaomi 11i HyperCharge|2022|21091116UI|OLED|4500|USB-C|glass|N|side|M
Xiaomi 11 Lite NE 5G|2021|2109119DI|OLED|4250|USB-C|glass|N|side|M
Mi 11X Pro|2021|M2012K11I|OLED|4520|USB-C|glass|N|side|M
Mi 11X|2021|M2012K11AI|OLED|4520|USB-C|glass|N|side|H
Mi 11 Ultra|2021|M2102K1G|OLED|5000|USB-C|ceramic|Y|in-display|L
Mi 10T Pro|2020|M2007J3SI|LCD|5000|USB-C|glass|N|side|M
Mi 10T|2020|M2007J3SY|LCD|5000|USB-C|glass|N|side|M
Mi 10|2020|M2001J2I|OLED|4780|USB-C|glass|Y|in-display|M
Mi 10i|2021|M2007J17I|LCD|4820|USB-C|glass|N|side|H
Mi A3|2019|M1906F9SI|OLED|4030|USB-C|glass|N|in-display|M
Mi A2|2018|M1804D2SI|LCD|3010|USB-C|metal|N|rear|M
"""

MODELS["poco"] = """
Poco X7 Pro|2025||OLED|6000|USB-C|plastic|N|in-display|M
Poco X7|2025||OLED|5500|USB-C|glass|N|in-display|M
Poco X6 Pro|2024|2311DRK48I|OLED|5000|USB-C|plastic|N|in-display|H
Poco X6|2024|23122PCD1I|OLED|5100|USB-C|glass|N|in-display|H
Poco X5 Pro|2023|22101320I|OLED|5000|USB-C|plastic|N|side|H
Poco X5|2023|22111317PI|OLED|5000|USB-C|plastic|N|side|H
Poco X4 Pro|2022|2201116PI|OLED|5000|USB-C|glass|N|side|H
Poco X3 Pro|2021|M2102J20SI|LCD|5160|USB-C|plastic|N|side|H
Poco X3|2020|M2007J20CI|LCD|6000|USB-C|plastic|N|side|H
Poco X2|2020|MZB9011IN|LCD|4500|USB-C|glass|N|side|H
Poco F7|2025||OLED|7550|USB-C|glass|N|in-display|M
Poco F6|2024|23113RKC6I|OLED|5000|USB-C|plastic|N|in-display|M
Poco F5|2023|23049PCD8I|OLED|5000|USB-C|plastic|N|side|H
Poco F4 5G|2022|22021211RI|OLED|4500|USB-C|glass|N|side|M
Poco F3 GT|2021|M2104K10I|OLED|5065|USB-C|glass|N|side|M
Poco F1|2018|M1805E10A|LCD|4000|USB-C|plastic|N|rear|H
Poco M7 Pro 5G|2024||OLED|5110|USB-C|plastic|N|in-display|H
Poco M6 Plus 5G|2024||LCD|5030|USB-C|glass|N|side|H
Poco M6 Pro 5G|2023|23076PC4BI|LCD|5000|USB-C|glass|N|side|H
Poco M6 5G|2023|2312FPCA6I|LCD|5000|USB-C|plastic|N|side|H
Poco M5|2022|22071219CI|LCD|5000|USB-C|plastic|N|side|H
Poco M4 Pro 5G|2022|21091116AI|LCD|5000|USB-C|plastic|N|side|H
Poco M4 Pro|2022|2201117PI|OLED|5000|USB-C|plastic|N|side|H
Poco M3 Pro 5G|2021|M2103K19PI|LCD|5000|USB-C|plastic|N|side|H
Poco M3|2021|M2010J19CI|LCD|6000|USB-C|plastic|N|rear|H
Poco M2 Pro|2020|M2003J6CI|LCD|5000|USB-C|glass|N|rear|H
Poco M2|2020|M2004J19PI|LCD|5000|USB-C|plastic|N|rear|H
Poco C75 5G|2024||LCD|5160|USB-C|plastic|N|side|H
Poco C65|2023|2312FPCA6G|LCD|5000|USB-C|plastic|N|side|H
Poco C61|2024|23129RN51X|LCD|5000|USB-C|glass|N|side|H
Poco C55|2023|22127PC95I|LCD|5000|Micro-USB|leather|N|rear|H
Poco C51|2023|23028RNCAI|LCD|5000|Micro-USB|plastic|N|none|H
Poco C31|2021|211033MI|LCD|5000|Micro-USB|plastic|N|rear|H
Poco C3|2020|M2006C3MI|LCD|5000|Micro-USB|plastic|N|none|H
"""

MODELS["vivo"] = """
Vivo X200 Pro|2024|V2415|OLED|6000|USB-C|glass|Y|in-display|L
Vivo X200|2024|V2413|OLED|5800|USB-C|glass|N|in-display|L
Vivo X100 Pro|2024|V2324|OLED|5400|USB-C|glass|Y|in-display|L
Vivo X100|2024|V2308|OLED|5000|USB-C|glass|Y|in-display|M
Vivo X90 Pro|2023|V2242|OLED|4870|USB-C|leather|Y|in-display|L
Vivo X80|2022|V2183|OLED|4500|USB-C|glass|N|in-display|M
Vivo X70 Pro|2021|V2105|OLED|4450|USB-C|glass|N|in-display|M
Vivo V50|2025|V2427|OLED|6000|USB-C|glass|N|in-display|M
Vivo V40 Pro|2024|V2319|OLED|5500|USB-C|glass|N|in-display|M
Vivo V40|2024|V2404|OLED|5500|USB-C|glass|N|in-display|H
Vivo V40e|2024|V2407|OLED|5500|USB-C|plastic|N|in-display|M
Vivo V30 Pro|2024|V2319|OLED|5000|USB-C|glass|N|in-display|M
Vivo V30|2024|V2318|OLED|5000|USB-C|glass|N|in-display|H
Vivo V30e|2024|V2335|OLED|5500|USB-C|plastic|N|in-display|H
Vivo V29 Pro|2023|V2250|OLED|4600|USB-C|glass|N|in-display|M
Vivo V29|2023|V2250|OLED|4600|USB-C|glass|N|in-display|H
Vivo V29e|2023|V2243|OLED|5000|USB-C|plastic|N|in-display|H
Vivo V27 Pro|2023|V2230|OLED|4600|USB-C|glass|N|in-display|M
Vivo V27|2023|V2246|OLED|4600|USB-C|glass|N|in-display|H
Vivo V25 Pro|2022|V2158|OLED|4830|USB-C|glass|N|in-display|M
Vivo V25|2022|V2202|OLED|4500|USB-C|glass|N|in-display|H
Vivo V23 Pro|2022|V2132|OLED|4300|USB-C|glass|N|in-display|M
Vivo V23|2022|V2130|OLED|4200|USB-C|glass|N|in-display|H
Vivo V21|2021|V2050|OLED|4000|USB-C|glass|N|in-display|H
Vivo V21e|2021|V2061|OLED|4000|USB-C|plastic|N|in-display|H
Vivo V20 Pro|2020|V2025|OLED|4000|USB-C|glass|N|in-display|H
Vivo V20|2020|V2024|OLED|4000|USB-C|glass|N|in-display|H
Vivo V20 SE|2020|V2023|OLED|4100|USB-C|plastic|N|in-display|H
Vivo V19|2020|V1990|OLED|4500|USB-C|glass|N|in-display|H
Vivo V17|2019|V1919|OLED|4500|USB-C|glass|N|in-display|H
Vivo V17 Pro|2019|V1909|OLED|4100|USB-C|glass|N|in-display|M
Vivo V15 Pro|2019|V1818|OLED|3700|Micro-USB|plastic|N|in-display|H
Vivo V15|2019|V1838|LCD|4000|Micro-USB|plastic|N|rear|H
Vivo V11 Pro|2018|V1804|OLED|3400|Micro-USB|plastic|N|in-display|H
Vivo V9|2018|V1723|LCD|3260|Micro-USB|plastic|N|rear|H
Vivo T4 5G|2025|V2433|OLED|7300|USB-C|plastic|N|in-display|M
Vivo T3 Pro 5G|2024|V2341|OLED|5500|USB-C|plastic|N|in-display|M
Vivo T3 5G|2024|V2334|OLED|5000|USB-C|plastic|N|in-display|H
Vivo T3x 5G|2024|V2336|LCD|6000|USB-C|plastic|N|side|H
Vivo T2 Pro 5G|2023|V2240|OLED|4600|USB-C|plastic|N|in-display|M
Vivo T2 5G|2023|V2247|OLED|4500|USB-C|plastic|N|in-display|H
Vivo T2x 5G|2023|V2235|LCD|5000|USB-C|plastic|N|side|H
Vivo T1 5G|2022|V2141|LCD|5000|USB-C|plastic|N|side|H
Vivo Y400 Pro|2025|V2449|OLED|5500|USB-C|plastic|N|in-display|M
Vivo Y300|2024|V2420|OLED|5000|USB-C|plastic|N|in-display|H
Vivo Y200|2023|V2307|OLED|4800|USB-C|plastic|N|in-display|H
Vivo Y200e|2024|V2336|OLED|5000|USB-C|plastic|N|in-display|H
Vivo Y100|2023|V2318|OLED|4500|USB-C|plastic|N|in-display|H
Vivo Y58 5G|2024|V2341|LCD|6000|USB-C|plastic|N|side|H
Vivo Y56 5G|2023|V2231|LCD|5000|USB-C|plastic|N|side|H
Vivo Y35|2022|V2205|LCD|5000|USB-C|plastic|N|side|H
Vivo Y33s|2021|V2109|LCD|5000|USB-C|plastic|N|side|H
Vivo Y28 5G|2024|V2334|LCD|5000|USB-C|plastic|N|side|H
Vivo Y27|2023|V2302|LCD|5000|USB-C|plastic|N|side|H
Vivo Y22|2022|V2207|LCD|5000|USB-C|plastic|N|side|H
Vivo Y21|2021|V2111|LCD|5000|USB-C|plastic|N|side|H
Vivo Y20|2020|V2027|LCD|5000|Micro-USB|plastic|N|side|H
Vivo Y18|2024|V2339|LCD|5000|USB-C|plastic|N|side|H
Vivo Y17s|2023|V2310|LCD|5000|USB-C|plastic|N|side|H
Vivo Y16|2022|V2204|LCD|5000|USB-C|plastic|N|side|H
Vivo Y15s|2021|V2125|LCD|5000|Micro-USB|plastic|N|rear|H
Vivo Y12|2019|V1901|LCD|5000|Micro-USB|plastic|N|rear|H
Vivo Y11|2019|V1901|LCD|5000|Micro-USB|plastic|N|rear|H
Vivo Y91|2019|V1811|LCD|4030|Micro-USB|plastic|N|rear|H
Vivo Y83|2018|V1726|LCD|3260|Micro-USB|plastic|N|rear|M
Vivo Y81|2018|V1732|LCD|3260|Micro-USB|plastic|N|rear|M
Vivo Y71|2018|V1731|LCD|3360|Micro-USB|plastic|N|none|M
Vivo Y02t|2023|V2237|LCD|5000|Micro-USB|plastic|N|none|M
"""

MODELS["iqoo"] = """
iQOO 13|2024|I2406|OLED|6000|USB-C|glass|N|in-display|L
iQOO 12|2023|I2208|OLED|5000|USB-C|glass|N|in-display|M
iQOO 11|2023|I2207|OLED|5000|USB-C|glass|N|in-display|M
iQOO 9 Pro|2022|I2022|OLED|4700|USB-C|glass|Y|in-display|L
iQOO 9|2022|I2021|OLED|4350|USB-C|glass|N|in-display|M
iQOO 7|2021|I2009|OLED|4400|USB-C|glass|N|in-display|M
iQOO Neo 10|2025|I2411|OLED|7000|USB-C|glass|N|in-display|M
iQOO Neo 9 Pro|2024|I2301|OLED|5160|USB-C|glass|N|in-display|M
iQOO Neo 7 Pro|2023|I2223|OLED|5000|USB-C|glass|N|in-display|M
iQOO Neo 7|2023|I2216|OLED|5000|USB-C|plastic|N|in-display|H
iQOO Neo 6|2022|I2201|OLED|4700|USB-C|glass|N|in-display|M
iQOO Z10|2025|I2416|OLED|7300|USB-C|plastic|N|in-display|M
iQOO Z9s|2024|I2321|OLED|5500|USB-C|plastic|N|in-display|H
iQOO Z9|2024|I2320|OLED|5000|USB-C|plastic|N|in-display|H
iQOO Z9x|2024|I2320|LCD|6000|USB-C|plastic|N|side|H
iQOO Z7|2023|I2219|OLED|4500|USB-C|plastic|N|in-display|H
iQOO Z7s|2023|I2229|OLED|4500|USB-C|plastic|N|in-display|H
iQOO Z6|2022|I2124|OLED|4500|USB-C|plastic|N|in-display|H
iQOO Z6 Lite|2022|I2210|LCD|5000|USB-C|plastic|N|side|H
iQOO Z5|2021|I2113|LCD|5000|USB-C|plastic|N|side|H
iQOO Z3|2021|I2011|LCD|4400|USB-C|plastic|N|side|H
iQOO 3|2020|I1927|OLED|4440|USB-C|glass|N|in-display|M
"""

MODELS["oppo"] = """
Oppo Find X8 Pro|2024|CPH2659|OLED|5910|USB-C|glass|Y|in-display|L
Oppo Find X8|2024|CPH2651|OLED|5630|USB-C|glass|Y|in-display|L
Oppo Find N3 Flip|2023|CPH2519|OLED|4300|USB-C|glass|N|side|L
Oppo Reno 13 Pro|2025|CPH2689|OLED|5800|USB-C|glass|N|in-display|M
Oppo Reno 13|2025|CPH2691|OLED|5600|USB-C|glass|N|in-display|M
Oppo Reno 12 Pro|2024|CPH2629|OLED|5000|USB-C|glass|N|in-display|M
Oppo Reno 12|2024|CPH2625|OLED|5000|USB-C|glass|N|in-display|H
Oppo Reno 11 Pro|2024|CPH2607|OLED|4600|USB-C|glass|N|in-display|M
Oppo Reno 11|2024|CPH2599|OLED|5000|USB-C|glass|N|in-display|H
Oppo Reno 10 Pro+|2023|CPH2521|OLED|4700|USB-C|glass|N|in-display|M
Oppo Reno 10 Pro|2023|CPH2525|OLED|4600|USB-C|glass|N|in-display|M
Oppo Reno 10|2023|CPH2531|OLED|5000|USB-C|glass|N|in-display|H
Oppo Reno 8 Pro|2022|CPH2357|OLED|4500|USB-C|glass|N|in-display|M
Oppo Reno 8|2022|CPH2359|OLED|4500|USB-C|glass|N|in-display|H
Oppo Reno 8T|2023|CPH2481|OLED|4800|USB-C|glass|N|in-display|H
Oppo Reno 7 Pro|2022|CPH2293|OLED|4500|USB-C|glass|N|in-display|M
Oppo Reno 7|2022|CPH2363|OLED|4500|USB-C|glass|N|in-display|H
Oppo Reno 6 Pro|2021|CPH2249|OLED|4500|USB-C|glass|N|in-display|M
Oppo Reno 6|2021|CPH2235|OLED|4300|USB-C|glass|N|in-display|H
Oppo Reno 5 Pro|2021|CPH2201|OLED|4350|USB-C|glass|N|in-display|M
Oppo Reno 4 Pro|2020|CPH2109|OLED|4000|USB-C|glass|N|in-display|M
Oppo Reno 3 Pro|2020|CPH2035|OLED|4025|USB-C|glass|N|in-display|M
Oppo Reno 2|2019|CPH1907|OLED|4000|USB-C|glass|N|in-display|M
Oppo F29 Pro|2025|CPH2713|OLED|6000|USB-C|plastic|N|in-display|M
Oppo F29|2025|CPH2711|OLED|6500|USB-C|plastic|N|in-display|M
Oppo F27 Pro+|2024|CPH2603|OLED|5000|USB-C|plastic|N|in-display|M
Oppo F27|2024|CPH2641|OLED|5000|USB-C|plastic|N|in-display|H
Oppo F25 Pro|2024|CPH2603|OLED|5000|USB-C|plastic|N|in-display|H
Oppo F23|2023|CPH2527|LCD|5000|USB-C|plastic|N|side|H
Oppo F21 Pro|2022|CPH2363|OLED|4500|USB-C|leather|N|in-display|H
Oppo F21s Pro|2022|CPH2461|OLED|4500|USB-C|leather|N|in-display|H
Oppo F19 Pro+|2021|CPH2213|OLED|4310|USB-C|plastic|N|in-display|H
Oppo F19 Pro|2021|CPH2285|OLED|4310|USB-C|plastic|N|in-display|H
Oppo F19|2021|CPH2219|OLED|5000|USB-C|plastic|N|in-display|H
Oppo F19s|2021|CPH2223|OLED|5000|USB-C|plastic|N|in-display|H
Oppo F17 Pro|2020|CPH2119|OLED|4015|USB-C|plastic|N|in-display|H
Oppo F17|2020|CPH2095|OLED|4015|USB-C|plastic|N|in-display|H
Oppo F15|2020|CPH2001|OLED|4025|USB-C|plastic|N|in-display|H
Oppo F11 Pro|2019|CPH1969|LCD|4000|Micro-USB|plastic|N|rear|H
Oppo F11|2019|CPH1911|LCD|4020|Micro-USB|plastic|N|rear|H
Oppo F9 Pro|2018|CPH1823|LCD|3500|Micro-USB|plastic|N|rear|H
Oppo F9|2018|CPH1881|LCD|3500|Micro-USB|plastic|N|rear|H
Oppo F7|2018|CPH1819|LCD|3400|Micro-USB|plastic|N|rear|M
Oppo K13|2025|CPH2735|OLED|7000|USB-C|plastic|N|in-display|M
Oppo K12x|2024|CPH2651|LCD|5100|USB-C|plastic|N|side|M
Oppo K10 5G|2022|CPH2373|LCD|5000|USB-C|plastic|N|side|M
Oppo K10|2022|CPH2341|LCD|5000|USB-C|plastic|N|side|H
Oppo A5 Pro 5G|2025|CPH2695|LCD|5800|USB-C|plastic|N|side|M
Oppo A3 Pro 5G|2024|CPH2639|LCD|5100|USB-C|plastic|N|side|H
Oppo A3x|2024|CPH2641|LCD|5100|USB-C|plastic|N|side|H
Oppo A3|2024|CPH2669|LCD|5100|USB-C|plastic|N|side|H
Oppo A79 5G|2023|CPH2557|LCD|5000|USB-C|plastic|N|side|H
Oppo A78 5G|2023|CPH2495|LCD|5000|USB-C|plastic|N|side|H
Oppo A78|2023|CPH2565|OLED|5000|USB-C|plastic|N|in-display|H
Oppo A77|2022|CPH2385|LCD|5000|USB-C|plastic|N|side|H
Oppo A77s|2022|CPH2473|LCD|5000|USB-C|leather|N|side|H
Oppo A76|2022|CPH2375|LCD|5000|USB-C|plastic|N|side|H
Oppo A74 5G|2021|CPH2263|LCD|5000|USB-C|plastic|N|side|H
Oppo A74|2021|CPH2219|OLED|5000|USB-C|plastic|N|in-display|H
Oppo A59 5G|2023|CPH2609|LCD|5000|USB-C|plastic|N|side|H
Oppo A58|2023|CPH2577|LCD|5000|USB-C|plastic|N|side|H
Oppo A57|2022|CPH2387|LCD|5000|USB-C|plastic|N|side|H
Oppo A55|2021|CPH2325|LCD|5000|USB-C|plastic|N|side|H
Oppo A54|2021|CPH2239|LCD|5000|USB-C|plastic|N|side|H
Oppo A53|2020|CPH2127|LCD|5000|USB-C|plastic|N|rear|H
Oppo A53s 5G|2021|CPH2321|LCD|5000|USB-C|plastic|N|side|H
Oppo A52|2020|CPH2061|LCD|5000|USB-C|plastic|N|side|H
Oppo A38|2023|CPH2579|LCD|5000|USB-C|plastic|N|side|H
Oppo A31|2020|CPH2015|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A18|2023|CPH2591|LCD|5000|USB-C|plastic|N|side|H
Oppo A17|2022|CPH2477|LCD|5000|USB-C|leather|N|side|H
Oppo A17k|2022|CPH2471|LCD|5000|Micro-USB|plastic|N|none|H
Oppo A16|2021|CPH2269|LCD|5000|Micro-USB|plastic|N|rear|H
Oppo A16k|2022|CPH2349|LCD|4230|Micro-USB|plastic|N|none|H
Oppo A15|2020|CPH2185|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A15s|2020|CPH2179|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A12|2020|CPH2083|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A11k|2020|CPH2083|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A9 2020|2019|CPH1937|LCD|5000|Micro-USB|plastic|N|rear|H
Oppo A5 2020|2019|CPH1931|LCD|5000|Micro-USB|plastic|N|rear|H
Oppo A5s|2019|CPH1909|LCD|4230|Micro-USB|plastic|N|rear|H
Oppo A3s|2018|CPH1803|LCD|4230|Micro-USB|plastic|N|none|H
Oppo A1k|2019|CPH1923|LCD|4000|Micro-USB|plastic|N|none|H
"""

MODELS["realme"] = """
Realme GT 7 Pro|2024|RMX5011|OLED|5800|USB-C|glass|N|in-display|L
Realme GT 6|2024|RMX3851|OLED|5500|USB-C|glass|N|in-display|M
Realme GT 6T|2024|RMX3853|OLED|5500|USB-C|glass|N|in-display|M
Realme GT 2 Pro|2022|RMX3301|OLED|5000|USB-C|plastic|N|in-display|M
Realme GT 2|2022|RMX3311|OLED|5000|USB-C|plastic|N|in-display|M
Realme GT Neo 3|2022|RMX3561|OLED|5000|USB-C|glass|N|in-display|M
Realme GT Neo 2|2021|RMX3370|OLED|5000|USB-C|glass|N|in-display|M
Realme GT Master Edition|2021|RMX3360|OLED|4300|USB-C|leather|N|in-display|M
Realme GT 5G|2021|RMX2202|OLED|4500|USB-C|glass|N|in-display|M
Realme X7 Max|2021|RMX3031|OLED|4500|USB-C|plastic|N|in-display|M
Realme X7 Pro|2021|RMX2121|OLED|4500|USB-C|plastic|N|in-display|M
Realme X7|2021|RMX3092|OLED|4310|USB-C|plastic|N|in-display|M
Realme X3 SuperZoom|2020|RMX2086|LCD|4200|USB-C|glass|N|side|M
Realme X3|2020|RMX2085|LCD|4200|USB-C|glass|N|side|M
Realme X2 Pro|2019|RMX1931|OLED|4000|USB-C|glass|N|in-display|M
Realme X2|2019|RMX1992|OLED|4000|USB-C|glass|N|in-display|H
Realme XT|2019|RMX1921|OLED|4000|USB-C|glass|N|in-display|H
Realme X|2019|RMX1901|OLED|3765|USB-C|glass|N|in-display|H
Realme 14 Pro+ 5G|2025|RMX5061|OLED|6000|USB-C|glass|N|in-display|M
Realme 14 Pro 5G|2025|RMX5062|OLED|6000|USB-C|plastic|N|in-display|M
Realme 14x 5G|2024|RMX3999|LCD|6000|USB-C|plastic|N|side|H
Realme 13 Pro+ 5G|2024|RMX3921|OLED|5200|USB-C|leather|N|in-display|M
Realme 13 Pro 5G|2024|RMX3920|OLED|5200|USB-C|leather|N|in-display|H
Realme 13+ 5G|2024|RMX3952|OLED|5000|USB-C|plastic|N|in-display|H
Realme 13 5G|2024|RMX3950|LCD|5000|USB-C|plastic|N|side|H
Realme 12 Pro+ 5G|2024|RMX3840|OLED|5000|USB-C|leather|N|in-display|M
Realme 12 Pro 5G|2024|RMX3842|OLED|5000|USB-C|leather|N|in-display|H
Realme 12+ 5G|2024|RMX3867|OLED|5000|USB-C|plastic|N|in-display|H
Realme 12 5G|2024|RMX3999|LCD|5000|USB-C|plastic|N|side|H
Realme 12x 5G|2024|RMX3998|LCD|5000|USB-C|plastic|N|side|H
Realme 11 Pro+ 5G|2023|RMX3741|OLED|5000|USB-C|leather|N|in-display|M
Realme 11 Pro 5G|2023|RMX3771|OLED|5000|USB-C|leather|N|in-display|H
Realme 11x 5G|2023|RMX3785|LCD|5000|USB-C|plastic|N|side|H
Realme 11 5G|2023|RMX3780|LCD|5000|USB-C|plastic|N|side|H
Realme 10 Pro+ 5G|2022|RMX3686|OLED|5000|USB-C|plastic|N|in-display|H
Realme 10 Pro 5G|2022|RMX3661|LCD|5000|USB-C|plastic|N|side|H
Realme 10|2022|RMX3630|OLED|5000|USB-C|plastic|N|side|H
Realme 9 Pro+ 5G|2022|RMX3393|OLED|4500|USB-C|plastic|N|in-display|H
Realme 9 Pro 5G|2022|RMX3471|LCD|5000|USB-C|plastic|N|side|H
Realme 9 5G|2022|RMX3474|LCD|5000|USB-C|plastic|N|side|H
Realme 9|2022|RMX3521|OLED|5000|USB-C|plastic|N|in-display|H
Realme 9i|2022|RMX3491|LCD|5000|USB-C|plastic|N|side|H
Realme 9i 5G|2022|RMX3612|LCD|5000|USB-C|plastic|N|side|H
Realme 8 Pro|2021|RMX3081|OLED|4500|USB-C|plastic|N|in-display|H
Realme 8|2021|RMX3085|OLED|5000|USB-C|plastic|N|in-display|H
Realme 8 5G|2021|RMX3241|LCD|5000|USB-C|plastic|N|side|H
Realme 8s 5G|2021|RMX3381|LCD|5000|USB-C|plastic|N|side|H
Realme 8i|2021|RMX3151|LCD|5000|USB-C|plastic|N|side|H
Realme 7 Pro|2020|RMX2170|OLED|4500|USB-C|plastic|N|in-display|H
Realme 7|2020|RMX2151|LCD|5000|USB-C|plastic|N|side|H
Realme 7i|2020|RMX2193|LCD|5000|USB-C|plastic|N|side|H
Realme 6 Pro|2020|RMX2061|LCD|4300|USB-C|glass|N|side|H
Realme 6|2020|RMX2001|LCD|4300|USB-C|plastic|N|side|H
Realme 6i|2020|RMX2002|LCD|5000|USB-C|plastic|N|rear|H
Realme 5 Pro|2019|RMX1971|LCD|4035|USB-C|plastic|N|rear|H
Realme 5|2019|RMX1911|LCD|5000|Micro-USB|plastic|N|rear|H
Realme 5i|2020|RMX2030|LCD|5000|Micro-USB|plastic|N|rear|H
Realme 5s|2019|RMX1911|LCD|5000|Micro-USB|plastic|N|rear|H
Realme 3 Pro|2019|RMX1851|LCD|4045|Micro-USB|plastic|N|rear|H
Realme 3|2019|RMX1821|LCD|4230|Micro-USB|plastic|N|rear|H
Realme 3i|2019|RMX1827|LCD|4230|Micro-USB|plastic|N|rear|H
Realme 2 Pro|2018|RMX1801|LCD|3500|Micro-USB|plastic|N|rear|H
Realme 2|2018|RMX1805|LCD|4230|Micro-USB|plastic|N|rear|H
Realme 1|2018|CPH1859|LCD|3410|Micro-USB|plastic|N|none|M
Realme U1|2018|RMX1831|LCD|3500|Micro-USB|plastic|N|rear|M
Realme Narzo 80 Pro 5G|2025|RMX5065|OLED|6000|USB-C|plastic|N|in-display|M
Realme Narzo 80x 5G|2025|RMX5067|LCD|6000|USB-C|plastic|N|side|H
Realme Narzo 70 Pro 5G|2024|RMX3868|OLED|5000|USB-C|plastic|N|in-display|H
Realme Narzo 70 5G|2024|RMX3867|OLED|5000|USB-C|plastic|N|in-display|H
Realme Narzo 70x 5G|2024|RMX3998|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 60 Pro 5G|2023|RMX3771|OLED|5000|USB-C|leather|N|in-display|H
Realme Narzo 60 5G|2023|RMX3750|OLED|5000|USB-C|leather|N|in-display|H
Realme Narzo 60x 5G|2023|RMX3782|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 50 Pro 5G|2022|RMX3395|OLED|5000|USB-C|plastic|N|in-display|H
Realme Narzo 50 5G|2022|RMX3571|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 50|2022|RMX3286|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 50A|2021|RMX3430|LCD|6000|Micro-USB|plastic|N|rear|H
Realme Narzo 50A Prime|2022|RMX3516|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 50i|2021|RMX3235|LCD|5000|Micro-USB|plastic|N|none|H
Realme Narzo 30 Pro 5G|2021|RMX2117|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 30|2021|RMX2156|LCD|5000|USB-C|plastic|N|side|H
Realme Narzo 30A|2021|RMX3171|LCD|6000|Micro-USB|plastic|N|rear|H
Realme Narzo 20 Pro|2020|RMX2161|LCD|4500|USB-C|plastic|N|side|H
Realme Narzo 20|2020|RMX2193|LCD|6000|USB-C|plastic|N|rear|H
Realme Narzo 20A|2020|RMX2050|LCD|5000|Micro-USB|plastic|N|rear|H
Realme Narzo 10|2020|RMX2040|LCD|5000|USB-C|plastic|N|rear|H
Realme Narzo 10A|2020|RMX2020|LCD|5000|Micro-USB|plastic|N|rear|H
Realme P3 Pro 5G|2025|RMX5030|OLED|6000|USB-C|plastic|N|in-display|M
Realme P3 5G|2025|RMX5071|LCD|6000|USB-C|plastic|N|side|H
Realme P2 Pro 5G|2024|RMX3990|OLED|5200|USB-C|plastic|N|in-display|H
Realme P1 Pro 5G|2024|RMX3917|OLED|5000|USB-C|plastic|N|in-display|H
Realme P1 5G|2024|RMX3869|OLED|5000|USB-C|plastic|N|in-display|H
Realme C75 5G|2025|RMX5058|LCD|6000|USB-C|plastic|N|side|H
Realme C71|2025|RMX5080|LCD|6300|USB-C|plastic|N|side|H
Realme C65 5G|2024|RMX3997|LCD|5000|USB-C|plastic|N|side|H
Realme C63|2024|RMX3939|LCD|5000|USB-C|plastic|N|side|H
Realme C61|2024|RMX3930|LCD|5000|USB-C|plastic|N|side|H
Realme C55|2023|RMX3710|LCD|5000|USB-C|plastic|N|side|H
Realme C53|2023|RMX3760|LCD|5000|USB-C|plastic|N|side|H
Realme C51|2023|RMX3830|LCD|5000|USB-C|plastic|N|side|H
Realme C35|2022|RMX3511|LCD|5000|USB-C|plastic|N|side|H
Realme C33|2022|RMX3624|LCD|5000|Micro-USB|plastic|N|side|H
Realme C31|2022|RMX3501|LCD|5000|Micro-USB|plastic|N|side|H
Realme C30|2022|RMX3581|LCD|5000|Micro-USB|plastic|N|none|H
Realme C25|2021|RMX3191|LCD|6000|Micro-USB|plastic|N|rear|H
Realme C25s|2021|RMX3195|LCD|6000|Micro-USB|plastic|N|rear|H
Realme C21|2021|RMX3201|LCD|5000|Micro-USB|plastic|N|rear|H
Realme C21Y|2021|RMX3261|LCD|5000|Micro-USB|plastic|N|rear|H
Realme C20|2021|RMX3063|LCD|5000|Micro-USB|plastic|N|none|H
Realme C15|2020|RMX2180|LCD|6000|Micro-USB|plastic|N|rear|H
Realme C12|2020|RMX2189|LCD|6000|Micro-USB|plastic|N|rear|H
Realme C11|2020|RMX2185|LCD|5000|Micro-USB|plastic|N|none|H
Realme C11 2021|2021|RMX3231|LCD|5000|Micro-USB|plastic|N|none|H
Realme C3|2020|RMX2027|LCD|5000|Micro-USB|plastic|N|none|H
Realme C2|2019|RMX1941|LCD|4000|Micro-USB|plastic|N|none|H
Realme C1|2018|RMX1811|LCD|4230|Micro-USB|plastic|N|none|H
"""

MODELS["oneplus"] = """
OnePlus 13|2025|CPH2649|OLED|6000|USB-C|glass|Y|in-display|M
OnePlus 13R|2025|CPH2645|OLED|6000|USB-C|glass|N|in-display|M
OnePlus 13s|2025|CPH2723|OLED|5850|USB-C|glass|N|in-display|M
OnePlus 12|2024|CPH2573|OLED|5400|USB-C|glass|Y|in-display|H
OnePlus 12R|2024|CPH2585|OLED|5500|USB-C|glass|N|in-display|H
OnePlus 11 5G|2023|CPH2447|OLED|5000|USB-C|glass|Y|in-display|H
OnePlus 11R 5G|2023|CPH2487|OLED|5000|USB-C|glass|N|in-display|H
OnePlus 10 Pro|2022|NE2211|OLED|5000|USB-C|glass|Y|in-display|M
OnePlus 10T|2022|CPH2413|OLED|4800|USB-C|glass|N|in-display|M
OnePlus 10R|2022|CPH2411|OLED|5000|USB-C|plastic|N|in-display|H
OnePlus 9 Pro|2021|LE2121|OLED|4500|USB-C|glass|Y|in-display|M
OnePlus 9|2021|LE2111|OLED|4500|USB-C|glass|Y|in-display|H
OnePlus 9R|2021|LE2101|OLED|4500|USB-C|glass|N|in-display|H
OnePlus 9RT|2022|MT2111|OLED|4500|USB-C|glass|N|in-display|M
OnePlus 8 Pro|2020|IN2021|OLED|4510|USB-C|glass|Y|in-display|M
OnePlus 8|2020|IN2011|OLED|4300|USB-C|glass|N|in-display|H
OnePlus 8T|2020|KB2001|OLED|4500|USB-C|glass|N|in-display|H
OnePlus 7T Pro|2019|HD1911|OLED|4085|USB-C|glass|N|in-display|M
OnePlus 7T|2019|HD1901|OLED|3800|USB-C|glass|N|in-display|H
OnePlus 7 Pro|2019|GM1911|OLED|4000|USB-C|glass|N|in-display|H
OnePlus 7|2019|GM1901|OLED|3700|USB-C|glass|N|in-display|H
OnePlus 6T|2018|A6013|OLED|3700|USB-C|glass|N|in-display|H
OnePlus 6|2018|A6003|OLED|3300|USB-C|glass|N|rear|H
OnePlus 5T|2017|A5010|OLED|3300|USB-C|metal|N|rear|M
OnePlus Nord 5|2025|CPH2707|OLED|6800|USB-C|glass|N|in-display|M
OnePlus Nord CE 5|2025|CPH2717|OLED|7100|USB-C|plastic|N|in-display|M
OnePlus Nord 4|2024|CPH2663|OLED|5500|USB-C|metal|N|in-display|H
OnePlus Nord CE 4|2024|CPH2613|OLED|5500|USB-C|plastic|N|in-display|H
OnePlus Nord CE 4 Lite|2024|CPH2621|OLED|5110|USB-C|plastic|N|in-display|H
OnePlus Nord 3|2023|CPH2491|OLED|5000|USB-C|glass|N|in-display|H
OnePlus Nord CE 3|2023|CPH2569|OLED|5000|USB-C|glass|N|in-display|H
OnePlus Nord CE 3 Lite|2023|CPH2467|LCD|5000|USB-C|plastic|N|side|H
OnePlus Nord 2T|2022|CPH2401|OLED|4500|USB-C|glass|N|in-display|H
OnePlus Nord CE 2|2022|IV2201|OLED|4500|USB-C|glass|N|in-display|H
OnePlus Nord CE 2 Lite|2022|CPH2381|LCD|5000|USB-C|plastic|N|side|H
OnePlus Nord 2|2021|DN2101|OLED|4500|USB-C|glass|N|in-display|H
OnePlus Nord CE|2021|EB2101|OLED|4500|USB-C|plastic|N|in-display|H
OnePlus Nord|2020|AC2001|OLED|4115|USB-C|glass|N|in-display|H
OnePlus Nord N20 SE|2022|CPH2469|LCD|5000|USB-C|plastic|N|side|M
"""

MODELS["apple"] = """
iPhone 16 Pro Max|2024|A3084|OLED|4685|USB-C|glass|Y|face|M
iPhone 16 Pro|2024|A3083|OLED|3582|USB-C|glass|Y|face|M
iPhone 16 Plus|2024|A3082|OLED|4674|USB-C|glass|Y|face|M
iPhone 16|2024|A3081|OLED|3561|USB-C|glass|Y|face|H
iPhone 16e|2025|A3212|OLED|4005|USB-C|glass|Y|face|M
iPhone 15 Pro Max|2023|A3106|OLED|4441|USB-C|glass|Y|face|H
iPhone 15 Pro|2023|A3102|OLED|3274|USB-C|glass|Y|face|H
iPhone 15 Plus|2023|A3094|OLED|4383|USB-C|glass|Y|face|M
iPhone 15|2023|A3090|OLED|3349|USB-C|glass|Y|face|H
iPhone 14 Pro Max|2022|A2894|OLED|4323|Lightning|glass|Y|face|H
iPhone 14 Pro|2022|A2892|OLED|3200|Lightning|glass|Y|face|H
iPhone 14 Plus|2022|A2886|OLED|4325|Lightning|glass|Y|face|M
iPhone 14|2022|A2884|OLED|3279|Lightning|glass|Y|face|H
iPhone 13 Pro Max|2021|A2645|OLED|4352|Lightning|glass|Y|face|H
iPhone 13 Pro|2021|A2640|OLED|3095|Lightning|glass|Y|face|H
iPhone 13|2021|A2633|OLED|3240|Lightning|glass|Y|face|H
iPhone 13 mini|2021|A2630|OLED|2438|Lightning|glass|Y|face|M
iPhone 12 Pro Max|2020|A2411|OLED|3687|Lightning|glass|Y|face|H
iPhone 12 Pro|2020|A2407|OLED|2815|Lightning|glass|Y|face|H
iPhone 12|2020|A2403|OLED|2815|Lightning|glass|Y|face|H
iPhone 12 mini|2020|A2399|OLED|2227|Lightning|glass|Y|face|M
iPhone 11 Pro Max|2019|A2218|OLED|3969|Lightning|glass|Y|face|H
iPhone 11 Pro|2019|A2215|OLED|3046|Lightning|glass|Y|face|H
iPhone 11|2019|A2221|LCD|3110|Lightning|glass|Y|face|H
iPhone XS Max|2018|A2101|OLED|3174|Lightning|glass|Y|face|H
iPhone XS|2018|A2097|OLED|2658|Lightning|glass|Y|face|H
iPhone XR|2018|A2105|LCD|2942|Lightning|glass|Y|face|H
iPhone X|2017|A1901|OLED|2716|Lightning|glass|Y|face|H
iPhone SE (2022)|2022|A2783|LCD|2018|Lightning|glass|Y|front|M
iPhone SE (2020)|2020|A2296|LCD|1821|Lightning|glass|Y|front|H
iPhone 8 Plus|2017|A1897|LCD|2691|Lightning|glass|Y|front|H
iPhone 8|2017|A1905|LCD|1821|Lightning|glass|Y|front|H
iPhone 7 Plus|2016|A1784|LCD|2900|Lightning|metal|N|front|H
iPhone 7|2016|A1778|LCD|1960|Lightning|metal|N|front|H
iPhone 6s Plus|2015|A1687|LCD|2750|Lightning|metal|N|front|M
iPhone 6s|2015|A1688|LCD|1715|Lightning|metal|N|front|M
"""

MODELS["motorola"] = """
Motorola Edge 60 Pro|2025|XT2507-1|OLED|6000|USB-C|leather|Y|in-display|M
Motorola Edge 60 Fusion|2025|XT2503-1|OLED|5500|USB-C|leather|N|in-display|M
Motorola Edge 50 Pro|2024|XT2403-2|OLED|4500|USB-C|leather|Y|in-display|H
Motorola Edge 50 Fusion|2024|XT2429-2|OLED|5000|USB-C|leather|N|in-display|H
Motorola Edge 50 Neo|2024|XT2407-1|OLED|4310|USB-C|leather|Y|in-display|M
Motorola Edge 50|2024|XT2405-2|OLED|5000|USB-C|leather|N|in-display|M
Motorola Edge 40 Neo|2023|XT2307-1|OLED|5000|USB-C|leather|N|in-display|H
Motorola Edge 40|2023|XT2303-2|OLED|4400|USB-C|leather|Y|in-display|H
Motorola Edge 30 Ultra|2022|XT2241-1|OLED|4610|USB-C|glass|Y|in-display|M
Motorola Edge 30 Fusion|2022|XT2243-1|OLED|4400|USB-C|glass|N|in-display|M
Motorola Edge 30|2022|XT2203-1|OLED|4020|USB-C|plastic|N|in-display|M
Motorola Edge 20 Pro|2021|XT2153-1|OLED|4500|USB-C|glass|N|side|M
Motorola Edge 20|2021|XT2143-1|OLED|4000|USB-C|plastic|N|side|M
Motorola Edge 20 Fusion|2021|XT2139-2|OLED|5000|USB-C|plastic|N|side|M
Moto G96 5G|2025|XT2531-1|OLED|5500|USB-C|leather|N|in-display|M
Moto G86 Power 5G|2025|XT2527-1|OLED|6720|USB-C|leather|N|in-display|M
Moto G85 5G|2024|XT2427-1|OLED|5000|USB-C|leather|N|in-display|H
Moto G84 5G|2023|XT2347-2|OLED|5000|USB-C|leather|N|in-display|H
Moto G73 5G|2023|XT2237-2|LCD|5000|USB-C|plastic|N|side|M
Moto G64 5G|2024|XT2403-1|LCD|6000|USB-C|plastic|N|side|H
Moto G62 5G|2022|XT2223-2|LCD|5000|USB-C|plastic|N|side|M
Moto G54 5G|2023|XT2343-1|LCD|6000|USB-C|leather|N|side|H
Moto G52|2022|XT2221-1|OLED|5000|USB-C|plastic|N|side|H
Moto G45 5G|2024|XT2421-1|LCD|5000|USB-C|leather|N|side|H
Moto G42|2022|XT2233-2|OLED|5000|USB-C|plastic|N|side|M
Moto G35 5G|2024|XT2431-1|LCD|5000|USB-C|leather|N|side|H
Moto G34 5G|2024|XT2363-2|LCD|5000|USB-C|leather|N|side|H
Moto G32|2022|XT2235-2|LCD|5000|USB-C|plastic|N|side|M
Moto G31|2021|XT2173-3|OLED|5000|USB-C|plastic|N|rear|M
Moto G24 Power|2024|XT2425-2|LCD|6000|USB-C|plastic|N|side|H
Moto G14|2023|XT2341-2|LCD|5000|USB-C|leather|N|side|H
Moto G13|2023|XT2331-2|LCD|5000|USB-C|plastic|N|side|M
Moto G05|2025|XT2523-1|LCD|5200|USB-C|leather|N|side|M
Moto G04|2024|XT2421-2|LCD|5000|USB-C|plastic|N|side|H
Moto E14|2024|XT2425-3|LCD|5000|USB-C|plastic|N|none|M
Moto E13|2023|XT2345-3|LCD|5000|USB-C|plastic|N|none|H
Moto G60|2021|XT2135-2|LCD|6000|USB-C|plastic|N|rear|H
Moto G40 Fusion|2021|XT2147-2|LCD|6000|USB-C|plastic|N|rear|H
Moto G9 Power|2020|XT2091-3|LCD|6000|USB-C|plastic|N|rear|H
Moto G9|2020|XT2083-3|LCD|5000|USB-C|plastic|N|rear|H
Moto G8 Power Lite|2020|XT2055-2|LCD|5000|Micro-USB|plastic|N|rear|M
Moto G Stylus 5G|2021|XT2131-1|LCD|5000|USB-C|plastic|N|side|L
Moto One Fusion+|2020|XT2067-3|LCD|5000|USB-C|plastic|N|rear|M
Motorola Razr 50 Ultra|2024|XT2451-3|OLED|4000|USB-C|leather|Y|side|L
Motorola Razr 50|2024|XT2453-2|OLED|4200|USB-C|leather|Y|side|L
Motorola Razr 40 Ultra|2023|XT2321-1|OLED|3800|USB-C|glass|Y|side|L
Motorola Razr 40|2023|XT2323-1|OLED|4200|USB-C|leather|Y|side|L
"""

MODELS["nothing"] = """
Nothing Phone (3)|2025|A059|OLED|5150|USB-C|glass|Y|in-display|M
Nothing Phone (3a) Pro|2025|A059P|OLED|5000|USB-C|glass|N|in-display|M
Nothing Phone (3a)|2025|A059|OLED|5000|USB-C|glass|N|in-display|H
Nothing Phone (2a) Plus|2024|A142P|OLED|5000|USB-C|plastic|N|in-display|M
Nothing Phone (2a)|2024|A142|OLED|5000|USB-C|plastic|N|in-display|H
Nothing Phone (2)|2023|A065|OLED|4700|USB-C|glass|Y|in-display|H
Nothing Phone (1)|2022|A063|OLED|4500|USB-C|glass|Y|in-display|H
CMF Phone 2 Pro|2025|A001P|OLED|5000|USB-C|plastic|N|in-display|M
CMF Phone 1|2024|A015|OLED|5000|USB-C|plastic|N|in-display|H
"""

MODELS["google"] = """
Pixel 9 Pro XL|2024|GZC4D|OLED|5060|USB-C|glass|Y|in-display|L
Pixel 9 Pro|2024|GEC77|OLED|4700|USB-C|glass|Y|in-display|L
Pixel 9|2024|GUR25|OLED|4700|USB-C|glass|Y|in-display|M
Pixel 9a|2025|G4QUR|OLED|5100|USB-C|plastic|Y|in-display|M
Pixel 8 Pro|2023|GC3VE|OLED|5050|USB-C|glass|Y|in-display|M
Pixel 8|2023|G9BQD|OLED|4575|USB-C|glass|Y|in-display|M
Pixel 8a|2024|G6GPR|OLED|4492|USB-C|plastic|Y|in-display|M
Pixel 7 Pro|2022|GE2AE|OLED|5000|USB-C|glass|Y|in-display|M
Pixel 7|2022|GQML3|OLED|4355|USB-C|glass|Y|in-display|M
Pixel 7a|2023|GHL1X|OLED|4385|USB-C|plastic|Y|in-display|M
Pixel 6a|2022|GB62Z|OLED|4410|USB-C|plastic|N|in-display|M
Pixel 4a|2020|G025J|OLED|3140|USB-C|plastic|N|rear|M
Pixel 3a|2019|G020F|OLED|3000|USB-C|plastic|N|rear|L
"""

MODELS["infinix"] = """
Infinix Note 50x 5G|2025|X6882|LCD|5500|USB-C|plastic|N|side|M
Infinix Note 40 Pro 5G|2024|X6851|OLED|5000|USB-C|plastic|Y|in-display|M
Infinix Note 40 5G|2024|X6838|OLED|5000|USB-C|plastic|Y|in-display|M
Infinix Note 40X 5G|2024|X6838|LCD|5000|USB-C|plastic|N|side|H
Infinix Note 30 5G|2023|X6711|LCD|5000|USB-C|plastic|N|side|H
Infinix Note 30|2023|X6833B|LCD|5000|USB-C|plastic|N|side|H
Infinix Note 12 Pro|2022|X676B|OLED|5000|USB-C|plastic|N|side|H
Infinix Note 12|2022|X663|OLED|5000|USB-C|plastic|N|side|H
Infinix Note 11|2021|X663|OLED|5000|USB-C|plastic|N|side|H
Infinix Note 10 Pro|2021|X695|LCD|5000|USB-C|plastic|N|side|M
Infinix Zero 40 5G|2024|X6861|OLED|5000|USB-C|leather|N|in-display|M
Infinix Zero 30 5G|2023|X6731|OLED|5000|USB-C|leather|N|in-display|M
Infinix Zero 5G 2023|2023|X6815C|LCD|5000|USB-C|plastic|N|side|M
Infinix GT 30 Pro|2025|X6879|OLED|5500|USB-C|plastic|N|in-display|M
Infinix GT 20 Pro|2024|X6871|OLED|5000|USB-C|plastic|N|in-display|M
Infinix GT 10 Pro|2023|X6739|OLED|5000|USB-C|plastic|N|in-display|M
Infinix Hot 60 5G+|2025|X6885|LCD|5160|USB-C|plastic|N|side|M
Infinix Hot 50 5G|2024|X6720|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 40 Pro|2023|X6837|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 40i|2023|X6528|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 30 5G|2023|X6832|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 30i|2023|X669D|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 20 5G|2022|X666B|LCD|5000|USB-C|plastic|N|side|H
Infinix Hot 12 Play|2022|X6816D|LCD|6000|Micro-USB|plastic|N|rear|H
Infinix Hot 11|2021|X662|LCD|5200|Micro-USB|plastic|N|rear|H
Infinix Hot 10|2020|X682B|LCD|5200|Micro-USB|plastic|N|rear|H
Infinix Hot 9|2020|X655C|LCD|5000|Micro-USB|plastic|N|rear|H
Infinix Smart 9 HD|2025|X6525|LCD|5000|USB-C|plastic|N|side|H
Infinix Smart 8|2023|X6525|LCD|5000|USB-C|plastic|N|side|H
Infinix Smart 7|2023|X6515|LCD|6000|Micro-USB|plastic|N|rear|H
Infinix Smart 6|2022|X6511B|LCD|5000|Micro-USB|plastic|N|rear|H
Infinix Smart 5|2020|X657|LCD|6000|Micro-USB|plastic|N|rear|H
"""

MODELS["tecno"] = """
Tecno Pova 7 Pro 5G|2025|LI8|OLED|6000|USB-C|plastic|N|in-display|M
Tecno Pova 6 Pro 5G|2024|LI9|OLED|6000|USB-C|plastic|N|in-display|M
Tecno Pova 6 Neo 5G|2024|LI6|LCD|7000|USB-C|plastic|N|side|H
Tecno Pova 5 Pro 5G|2023|LH8n|LCD|5000|USB-C|plastic|N|side|H
Tecno Pova 5|2023|LH7n|LCD|6000|USB-C|plastic|N|side|H
Tecno Pova 4 Pro|2022|LG8n|OLED|6000|USB-C|plastic|N|side|M
Tecno Pova 4|2022|LG7n|LCD|6000|USB-C|plastic|N|side|H
Tecno Pova 3|2022|LF7n|LCD|7000|USB-C|plastic|N|side|H
Tecno Pova 2|2021|LE7n|LCD|7000|USB-C|plastic|N|side|H
Tecno Camon 30 5G|2024|CL6|OLED|5000|USB-C|plastic|N|in-display|M
Tecno Camon 20 Pro 5G|2023|CK8n|OLED|5000|USB-C|plastic|N|in-display|M
Tecno Camon 20|2023|CK6n|OLED|5000|USB-C|leather|N|in-display|H
Tecno Camon 19 Pro|2022|CI8n|LCD|5000|USB-C|plastic|N|side|M
Tecno Camon 18|2021|CH6n|LCD|5000|USB-C|plastic|N|side|H
Tecno Phantom X|2021|AC8|OLED|4700|USB-C|glass|N|in-display|L
Tecno Spark 30C 5G|2024|KL5|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark 20 Pro+|2024|KJ7|OLED|5000|USB-C|leather|N|in-display|H
Tecno Spark 20 Pro|2024|KJ6|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark 20|2024|KJ5|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark Go 2024|2024|BG6|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark 10 5G|2023|KI8|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark 10 Pro|2023|KI7|LCD|5000|USB-C|plastic|N|side|H
Tecno Spark 9|2022|KG5p|LCD|5000|Micro-USB|plastic|N|rear|H
Tecno Spark 8|2021|KG6|LCD|5000|Micro-USB|plastic|N|rear|H
Tecno Spark 7|2021|KF6|LCD|6000|Micro-USB|plastic|N|rear|H
Tecno Spark 6 Go|2020|KE5|LCD|5000|Micro-USB|plastic|N|rear|H
"""

MODELS["itel"] = """
Itel A80|2024|A671L|LCD|5000|USB-C|plastic|N|side|H
Itel A70|2024|A665L|LCD|5000|USB-C|plastic|N|side|H
Itel P55 5G|2023|P661N|LCD|5000|USB-C|plastic|N|side|H
Itel S24|2024|S665L|LCD|5000|USB-C|plastic|N|side|M
Itel A60s|2023|A662L|LCD|5000|Micro-USB|plastic|N|rear|H
Itel A49|2022|A661L|LCD|4000|Micro-USB|plastic|N|rear|H
Itel Vision 3|2022|P682L|LCD|5000|USB-C|plastic|N|rear|H
Itel A27|2022|A551L|LCD|4000|Micro-USB|plastic|N|none|H
Itel A25|2021|L5002|LCD|3020|Micro-USB|plastic|N|none|M
"""

MODELS["honor"] = """
Honor 200 Pro|2024|ELP-NX9|OLED|5200|USB-C|glass|Y|in-display|L
Honor 200|2024|ELI-NX9|OLED|5200|USB-C|glass|N|in-display|M
Honor 90|2023|REA-NX9|OLED|5000|USB-C|glass|N|in-display|M
Honor X9c 5G|2025|ALI-NX1|OLED|6600|USB-C|plastic|N|in-display|M
Honor X9b 5G|2024|ALI-NX1|OLED|5800|USB-C|plastic|N|in-display|M
Honor X7b|2024|CLK-LX1|LCD|6000|USB-C|plastic|N|side|M
Honor Play 9T|2024||LCD|6000|USB-C|plastic|N|side|L
Honor 9X|2019|STK-LX1|LCD|4000|USB-C|glass|N|rear|M
Honor 8X|2018|JSN-L22|LCD|3750|Micro-USB|glass|N|rear|M
Honor 10 Lite|2019|HRY-LX1|LCD|3400|Micro-USB|plastic|N|rear|M
Honor 9N|2018|LLD-AL20|LCD|3000|Micro-USB|glass|N|rear|L
"""

MODELS["nokia"] = """
Nokia G42 5G|2023|TA-1581|LCD|5000|USB-C|plastic|N|side|M
Nokia G21|2022|TA-1418|LCD|5050|USB-C|plastic|N|side|M
Nokia G20|2021|TA-1343|LCD|5050|USB-C|plastic|N|side|M
Nokia G10|2021|TA-1334|LCD|5000|USB-C|plastic|N|side|M
Nokia C32|2023|TA-1534|LCD|5000|USB-C|plastic|N|rear|M
Nokia C22|2023|TA-1545|LCD|5000|USB-C|plastic|N|rear|M
Nokia C21 Plus|2022|TA-1431|LCD|5050|Micro-USB|plastic|N|rear|M
Nokia C12|2023|TA-1535|LCD|3000|Micro-USB|plastic|N|none|M
Nokia C01 Plus|2021|TA-1383|LCD|3000|Micro-USB|plastic|N|none|L
Nokia X30 5G|2022|TA-1450|OLED|4200|USB-C|glass|N|in-display|L
Nokia XR21|2023|TA-1486|LCD|4800|USB-C|plastic|N|side|L
Nokia 5.4|2020|TA-1337|LCD|4000|USB-C|plastic|N|rear|M
Nokia 5.3|2020|TA-1234|LCD|4000|USB-C|plastic|N|rear|M
Nokia 3.4|2020|TA-1283|LCD|4000|USB-C|plastic|N|rear|M
Nokia 2.4|2020|TA-1270|LCD|4500|Micro-USB|plastic|N|rear|M
Nokia 8.1|2018|TA-1119|LCD|3500|USB-C|glass|N|rear|M
Nokia 7.2|2019|TA-1196|LCD|3500|USB-C|glass|N|rear|M
Nokia 6.1 Plus|2018|TA-1083|LCD|3060|USB-C|glass|N|rear|H
Nokia 6.1|2018|TA-1089|LCD|3000|USB-C|metal|N|rear|M
Nokia 5.1 Plus|2018|TA-1102|LCD|3060|USB-C|glass|N|rear|M
Nokia 3.1|2018|TA-1049|LCD|2990|Micro-USB|metal|N|none|L
Nokia 2.2|2019|TA-1183|LCD|3000|Micro-USB|plastic|N|none|L
Nokia 105 (2023)|2023|TA-1557|LCD|1000|Micro-USB|plastic|N|none|H
Nokia 106 (2023)|2023|TA-1564|LCD|1000|Micro-USB|plastic|N|none|H
Nokia 110 4G|2023|TA-1543|LCD|1450|Micro-USB|plastic|N|none|H
Nokia 3210 (2024)|2024|TA-1618|LCD|1450|USB-C|plastic|N|none|M
"""

MODELS["lava"] = """
Lava Agni 3 5G|2024|LXX545|OLED|5000|USB-C|glass|N|in-display|M
Lava Agni 2 5G|2023|LXX515|OLED|4700|USB-C|glass|N|in-display|M
Lava Blaze X 5G|2024|LXX534|OLED|5000|USB-C|glass|N|in-display|M
Lava Blaze Curve 5G|2024|LXX527|OLED|5000|USB-C|glass|N|in-display|M
Lava Blaze 2 5G|2023|LXX509|LCD|5000|USB-C|plastic|N|side|H
Lava Blaze 5G|2022|LXX505|LCD|5000|USB-C|plastic|N|side|H
Lava Blaze Pro 5G|2023|LXX508|LCD|5000|USB-C|plastic|N|side|M
Lava Blaze|2022|LXX501|LCD|5000|USB-C|glass|N|side|H
Lava Yuva 5G|2024|LXX530|LCD|5000|USB-C|plastic|N|side|H
Lava Yuva 3 Pro|2024|LXX537|LCD|5000|USB-C|plastic|N|side|H
Lava Yuva 2 Pro|2023|LXX518|LCD|5000|USB-C|plastic|N|side|H
Lava O2|2024|LXX529|LCD|5000|USB-C|plastic|N|side|H
Lava Storm 5G|2023|LXX522|LCD|5000|USB-C|plastic|N|side|M
Lava Z3|2021|LZG402|LCD|3100|Micro-USB|plastic|N|rear|M
"""

MODELS["micromax"] = """
Micromax IN Note 2|2022|E7544|OLED|5000|USB-C|plastic|N|side|M
Micromax IN 2b|2021|E7543|LCD|5000|USB-C|plastic|N|rear|M
Micromax IN 2c|2022|E7542|LCD|5000|USB-C|plastic|N|none|M
Micromax IN Note 1|2020|E7746|LCD|5000|USB-C|plastic|N|rear|M
Micromax IN 1b|2020|E7533|LCD|5000|USB-C|plastic|N|rear|M
Micromax IN 1|2021|E7542|LCD|5000|USB-C|plastic|N|rear|M
"""

MODELS["asus"] = """
Asus ROG Phone 8 Pro|2024|AI2401|OLED|5500|USB-C|glass|Y|in-display|L
Asus ROG Phone 7|2023|AI2205|OLED|6000|USB-C|glass|N|in-display|L
Asus ROG Phone 6|2022|AI2201|OLED|6000|USB-C|glass|N|in-display|L
Asus ROG Phone 5|2021|ZS673KS|OLED|6000|USB-C|glass|N|in-display|L
Asus ROG Phone 3|2020|ZS661KS|OLED|6000|USB-C|glass|N|in-display|L
Asus Zenfone 9|2022|AI2202|OLED|4300|USB-C|glass|N|side|L
Asus Zenfone 8|2021|ZS590KS|OLED|4000|USB-C|glass|N|in-display|L
Asus 6Z|2019|ZS630KL|LCD|5000|USB-C|glass|N|rear|M
Asus Zenfone Max Pro M2|2018|ZB631KL|LCD|5000|Micro-USB|glass|N|rear|H
Asus Zenfone Max Pro M1|2018|ZB601KL|LCD|5000|Micro-USB|metal|N|rear|H
Asus Zenfone Max M2|2018|ZB633KL|LCD|4000|Micro-USB|plastic|N|rear|M
Asus Zenfone 5Z|2018|ZS620KL|LCD|3300|USB-C|glass|N|rear|M
"""

MODELS["lenovo"] = """
Lenovo Legion Phone Duel|2020|L79031|OLED|5000|USB-C|glass|N|side|L
Lenovo K10 Note|2019|L38111|LCD|4050|USB-C|glass|N|rear|L
Lenovo Z6 Pro|2019|L78051|OLED|4000|USB-C|glass|N|in-display|L
Lenovo K9|2018|L38043|LCD|3000|Micro-USB|glass|N|rear|L
Lenovo K8 Note|2017|XT1902-3|LCD|4000|Micro-USB|metal|N|rear|M
Lenovo K8 Plus|2017|XT1902-2|LCD|4000|Micro-USB|metal|N|rear|M
"""

MODELS["huawei"] = """
Huawei P30 Pro|2019|VOG-L29|OLED|4200|USB-C|glass|Y|in-display|L
Huawei P30 Lite|2019|MAR-LX2|LCD|3340|USB-C|glass|N|rear|M
Huawei Nova 3i|2018|INE-LX2|LCD|3340|Micro-USB|glass|N|rear|M
Huawei Nova 3|2018|PAR-LX1|LCD|3750|USB-C|glass|N|rear|L
Huawei Y9 Prime 2019|2019|STK-L22|LCD|4000|USB-C|glass|N|rear|M
Huawei Y9 2019|2019|JKM-LX2|LCD|4000|Micro-USB|glass|N|rear|M
Huawei Mate 20 Pro|2018|LYA-L29|OLED|4200|USB-C|glass|Y|in-display|L
"""

MODELS["sony"] = """
Sony Xperia XZ2|2018|H8266|LCD|3180|USB-C|glass|Y|rear|L
Sony Xperia XA2|2018|H4113|LCD|3300|USB-C|metal|N|rear|L
Sony Xperia XZ1|2017|G8342|LCD|2700|USB-C|metal|N|side|L
Sony Xperia 10 II|2020|XQ-AU52|OLED|3600|USB-C|glass|N|side|L
"""

MODELS["lg"] = """
LG Wing|2020|LM-F100N|OLED|4000|USB-C|glass|Y|side|L
LG Velvet|2020|LM-G900EM|OLED|4300|USB-C|glass|Y|in-display|L
LG G8X ThinQ|2019|LM-G850EMW|OLED|4000|USB-C|glass|Y|in-display|L
LG W41|2021|LM-K610IM|LCD|5000|USB-C|plastic|N|rear|L
LG W30|2019|LM-X440IM|LCD|4000|Micro-USB|plastic|N|rear|L
LG G7 ThinQ|2018|LM-G710EM|LCD|3000|USB-C|glass|Y|rear|L
"""

MODELS["jio"] = """
JioPhone Next|2021|LS-5701|LCD|3500|Micro-USB|plastic|N|none|H
JioPhone Prima 4G|2023|F500|LCD|1800|Micro-USB|plastic|N|none|H
JioPhone 2|2018|F300B|LCD|2000|Micro-USB|plastic|N|none|M
JioPhone|2017|F220B|LCD|2000|Micro-USB|plastic|N|none|H
JioBharat V2|2023|F30C|LCD|1000|Micro-USB|plastic|N|none|H
JioBharat B2|2024|B2|LCD|1000|Micro-USB|plastic|N|none|H
"""

# Part types: id, category, name, applies-to rule, notes
PART_TYPES = [
    ("display", "parts", "Display assembly", "all", "Cover glass + touch digitiser + panel. Variant by panel tech (OLED/LCD) and with/without frame"),
    ("adhesive", "parts", "Display adhesive / gasket", "all", "Pre-cut foam or glue; model-specific cut"),
    ("frame", "parts", "Mid-frame / chassis", "all", "Metal or plastic body; often sold with button flex; SIM tray separate"),
    ("simtray", "parts", "SIM tray", "all", "Colour-matched; single/dual/hybrid"),
    ("buttons", "parts", "Power and volume button flex", "all", "Side-key flex and button caps"),
    ("frontcam", "parts", "Front camera", "smartphone", "Selfie camera module"),
    ("earpiece", "parts", "Earpiece speaker", "smartphone", "Top receiver speaker"),
    ("board", "parts", "Logic board / motherboard", "all", "Sold by storage/RAM variant; IMEI-locked on some brands"),
    ("camera", "parts", "Rear camera module", "smartphone", "Main / ultra-wide / macro / telephoto as separate items on many models"),
    ("lens", "parts", "Rear camera lens glass", "smartphone", "Glass cover for the camera island, with adhesive"),
    ("battery", "parts", "Battery", "all", "Capacity in mAh; with pull-tab adhesive"),
    ("port", "parts", "Charging port / sub-board", "all", "USB-C, Micro-USB or Lightning; often includes mic and SIM reader"),
    ("speaker", "parts", "Loudspeaker", "all", "Bottom speaker module"),
    ("haptic", "parts", "Vibration motor", "smartphone", "Coin or linear motor"),
    ("fpsensor", "parts", "Fingerprint sensor", "fp", "Rear, side-key or in-display (optical/ultrasonic) depending on model"),
    ("coil", "parts", "Wireless charging coil + NFC", "wireless", "Only on models with wireless charging; NFC antenna separate on others"),
    ("nfc", "parts", "NFC antenna", "nfc-only", "On NFC models without wireless charging"),
    ("backpanel", "parts", "Back panel / rear glass", "all", "With camera lens cover on some; with adhesive"),
    ("flex", "parts", "Main / inter-connect flex", "smartphone", "Board-to-sub-board flex cable"),
    ("proximity", "parts", "Proximity / light sensor flex", "smartphone", "Model-specific"),
    ("glass", "acc", "Tempered glass / screen protector", "all", "Full-cover, edge-to-edge, privacy, matte"),
    ("cover", "acc", "Case / back cover", "all", "Silicone, hard, flip, wallet, transparent"),
    ("lensprotector", "acc", "Camera lens protector", "smartphone", "Tempered glass ring for the camera island"),
    ("charger", "acc", "Charger adapter", "all", "Wattage matched to the phone's fast-charge standard"),
    ("cable", "acc", "Charging cable", "all", "USB-C to USB-C / USB-A to USB-C / Lightning"),
    ("audio", "acc", "Earphones", "all", "Wired (3.5 mm or USB-C) or TWS"),
    ("holder", "acc", "Holders and stands", "all", "Car vent, dashboard, desk"),
    ("powerbank", "acc", "Power bank", "all", "By capacity and output"),
    ("skin", "acc", "Back skin / wrap", "all", "Vinyl skins"),
]
