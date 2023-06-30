import { Box, Chip, Grid } from "@mui/material";
import {
  ArrowLeft,
  Image,
} from "containersParts/animeList/TopAnimeSection/topAnimeSection.styled";
import { useGetAnimeDetail } from "network/resolver";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CoverImage } from "./animeDetail.styled";
import { Text } from "components/Text";

export default function AnimeDetail() {
  const { id } = useParams();
  const { data } = useGetAnimeDetail(Number(id));

  const media = data?.Media;
  const genres = media?.genres;
  const episodes: [] = media?.streamingEpisodes;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box width={"100%"} height={"100vh"} padding={1}>
      <Box display={"flex"} onClick={handleBack}>
        <ArrowLeft />
        <Text>Back</Text>
      </Box>
      <Text align="center" isBold>
        Anime Detail
      </Text>

      <Box position={"relative"} p={2}>
        <Image
          withShadow={false}
          width={"100%"}
          src={media?.bannerImage}
          height={"300px"}
          isRounded
          loading="lazy"
        />
        <Text align="center" isItalic>
          {media?.title?.romaji}
        </Text>

        <Text align="center">
          Episodes: {media?.episodes} | Score: {media?.averageScore} | Start
          year: {media?.startDate?.year}
        </Text>
        <Box
          py={1}
          display={"flex"}
          gap={1}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {genres?.map((genre: string) => (
            <Chip label={genre} />
          ))}
        </Box>
        <Text align="justify" isBold fontSize={16}>
          Description
        </Text>
        <Text fontSize={14} align="justify">
          {media?.description}
        </Text>
        <Box mt={1}>
          <Text>Streaming Episodes</Text>
          <Grid container>
            {episodes?.map(
              (
                {
                  url,
                  thumbnail,
                  title,
                }: { url: string; thumbnail: string; title: string },
                index
              ) => {
                return (
                  <Grid item xs={4} padding={1}>
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
              }
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
