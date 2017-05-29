/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";
import "./style.css";
import FunctionItem from "../function-item/FunctionItem";
export default class Functions extends Component {
    render() {
        return (
            <div className="function-panel">
                <FunctionItem title="MarkDown" link="#/markdown"/>
                <FunctionItem title="IP归属地" link="#/ip"/>
            </div>
        );
    }
}

