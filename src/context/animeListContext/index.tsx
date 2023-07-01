import {
  useGetAnimeDetail,
  useGetAnimeList,
  useGetCollections,
  useGetTopTenAnime,
} from "network/query/resolver";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { HandleGetSlider, SliderIndex } from "./animeListContext.types";
import { Updater, useImmer } from "use-immer";
import { useDebounce } from "usehooks-ts";
import useBreakpoints from "hooks/breakpoints";
import { useParams } from "react-router-dom";
import { Alert, Drawer, Snackbar } from "@mui/material";
import MenuCollections from "containers/anime-list/[id]/collectionsMenu";

interface CtxValue {
  dataTopTenAnime?: any[];
  fetchingDataTopTenAnimes?: boolean;
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
  lastPage: number;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  mediaAnimeDetail: any;
  collectionsList: any;
  refetchAnimeDetail: () => void;
  refetchAnimeListCollections: () => void;
  setSnackbar: Updater<{ open: boolean; message: string }>;
}

const initialCtxValue = {
  dataTopTenAnime: [1, 2, 3, 4, 5],
  fetchingDataTopTenAnimes: false,
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
  lastPage: 1,
  openModal: false,
  setOpenModal: () => {},
  mediaAnimeDetail: {
    genres: [],
    streamingEpisodes: { episodes: [] },
    characters: [],
  },
  collectionsList: [],
  refetchAnimeDetail: () => {},
  refetchAnimeListCollections: () => {},
  setSnackbar: () => {},
};

const AnimeListContext = createContext<CtxValue>(initialCtxValue);

const AnimeListProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useImmer({
    open: false,
    message: "",
  });
  const [sliderIndex, setSliderIndex] = useImmer({
    active: 1,
    left: 0,
    right: 2,
  });

  const { id } = useParams();
  const { isDesktop } = useBreakpoints();

  const {
    data: fethedDataAnimeList,
    loading: fetchingAnimeList,
    previousData,
  } = useGetAnimeList({ page, search: debouncedSearch, id });
  const {
    data: fetchedanimeCollectionList,
    refetch: refetchAnimeListCollections,
  } = useGetCollections();
  const { data: fethedDataTopTenAnimes, loading: fetchingDataTopTenAnime } =
    useGetTopTenAnime(id);
  const { data: fetchedDataAnimeDetail, refetch: refetchAnimeDetail } =
    useGetAnimeDetail(Number(id));

  const mediaAnimeDetail = fetchedDataAnimeDetail?.Media;
  const defaultArray = [1, 2, 3, 4, 5];
  const dataAnimeList: [] = fethedDataAnimeList?.Page?.media ?? defaultArray;
  const lastPageFethced = fethedDataAnimeList?.Page?.pageInfo.lastPage;
  const collectionsListFromUser =
    fetchedanimeCollectionList?.User?.mediaListOptions?.animeList?.customLists;

  const mediaListOptions =
    fetchedDataAnimeDetail?.Media?.mediaListEntry?.customLists;
  const collectionsList = mediaListOptions ?? collectionsListFromUser;

  const lastPage = useMemo(
    () => lastPageFethced ?? 555,
    [lastPageFethced, previousData]
  );

  const dataTopTenAnime: [] =
    fethedDataTopTenAnimes?.Page?.media ?? defaultArray;

  const handleGetSliderIndex: HandleGetSlider = (sliderIndex) => {
    setSliderIndex(sliderIndex);
  };

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => {
      prev.open = false;
    });

  const animeListProviderValue = {
    dataTopTenAnime,
    fetchingDataTopTenAnime,
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
    lastPage,
    openModal,
    setOpenModal,
    mediaAnimeDetail,
    collectionsList,
    refetchAnimeDetail,
    refetchAnimeListCollections,
    setSnackbar,
  };

  return (
    <AnimeListContext.Provider value={animeListProviderValue}>
      {children}
      <Drawer
        anchor="bottom"
        open={openModal}
        PaperProps={{
          style: {
            borderRadius: "24px 24px 0 0",
            width: isDesktop ? "768px" : "100%",
            margin: "auto",
          },
        }}
        onClose={() => setOpenModal(false)}
      >
        <MenuCollections />
      </Drawer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
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
