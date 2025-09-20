import { Field, Input } from "@chakra-ui/react";

export default function TitleTaskForm({ register, errors }) {
  return (
    <Field.Root invalid={!!errors.tituloDaTarefa}>
      <Field.Label fontSize={"md"}>Título da tarefa</Field.Label>
      <Input
        {...register("tituloDaTarefa", { required: true })}
        color={"black"}
        border={"1px solid gray"}
        rounded={"xl"}
        required
      />
      <Field.ErrorText>{errors.tituloDaTarefa?.message}</Field.ErrorText>
    </Field.Root>
  );
}
