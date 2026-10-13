"""Gera index.html a partir de app.html (o conteúdo da app).

app.html é o mesmo ficheiro que corre no claude.ai. Este script envolve-o
numa página completa, liga o manifesto e os ícones, e ativa o modo
autónomo (dados guardados no próprio aparelho).

Uso: python3 build.py
"""
from pathlib import Path

aqui = Path(__file__).parent
app = (aqui / "app.html").read_text(encoding="utf-8")

cabeca = """<!doctype html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#E3A21A">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Galinheiro">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>
:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px/1.4 system-ui,sans-serif}
img{max-width:100%}
[hidden]{display:none!important}
</style>
<script>window.GALINHEIRO_STANDALONE = true;</script>
</head>
<body>
"""

(aqui / "index.html").write_text(cabeca + app + "\n</body>\n</html>\n", encoding="utf-8")
print("index.html gerado")
