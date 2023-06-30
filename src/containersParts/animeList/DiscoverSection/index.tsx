import SearchBar from "components/SearchBar";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import { Box, Grid } from "@mui/material";
import { Image, Skeleton } from "../TopAnimeSection/topAnimeSection.styled";

export default function DiscoverAnimeSection() {
  const { dataAnimeList, fetchingAnimeList, setSearch, debouncedSearch } =
    useAnimeListProvider();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const hasData = dataAnimeList?.length! > 0 && fetchingAnimeList === false;

  return (
    <>
      <Box padding="0 8px">
        <Text isBold fontSize={18} color={"#6C6C6C"}>
          Discover more Anime
        </Text>
      </Box>
      <Box padding="16px 32px">
        <SearchBar handleSearch={handleSearch} />
      </Box>
      <Box>
        <Grid container padding={"8px"} display={"flex"}>
          {dataAnimeList?.map((data, index) => {
            return (
              <Grid item key={index} xs={4} padding={1}>
                <Box>
                  {fetchingAnimeList ? (
                    <Skeleton />
                  ) : (
                    <Image
                      loading="lazy"
                      width={"100%"}
                      placeholder={data?.title?.romaji}
                      alt={data?.title?.romaji}
                      src={data?.coverImage?.extraLarge}
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
    </>
  );
}
