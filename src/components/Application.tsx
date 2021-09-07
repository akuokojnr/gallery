import * as Actions from "../common/actions";

import React from "react";
import Search from "./Search";
import Gallery from "./Gallery";
import Spinner from "./Spinner";

/** @jsx jsx */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

const STYLES_WRAPPER = css`
  width: 75%;
  margin: 0 auto;
`;

const STYLES_LOAD_MORE = css`
  height: 20rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Application = () => {
  const [query, setQuery] = useState<string>("");
  const [enableFetch, setEnableFetch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const { data, fetchNextPage } = useInfiniteQuery(
    "photos",
    async () => await Actions.getImage(query, page),
    {
      enabled: enableFetch,
    }
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEnableFetch(true);
    }
  };

  useEffect(() => {
    if (data) {
      setEnableFetch(false);
      setPage((page) => page + 1);
    }
  }, [data]);

  useEffect(() => {
    if (query && inView) {
      fetchNextPage({ pageParam: page });
    }
  }, [inView]);

  return (
    <div css={STYLES_WRAPPER}>
      <Search
        query={query}
        hasSearchResults={!!data?.pages.length}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
      />
      {data && <Gallery pages={data?.pages} />}
      {data && (
        <div ref={ref} css={STYLES_LOAD_MORE}>
          <Spinner size="3.4rem" />
        </div>
      )}
    </div>
  );
};

export default Application;
