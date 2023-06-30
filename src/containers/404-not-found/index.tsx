import { Text } from "components/Text";
import { Box } from "@mui/material";

function NotFoundPage() {
  return (
    <Box
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      height={"100vh"}
    >
      <Text fontSize={24} align="center">
        404 Not found
      </Text>
      <Text fontSize={24} align="center">
        Sorry there is no anime in here :(
      </Text>
    </Box>
  );
}

export default NotFoundPage;
