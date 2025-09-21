import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { HiOutlineTrash } from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteButtonDialog({ taskId }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/task/${taskId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar tarefa");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
  });

  return (
    <Dialog.Root role="alertdialog" size={"sm"}>
      <Dialog.Trigger asChild>
        <IconButton>
          <HiOutlineTrash color="#EF7575" />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor={"white"} color={"#686868"}>
            <Dialog.Header>
              <Dialog.Title>Tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Esta ação irá deletar a tarefa e não pode ser desfeita.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="red"
                  onClick={() => mutation.mutate(taskId)}
                  isLoading={mutation.isPending}
                >
                  Deletar
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="xs" variant={"plain"} color={"#686868"} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
