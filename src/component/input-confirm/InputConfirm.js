/**
 * Created by wanjian on 2017/5/30.
 */
import React, {Component} from "react";
import "./style.css";
import Button from "../button/Button";
export default class InputConfirm extends Component {
    render() {
        return (
            <div className="h">
                <input autoFocus={true} placeholder={this.props.palceholder} className="input" onChange={this.props.onChange} onKeyDown={this.props.onKeyDown}/><Button
                title={this.props.title} onClick={this.props.onClick}/>
            </div>
        );
    }
}

