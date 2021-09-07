import * as Constants from "../common/constants";

import React from "react";

/** @jsx jsx */
import { css } from "@emotion/react";

const STYLES_LOADER_SPINNER = (size?: string) => css`
  display: inline-block;
  width: ${size ? size : "48px"};
  height: ${size ? size : "48px"};
  border: 2px solid ${Constants.colors.blue};
  border-radius: 50%;
  border-top-color: ${Constants.colors.white};
  animation: animation-spin 1s ease-in-out infinite;
  @keyframes animation-spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

type Spinner = {
  size?: string;
};

const LoaderSpinner = ({ size, ...props }: Spinner) => (
  <div css={STYLES_LOADER_SPINNER(size)} {...props} />
);

export default LoaderSpinner;
