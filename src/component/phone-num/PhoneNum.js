/**
 * Created by wanjian on 2017/5/30.
 */

import React, {Component} from "react";

import {HOST} from "../common/Const";
import InputConfirm from "../input-confirm/InputConfirm";
import "./style.css";
export default class PhoneNum extends Component {
    constructor() {
        super();
        this.state = {
            phone: ''
        }
    }

    render() {
        return (
            <div className="info">
                <h2>手机号归属地查询</h2>
                <InputConfirm placeholder="请输入手机号" title="查询" onChange={this.onInput.bind(this)}
                              onClick={this.onQuery.bind(this)} onKeyDown={this.onKeyEvent.bind(this)}/>
                {
                    this.state.info ? <div>
                        <table className="info-tab">
                            <tr>
                                <td>手机号</td>
                                <td>{this.state.info.shouji}</td>
                            </tr>
                            <tr>
                                <td>省份</td>
                                <td>{this.state.info.province}</td>
                            </tr>
                            <tr>
                                <td>城市</td>
                                <td>{this.state.info.city}</td>
                            </tr>
                            <tr>
                                <td>运营商</td>
                                <td>{this.state.info.company}</td>
                            </tr>
                            <tr>
                                <td>卡号类型</td>
                                <td>{this.state.info.cardtype}</td>
                            </tr>
                            <tr>
                                <td>区号</td>
                                <td>{this.state.info.areacode}</td>
                            </tr>

                        </table>
                    </div> : null
                }
            </div>
        );
    }

    onInput(event) {
        this.state.phone = event.target.value;
    }
    onKeyEvent(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.onQuery();
        }
    }

    onQuery() {
        let params = JSON.stringify({
            url: "http://jshmgsdmfb.market.alicloudapi.com/shouji/query",
            params: {
                shouji: this.state.phone
            },
            headers: {
                Authorization: "APPCODE 28fd65e9aacc4a9eacfbc90f76ea1660"
            }

        });
        let that = this;
        fetch(HOST + encodeURIComponent(params), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(function (res) {
            // res instanceof Response == true.
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data);
                    that.setState({
                        info: data.result
                    })
                    ;
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });


    }
}

