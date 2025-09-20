import { Field, Textarea } from "@chakra-ui/react";

export default function DescriptionTaskForm({ register, errors }) {
  return (
    <Field.Root invalid={!!errors.description}>
      <Field.Label fontSize={"md"}>Descrição da tarefa</Field.Label>
      <Textarea
        {...register("description", { required: true })}
        color={"black"}
        resize="none"
        border={"1px solid gray"}
        rounded={"xl"}
        required
      />
      <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
    </Field.Root>
  );
}
