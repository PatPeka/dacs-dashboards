# Deploying DACS Dashboards on GitHub Pages

This repo is a **static site**: plain HTML + CSS + JS, no build step.
The files below must sit at the **root** of the repository (not inside a subfolder).

## Expected file tree (root of repo)

```
.nojekyll
index.html                 ← landing page (demo hub)
where-is-my-meds.html      ← Dashboard 1: medication delivery status
production-cockpit.html    ← Dashboard 2: daily production cockpit
README.md
DEPLOY.md
data/
  orders.json              ← snapshot for dashboard 1
  cockpit.json             ← snapshot for dashboard 2
js/
  datasource.js            ← data layer (JSON snapshot now, API later)
```

## Fresh start (recommended — wipes the repo cleanly)

In the Codespace terminal, from the repo root:

```bash
# 1. Remove everything currently tracked and on disk (keeps .git)
git rm -r --cached . -q
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# 2. Drag-drop the CONTENTS of this zip into the file explorer root
#    (index.html must land at the root, data/ and js/ as subfolders)

# 3. Verify the tree
ls -a          # expect: .git .nojekyll DEPLOY.md README.md data index.html js production-cockpit.html where-is-my-meds.html

# 4. Commit and push
git add -A
git commit -m "Reset: two DACS dashboards + hub, static site for Pages"
git push
```

## Enable GitHub Pages

Repo on github.com → **Settings → Pages → Source: Deploy from a branch →
branch `main`, folder `/ (root)` → Save.**

Live after ~1 minute at:

```
https://patpeka.github.io/dacs-dashboards/
```

Open the `.github.io` URL — NOT the `.github.dev` one (that is the editor,
not the published site).

## Common pitfalls

- Files ended up in a subfolder (e.g. `mockups/`) → Pages won't serve them.
  Move them to root: `mv mockups/* .` (with `shopt -s dotglob` for `.nojekyll`).
- Committed `.zip` or `package-lock.json` files → harmless but noise; delete them.
- Blank cockpit table → the JSON failed to load; check `data/cockpit.json` exists
  at the root-level `data/` folder and the URL is the `.github.io` one (https).
