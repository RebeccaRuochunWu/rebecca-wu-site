# rebecca-wu-site

Personal site for Rebecca Wu — product builder, tech-savvy hacker and freelance photographer.

A plain static site: no framework, no build step. Open `index.html` in a browser to preview it.

```
index.html             home: hero, about, how I work, products index, photo teaser, contact
styles.css             shared styles for every page
work/<project>/        one page per product (agent-opus, eval-platform, auto-sfx, eye-contact, mapier-reply)
photographs/           photo collage page
agent-opus/            Agent Opus interactive prototype (embedded on work/agent-opus/)
mapier/                Mapier Reply interactive prototype
assets/photos/         photographs (resized for the web, location metadata removed)
assets/video/          product demo clips + poster frames
assets/previews/       preview images for products without a video poster
favicon.svg
```

## Preview locally

Double-click `index.html`, or run a tiny local server so videos and paths behave exactly like production:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy on Vercel

1. Push this folder to a GitHub repo (see below).
2. In Vercel: **Add New → Project**, import the repo.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Click **Deploy**. Every push to `main` redeploys automatically.

### Custom domain

Vercel → your project → **Settings → Domains** → add your domain, then add the DNS records Vercel shows at your registrar (e.g. Cloudflare). HTTPS is automatic.

Once the domain is live, change the `og:image` meta tag in `index.html` to the full URL (e.g. `https://yourdomain.com/assets/photos/hero-valley.jpg`) so link previews show the photo.

## Push to GitHub

Create an empty repo on GitHub (no README), then from this folder:

```bash
git remote add origin https://github.com/<your-username>/rebecca-wu-site.git
git push -u origin main
```

## Still to fill in

Search `index.html` for `[` to find placeholders:

- Instagram link (points to `#` for now)

## Editing tips

- Copy lives directly in the HTML. Home sections are marked by `id` (`about`, `approach`, `products`, `contact`); each product's text is in `work/<project>/index.html`.
- The products list on the home page is the `<ul class="pi">` in `index.html`; `data-preview` is the image that floats under the cursor.
- Shared styles (buttons, project-page layout, products list) are in `styles.css`.
- To swap a hero photo, replace the file in `assets/photos/` (keep the name) or change the `src` on the `.hero-slide` images; captions are in the script at the bottom.
- The photo collage positions are the `grid-column` / `grid-row` values on each print in `photographs/index.html`.
