import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TitleTaskForm from "../TaskForm/TitleTaskForm";
import DescriptionTaskForm from "../TaskForm/DescriptionTaskForm";
import SelecTaskForm from "../TaskForm/SelectTaskForm";

export function EditTaskDialog({ task }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:8080/task/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erro ao atualizar tarefa");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["task"]);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog.Root onOpenChange={(open) => open && reset(task)}>
      <Dialog.Trigger asChild>
        <IconButton>
          <HiMiniPencilSquare color="#686868" />
        </IconButton>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor="white" color="#686868">
            <Dialog.Header>
              <Dialog.Title>Editar tarefa</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form id="edit-task-form" onSubmit={handleSubmit(onSubmit)}>
                <TitleTaskForm register={register} errors={errors} />
                <DescriptionTaskForm register={register} errors={errors} />
                <SelecTaskForm
                  control={control}
                  register={register}
                  errors={errors}
                />
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>

              <Button
                type="submit"
                form="edit-task-form"
                colorPalette="teal"
                loading={mutation.isPending}
              >
                Salvar
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
