import fs from "fs/promises";
import { marked } from "marked";

Bun.serve({
  async fetch(req) {
    const { pathname } = new URL(req.url);

    let content = "Not Found";

    if (pathname === "/") {
      const filenames = await fs.readdir("./_posts");

      content = "";
      for (const filename of filenames) {
        content += `<div><a href="/${filename}">${filename}</a></div>`;
      }
    } else {
      const file = Bun.file(`./_posts/${pathname}`);
      if (await file.exists()) {
        const fileContents = await Bun.file(`./_posts/${pathname}`).text();
        content = marked.parse(fileContents);
      }
    }

    return new Response(
      `<html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Adam Berg's Blog</title>
      <style>
        body {
          max-width: 800px;
          margin: 0 auto;
        }
      </style>
    </head>
    
    <body>
    <nav>
        <a href="/">/home</a>
    </nav>
    ${content}
    </body>
    
    </html>`,
      {
        headers: {
          "content-type": "text/html",
        },
      }
    );
  },
  port: process.env.PORT || 8000,
});
