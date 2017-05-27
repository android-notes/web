import React, {Component} from "react";
import "./md.css";
import "./androidstudio.min.css";
export default class extends Component {
    constructor() {
        super();
        var hljs = require('highlight.js');

        var remarkable = require('markdown-it')({
                breaks: true,
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return '<div class="hljs">' +
                                hljs.highlight(lang, str).value + '</div>';
                        } catch (err) {
                        }
                    }
                    try {
                        return '<div class="hljs">' + hljs.highlightAuto(str).value + '</div>';
                    } catch (err) {
                    }

                    return '';
                }
            }).use(require('markdown-it-toc'))
                .use(require('markdown-it-checkbox'))
                .use(require('markdown-it-sup'))
                .use(require('markdown-it-sub'))
                .use(require('markdown-it-imsize'))
                // .use(require('markdown-it-katex'))
                // .use(require('markdown-it-math'), {
                //     inlineOpen: '\\(',
                //     inlineClose: '\\)',
                //     blockOpen: '\\[',
                //     blockClose: '\\]'
                // })

        ;

        // var remarkable = require('markdown-it')('commonmark');

        this.state = {
            remarkable: remarkable,
        };
    }

    render() {

        return (
            <div className='md'>
                <textarea className="edit" onChange={this.onTextChange.bind(this)}></textarea>

                <div className="edit" dangerouslySetInnerHTML={this.state.md}></div>

            </div>
        );
    }

    onTextChange(t) {
        let txt = t.target.value;
        let result = this.state.remarkable.render(txt);

        this.setState({
            md: {__html: result}
        });

    }
}

