/*
依赖库：
  "highlight.js": "^11.5.1"
  "markdown-it": "^13.0.1"
*/
import "highlight.js/styles/rainbow.css";

let hljs = require("highlight.js"); // https://highlightjs.org/

// Actual default values
const md = require("markdown-it")({
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><p class="codeLangTitle">' +
          lang +
          "</p><code>" +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

export default md;
