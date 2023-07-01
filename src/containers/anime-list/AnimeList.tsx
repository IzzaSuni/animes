import { Box } from "@mui/material";
import React from "react";
import { Text } from "components/Text";
import AnimeListProvider from "context/animeListContext";
import TopAnimeSection from "containersParts/animeList/TopAnimeSection";
import DiscoverAnimeSection from "containersParts/animeList/DiscoverSection";

function AnimeListComponent() {
  return (
    <Box>
      <Box
        bgcolor={"white"}
        borderRadius={"0 0 32px 32px"}
        boxShadow={"0px 1px 10px 0px rgba(0,0,0,0.2)"}
        display={"flex"}
        justifyContent={"center"}
        p={1}
      >
        <Text isItalic fontSize={16}>
          Anime Info
        </Text>
      </Box>
      <TopAnimeSection />
      <DiscoverAnimeSection />
    </Box>
  );
}

function AnimeList() {
  return (
    <AnimeListProvider>
      <AnimeListComponent />
    </AnimeListProvider>
  );
}

export default AnimeList;
