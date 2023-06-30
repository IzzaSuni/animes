import { useGetAnimeList, useGetTopTenAnime } from "network/resolver";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { HandleGetSlider, SliderIndex } from "./animeListContext.types";
import { useImmer } from "use-immer";
import { useDebounce } from "usehooks-ts";

interface CtxValue {
  dataTopTenAnime?: any[];
  fetchingTopTenAnime?: boolean;
  dataAnimeList?: any[];
  fetchingAnimeList?: boolean;
  sliderIndex: SliderIndex;
  setSliderIndex: (prop: SliderIndex) => void;
  handleGetSliderIndex: (prop: SliderIndex) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  debouncedSearch: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const initialCtxValue = {
  dataTopTenAnime: [1, 2, 3, 4, 5],
  fetchingTopTenAnime: false,
  dataAnimeList: [1, 2, 3, 4, 5],
  fetchingAnimeList: false,
  setSliderIndex: () => {},
  sliderIndex: {
    active: 1,
    left: 0,
    right: 2,
  },
  handleGetSliderIndex: () => {},
  page: 1,
  setPage: () => {},
  search: "",
  debouncedSearch: "",
  setSearch: () => {},
};

const AnimeListContext = createContext<CtxValue>(initialCtxValue);

const AnimeListProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [page, setPage] = useState(1);
  const [sliderIndex, setSliderIndex] = useImmer({
    active: 1,
    left: 0,
    right: 2,
  });

  const { data: fethedDataTopTenAnime, loading: fetchingTopTenAnime } =
    useGetTopTenAnime();
  const { data: fethedDataAnimeList, loading: fetchingAnimeList } =
    useGetAnimeList({ page, search: debouncedSearch });

  const defaultArray = [1, 2, 3, 4, 5];
  const dataAnimeList: [] = fethedDataAnimeList?.Page?.media ?? defaultArray;
  const dataTopTenAnime: [] =
    fethedDataTopTenAnime?.Page?.media ?? defaultArray;

  const handleGetSliderIndex: HandleGetSlider = (sliderIndex) => {
    setSliderIndex(sliderIndex);
  };

  const animeListProviderValue = {
    dataTopTenAnime,
    fetchingTopTenAnime,
    sliderIndex,
    setSliderIndex,
    handleGetSliderIndex,
    page,
    setPage,
    search,
    debouncedSearch,
    setSearch,
    dataAnimeList,
    fetchingAnimeList,
  };

  return (
    <AnimeListContext.Provider value={animeListProviderValue}>
      {children}
    </AnimeListContext.Provider>
  );
};

export default AnimeListProvider;

export const useAnimeListProvider = () => {
  const ctx = useContext(AnimeListContext);

  if (!ctx) {
    throw new Error("AuthContext out of boundary");
  }

  return ctx;
};
