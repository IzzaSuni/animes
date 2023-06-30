import SearchBar from "components/SearchBar";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import { Box, Grid, Pagination, PaginationItem } from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  Image,
  Skeleton,
} from "../TopAnimeSection/topAnimeSection.styled";
import { useNavigate } from "react-router-dom";
import { getAuthCode } from "network/httpRequest";

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

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const hasData = dataAnimeList?.length! > 0 && fetchingAnimeList === false;

  const handleNavigate = (id: number) => navigate(`/anime-detail/${id}`);
  console.log(getAuthCode());

  return (
    <Box
      boxShadow={"0px 1px 10px 0px rgba(0,0,0,0.2)"}
      borderRadius={"24px 24px 0 0 "}
      bgcolor={"white"}
    >
      <a href="https://anilist.co/api/v2/oauth/authorize?client_id=13317&redirect_uri=https:%2F%2Fanimes-delta.vercel.app%2F&response_type=code">
        asu
      </a>
      <Box padding="0 8px">
        <Text align="center" p={1} isBold fontSize={18} color={"#6C6C6C"}>
          Discover more Anime
        </Text>
      </Box>
      <Box padding="16px 32px">
        <SearchBar handleSearch={handleSearch} />
      </Box>

      <Box p={1} pb={4}>
        <Pagination
          count={lastPage}
          page={page}
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
        <Grid container padding={"8px"} display={"flex"}>
          {dataAnimeList?.map((data, index) => {
            return (
              <Grid
                position={"relative"}
                maxHeight={"200px"}
                item
                key={index}
                xs={4}
                padding={1}
              >
                <Box onClick={() => handleNavigate(data?.id)}>
                  {fetchingAnimeList ? (
                    <Skeleton />
                  ) : (
                    <Image
                      srcSet=""
                      loading="lazy"
                      width={"100%"}
                      placeholder={data?.title?.romaji}
                      alt={data?.title?.romaji}
                      src={data?.coverImage?.large}
                    />
                  )}
                </Box>

                <Text fontSize={12} isBold align="center">
                  {data?.title?.romaji}
                </Text>
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
