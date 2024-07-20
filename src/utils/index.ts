import type { Image } from "~/types/index";

export const buildSearchParams = (
  query?: Record<string, unknown>,
): URLSearchParams => {
  const entries = Object.entries(query || {});
  const pairs = entries.flatMap(([key, value]) =>
    value !== undefined && value !== null ? [[key, `${value}`]] : [],
  );
  return new URLSearchParams(pairs);
};

export const getOffset = (page: number, limit: number): string =>
  String(limit * (page - 1));

export const getThumbnail = (thumbnail: Image | undefined): string => {
  if (!thumbnail) {
    return "";
  }

  return `${thumbnail.path}.${thumbnail.extension}`;
};

export const getTotalPages = (
  total: number | undefined,
  limit: number,
): number => (total ? Math.ceil(total / limit) : 1);
