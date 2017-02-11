import {
    SpellBase,
    SpellResult,
    DefaultDisplayType,
} from 'zeppelin-spell';

import md from 'markdown';

const markdown = md.markdown;

export default class MarkdownSpell extends SpellBase {
    constructor() {
        super("%markdown");
    }

    interpret(paragraphText) {
        const parsed = markdown.toHTML(paragraphText);

        /**
         * specify `DefaultDisplayType.HTML` since `parsed` will contain DOM
         * otherwise it will be rendered as `DefaultDisplayType.TEXT` (default)
         */
        return new SpellResult(parsed, DefaultDisplayType.HTML);
    }
}