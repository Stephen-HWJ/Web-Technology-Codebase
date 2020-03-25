import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';

export default class SearchBox extends Component<*, State> {
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
            console.log(this.state);
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

    render() {
        return (
            <div>
                <AsyncSelect
                    cacheOptions
                    loadOptions={this.filterColors}
                    onInputChange={this.handleInputChange}
                />
            </div>
        );
    }
}