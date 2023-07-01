import SearchBar from "components/SearchBar";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import { Box, Grid, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCollections } from "network/resolver";
import {
  ArrowLeft,
  ArrowRight,
  Image,
  Skeleton,
} from "../TopAnimeSection/topAnimeSection.styled";
import useBreakpoints from "hooks/breakpoints";

export default function DiscoverAnimeSection() {
  const {
    dataAnimeList,
    fetchingAnimeList,
    setSearch,
    debouncedSearch,
    page,
    setPage,
    lastPage,
  } = useAnimeListProvider();
  const navigate = useNavigate();
  const { isDesktop } = useBreakpoints();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // const { data } = useGetCollections(1);

  const hasData = dataAnimeList?.length! > 0 && fetchingAnimeList === false;
  const handleNavigate = (id: number) => navigate(`/anime-detail/${id}`);

  return (
    <Box
      boxShadow={"0px 1px 10px 0px rgba(0,0,0,0.2)"}
      borderRadius={"24px 24px 0 0 "}
      bgcolor={"white"}
      padding={1}
      margin={1}
    >
      <Box padding="0 8px">
        <Text align="center" p={1} isBold fontSize={18} color={"#6C6C6C"}>
          Discover more Anime
        </Text>
      </Box>
      <Box padding="16px 32px">
        <SearchBar handleSearch={handleSearch} />
      </Box>

      <Box pb={4} justifyContent={"center"} display={"flex"}>
        <Pagination
          count={lastPage}
          size={isDesktop ? "large" : "small"}
          page={page}
          boundaryCount={1}
          onChange={(e, page) => setPage(page)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowLeft, next: ArrowRight }}
              {...item}
            />
          )}
        />
      </Box>

      <Box>
        <Grid
          flex={1}
          alignItems={"baseline"}
          container
          padding={1}
          display={"flex"}
        >
          {dataAnimeList?.map((data, index) => {
            return (
              <Grid item key={index} xs={6} md={4} p={1}>
                <Box
                  position={"relative"}
                  onClick={() => handleNavigate(data?.id)}
                >
                  {fetchingAnimeList ? (
                    <Skeleton />
                  ) : (
                    <Image
                      srcSet=""
                      loading="lazy"
                      width={"100%"}
                      height={isDesktop ? "336px" : "230px"}
                      placeholder={data?.title?.romaji}
                      alt={data?.title?.romaji}
                      src={data?.coverImage?.large}
                    />
                  )}
                  <Text
                    position={"absolute"}
                    bottom={0}
                    width={"100%"}
                    fontSize={12}
                    isBold
                    align="center"
                    bgcolor={"rgba(0,0,0,0.6)"}
                    color={"white"}
                    isItalic
                    padding={1}
                    borderRadius={"0 0 24px 24px"}
                  >
                    {data?.title?.romaji}
                  </Text>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {!hasData && (
          <Text align="center">
            Maaf tidak ada anime dengan key {debouncedSearch ?? "tersebut"}
          </Text>
        )}
      </Box>
    </Box>
  );
}
