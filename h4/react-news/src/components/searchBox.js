import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';

class SearchBox extends Component {
    state = {
        inputValue: '',
        results: []
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

    handleInputChange = async (newValue: string) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({ inputValue });
        return inputValue;
    };

    handleChange = (option) => {
        // console.log('/search?=' + option.value);
        // this.thisHistory.push('/search?=' + option.value);
        const { history } = this.props;
        if (history) {
            // window.location.reload();
            history.push('/search?=' + option.value);
        }
    };

    render() {
        return (
            <AsyncSelect
                    cacheOptions
                    noOptionsMessage={() => "No Match"}
                    placeholder={"Enter keyword .."}
                    loadOptions={this.filterColors}
                    onInputChange={this.handleInputChange}
                    onChange = {this.handleChange}
            />
        );
    }
}

// export default SearchBox;
export default withRouter(SearchBox);