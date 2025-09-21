import {
  Box,
  Heading,
  Separator,
  VStack,
  Text,
  HStack,
  Checkbox,
  Collapsible,
  ScrollArea,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteButtonDialog from "./Modals/DeleteButtonDialog";
import { EditTaskDialog } from "./Modals/EditTaskDialog";
import { GiThink } from "react-icons/gi";
const fetchTasks = async () => {
  const res = await fetch("http://localhost:8080/task");
  return res.json();
};

const updateTask = async (task) => {
  const res = await fetch(`http://localhost:8080/task/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, done: !task.done }),
  });
  return res.json();
};

export default function Done() {
  const queryClient = useQueryClient();

  const { data: dados = [] } = useQuery({
    queryKey: ["task"],
    queryFn: fetchTasks,
  });

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
  });

  const handleToggleDone = (task) => {
    mutation.mutate(task);
  };

  const concluidas = dados.filter((item) => item.done);

  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      shadow={"0px 2px 6px gray"}
      p={"3"}
      overflow={"hidden"}
    >
      <Heading size={"2xl"} fontFamily={"Sen"}>
        Concluídas
      </Heading>
      <Separator borderColor={"#686868"} />
      <ScrollArea.Root h={"80%"} size={"sm"}>
        <ScrollArea.Viewport>
          <ScrollArea.Content>
            {concluidas.length === 0 ? (
              <AbsoluteCenter w={"20rem"}>
                <VStack>
                  <GiThink size={"2.5rem"} />
                  <Text fontSize={"md"}>Nenhuma tarefa concluída.</Text>
                </VStack>
              </AbsoluteCenter>
            ) : (
              concluidas.map((item) => (
                <Collapsible.Root
                  key={item.id}
                  unmountOnExit
                  rounded={"xl"}
                  shadow={"xs"}
                  mt={2}
                  mb={2}
                  mr={3}
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="gray"
                >
                  <HStack justifyContent={"space-between"}>
                    <Checkbox.Root
                      pl={3}
                      checked={item.done}
                      onCheckedChange={() => handleToggleDone(item)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
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
                    <Separator m={1} borderColor="gray" />
                    <Box padding="4" color={"black"} border={"none"}>
                      <p>{item.description}</p>
                    </Box>
                  </Collapsible.Content>
                </Collapsible.Root>
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
