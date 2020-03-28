import React from "react";
import { BounceLoader } from "react-spinners";
import {css} from "@emotion/core";
import "../css/loader.css";

const override = css`
  margin-left: 20px;
`;

function MyBounceLoader() {
    return <div className="loader">
                <BounceLoader css={override} size={40} color={"#123abc"}/>
                <p className={"h4"}>Loading</p>
            </div> ;
}

export default MyBounceLoader;