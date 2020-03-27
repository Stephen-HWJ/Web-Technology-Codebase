import React from "react";
import { FaRegBookmark} from "react-icons/fa"
import ReactTooltip from "react-tooltip";

function FBneg () {
    return (<><FaRegBookmark data-tip="Bookmark" style={{color: "red"}}/>
                <ReactTooltip place="top" type="dark" effect="solid"/>
            </>);
}

export default FBneg;