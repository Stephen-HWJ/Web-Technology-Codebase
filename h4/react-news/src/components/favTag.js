import React, {useEffect} from "react";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

function FavTag() {
    useEffect(() => {
        ReactTooltip.rebuild();
    })

    return <>{window.location.pathname === "/favourite" ?
            <FaBookmark data-tip="Bookmark" data-for={"navbar"} size={20}/>:
            <FaRegBookmark data-tip="Bookmark" data-for={"navbar"} size={20}/>
    }
    <ReactTooltip place="bottom" id={"navbar"} type="dark" effect="solid"/></>;
}

export default FavTag;