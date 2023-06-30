import { Box } from "@mui/material";
import React from "react";
import { Text } from "components/Text";
import AnimeListProvider from "context/animeListContext";
import TopAnimeSection from "containersParts/animeList/TopAnimeSection";
import DiscoverAnimeSection from "containersParts/animeList/DiscoverSection";

function AnimeListComponent() {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"center"} my={2}>
        <Text isBold fontSize={16}>
          Anime List App
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
