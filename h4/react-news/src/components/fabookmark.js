import React from "react";
import {FaBookmark} from "react-icons/fa"
import ReactTooltip from "react-tooltip";

function FB () {
    return (<><FaBookmark data-tip="Bookmark" style={{color: "red"}}/>
                <ReactTooltip place="top" type="dark" effect="solid"/>
            </>);
}

export default FB;