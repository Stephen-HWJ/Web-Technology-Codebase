import React, { Component } from "react";
import Switch from "react-switch";

class MySwitch extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: localStorage.getItem("news_src") ?
                localStorage.getItem("news_src") === "guardian" : false };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(checked) {
        this.setState({ checked });
        localStorage.setItem("news_src", checked ? "guardian" : "nyt");
        console.log(localStorage.getItem("news_src"));
        window.location.reload();
    }

    componentDidMount() {
        if (localStorage.getItem("news_src")){
            this.setState({checked: localStorage.getItem("news_src") === "guardian"})
        }
    }

    render() {
        return (
            <label  style={{marginTop: "10px", marginBottom: "0"}}>
                <Switch
                    onChange={this.handleChange}
                    height={25}
                    width={50}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={'#2196f3'}
                    offColor={'#dddddd'}
                    checked={this.state.checked}
                />
            </label>
        );
    }
}

export default MySwitch;
