# Current release entry point. Prior recipes are preserved in marketing/archive.
from pathlib import Path
import runpy
runpy.run_path(str(Path(__file__).resolve().parents[1]/'restaurant-release/build_materials.py'),run_name='__main__')
