import React from "react";
import { BounceLoader } from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
`;

function MyBounceLoader() {
    return <BounceLoader css={override} size={40} color={"#123abc"} loading={true}/>;
}

export default MyBounceLoader;