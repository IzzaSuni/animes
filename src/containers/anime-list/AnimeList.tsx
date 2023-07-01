import { Box } from "@mui/material";
import React from "react";
import { Text } from "components/Text";
import AnimeListProvider from "context/animeListContext";
import TopAnimeSection from "containersParts/animeList/TopAnimeSection";
import DiscoverAnimeSection from "containersParts/animeList/DiscoverSection";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "containersParts/animeList/TopAnimeSection/topAnimeSection.styled";

function AnimeListComponent() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/collections");
  };

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

        <Box
          onClick={handleNavigate}
          position={"absolute"}
          right={"8px"}
          display={"flex"}
        >
          <Text fontSize={14}>My Collections</Text>
          <ArrowRight />
        </Box>
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
