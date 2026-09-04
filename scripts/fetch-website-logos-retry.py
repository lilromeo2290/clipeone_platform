#!/usr/bin/env python3
"""
Retry fetching logos for the 3 failed sites using a smarter strategy:
- Look inside <div class="logo"> / <a class="logo-link"> / similar wrappers
- Fall back to the og:image meta tag (social preview image, usually a logo/banner)
- Try both bare domain and www. prefix
"""

import os
import re
import ssl
import urllib.request
import urllib.error

OUT_DIR = "/home/z/my-project/public/clipeone/websites"
os.makedirs(OUT_DIR, exist_ok=True)

SITES = [
    {"name": "24 Hour News Online", "slug": "24-hour-news-online", "urls": [
        "https://24hournewsonline.com/",
    ]},
    {"name": "Fafaa Fm", "slug": "fafaa-fm", "urls": [
        "https://fafaafmonline.com/",
    ]},
    {"name": "Duamenefa Foundation", "slug": "duamenefa-foundation", "urls": [
        "https://www.duamenefafafoundation.org/",
        "https://duamenefafafoundation.org/",
    ]},
]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Accept": "text/html,image/*,*/*;q=0.8",
    })
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        return r.read(), r.headers.get("Content-Type", ""), r.geturl()


def absolutize(src, base):
    if src.startswith("//"):
        return "https:" + src
    if src.startswith("http"):
        return src
    if src.startswith("/"):
        m = re.match(r"(https?://[^/]+)", base)
        if m:
            return m.group(1) + src
    return base.rstrip("/") + "/" + src.lstrip("/")


def find_logo_in_html(html, base):
    """Smart logo extraction — look in logo containers first, then any logo-named img, then og:image."""
    candidates = []

    # 1) <div class="logo">...</div>  — find any <img> inside (within ~600 chars)
    for m in re.finditer(r'class="logo"[^>]*>(.{0,800}?)</div>', html, re.IGNORECASE | re.DOTALL):
        chunk = m.group(1)
        for img_m in re.finditer(r'<img[^>]+src=["\']([^"\']+)["\']', chunk, re.IGNORECASE):
            candidates.append(("logo-div", absolutize(img_m.group(1), base)))

    # 2) Any <img> with "logo" in src/alt/class/id
    for m in re.finditer(r'<img[^>]*>', html, re.IGNORECASE):
        tag = m.group(0)
        if re.search(r"\blogo\b", tag, re.IGNORECASE):
            src_m = re.search(r'src=["\']([^"\']+)["\']', tag, re.IGNORECASE)
            if src_m:
                candidates.append(("logo-keyword", absolutize(src_m.group(1), base)))

    # 3) og:image meta tag
    for m in re.finditer(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html, re.IGNORECASE):
        candidates.append(("og:image", m.group(1)))
    for m in re.finditer(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', html, re.IGNORECASE):
        candidates.append(("og:image", m.group(1)))

    # Dedupe preserving order
    seen, uniq = set(), []
    for src, url in candidates:
        if url not in seen:
            seen.add(url)
            uniq.append((src, url))
    return uniq


def download(url, out_base, timeout=20):
    try:
        data, ct, _ = fetch(url, timeout=timeout)
        if not data:
            return False, "empty"
        ct_l = (ct or "").lower()
        if "png" in ct_l or data[:8] == b"\x89PNG\r\n\x1a\n":
            ext = ".png"
        elif "jpeg" in ct_l or "jpg" in ct_l or data[:3] == b"\xff\xd8\xff":
            ext = ".jpg"
        elif "webp" in ct_l or (data[:4] == b"RIFF" and data[8:12] == b"WEBP"):
            ext = ".webp"
        elif "svg" in ct_l or b"<svg" in data[:500]:
            ext = ".svg"
        elif "gif" in ct_l or data[:4] == b"GIF8":
            ext = ".gif"
        else:
            return False, f"unknown type {ct}"
        out = re.sub(r"\.[^.]+$", ext, out_base)
        with open(out, "wb") as f:
            f.write(data)
        return True, out
    except Exception as e:
        return False, str(e)


for site in SITES:
    print(f"\n=== {site['name']} ===")
    html = None
    base_url = None
    for url in site["urls"]:
        try:
            data, _, final = fetch(url)
            html = data.decode("utf-8", errors="replace")
            base_url = final
            print(f"  fetched {url} (final: {final}, {len(html)} chars)")
            break
        except Exception as e:
            print(f"  ✗ {url}: {e}")

    if not html:
        continue

    candidates = find_logo_in_html(html, base_url)
    print(f"  found {len(candidates)} candidate(s):")
    for src, url in candidates[:6]:
        print(f"    [{src}] {url}")

    out_base = os.path.join(OUT_DIR, site["slug"] + ".bin")
    for src, url in candidates:
        ok, info = download(url, out_base)
        if ok:
            size = os.path.getsize(info)
            print(f"  ✓ saved {info} ({size} bytes) [source: {src}]")
            break
        else:
            print(f"  ✗ {url}: {info}")
    else:
        print(f"  ✗ NO LOGO SAVED for {site['name']}")

print("\nDone.")
