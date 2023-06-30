import { useQuery } from "@apollo/client";
import { getAnimeDetail, getAnimeList, getTopTen } from "./queries";

export const useGetAnimeList = (props: { search?: string; page: number }) => {
  if (!props.search) {
    delete props?.search;
  }

  return useQuery(getAnimeList, {
    variables: {
      perPage: 9,
      ...props,
    },
  });
};

export const useGetTopTenAnime = () => {
  return useQuery(getTopTen, {
    variables: {
      page: 1,
      perPage: 10,
      sort: "POPULARITY_DESC",
    },
    fetchPolicy: "no-cache",
  });
};

export const useGetAnimeDetail = (id: number) => {
  return useQuery(getAnimeDetail, {
    variables: {
      id,
    },
    fetchPolicy: "no-cache",
  });
};
