/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";

import {HOST} from "../common/Const";
import InputConfirm from "../input-confirm/InputConfirm";
import "./style.css";
export default class IpInfo extends Component {
    constructor() {
        super();
        this.state = {
            ip: ''
        }
    }

    render() {
        return (
            <div className="info">
                <h2>IP地址查询</h2>
                <InputConfirm placeholder="请输入IP地址" title="查询" onChange={this.onInput.bind(this)} onClick={this.onQuery.bind(this)} onKeyDown={this.onKeyEvent.bind(this)}/>
                {
                    this.state.info ? <div>
                        <table className="info-tab">
                            <tr>
                                <td>国家</td>
                                <td>{this.state.info.country}</td>
                            </tr>
                            <tr>
                                <td>省份</td>
                                <td>{this.state.info.region}</td>
                            </tr>
                            <tr>
                                <td>城市</td>
                                <td>{this.state.info.city}</td>
                            </tr>
                            <tr>
                                <td>服务提供商</td>
                                <td>{this.state.info.isp}</td>
                            </tr>

                        </table>
                    </div> : null
                }
            </div>
        );
    }

    onInput(event) {
        this.state.ip = event.target.value;
    }
    onKeyEvent(event) {
        if (event.key == 'Enter' || event.keyCode == 13) {
            this.onQuery();
        }
    }

    onQuery() {
        let params = JSON.stringify({
            url: "http://saip.market.alicloudapi.com/ip",
            params: {
                ip: this.state.ip
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
                        info: data.showapi_res_body
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

