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
      media(search: $search, isAdult: false, type: ANIME) {
        id
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
      media(isAdult: false, type: ANIME, sort: $sort) {
        id
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

export const getAnimeDetail = gql`
  query ($id: Int, $startDate: FuzzyDateInt) {
    Media(id: $id, startDate: $startDate) {
      id
      description
      bannerImage
      averageScore
      episodes
      chapters

      startDate {
        month
        year
      }
      genres
      streamingEpisodes {
        url
        site
        title
        thumbnail
      }
      externalLinks {
        url
        icon
      }
      coverImage {
        extraLarge
      }
      title {
        romaji
        english
      }
    }
  }
`;
