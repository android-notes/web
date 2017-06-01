/**
 * Created by wanjian on 2017/5/30.
 */
import React, {Component} from "react";

import {HOST} from "../common/Const";
import InputConfirm from "../input-confirm/InputConfirm";
import "./style.css";
export default class QrCode extends Component {
    constructor() {
        super();
        this.state = {
            img:"",
            info:''
        }
    }

    render() {
        return (
            <div className="info">
                <h2>二维码</h2>
                <InputConfirm placeholder="请输入信息" title="生成" onChange={this.onInput.bind(this)}
                              onClick={this.onQuery.bind(this)} onKeyDown={this.onKeyEvent.bind(this)}/>
                {
                    this.state.img?<img src={'http://xn--jrxa.xyz/'+this.state.img} onLoad={this.loadFinished.bind(this)}></img>:null
                }
            </div>
        );
    }

    onInput(event) {
        this.state.info = event.target.value;
    }

    onKeyEvent(event) {
        if (event.key == 'Enter' || event.keyCode == 13) {
            this.onQuery();
        }
    }

    loadFinished(){
        console.log('加载完成');
        fetch( '/loaded.php?file='+this.state.img, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(function (res) {
            if (res.ok) {

            } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
            }
        }, function (e) {
            console.log("Fetch failed!", e);
        });

    }
    onQuery() {

        let that = this;
        fetch('/qrcode.php?data='+this.state.info, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }).then(function (res) {
            if (res.ok) {
                res.text().then(function (data) {
                    that.setState({
                        img: data
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

