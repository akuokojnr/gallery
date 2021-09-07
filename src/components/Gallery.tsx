import React, { useEffect, useState } from "react";

/** @jsx jsx */
import { css } from "@emotion/react";
import { Blurhash } from "react-blurhash";

import { PhotoObject } from "../types";

const STYLES_PHOTOS = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-auto-rows: minmax(35rem, auto);
  grid-gap: 2rem;
`;

const STYLES_PHOTO = css`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type GalleryProps = {
  pages: {
    results: PhotoObject[];
  }[];
};

type ImgProps = {
  photo: PhotoObject;
};

const Img = ({ photo }: ImgProps) => {
  const [showImage, setShowImage] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setShowImage(true);
    img.src = photo.urls.regular;
  }, []);

  return (
    <div css={STYLES_PHOTO}>
      {showImage ? (
        <img src={photo.urls.regular} alt={photo.alt_description} />
      ) : (
        <Blurhash hash={photo.blur_hash} width="100%" height="100%" />
      )}
    </div>
  );
};

const Gallery = ({ pages }: GalleryProps) => {
  return (
    <>
      <div css={STYLES_PHOTOS}>
        {pages.map((page) =>
          page.results.map((photo) => <Img key={photo.id} photo={photo} />)
        )}
      </div>
    </>
  );
};

export default Gallery;
