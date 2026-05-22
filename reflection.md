# IMY 210 Assignment 3: Reflection
**Student:** Andreas Bester (u04613628)

Setting up this assignment was a lot tougher than I expected, especially because I hadn't worked with headless CMS architectures before. Choosing Strapi was cool because the admin panel makes it easy to set up schemas, but getting it to talk to Nuxt took me hours. I kept getting blocked by CORS errors on the frontend because I forgot to enable permissions programmatically in the bootstrap script, which was really frustrating to debug.

On the frontend side, building a custom markdown parser from scratch was a massive challenge. At first, I wanted to just use an npm package, but keeping it to first-principles meant writing regular expressions to convert blockquotes, headings, and bold text manually. My regex kept breaking when paragraphs had extra newlines, and I spent a long night fixing string replacements to make sure lists rendered properly without crashing the Vue page.

Docker was another steep learning curve. I struggled to get the frontend multi-stage build to compile because the Nuxt folder structure in this version requires files to be inside `app/` instead of the root. My builds kept failing because I was copying the wrong directories into the final Alpine runner. Once I realized how the `.output` folder worked, I managed to get it running on port 3000.

Overall, I learned a lot about how APIs and frontends connect. Even though I got stuck on Windows SQLite database locks and port mapping issues, getting the final blog running with our offline PNG images made the struggle worth it.
