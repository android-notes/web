import React, {Component} from "react";
import "./md.css";
import "./androidstudio.min.css";
import $ from "jquery";
export default class MarkDown_It extends Component {
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

        let txt = this.getTxt();
        let result = remarkable.render(txt);


        this.state = {
            remarkable: remarkable,
            txt: txt,
            md: {__html: result},
        };


    }

    render() {
        return (
            <div className='md'>
                <div  className="edit-container">
                <div contentEditable={true} className="edit" onInput={this.onTextChange.bind(this)}
                      >{this.state.txt}</div>
                </div>
                <div className="divider"></div>
                <div className="preview" dangerouslySetInnerHTML={this.state.md}></div>

            </div>
        );

    }

    onTextChange(t) {
        let txt = t.target.innerText;
        let result = this.state.remarkable.render(txt);

        this.setState({
            md: {__html: result},
            txt: txt
        });

    }

    componentDidMount() {
        // $('.divider').draggable({axis: "x"});
        $('.divider').css({
            width: 10
        })

    }

    getTxt() {
        return `
        
# 欢迎使用OMD

@[toc](自动生成目录 )

**OMD**可以在线编辑markdown。特点概述：

#### 高亮代码块

\`\`\`java

    public class Main{
        public void main(String[]args){
            System.out.println("hello");
            return 0;
        }
    }

\`\`\`
#### 目录自动生成  \`@[toc](自动生成目录 )\`

#### 图片大小控制

![Alt text](https://raw.githubusercontent.com/android-notes/blogimg/master/whatisvolley.png =200x)

 
![Alt text](https://raw.githubusercontent.com/android-notes/blogimg/master/whatisvolley.png =200x50)

 #### 支持^上标^和~下标~

#### 支持文本加粗和斜体
 * **粗体文本**
* *斜体*

#### [支持超链接](https://android-notes.github.io) 


 #### 表格

| Item      |    Value | Qty  |
| -------- | --------| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |

#### 复选框

使用 \`- [ ]\` 和 \`- [x]\` 语法可以创建复选框，实现 todo-list 等功能。例如：

- [x] 已完成事项
- [ ] 待办事项1
- [ ] 待办事项2


`;
    }
}

