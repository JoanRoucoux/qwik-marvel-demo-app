export type Nullable<T> = T | null;

export type DataWrapper<T> = {
  code?: number;
  status?: Nullable<string>;
  copyright?: Nullable<string>;
  attributionTextisplay?: Nullable<string>;
  attributionHTML?: Nullable<string>;
  data?: DataContainer<T>;
  etag?: Nullable<string>;
};

export type DataContainer<T> = {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: T[];
};

export type Url = {
  type?: Nullable<string>;
  url?: Nullable<string>;
};

export type Image = {
  path?: Nullable<string>;
  extension?: Nullable<string>;
};

export type ResourceList = {
  available?: number;
  returned?: number;
  collectionURI?: Nullable<string>;
  items?: ResourceSummary[];
};

export type ResourceSummary = {
  resourceURI?: Nullable<string>;
  name?: Nullable<string>;
  type?: Nullable<string>;
  role?: Nullable<string>;
};

export type Character = {
  id: number;
  name?: Nullable<string>;
  description?: Nullable<string>;
  mediaType?: Nullable<string>;
  modified?: Nullable<string>;
  resourceURI?: Nullable<string>;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ResourceList;
  stories?: ResourceList;
  events?: ResourceList;
  series?: ResourceList;
};
