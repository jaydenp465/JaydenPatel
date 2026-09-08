# Portfolio site

A 5-page static site: `index.html` (Home), `about.html`, `projects.html`,
`resume.html`, `contact.html`, all sharing `style.css`. No build step —
open `index.html` directly in a browser to preview.

## Deploy to GitHub Pages

1. Create a repo named `yourusername.github.io` on GitHub (must match your
   username exactly for the root domain — any other name works too, it
   just serves at `yourusername.github.io/repo-name/`).
2. Upload all the files in this folder to that repo (root of the repo,
   not a subfolder).
3. In the repo, go to **Settings → Pages**, set the source to the `main`
   branch, root folder. Save.
4. Your site will be live at `https://yourusername.github.io/` within a
   few minutes.

## Things to fill in before you publish

- **`resume.pdf`** — the Download PDF button on the resume page links to
  this filename. Add your actual resume PDF to this folder with that
  exact name (or change the link in `resume.html`).
- **Project media** — `projects.html` has labeled placeholder boxes
  (fig. 01, fig. 02, ...) for the robotic arm photo/screenshots and the
  fan-speed circuit video. Replace each `<div class="figure">...</div>`
  with an `<img src="assets/your-file.jpg">` or a `<video>`/embedded
  player once you have the files. Drop image/video files into `assets/`.
- **Project tools/stack lines** — marked with `<!-- TODO -->` comments in
  `projects.html`. Fill in the actual parts list and software you used
  for each project.
- **In-progress projects** — once you get your class project
  assignments, swap the "Project scope to be assigned" lines in
  `projects.html` for real descriptions, and remove the "in progress"
  badge if a project wraps up.
- **Phone number** — left off the public contact page by default for
  privacy. There's a comment in `contact.html` showing where to add it
  back if you want it visible.
- **Bio on the About page** — drafted from your resume. Read it over and
  make it sound like you.

## Editing content

Nav, header, and footer are duplicated at the top/bottom of each HTML
file (no shared templating, since this is a plain static site with no
build step). If you rename yourself, change your email, etc., update it
in all five files.
