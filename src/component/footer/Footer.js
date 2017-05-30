/**
 * Created by wanjian on 2017/5/27.
 */
import React, {Component} from "react";
import "./style.css";
export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-divider"/>
                <div >
                    @瑞士军刀
                </div>
                <a className="about-us" href="https://github.com/android-notes">
                    关于作者
                </a>

            </div>
        );
    }
}

