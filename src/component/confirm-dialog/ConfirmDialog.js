/**
 * Created by wanjian on 2017/5/27.
 */
import React, {Component} from "react";
import Button from "../button/Button";
import "./style.css";
export default class ConfirmDialog extends Component {
    constructor() {
        super();
        this.state = {
            // visible: this.props.visible
        };


    }

    onClick() {
        this.setSate({
            visible: !this.state.visible
        });
    }

    render() {

        return (
            <div
                className={(this.state.visible ? 'confirm-dialog-visible' : 'confirm-dialog-unvisible') + " confirm-dialog"}
                visible={this.state.visible = this.props.visible}>
                <div className="confirm-dialog-operate">
                    <div className="confirm-dialog-operate-title">{this.props.title}</div>
                    <div className="confirm-dialog-operate-divider"/>
                    <div className="confirm-dialog-operate-msg">{this.props.msg}</div>
                    <div className="confirm-dialog-operate-divider"/>
                    <div className="confirm-dialog-operate-btn">
                        <Button title={this.props.btn} onClick={this.onClick.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

