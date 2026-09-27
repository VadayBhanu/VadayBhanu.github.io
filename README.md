# bhanupratapyadav.com.np — Portfolio

Personal portfolio of **Bhanu Pratap Yadav**, full-stack developer and CS junior at UT Arlington (Honors).

## Deploy

This is a static site hosted with **GitHub Pages** from the `VadayBhanu/VadayBhanu.github.io` repo (`main` branch). To publish:

```bash
cd /path/to/VadayBhanu.github.io
# back up current site first if you want: git branch backup-2026-09-27
cp -r /path/to/this/folder/* .
git add -A
git commit -m "Rebuild portfolio: story-driven redesign for Summer 2027 internship hunt"
git push origin main
```

GitHub Pages rebuilds automatically — the new site is live at https://bhanupratapyadav.com.np within a minute or two.

## What's inside

- `index.html` — single-page portfolio: hero, story, selected work, experience, skills, education, contact
- `style.css` — dark/light themes, responsive, no frameworks
- `script.js` — theme toggle, scroll reveals, animated counters, mobile menu, copy-email
- `images/profile.jpg` — portrait
- `CNAME`, `sitemap.xml`, `robots.txt` — domain + SEO

## Notes

- Phone number and street address are intentionally **not** published (privacy). Contact is via email + LinkedIn + GitHub.
- Project cards link to GitHub repos where public. The three "Live in production" client projects show "Live link on request" — swap in real URLs when ready.
- Resume PDF: link `Bhanu Pratap Yadav cv updated.pdf` from the repo if you want a download button.
