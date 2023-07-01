import { Box, Button, Chip, Input } from "@mui/material";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import {
  useAddAnimeToCollections,
  useCreateCollections,
} from "network/mutation/resolvers";
import Check from "@mui/icons-material/CheckCircleOutlineSharp";
import Cross from "@mui/icons-material/CloseSharp";
import Link from "@mui/icons-material/LaunchOutlined";
import { useNavigate } from "react-router-dom";

export default function MenuCollections() {
  const {
    collectionsList,
    refetchAnimeDetail,
    refetchAnimeListCollections,
    setSnackbar,
    mediaAnimeDetail,
  } = useAnimeListProvider();
  const [addColections, { data, loading }] = useCreateCollections();
  const [addAnimeToCollection, { loading: loadingChip }] =
    useAddAnimeToCollections();
  const navigate = useNavigate();

  const prevList: [] = collectionsList?.map((list: any) => {
    const isString = typeof list === "string";
    if (isString) return list;
    else return list?.name;
  });

  const handleAddColection = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const collectionName = target["collectionsName"].value;
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const isNameInValid = format.test(collectionName);

    if (isNameInValid) {
      return setSnackbar((snackbar) => {
        snackbar.open = true;
        snackbar.message = "Maaf nama tidak boleh ada karakter spesial";
      });
    }

    if (!collectionName)
      return setSnackbar((snackbar) => {
        snackbar.open = true;
        snackbar.message = "Maaf nama tidak boleh kosong";
      });

    const isSameName = prevList.find((name) => name === collectionName);

    if (isSameName) {
      return setSnackbar((snackbar) => {
        snackbar.open = true;
        snackbar.message = "Maaf nama tersebut sudah ada";
      });
    }

    try {
      await addColections({
        variables: {
          animeListOptions: {
            customLists: [...prevList, collectionName],
          },
        },
      });

      refetchAnimeDetail();
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = async (name: string) => {
    navigate(`/collections/${name}`);
  };

  const handleAddAnimeToCollections = async (colectionName: string) => {
    let customLists: [string?] = [];

    console.log(collectionsList);

    collectionsList?.forEach((e: { enabled: boolean; name: string }) => {
      if (typeof e === "string") {
        customLists.push(colectionName);
      }

      if (e.enabled) {
        if (e.name !== colectionName) customLists.push(e?.name);
      } else {
        if (e.name === colectionName) customLists.push(e?.name);
      }
    });

    try {
      await addAnimeToCollection({
        variables: {
          mediaId: mediaAnimeDetail?.id,
          customLists,
        },
      });

      refetchAnimeDetail();
      refetchAnimeListCollections();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      width={"100%"}
      margin={"auto"}
      height={"60vh"}
      bgcolor={"white"}
      borderRadius={"16px"}
      padding={2}
    >
      <Text align="center">My Collections List</Text>
      <Text my={1} fontSize={14}>
        Select collection you want to add this anime to
      </Text>
      <Box display={"flex"} gap={1} flexWrap={"wrap"}>
        {collectionsList?.map((prop: any, index: number) => {
          const isPropString = typeof prop === "string";
          const isChecked = isPropString ? false : prop.enabled ? true : false;

          const collectionName = isPropString ? prop : prop?.name;
          const chipVariant = isChecked ? "filled" : "outlined";
          const icon = isChecked ? <Check /> : <Cross />;

          return (
            <Chip
              icon={icon}
              onDelete={() => handleNavigate(collectionName)}
              color="success"
              variant={chipVariant}
              label={collectionName}
              onClick={() => handleAddAnimeToCollections(collectionName)}
              disabled={loadingChip}
              deleteIcon={<Link />}
            />
          );
        })}
      </Box>

      <Text my={2} fontSize={14}>
        Add new collections
      </Text>
      <form onSubmit={handleAddColection}>
        <Box display={"flex"} gap={2}>
          <Input fullWidth disabled={loading} name="collectionsName" />
          <Button disabled={loading} type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}
