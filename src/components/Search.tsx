import * as Constants from "../common/constants";

import React from "react";

/** @jsx jsx */
import { css } from "@emotion/react";
import { useEffect, useRef } from "react";

const STYLES_WRAPPER = css`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
`;

const STYLES_BRAND = css`
  font-size: 2.4rem;
  font-weight: 600;
  margin: 2rem 20% 3.5rem 0;
`;

const STYLES_INFO = ({
  hasSearchResults,
}: {
  hasSearchResults: boolean;
}) => css`
  min-height: 0;
  visibility: hidden;
  transition: all 0.3s;

  ${hasSearchResults &&
  `
  background: ${Constants.colors.gray};
  padding: 5rem 0;
  min-height: 30rem;
  visibility: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 -23%;`}

  p {
    font-size: 0;

    ${hasSearchResults &&
    `font-size: 6rem;
    font-weight: 600;
    text-transform: capitalize;`}
  }
`;

const STYLES_CONTAINER = ({
  hasSearchResults,
}: {
  hasSearchResults: boolean;
}) => css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: calc(100vh - 40rem);
  transition: all 0.5s;

  ${hasSearchResults && `min-height: 5rem;`};

  p {
    margin: 1.5rem 0 0 auto;
    font-size: 1.8rem;
    visibility: visible;

    ${hasSearchResults && `visibility: hidden;`};
  }
`;

const STYLES_INPUT = ({
  hasSearchResults,
}: {
  hasSearchResults: boolean;
}) => css`
  width: 100%;
  border: none;
  border-bottom: 0.5rem solid;
  padding: 1rem 0;
  font-size: 6rem;
  background: ${Constants.colors.white};
  transition: all 0.4s;

  @media screen and (min-width: ${Constants.sizes.sm}) {
    font-size: 10rem;

    ${hasSearchResults &&
    `font-size: 1.8rem;
  `};
  }

  @media screen and (min-width: ${Constants.sizes.md}) {
    font-size: 18rem;

    ${hasSearchResults &&
    `font-size: 1.8rem;
  `};
  }

  ${hasSearchResults &&
  `font-size: 1.8rem;
  border-bottom: 0;
  border-radius: 0.8rem;
  box-shadow: 0px 8px 20px rgb(0 0 0 / 6%);
  max-width: 60rem;
  padding: 2rem;
  margin-top: -3rem;`};

  :focus {
    outline: none;
  }

  ::-webkit-search-decoration,
  ::-webkit-search-cancel-button,
  ::-webkit-search-results-button,
  ::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

type SearchProps = {
  query: string;
  hasSearchResults: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Search = ({
  query,
  hasSearchResults,
  handleChange,
  handleKeyDown,
}: SearchProps) => {
  const inputElem = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputElem.current) {
      inputElem.current.focus();
    }
  }, []);

  return (
    <div css={STYLES_WRAPPER}>
      <p css={STYLES_BRAND}>Galle.ry</p>
      <div css={STYLES_INFO({ hasSearchResults })}>
        <p>{query}</p>
      </div>
      <div css={STYLES_CONTAINER({ hasSearchResults })}>
        <input
          css={STYLES_INPUT({ hasSearchResults })}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyDown}
          ref={inputElem}
          placeholder="Search..."
        />
        <p>Hit enter to search for any image you want </p>
      </div>
    </div>
  );
};

export default Search;
