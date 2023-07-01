import { Text } from "components/Text";
import { Box } from "@mui/material";
import { ArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      height={"100vh"}
    >
      <Box display={"flex"} onClick={handleBack}>
        <ArrowLeft />
        <Text isItalic>Back</Text>
      </Box>
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
