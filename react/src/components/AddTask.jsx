import { Box, Button, HStack, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TitleTaskForm from "./TaskForm/TitleTaskForm";
import DescriptionTaskForm from "./TaskForm/DescriptionTaskForm";
import SelecTaskForm from "./TaskForm/SelectTaskForm";
import { toaster } from "./ui/toaster";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddTask() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const queryClient = useQueryClient();

  const addTarefaMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:8080/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      toaster.success({
        description: "Tarefa adicionada com sucesso.",
        color: "white",
        duration: 2000,
        closable: true,
      });

      queryClient.invalidateQueries({ queryKey: ["task"] });
    },
    onError: () => {
      toaster.error({
        description: "Erro ao adicionar tarefa.",
        duration: 2000,
        closable: true,
      });
    },
  });

  const onSubmit = (data) => {
    addTarefaMutation.mutate(data);
    console.log(data);
  };

  return (
    <Box
      rounded="md"
      h={"full"}
      bgColor={"white"}
      overflow={"hidden"}
      shadow={"0px 2px 6px gray"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" p={4} gap={1}>
          <TitleTaskForm register={register} errors={errors} />

          <DescriptionTaskForm register={register} errors={errors} />

          <HStack align="end" gapX={5}>
            <SelecTaskForm
              control={control}
              register={register}
              errors={errors}
            />
            <Button
              type="submit"
              rounded={"xl"}
              bgColor={"#609398"}
              color={"white"}
              flexShrink={0}
              w={"10vw"}
              fontSize={"lg"}
              loading={addTarefaMutation.isPending}
            >
              Adicionar
            </Button>
          </HStack>
        </Flex>
      </form>
    </Box>
  );
}
