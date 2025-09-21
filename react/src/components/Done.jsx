import { Box, Heading, Separator } from "@chakra-ui/react";

export default function Done() {
  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      shadow={"0px 2px 6px gray"}
      p={"3"}
    >
      <Heading size={"2xl"} fontFamily={"Sen"}>
        Concluídas
      </Heading>
      <Separator borderColor={"#686868"} />
    </Box>
  );
}
