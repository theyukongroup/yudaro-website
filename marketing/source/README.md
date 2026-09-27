# Yudaro marketing source — September 26, 2026

Corporate Culture Intelligence is positioned as a governed implementation methodology within Private AI + ERP transformation. These marketing edits do not implement a production knowledge-review application.

## Rebuild on Windows

From the website project root, with Python and the packages in requirements.txt installed:

```
python marketing/source/build_catalog.py
python marketing/source/build_brochure.py
python marketing/source/validate_pdfs.py
```

The scripts use Windows Arial fonts in C:/Windows/Fonts and write to output/pdf. All imagery required by the brochure is included under assets. Culture copy, steps and department examples are in culture-content.json; brochure page copy is directly editable in build_brochure.py. Website content lives in lib/search-content.json and components/corporate-culture.tsx.

## Preserved originals and edit model

catalog-base-46.pdf is the immutable input for the catalog recipe. The original full-layout catalog source was not available. build_catalog.py preserves its photos/vector artwork, replaces selected text with measured vector text, inserts two source-generated pages, and remaps contents/bookmarks/page links. Existing original page artwork is PDF-backed; it is not recreated as an InDesign or fully reflowable document.

brochure-original.py and brochure-base-4.pdf preserve the prior brochure. build_brochure.py is the current editable four-page generator, using the existing layout functions and imagery.

## QR destination and publication

The new brochure QR and its clickable hotspot open:
https://yudaro.com/catalog/yudaro-catalog-2026-corporate-culture.pdf

Publish the final catalog both there and at public/catalog/yudaro-catalog-2026.pdf. Keep the prior versioned September 46-page PDF available as a historical edition. Publish the brochure at public/catalog/yudaro-brochure-2026-corporate-culture.pdf and the current brochure aliases.

## Review and print scope

Catalog: US Letter, 48 pages. Brochure: US Letter, 4 pages. Screen-friendly RGB PDFs retain the existing dimensions; no bleed or press-specific CMYK conversion has been introduced. A print vendor may request its own production profile. The screenshots and image-based demonstrations inherited from the catalog remain at their original resolution.

Every page was rendered for review; substantive edits were inspected at page scale. validate_pdfs.py checks counts, dimensions, page numbers, contents destinations and the decoded brochure QR. PDF typography uses Arial; website typography retains Manrope and Geist Mono.
