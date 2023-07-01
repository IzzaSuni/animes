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
