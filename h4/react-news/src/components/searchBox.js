import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';

class SearchBox extends Component {
    state = {
        inputValue: '',
        results: [],
        selection: null
    };

    filterColors = async (inputValue: string) => {
        try {
            const response = await fetch(
                `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${inputValue}`,
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": "fa5edb60ea4a419da391b8968bbfa824"
                    }
                }
            );
            const data = await response.json();
            const resultsRaw = data.suggestionGroups[0].searchSuggestions;
            const results = resultsRaw.map(result => ({ value: result.displayText, label: result.displayText }));
            this.setState({ results });
        } catch (error) {
            console.error(`Error fetching search ${inputValue}`);
        }
        return this.state.results;
    };

    UNSAFE_componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        if (!window.location.href.includes("/search")){
            this.setState({
                selection: null
            })
        }
    }

    handleInputChange = async (newValue: string) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };

    handleChange = (newValue) => {
        // console.log('/search?=' + option.value);
        // this.thisHistory.push('/search?=' + option.value);
        const { history } = this.props;
        if (history) {
            history.push('/search?=' + newValue.value);
        }
        this.setState({selection: { value: newValue.value, label: newValue.value}});
        // console.log(this.state);
    };

    render() {
        return (
            <AsyncSelect
                    cacheOptions
                    noOptionsMessage={() => "No Match"}
                    placeholder={"Enter keyword .."}
                    loadOptions={this.filterColors}
                    value={this.state.selection}
                    onInputChange={this.handleInputChange}
                    onChange = {this.handleChange}
            />
        );
    }
}

export default withRouter(SearchBox);