import { Box } from "@mui/material";
import {
  AnimeCardContainer,
  AnimeTitleWrapper,
  ArrowRight,
  CarouselCard,
  CarouselWrapper,
  Image,
  Skeleton,
} from "./topAnimeSection.styled";
import Carousel from "components/Carousel";
import { useAnimeListProvider } from "context/animeListContext";
import { Text } from "components/Text";
import { useNavigate } from "react-router-dom";

export default function TopAnimeSection() {
  const { dataTopTenAnime, fetchingTopTenAnime, handleGetSliderIndex } =
    useAnimeListProvider();
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate("/collections");
  };

  return (
    <>
      <Box padding="8px" display={"flex"} justifyContent={"space-between"}>
        <Text isBold fontSize={18} color={"#6C6C6C"}>
          Top Anime
        </Text>
        <Box display={"flex"} alignItems={"center"}>
          <Text onClick={handleSeeMore} isBold fontSize={14} color={"#6C6C6C"}>
            See more
          </Text>
          <ArrowRight />
        </Box>
      </Box>
      <Box>
        <CarouselWrapper>
          <Carousel handleGetSliderIndex={handleGetSliderIndex}>
            {dataTopTenAnime?.map((e: any, index) => {
              if (fetchingTopTenAnime) {
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
