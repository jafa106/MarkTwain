# Mark Twain, in his own words

A self-contained, installable web app that runs **semantic search over Mark Twain's
NON-FICTION** — his essays, opinions, polemics, and autobiography (no novels or short
stories) — entirely in your browser, no server. 4,158 passages from 12 public-domain
Project Gutenberg volumes.

- **Engine:** [transformers.js](https://github.com/xenova/transformers.js) `all-MiniLM-L6-v2`,
  embeddings computed on first load and cached in IndexedDB; top-8 cosine similarity.
- **Offline-capable PWA:** installable via *Add to Home Screen*; works offline after first visit.

> First load embeds the corpus in-browser (a few minutes), then it's cached permanently.

## Run locally
```
python3 -m http.server 8080
# open http://localhost:8080
```

## Live site
GitHub Pages → https://jafa106.github.io/MarkTwain/

*Sources: public-domain essays/non-fiction from Project Gutenberg. Twain's fiction is
deliberately excluded.*
