/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";
import "./style.css";
export default class FunctionItem extends Component {
    render() {
        return (
            <div className="function-item">
                <a href={this.props.link}>
                    <div>{this.props.title}</div>
                </a>
            </div>
        );
    }
}

