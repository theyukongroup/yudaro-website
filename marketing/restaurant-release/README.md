# Yudaro restaurant offer release — 2026-09-29

Current pricing is in `lib/restaurant-offer.json`. Restaurant POS and Restaurant ERP are separate purchases. Private AI + Automation uses separate/custom scope.

Run `python marketing/restaurant-release/build_materials.py` to regenerate the 48-page catalog, four-page brochure, one-page flyer, promotion image and explicit public PDF aliases. Use the bundled Python runtime with ReportLab, PyMuPDF and Pillow. Original approved 48-page and four-page PDFs are retained here as reproducible bases; pages outside the updated scope are preserved.

Run `node marketing/restaurant-release/update-decks.mjs` with the bundled Artifact Tool runtime to rebuild the three presentations. Source decks and stable imported element IDs are preserved in this folder. The script writes a new timestamped validated output; it does not overwrite previous finalizer outputs. Original slide dimensions, Aptos/Aptos Display or Arial fonts and unaffected images are retained.

Older recipes in marketing/archive/2026-09-26 are historical inputs, not current marketing outputs. Existing marketing/source/build_catalog.py and build_brochure.py call the current release builder.

The hardware picture is AI-generated illustrative artwork, not a verified product screenshot. Customer-facing captions identify it as an illustration.
