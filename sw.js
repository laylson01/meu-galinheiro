// Meu Galinheiro — service worker para funcionar sem rede.
// Ao mudar ficheiros da app, aumenta a versão para os telemóveis receberem a atualização.
const VERSAO = "meu-galinheiro-v1";
const BASE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (ev) => {
  ev.waitUntil(caches.open(VERSAO).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (ev) => {
  const req = ev.request;
  if (req.method !== "GET") return;

  // Página da app: tenta a rede primeiro (para receber atualizações), usa a cópia guardada sem rede.
  if (req.mode === "navigate") {
    ev.respondWith(
      fetch(req)
        .then((r) => { const copia = r.clone(); caches.open(VERSAO).then((c) => c.put("./index.html", copia)); return r; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Restantes ficheiros (ícones, letras, biblioteca do Excel): usa a cópia guardada, senão vai à rede e guarda.
  ev.respondWith(
    caches.match(req).then((guardado) =>
      guardado ||
      fetch(req).then((r) => {
        if (r && (r.ok || r.type === "opaque")) { const copia = r.clone(); caches.open(VERSAO).then((c) => c.put(req, copia)); }
        return r;
      })
    )
  );
});
