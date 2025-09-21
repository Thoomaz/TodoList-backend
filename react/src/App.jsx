import { Box, Grid, Image, GridItem } from "@chakra-ui/react";
import AddTask from "./components/AddTask";
import Done from "./components/Done";
import Tasks from "./components/Tasks";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Box
      color={"#686868"}
      bgColor={"#EDF9EB"}
      w={"full"}
      h={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      fontFamily={"Sen"}
    >
      <Image src="src/assets/tuiduibg.svg" w="12vw" mt="5" />
      <Toaster color="red" />
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gapX={"2rem"}
        gapY={"1rem"}
        mt="20px"
        h="70vh"
        minW={"80vw"}
      >
        <QueryClientProvider client={queryClient}>
          <GridItem rowSpan={2} h={"16rem"}>
            <AddTask />
          </GridItem>
          <GridItem rowSpan={4} w={"40vw"}>
            <Tasks />
          </GridItem>
          <GridItem rowSpan={2} h={"full"}>
            <Done />
          </GridItem>
        </QueryClientProvider>
      </Grid>
    </Box>
  );
}
