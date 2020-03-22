import React, { Component } from "react";
import Switch from "react-switch";

class MySwitch extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    render() {
        return (
            <label>
                <span>NYTimes</span>
                <Switch
                    onChange={this.handleChange}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor={'#2196f3'}
                    offColor={'#dddddd'}
                    checked={this.state.checked}
                />
                <span>Guardian</span>

            </label>
        );
    }
}

export default MySwitch;
