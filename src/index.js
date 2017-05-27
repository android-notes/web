import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MarkDown_It from './component/markdown-it/MarkDown_It'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import {Route, Router} from "react-router";

const router = (
    <Router>
        <Route path="/" component={App}>

        </Route>

        <Route path="/markdown" component={MarkDown_It}>

        </Route>


    </Router>

);


ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
