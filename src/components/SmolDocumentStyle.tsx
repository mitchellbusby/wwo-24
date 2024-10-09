/**
 * This is a reusable injection of styles for Smol Document Style (source: https://smolcss.dev/#smol-document-styles)
 */
export const SmolDocumentStyle = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    * {
  box-sizing: border-box;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 5vh clamp(1rem, 5vw, 3rem) 1rem;
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #222;
}

body > * {
  --layout-spacing: max(8vh, 3rem);
  --max-width: 70ch;
  width: min(100%, var(--max-width));
  margin-left: auto;
  margin-right: auto;
}

main {
  margin-top: var(--layout-spacing);
}

footer {
  margin-top: auto;
  padding-top: var(--layout-spacing);
}

footer p {
  border-top: 1px solid #ccc;
  padding-top: 0.25em;
  font-size: 0.9rem;
  color: #767676;
}

:is(h1, h2, h3) {
  line-height: 1.2;
}

:is(h2, h3):not(:first-child) {
  margin-top: 2em;
}

article * + * {
  margin-top: 1em;
}

a {
  color: navy;
  text-underline-offset: 0.15em;
}`,
    }}
  ></style>
);
