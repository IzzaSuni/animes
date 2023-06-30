import SearchBar from "components/SearchBar";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import { Box, Grid } from "@mui/material";
import { Image, Skeleton } from "../TopAnimeSection/topAnimeSection.styled";

export default function DiscoverAnimeSection() {
  const { dataAnimeList, fetchingAnimeList } = useAnimeListProvider();

  console.log(dataAnimeList);
  return (
    <>
      <Box padding="16px 32px">
        <SearchBar />
      </Box>
      <Box padding="0 8px">
        <Text isBold fontSize={18} color={"#6C6C6C"}>
          Discover Anime
        </Text>
      </Box>
      <Box>
        <Grid container padding={"8px"} display={"flex"}>
          {dataAnimeList?.map((data, index) => {
            return (
              <Grid item key={index} xs={6} padding={1}>
                <Box>
                  {fetchingAnimeList ? (
                    <Skeleton />
                  ) : (
                    <Image
                      width={"100%"}
                      alt={data?.title?.romaji}
                      src={data?.coverImage?.extraLarge}
                    />
                  )}
                </Box>

                <Text align="center">{data?.title?.romaji}</Text>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
}
