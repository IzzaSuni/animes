import { useMutation } from "@apollo/client";
import { addAnimeToList, setCollection } from "./mutation";

export const useCreateCollections = () => {
  return useMutation(setCollection);
};

export const useAddAnimeToCollections = () => {
  return useMutation(addAnimeToList);
};
