import React, {Component} from "react";
import "./App.css";
import Header from "./component/header/Header";
class App extends Component {
    constructor() {
        super();
        this.state = {

        };

    }

    render() {
        return (
            <div className="App">
                <Header/>
                <a href="#markdown">markdown</a>
            </div>
        );
    }
}

export default App;
