import React, {Component} from "react";
import "./md.css";
import "./androidstudio.min.css";
import $ from "jquery";
import "katex/dist/katex.css";
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
                .use(require('./math'))
                // .use(require('markdown-it-footnote'))
        ;
        // .use(require('markdown-it-mathjax'))
        // .use(require('markdown-it-katex'))
        // .use(require('markdown-it-math'), {
        //     inlineOpen: '\\(',
        //     inlineClose: '\\)',
        //     blockOpen: '\\[',
        //     blockClose: '\\]'
        // })
        // var remarkable = require('markdown-it')('commonmark');

        let txt = this.getTxt();
        let result = remarkable.render(txt);


        this.state = {
            remarkable: remarkable,
            txt: txt,
            md: {__html: result},
            loading: true,
            visible: true,
        };


    }


    componentDidMount() {
        // setInterval(function () {
        //
        // },);
    }


    render() {
        return (
            <div className='md'>

                <div className="md-bar">
                    <span className="md-print" onClick={this.onPrintCLick.bind(this)}>
                        打印
                    </span>
                    <span className="md-preview" onClick={this.onPreviewCLick.bind(this)}>
                        预览
                    </span>
                </div>

                {/*<ConfirmDialog  visible="false" title='提示' msg="建议勾选"/>*/}
                <div className="edit-container">
                    <div contentEditable='plaintext-only' className="edit"
                         onInput={this.onTextChange.bind(this)}>{this.state.txt}</div>
                </div>
                <div className="divider"></div>
                <div className="preview-container">
                    <div className="preview" dangerouslySetInnerHTML={this.state.md}></div>
                </div>


            </div>
        );

    }

    onPrintCLick() {
        let body = window.document.body;
        let bodyy = $('body').clone().css('margin', '5px 35px 35px 35px').get(0);
        bodyy.innerHTML = $('.md .preview').html();
        window.document.body = bodyy;

        window.print();
        window.document.body = body;
    }


    onPreviewCLick() {
        let that = this;
        $('.md .edit-container').animate({
            width: 'toggle',
            padding: 'toggle',
        }, 200);
        // $(".md .md-print").toggle(0);
    }

    onTextChange(t) {
        let txt = t.target.innerText;
        let result = this.state.remarkable.render(txt);

        this.setState({
            md: {__html: result},
        });

    }


    getTxt() {
        return `# 欢迎使用OMD
                
 > Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。——[维基百科]
 
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
#### 支持 [$\\KaTeX$](https://khan.github.io/KaTeX/function-support.html) 表达式
 例如 $\\color{blue}{E=mc^2}$
 $$f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\,e^{2 \\pi i \\xi x}
    \\,d\\xi$$

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

| 设备      |    价格 | 库存  |
| -------- | --------| :--: |
| MacBook  |  9000   |  50   |
| iPhone   |   6000  |  900  |
| 小米6    |    2700  |  2    |
| 华为P10   |  5000   |  100  |
| 锤子       |    2700  |  2    |

#### 复选框

使用 \`- [ ]\` 和 \`- [x]\` 语法可以创建复选框，实现 todo-list 等功能。例如：

- [x] 已完成事项
- [ ] 待办事项1
- [ ] 待办事项2


#### 全屏预览
当您把鼠标移到预览窗口右上角时会出现 \`预览\` 两个字，点击即可切换预览和编辑状态

#### 打印
当您使用的是谷歌Chrome浏览器时，鼠标移到预览窗口右上角时会出现 \`打印\` 按钮，建议勾选\`更多设置\`中的 \`背景图形\`，同时选择 \`另存为PDF\`

![打印设置](images/md-chrome-print.png =300x)

`;
    }
}

