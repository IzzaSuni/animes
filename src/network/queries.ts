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

export const getCollectionsList = gql`
  query ($userId: Int) {
    MediaListCollection(userId: $userId, type: ANIME) {
      lists {
        name
        entries {
          mediaId
          media {
            id
            title {
              romaji
            }
          }
        }
      }
      user {
        name
        id
      }
    }
  }
`;
