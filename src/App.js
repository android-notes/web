import React, {Component} from "react";
import "./App.css";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Functions from "./component/funcitionList/Functions";
import MessPanel from "./component/mess-panel/MessPanel";

class App extends Component {
    constructor() {
        super();
        this.state = {};

    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="panel">
                    <Functions/>
                    <div className="content-panel">
                        {this.props.children}
                    </div>
                    <MessPanel/>
                </div>
                <Footer ></Footer>

            </div>
        );
    }
}

export default App;
