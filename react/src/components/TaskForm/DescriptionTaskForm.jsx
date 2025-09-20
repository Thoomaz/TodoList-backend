import { Field, Textarea } from "@chakra-ui/react";

export default function DescriptionTaskForm({ register, errors }) {
  return (
    <Field.Root invalid={!!errors.descricaoDaTarefa}>
      <Field.Label fontSize={"md"}>Descrição da tarefa</Field.Label>
      <Textarea
        {...register("descricaoDaTarefa", { required: true })}
        color={"black"}
        resize="none"
        border={"1px solid gray"}
        rounded={"xl"}
        required
      />
      <Field.ErrorText>{errors.descricaoDaTarefa?.message}</Field.ErrorText>
    </Field.Root>
  );
}
