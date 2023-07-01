import { Box, Button, Chip, Input } from "@mui/material";
import { Text } from "components/Text";
import { useAnimeListProvider } from "context/animeListContext";
import { useCreateCollections } from "network/mutation/resolvers";

export default function MenuCollections() {
  const { collectionsList, refetchAnimeDetail, refetchAnimeListCollections } =
    useAnimeListProvider();
  const [addColections, { data }] = useCreateCollections();

  const handleAddColection = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const collectionName = target["collectionsName"].value;
    const prevList = collectionsList.map((list: any) => {
      const isString = typeof list === "string";
      if (isString) return list;
      else return list?.name;
    });
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

  const handleDelete = async (deletedName: any) => {
    const prevList = collectionsList.map((list: any) => {
      const isString = typeof list === "string";
      if (isString) return list;
      else return list?.name;
    });

    const filteredCollections = prevList?.filter(
      (list: { name: string }) => list !== deletedName
    );

    try {
      await addColections({
        variables: {
          animeListOptions: {
            customLists: filteredCollections,
          },
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
      <Box display={"flex"} gap={1}>
        {collectionsList?.map((prop: any, index: number) => {
          const isPropString = typeof prop === "string";

          console.log(prop);
          const collectionName = isPropString ? prop : prop?.name;
          const chipVariant = isPropString
            ? "outlined"
            : prop.enabled
            ? "filled"
            : "outlined";

          return (
            <Chip
              onDelete={() => handleDelete(collectionName)}
              variant={chipVariant}
              label={collectionName}
            />
          );
        })}
      </Box>

      <Text my={2} fontSize={14}>
        Add new collections
      </Text>
      <form onSubmit={handleAddColection}>
        <Box display={"flex"} gap={2}>
          <Input name="collectionsName" />
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
}
