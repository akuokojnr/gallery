export type PhotoObject = {
  id: string;
  blur_hash: string;
  alt_description: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
};
