import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MarkDown_It from "./component/markdown-it/MarkDown_It";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

import {Route, Router,IndexRoute} from "react-router";
import Home from './component/home/Home'
import IpInfo from './component/ip/IpInfo'
import PhoneNum from './component/phone-num/PhoneNum'
import Weather from './component/weather/Weather'
import QrCode from './component/qrcode/QrCode'
const router = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="markdown" component={MarkDown_It}/>
            <Route path="ip" component={IpInfo}/>
            <Route path="phone-num" component={PhoneNum}/>
            <Route path="weather" component={Weather}/>
            <Route path="qrcode" component={QrCode}/>
        </Route>

        <Route path="/markdown" component={MarkDown_It}>

        </Route>


    </Router>

);


ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
