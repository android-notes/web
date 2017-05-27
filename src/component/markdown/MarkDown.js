import React, {Component} from "react";
import "./androidstudio.min.css";
import "./md.css";
export default class extends Component {
    constructor() {
        super();
        let Remarkable = require('remarkable');
        let hljs = require('highlight.js'); // https://highlightjs.org/

        let remarkable = new Remarkable({
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

                return ''; // use external default escaping
            }
        });

        let result = remarkable.render('### hello');
        console.log(result);
        this.state = {
            remarkable: remarkable,
        };
    }

    render() {

        return (
            <div className='md'>
                <div dangerouslySetInnerHTML={this.state.md}></div>

                <textarea onChange={this.onTextChange.bind(this)}></textarea>
            </div>
        );
    }

    onTextChange(t) {
        let txt = t.target.value;
        let result = this.state.remarkable.render(txt);
        console.log(result)

        this.setState({
            md: {__html: result}
        });

    }
}

