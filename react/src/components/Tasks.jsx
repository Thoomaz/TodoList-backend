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
  HStack,
  Checkbox,
} from "@chakra-ui/react";

import { GiPoisonCloud } from "react-icons/gi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteButtonDialog from "./Modals/DeleteButtonDialog";
import { EditTaskDialog } from "./Modals/EditTaskDialog";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const fetchTasks = async () => {
  const { data } = await api.get("/task");
  return data;
};

const updateTask = async (task) => {
  const { data } = await api.put(`/task/${task.id}`, {
    ...task,
    done: !task.done,
  });
  return data;
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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
  });

  const handleToggleDone = (task) => {
    mutation.mutate(task);
  };

  const borderColors = {
    0: "#EF7575",
    1: "#FFEE6A",
    2: "#91EA71",
  };

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
            {dados.filter((item) => !item.done).length === 0 &&
            !isLoading &&
            !isError ? (
              <Center h={"60vh"}>
                <VStack>
                  <MdOutlineTaskAlt size={"3rem"} />
                  <Text fontSize={"lg"}>Sua lista de tarefas está vazia.</Text>
                </VStack>
              </Center>
            ) : (
              dados
                .filter((item) => !item.done)
                .sort((a, b) => a.priority - b.priority)
                .map((item) => (
                  <Box key={item.id}>
                    <Collapsible.Root
                      unmountOnExit
                      rounded={"xl"}
                      shadow={"xs"}
                      mt={2}
                      mb={2}
                      mr={3}
                      borderWidth="1px"
                      borderStyle="solid"
                      borderColor={borderColors[item.priority] || "gray"}
                    >
                      <HStack justifyContent={"space-between"}>
                        <Checkbox.Root
                          pl={3}
                          checked={item.done}
                          onCheckedChange={() => handleToggleDone(item)}
                          variant={"outline"}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control cursor={"pointer"} />
                        </Checkbox.Root>
                        <Collapsible.Trigger
                          paddingY="3"
                          cursor={"pointer"}
                          w={"70%"}
                          textAlign={"left"}
                        >
                          <strong>{item.title}</strong>
                        </Collapsible.Trigger>
                        <HStack pr={2}>
                          <EditTaskDialog task={item} />
                          <DeleteButtonDialog taskId={item.id} />
                        </HStack>
                      </HStack>
                      <Collapsible.Content minW={"10rem"}>
                        <Separator
                          m={1}
                          borderColor={borderColors[item.priority] || "gray"}
                        />
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
                ))
            )}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar bg="teal.900">
          <ScrollArea.Thumb bg="teal.600" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Box>
  );
}
