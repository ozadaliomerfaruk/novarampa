"""Optimize the Google Fonts subsets without changing character coverage."""
from pathlib import Path
import hashlib
import json
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1] / "src/app/fonts"
manifest = json.loads((root / "sources.json").read_text(encoding="utf8"))
for item in manifest:
    source = root / item["file"]
    font = TTFont(source, recalcTimestamp=False)
    limits = (400, 900) if item["family"] == "Work Sans" else (400, 700)

    options = subset.Options()
    options.hinting = False
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14]
    keep = set(font.getBestCmap())
    worker = subset.Subsetter(options=options)
    worker.populate(unicodes=keep)
    worker.subset(font)
    assert set(font.getBestCmap()) == keep
    required = {ord(char) for char in "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + "".join(chr(p) for p in [199,231,286,287,304,305,214,246,350,351,220,252])}
    assert required <= keep, "Missing Turkish glyphs"
    font = instantiateVariableFont(font, {"wght": limits}, inplace=True)
    font.flavor = "woff2"
    font.save(source)
    data = source.read_bytes()
    item["optimizedBytes"] = len(data)
    item["optimizedSha256"] = hashlib.sha256(data).hexdigest()
    item["weightRange"] = list(limits)
    print(item["family"], item["bytes"], "->", len(data), "bytes; Turkish coverage OK")
(root / "sources.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf8")
