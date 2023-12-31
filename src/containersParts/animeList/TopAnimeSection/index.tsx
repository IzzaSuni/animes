import { Box } from "@mui/material";
import {
  AnimeCardContainer,
  AnimeTitleWrapper,
  CarouselCard,
  CarouselWrapper,
  Image,
  Skeleton,
} from "./topAnimeSection.styled";
import Carousel from "components/Carousel";
import { useAnimeListProvider } from "context/animeListContext";
import { Text } from "components/Text";
import { useNavigate } from "react-router-dom";
import useBreakpoints from "hooks/breakpoints";

export default function TopAnimeSection() {
  const { dataTopTenAnime, fetchingDataTopTenAnimes, handleGetSliderIndex } =
    useAnimeListProvider();
  const navigate = useNavigate();

  const { isDesktop } = useBreakpoints();

  const handleNavigate = (id: number, isDouble: boolean = false) => {
    return navigate(`/anime-detail/${id}`);
  };

  return (
    <>
      <Box padding="8px">
        <Text align="center" isBold fontSize={24} color={"#6C6C6C"}>
          Top 10 Anime
        </Text>
      </Box>
      <Box>
        <CarouselWrapper isDesktop={isDesktop}>
          <Carousel handleGetSliderIndex={handleGetSliderIndex}>
            {dataTopTenAnime?.map((e: any, index) => {
              if (fetchingDataTopTenAnimes) {
                return (
                  <Box key={index} height={"300px"}>
                    <Skeleton />
                  </Box>
                );
              }

              return (
                <CarouselCard key={index}>
                  <AnimeCardContainer
                    flexDirection={"column"}
                    justifyContent={"end"}
                    borderRadius={"24px"}
                    bgcolor={"white"}
                    display={"flex"}
                    height={"270px"}
                    onClick={() => handleNavigate(e?.id)}
                  >
                    <Image
                      loading="lazy"
                      alt={e?.title?.romaji}
                      src={e?.coverImage?.extraLarge}
                    />
                    <AnimeTitleWrapper>
                      <Text isItalic color="white" align="center">
                        {e?.title?.romaji.toUpperCase()}
                      </Text>
                    </AnimeTitleWrapper>
                  </AnimeCardContainer>
                </CarouselCard>
              );
            })}
          </Carousel>
        </CarouselWrapper>
      </Box>
    </>
  );
}
