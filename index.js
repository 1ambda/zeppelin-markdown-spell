import {
    SpellBase,
    SpellResult,
    DefaultDisplayType,
} from 'zeppelin-spell';

const hljs = require('highlight.js')

const md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) { /** ignore */ }
    }

    return '' // use external default escaping
  }
}).use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-container'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))

md.renderer.rules.table_open = function(tokens, idx) {
  return '<div class="markdown-body"><table>'
}
md.renderer.rules.table_close = function(tokens, idx) {
  return '</table></div>'
}

export default class MarkdownSpell extends SpellBase {
    constructor() {
        super("%markdown");
    }

    interpret(paragraphText) {
        const parsed = md.render(paragraphText)

      console.log(parsed)


        /**
         * specify `DefaultDisplayType.HTML` since `parsed` will contain DOM
         * otherwise it will be rendered as `DefaultDisplayType.TEXT` (default)
         */
        return new SpellResult(parsed, DefaultDisplayType.HTML)
    }
}