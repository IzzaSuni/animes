import { gql } from "@apollo/client";

export const setCollection = gql`
  mutation ($animeListOptions: MediaListOptionsInput) {
    UpdateUser(animeListOptions: $animeListOptions) {
      mediaListOptions {
        animeList {
          customLists
        }
      }
    }
  }
`;

export const addAnimeToList = gql`
  mutation ($customLists: [String], $mediaId: Int) {
    SaveMediaListEntry(customLists: $customLists, mediaId: $mediaId) {
      id
      userId
      mediaId
    }
  }
`;
