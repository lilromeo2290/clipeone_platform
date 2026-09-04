#!/usr/bin/env python3
"""
Fetch logos from each website's homepage by parsing the HTML for <img> tags
inside the header / nav area, or any image with "logo" in its src/alt/class.

Saves logos to /home/z/my-project/public/clipeone/websites/<slug>.<ext>
"""

import os
import re
import json
import urllib.request
import urllib.parse
import urllib.error
import ssl

OUT_DIR = "/home/z/my-project/public/clipeone/websites"
os.makedirs(OUT_DIR, exist_ok=True)

# Websites that still need logos (don't already have a custom one)
SITES = [
    {"name": "Global Experience GH", "slug": "global-experience-gh", "url": "https://globalexperiencegh.org/"},
    {"name": "Dwell Chronicles GH", "slug": "dwell-chronicles-gh", "url": "https://dwellchroniclesgh.com/"},
    {"name": "PYC Club", "slug": "pyc-club", "url": "https://pycclub.org/"},
    {"name": "Rasmuta Foundation", "slug": "rasmuta-foundation", "url": "https://rasmutafoundation.org/"},
    {"name": "24 Hour News Online", "slug": "24-hour-news-online", "url": "https://24hournewsonline.com/"},
    {"name": "Fafaa Fm", "slug": "fafaa-fm", "url": "https://fafaafmonline.com/"},
    {"name": "Duamenefa Foundation", "slug": "duamenefa-foundation", "url": "https://www.duamenefafafoundation.org/"},
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,application/xhtml+xml,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        data = r.read()
        ct = r.headers.get("Content-Type", "")
        return data, ct, r.geturl()

def absolutize(src, base):
    if src.startswith("//"):
        return "https:" + src
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        # parse base for origin
        m = re.match(r"(https?://[^/]+)", base)
        if m:
            return m.group(1) + src
    # relative
    return base.rstrip("/") + "/" + src.lstrip("/")

def extract_logo_candidates(html, base):
    """Find <img> tags whose src/alt/class/id contains 'logo' (case-insensitive)."""
    # First try: img tags with logo keyword in any common attribute
    img_re = re.compile(
        r'<img\b[^>]*?\bsrc=(["\'])(?P<src>[^"\']+)\1[^>]*>',
        re.IGNORECASE,
    )
    candidates = []
    for m in img_re.finditer(html):
        src = m.group("src")
        full = m.group(0)
        # check if the full tag has 'logo' anywhere
        if re.search(r"\blogo\b", full, re.IGNORECASE):
            candidates.append(absolutize(src, base))
    # Fallback: any img with the site name in alt text
    return candidates

def download_image(url, out_path, timeout=20):
    try:
        data, ct, final_url = fetch(url, timeout=timeout)
        if not data:
            return False, "empty response"
        ct_lower = (ct or "").lower()
        # Determine extension from content-type
        if "png" in ct_lower:
            ext = ".png"
        elif "jpeg" in ct_lower or "jpg" in ct_lower:
            ext = ".jpg"
        elif "webp" in ct_lower:
            ext = ".webp"
        elif "svg" in ct_lower or url.lower().endswith(".svg"):
            ext = ".svg"
        elif "gif" in ct_lower:
            ext = ".gif"
        else:
            # try to sniff from magic bytes
            if data[:8] == b"\x89PNG\r\n\x1a\n":
                ext = ".png"
            elif data[:3] == b"\xff\xd8\xff":
                ext = ".jpg"
            elif data[:4] == b"GIF8":
                ext = ".gif"
            elif data[:4] == b"RIFF" and data[8:12] == b"WEBP":
                ext = ".webp"
            elif b"<svg" in data[:500]:
                ext = ".svg"
            else:
                return False, f"unknown content-type: {ct}"
        # Strip the placeholder extension and use real one
        out_path_with_ext = re.sub(r"\.[^.]+$", ext, out_path)
        with open(out_path_with_ext, "wb") as f:
            f.write(data)
        # Remove the placeholder if it exists separately
        if out_path_with_ext != out_path and os.path.exists(out_path):
            os.remove(out_path)
        return True, out_path_with_ext
    except Exception as e:
        return False, str(e)

def process_site(site):
    print(f"\n=== {site['name']} ===")
    print(f"  URL: {site['url']}")
    try:
        html_bytes, ct, _ = fetch(site["url"], timeout=20)
    except Exception as e:
        print(f"  ✗ failed to fetch homepage: {e}")
        return None
    try:
        html = html_bytes.decode("utf-8", errors="replace")
    except Exception:
        html = html_bytes.decode("latin-1", errors="replace")

    candidates = extract_logo_candidates(html, site["url"])
    # Deduplicate while preserving order
    seen = set()
    uniq = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            uniq.append(c)
    print(f"  found {len(uniq)} logo candidate(s):")
    for c in uniq[:6]:
        print(f"    - {c}")

    if not uniq:
        print("  ✗ no logo candidates found")
        return None

    out_base = os.path.join(OUT_DIR, site["slug"] + ".bin")
    for cand in uniq:
        ok, info = download_image(cand, out_base)
        if ok:
            size = os.path.getsize(info)
            print(f"  ✓ saved {info} ({size} bytes)")
            return info
        else:
            print(f"  ✗ failed {cand}: {info}")
    return None

results = {}
for site in SITES:
    saved = process_site(site)
    results[site["slug"]] = saved

print("\n\n=== SUMMARY ===")
for slug, path in results.items():
    print(f"  {slug}: {path or 'FAILED'}")

print("\nDone.")
