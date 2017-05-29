/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";
import "./style.css";
export default class Button extends Component {
    render() {
        return (
            <button className="button" onClick={this.props.onClick}>
                {this.props.title}
            </button>
        );
    }
}

