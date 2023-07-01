import { ArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { Text } from "components/Text";
import {
  Image,
  Skeleton,
} from "containersParts/animeList/TopAnimeSection/topAnimeSection.styled";
import useBreakpoints from "hooks/breakpoints";
import { useAddAnimeToCollections } from "network/mutation/resolvers";
import { useGetCollectionsMedia } from "network/query/resolver";
import { useNavigate, useParams } from "react-router-dom";

type DataProp = {
  customLists: [{ name: string; enabled: boolean }];
  media: {
    id: number;
    coverImage: { large: string };
    title: {
      romaji: string;
    };
  };
};

function CollectionListDetail() {
  const { id } = useParams();
  const { data, loading: fetching, refetch } = useGetCollectionsMedia();
  const [removeAnimeToCollection] = useAddAnimeToCollections();
  const { isDesktop } = useBreakpoints();
  const navigate = useNavigate();

  const dataMedia = data?.MediaListCollection?.lists;
  const filteredList = dataMedia?.find((data: { name: string }) => {
    return data?.name.toLowerCase() === id?.toLowerCase();
  })?.entries;

  const handleNavigate = async (name: number) => {
    navigate(`/anime-detail/${name}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = async (
    mediaId: number,
    list: [{ name: string; enabled: boolean }]
  ) => {
    const customLists = list.filter((e) => e.name !== id && e.enabled);

    try {
      await removeAnimeToCollection({
        variables: {
          mediaId,
          customLists: customLists?.map((e) => e.name),
        },
      });

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box p={2}>
        <Box display={"flex"} onClick={handleBack}>
          <ArrowLeft />
          <Text isItalic>Back</Text>
        </Box>
        <Text isItalic align="center">
          My Collections
        </Text>
        <Text align="center">{id}</Text>
        <Text>Anime List</Text>
        <Grid container>
          {filteredList?.map((data: DataProp, index: number) => {
            const title = data.media.title.romaji;
            const image = data.media.coverImage.large;

            return (
              <Grid item key={index} xs={6} md={4} p={1}>
                <Box
                  position={"relative"}
                  onClick={() => handleNavigate(data?.media?.id)}
                >
                  {fetching ? (
                    <Skeleton />
                  ) : (
                    <Image
                      srcSet=""
                      loading="lazy"
                      width={"100%"}
                      height={isDesktop ? "336px" : "230px"}
                      placeholder={title}
                      alt={title}
                      src={image}
                    />
                  )}
                  <Text
                    position={"absolute"}
                    bottom={0}
                    width={"100%"}
                    fontSize={12}
                    isBold
                    align="center"
                    bgcolor={"rgba(0,0,0,0.6)"}
                    color={"white"}
                    isItalic
                    padding={1}
                    borderRadius={"0 0 24px 24px"}
                  >
                    {title}
                  </Text>
                </Box>
                <Button
                  onClick={() =>
                    handleDelete(data?.media?.id, data?.customLists)
                  }
                  variant="text"
                >
                  Delete
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default CollectionListDetail;
