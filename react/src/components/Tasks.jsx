import {
  Box,
  Separator,
  Heading,
  Collapsible,
  ScrollArea,
  Spinner,
  Center,
  VStack,
  Text,
} from "@chakra-ui/react";
import { GiPoisonCloud } from "react-icons/gi";
import { HiMiniPencilSquare } from "react-icons/hi2";

import { useQuery } from "@tanstack/react-query";

const fetchTasks = async () => {
  const res = await fetch("http://localhost:8080/task");
  return res.json();
};
export default function Tasks() {
  const {
    data: dados = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: fetchTasks,
  });

  const loading = () => {
    if (isLoading)
      return (
        <Center h={"full"}>
          <Spinner size="xl" />
        </Center>
      );
    if (isError)
      return (
        <Center h={"full"}>
          <VStack>
            <GiPoisonCloud size={"3rem"} />
            <Text>Erro ao carregar tarefas.</Text>
          </VStack>
        </Center>
      );
  };

  const borderColors = {
    0: "#EF7575",
    1: "#FFEE6A",
    2: "#91EA71",
  };
  const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      shadow={"0px 2px 6px gray"}
      p={"3"}
    >
      <Heading size={"2xl"} fontFamily={"Sen"}>
        Tarefas
      </Heading>
      <Separator />

      <ScrollArea.Root h={"62vh"} size={"sm"}>
        <ScrollArea.Viewport>
          {loading()}
          <ScrollArea.Content spaceY="4" textStyle="sm">
            {dados
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((item) => (
                <Box key={item.id}>
                  <Collapsible.Root
                    unmountOnExit
                    rounded={"xl"}
                    shadow={"xs"}
                    mt={2}
                    mr={3}
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor={borderColors[item.priority] || "gray"}
                  >
                    <Collapsible.Trigger
                      paddingY="3"
                      cursor={"pointer"}
                      pl={4}
                      pr={4}
                    >
                      <strong>{item.title}</strong>
                    </Collapsible.Trigger>

                    <Collapsible.Content minW={"10rem"}>
                      <Separator m={1} />
                      <Box
                        padding="4"
                        borderWidth="1px"
                        color={"black"}
                        border={"none"}
                      >
                        <p>{item.description}</p>
                      </Box>
                    </Collapsible.Content>
                  </Collapsible.Root>
                </Box>
              ))}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar bg="teal.900">
          <ScrollArea.Thumb bg="teal.600" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Box>
  );
}
