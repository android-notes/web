/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";
import Button from "../button/Button";
import {HOST} from "../common/Const";
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
            <div className="ip-info">
                <h2>IP地址查询</h2>
                <div className="h">
                    <input placeholder="请输入IP地址" className="ip-input" onChange={this.onInput.bind(this)}/><Button
                    title="查询" onClick={this.onQuery.bind(this)}/>
                </div>
            </div>
        );
    }

    onInput(event) {
        this.state.ip = event.target.value;
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
        let that=this;
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

