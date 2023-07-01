import { useMutation } from "@apollo/client";
import { setCollection } from "./mutation";

export const useCreateCollections = () => {
  return useMutation(setCollection);
};
