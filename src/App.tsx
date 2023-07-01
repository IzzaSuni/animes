import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import routes from "router";

function App() {
  return (
    <Box maxWidth={"768px"} margin={"auto"}>
      <RouterProvider fallbackElement={<>loading</>} router={routes} />
    </Box>
  );
}

export default App;
