#!/bin/sh
# Build and copy the site to any web server reachable over SSH
# (institutional hosting, a personal server…).
#
#   DEPLOY_TARGET=login@server:/path/to/public_html/ npm run deploy:rsync
#
# Optional: SITE_URL and BASE_PATH as for the GitHub build, e.g.
#   SITE_URL=https://www.cmap.polytechnique.fr BASE_PATH=/~peyrat/ DEPLOY_TARGET=… npm run deploy:rsync
set -eu
: "${DEPLOY_TARGET:?Set DEPLOY_TARGET, e.g. login@server:/path/to/public_html/}"
npm run build
# --delete removes files on the server that no longer exist in dist/
rsync -avz --delete dist/ "$DEPLOY_TARGET"
echo "Deployed to $DEPLOY_TARGET"
