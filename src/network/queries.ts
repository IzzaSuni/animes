import { gql } from "@apollo/client";

export const getAnimeList = gql`
  query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(search: $search) {
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

export const getTopTen = gql`
  query ($sort: [MediaSort]) {
    Page(page: 1, perPage: 10) {
      media(sort: $sort) {
        coverImage {
          extraLarge
        }
        title {
          romaji
          english
        }
      }
    }
  }
`;
