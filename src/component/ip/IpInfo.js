/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";
import Button from "../button/Button";
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
        //http://freeapi.ipip.net/?ip=118.28.8.8
        // https://tieba.baidu.com/f?kw=%E5%9B%B4%E6%A3%8B
        let params = JSON.stringify({
            url: "https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json",
            params: {
                ip: "210.75.225.254"
            },
            headers: {
                Authorization: "APPCODE 28fd65e9aacc4a9eacfbc90f76ea1660"
            }

        });

        fetch('http://localhost:8899?' + encodeURIComponent(params), {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(function (res) {
            // res instanceof Response == true.
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data);
                });
            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });

        // $.ajax({
        //     method: 'jsonp',
        //     headers:{
        //         'Access-Control-Allow-Origin':'*'
        //     },
        //     url: 'http://freeapi.ipip.net/?ip=' + this.state.ip,
        //     success: function (data) {
        //         console.log(data)
        //     },
        //     error(err){
        //         console.log(err)
        //     }
        // })

    }
}

