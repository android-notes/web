/**
 * Created by wanjian on 2017/6/2.
 */

function init(md) {
    let katex = require('katex');
    let mathRenderingOption = 'KaTeX';//MathJax  or   KaTeX
    let mathRenderingIndicator = {
        inline: [['$', '$']],
        block: [['$$', '$$']]
    };


    md.inline.ruler.before('escape', 'math', function (state, silent) {
        let b, block, closeTag, content, end, i, inline, j, k, len, len1, openTag, displayMode = true;

        openTag = null;
        closeTag = null;
        inline = mathRenderingIndicator.inline;
        block = mathRenderingIndicator.block;
        for (j = 0, len = block.length; j < len; j++) {
            b = block[j];
            if (state.src.startsWith(b[0], state.pos)) {
                openTag = b[0];
                closeTag = b[1];
                displayMode = true;
                break;
            }
        }
        if (!openTag) {
            for (k = 0, len1 = inline.length; k < len1; k++) {
                i = inline[k];
                if (state.src.startsWith(i[0], state.pos)) {
                    openTag = i[0];
                    closeTag = i[1];
                    displayMode = false;
                    break;
                }
            }
        }
        if (!openTag) {
            return false;
        }
        content = null;
        end = -1;
        i = state.pos + openTag.length;
        while (i < state.src.length) {
            if (state.src.startsWith(closeTag, i)) {
                end = i;
                break;
            } else if (state.src[i] === '\\') {
                i += 1;
            }
            i += 1;
        }
        if (end >= 0) {
            content = state.src.slice(state.pos + openTag.length, end);
        } else {
            return false;
        }
        if (content && !silent) {
            // state.push({
            //     type: 'math',
            //     content: content.trim(),
            //     openTag: openTag,
            //     closeTag: closeTag,
            // });
            let token = state.push("math", '', 0);
            token.openTag = openTag;
            token.closeTag = closeTag;
            token.content = content.trim();
            token.displayMode = displayMode;
            state.pos += content.length + openTag.length + closeTag.length;
            return true;
        } else {
            return false;
        }
    });

    md.renderer.rules.math = function (tokens, idx) {
        return parseMath(tokens[idx] || {});
    };
    let parseMath = function (arg1) {
        let closeTag, content, displayMode, error, openTag, text;
        content = arg1.content, openTag = arg1.openTag, closeTag = arg1.closeTag;
        if (!content) {
            return;
        }
        if (mathRenderingOption === 'KaTeX') {

            try {
                return katex.renderToString(content, {
                    displayMode: arg1.displayMode,
                });
            } catch (_error) {
                error = _error;
                return content;
                // return "<span style=\"color: #ee7f49; font-weight: 500;\">" + error + "</span>";
            }

        } else if (mathRenderingOption === 'MathJax') {
            // text = (openTag + content + closeTag).replace(/\n/g, '');
            // return text.escape();

        }
    };


}


module.exports = function (md) {
    "use strict";

    init(md);
};
