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

function CollectionList() {
  const { data, loading: fetching, refetch } = useGetCollectionsMedia();
  const [removeAnimeToCollection, { loading: loadingChip }] =
    useAddAnimeToCollections();
  const { isDesktop } = useBreakpoints();
  const navigate = useNavigate();

  const dataMedia = data?.MediaListCollection?.lists;
  const filteredList = dataMedia?.find((data: { isCustomList: boolean }) => {
    return data?.isCustomList;
  });

  console.log(filteredList);

  // const handleNavigate = async (name: number) => {
  //   navigate(`/anime-detail/${name}`);
  // };

  // const handleDelete = async (
  //   mediaId: number,
  //   list: [{ name: string; enabled: boolean }]
  // ) => {
  //   const customLists = list.filter((e) => e.name !== id && e.enabled);

  //   try {
  //     await removeAnimeToCollection({
  //       variables: {
  //         mediaId,
  //         customLists: customLists.map((e) => e.name),
  //       },
  //     });

  //     refetch();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Box>
      <Box p={2}>
        <Text isItalic align="center">
          My Collections Lists
        </Text>
        <Grid container></Grid>
      </Box>
    </Box>
  );
}

export default CollectionList;
