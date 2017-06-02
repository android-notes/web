/**
 * Created by wanjian on 2017/5/28.
 */
import React, {Component} from "react";

import {HOST} from "../common/Const";
import InputConfirm from "../input-confirm/InputConfirm";
import "./style.css";
export default class Weather extends Component {
    constructor() {
        super();
        this.state = {
            city: ''
        }
    }

    render() {
        return (
            <div className="info">
                <h2>天气查询</h2>
                <InputConfirm placeholder="请输入城市" title="查询" onChange={this.onInput.bind(this)}
                              onClick={this.onQuery.bind(this)} onKeyDown={this.onKeyEvent.bind(this)}/>
                {
                    this.state.info ? <div>
                        <table className="info-tab">

                            <tr>
                                <td>城市</td>
                                <td>{this.state.info.city}</td>
                            </tr>
                            <tr>
                                <td>时间</td>
                                <td>{this.state.info.date + '  ' + this.state.info.week}</td>
                            </tr>
                            <tr>
                                <td>空气质量</td>
                                <td>{this.state.info.aqi.quality }</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{this.state.info.aqi.aqiinfo.affect + this.state.info.aqi.aqiinfo.measure }</td>
                            </tr>
                            <tr>
                                <td>天气</td>
                                <td>{this.state.info.weather + '  ' + this.state.info.temp + ' ℃'}</td>
                            </tr>
                            <tr>
                                <td>最高温度</td>
                                <td>{this.state.info.temphigh + ' ℃'}</td>
                            </tr>
                            <tr>
                                <td>最低温度</td>
                                <td>{this.state.info.templow + ' ℃'}</td>
                            </tr>
                            <tr>
                                <td>空气湿度</td>
                                <td>{this.state.info.humidity + ' %'}</td>
                            </tr>
                            <tr>
                                <td>气压</td>
                                <td>{this.state.info.pressure + ' hPa'}</td>
                            </tr>

                            <tr>
                                <td>风力</td>
                                <td>{this.state.info.winddirect + '  ' + this.state.info.windpower}</td>
                            </tr>
                            <tr>
                                <td>风速</td>
                                <td>{this.state.info.windspeed + ' 米/秒'}</td>
                            </tr>
                            <tr>
                                <td>数据更新时间</td>
                                <td>{this.state.info.updatetime }</td>
                            </tr>

                        </table>
                    </div> : null
                }
            </div>
        );
    }

    onInput(event) {
        this.state.city = event.target.value;
    }

    onKeyEvent(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.onQuery();
        }
    }

    onQuery() {
        let params = JSON.stringify({
            url: "http://jisutqybmf.market.alicloudapi.com/weather/query",
            params: {
                city: this.state.city
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

