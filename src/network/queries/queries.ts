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
          large
        }
      }
    }
  }
`;

export const getAnimeCollectionsList = gql`
  query ($userId: Int) {
    User(id: $userId) {
      mediaListOptions {
        animeList {
          customLists
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
      mediaListEntry {
        customLists(asArray: true)
      }
      characters {
        nodes {
          name {
            full
          }
          image {
            large
          }
        }
      }
      startDate {
        year
      }
      genres
      streamingEpisodes {
        url
        title
        thumbnail
      }
      coverImage {
        extraLarge
      }
      title {
        romaji
      }
    }
  }
`;
