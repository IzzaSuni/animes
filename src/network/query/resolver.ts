import { useQuery } from "@apollo/client";
import {
  getAnimeCollectionsList,
  getAnimeDetail,
  getAnimeList,
  getMediaCollections,
  getTopTen,
} from "./queries";

export const useGetAnimeList = (props: {
  search?: string;
  page: number;
  id: string | undefined;
}) => {
  if (!props.search) {
    delete props?.search;
  }

  return useQuery(getAnimeList, {
    variables: {
      perPage: 9,
      ...props,
    },
    skip: !!props?.id,
  });
};

export const useGetTopTenAnime = (id: string | undefined) => {
  return useQuery(getTopTen, {
    variables: {
      page: 1,
      perPage: 10,
      sort: "POPULARITY_DESC",
    },
    fetchPolicy: "no-cache",
    skip: !!id,
  });
};

export const useGetAnimeDetail = (id: number) => {
  return useQuery(getAnimeDetail, {
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
    skip: !id,
  });
};

export const useGetCollections = () => {
  return useQuery(getAnimeCollectionsList, {
    fetchPolicy: "no-cache",
    variables: {
      userId: 6334973,
    },
  });
};

export const useGetCollectionsMedia = () => {
  return useQuery(getMediaCollections, {
    variables: {
      userId: 6334973,
    },
  });
};
