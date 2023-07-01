import { Box, Button, Chip, Grid } from "@mui/material";
import {
  ArrowLeft,
  Image,
} from "containersParts/animeList/TopAnimeSection/topAnimeSection.styled";
import { Link, useNavigate } from "react-router-dom";
import { Text } from "components/Text";

import Carousel from "components/Carousel";
import useBreakpoints from "hooks/breakpoints";
import AnimeListProvider, {
  useAnimeListProvider,
} from "context/animeListContext";

export type Episodes = { url: string; thumbnail: string; title: string };

export type Characters = [{ name: { full: string }; image: { large: string } }];

function AnimeDetailComponent() {
  const { isDesktop } = useBreakpoints();
  const { setOpenModal } = useAnimeListProvider();
  const { mediaAnimeDetail } = useAnimeListProvider();

  const genres = mediaAnimeDetail?.genres;
  const episodes: [] = mediaAnimeDetail?.streamingEpisodes;
  const hasEpisode = episodes?.length > 0;
  const characters: Characters = mediaAnimeDetail?.characters?.nodes;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box width={"100%"} height={"100vh"} padding={1}>
      <Box display={"flex"} onClick={handleBack}>
        <ArrowLeft />
        <Text isItalic>Back</Text>
      </Box>
      <Text align="center" isBold>
        Anime Detail
      </Text>

      <Box position={"relative"} p={2}>
        <Image
          withShadow={false}
          width={"100%"}
          src={mediaAnimeDetail?.bannerImage}
          height={"300px"}
          isRounded
          loading="lazy"
        />
        <Text align="center" isItalic>
          {mediaAnimeDetail?.title?.romaji}
        </Text>

        <Text align="center">
          Episodes: {mediaAnimeDetail?.episodes} | Score:{" "}
          {mediaAnimeDetail?.averageScore} | Start year:{" "}
          {mediaAnimeDetail?.startDate?.year}
        </Text>
        <Box
          py={1}
          display={"flex"}
          gap={1}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {genres?.map((genre: string) => (
            <Chip key={genre} label={genre} />
          ))}
        </Box>
        <Box p={2} display={"flex"} justifyContent={"center"}>
          <Button onClick={handleOpenModal} variant="contained">
            Add To Collections
          </Button>
        </Box>
        <Text align="justify" isItalic isBold fontSize={16}>
          Description
        </Text>
        <Text fontSize={14} align="justify">
          {mediaAnimeDetail?.description}
        </Text>
        <Box mt={1}>
          <Text isItalic fontSize={16}>
            Characters
          </Text>
          <Carousel>
            {characters?.map(({ name: { full }, image: { large } }, index) => {
              return (
                <Box key={full} padding={1}>
                  <Image height={isDesktop ? "160px" : "80px"} src={large} />
                  <Text align="center">{full}</Text>
                </Box>
              );
            })}
          </Carousel>
        </Box>
        {hasEpisode && (
          <Box mt={1}>
            <Text isItalic fontSize={16}>
              Streaming Episodes
            </Text>
            <Grid container>
              {episodes?.map(({ url, thumbnail, title }: Episodes, index) => {
                return (
                  <Grid key={title} item xs={4} padding={1}>
                    <Box>
                      <Link to={url}>
                        <Image
                          height={"100px"}
                          width={"100%"}
                          src={thumbnail}
                        />
                        <Text fontSize={12}>{title}</Text>
                      </Link>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default function AnimeDetail() {
  return (
    <AnimeListProvider>
      <AnimeDetailComponent />
    </AnimeListProvider>
  );
}
