import { ArrowLeft } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Skeleton } from "@mui/material";
import { Text } from "components/Text";
import { Image } from "containersParts/animeList/TopAnimeSection/topAnimeSection.styled";
import useBreakpoints from "hooks/breakpoints";
import { useCreateCollections } from "network/mutation/resolvers";
import { useGetCollectionsMedia } from "network/query/resolver";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CollectionList() {
  const { data, loading: fetching, refetch } = useGetCollectionsMedia();
  const { isDesktop } = useBreakpoints();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [adjustCollections, { loading }] = useCreateCollections();

  const navigate = useNavigate();
  const dataMedia = data?.MediaListCollection?.lists;
  const filteredList = dataMedia?.filter((data: { isCustomList: boolean }) => {
    return data?.isCustomList;
  });

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = async () => {
    const prevList = filteredList.map((list: any) => {
      return list?.name;
    });

    const filteredCollections = prevList?.filter(
      (list: string) => list !== name
    );

    try {
      await adjustCollections({
        variables: {
          animeListOptions: {
            customLists: filteredCollections,
          },
        },
      });
      refetch();
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Box p={2}>
        <Box position={"absolute"} display={"flex"} onClick={handleBack}>
          <ArrowLeft />
          <Text isItalic>Back</Text>
        </Box>
        <Text isItalic align="center">
          My Collections Lists
        </Text>
        <Grid container>
          {filteredList?.map(
            (e: { name: string; entries: any }, index: number) => {
              const media = e.entries[0].media;
              const coverImage = media?.coverImage?.extraLarge;

              return (
                <Grid key={index} item xs={6} md={4} padding={2}>
                  <Link to={`/collections/${e.name}`}>
                    <Text align="center">{e?.name}</Text>

                    <Box position={"relative"}>
                      {fetching || !coverImage ? (
                        <Skeleton />
                      ) : (
                        <Image
                          loading="lazy"
                          width={"100%"}
                          height={isDesktop ? "336px" : "230px"}
                          placeholder={e.name}
                          alt={e.name}
                          src={coverImage}
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
                        {e.name}
                      </Text>
                    </Box>
                  </Link>

                  <Button
                    onClick={() => {
                      setOpen(true);
                      setName(e?.name);
                    }}
                    disabled={loading}
                    variant="text"
                  >
                    Delete
                  </Button>
                </Grid>
              );
            }
          )}
        </Grid>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          height={"100vh"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box
            width={"300px"}
            height={"100px"}
            margin={"auto"}
            bgcolor={"white"}
            borderRadius={"32px"}
            padding={2}
          >
            <Text align="center">Anda yakin</Text>
            <Box justifyContent={"center"} p={2} display={"flex"} gap={1}>
              <Button onClick={() => handleDelete()}>Ya</Button>
              <Button onClick={handleClose}>Tidak</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default CollectionList;
