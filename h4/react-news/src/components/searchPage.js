import React from "react";

function SearchPage(props) {
    let state = {
        loading: true,
        id: props.location.search.slice(2,),
        article: NaN,
    };

    return <h3>Search page {state.id}</h3>;
}

export default SearchPage;
