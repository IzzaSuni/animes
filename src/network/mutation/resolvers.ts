import { useMutation } from "@apollo/client";
import { addAnimeToList, deleteCollections, setCollection } from "./mutation";

export const useCreateCollections = () => {
  return useMutation(setCollection);
};

export const useAddAnimeToCollections = () => {
  return useMutation(addAnimeToList);
};

export const useDeleteCustomList = () => {
  return useMutation(deleteCollections);
};
