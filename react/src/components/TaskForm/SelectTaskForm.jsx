import { Field, Select, Portal, createListCollection } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const prioridades = createListCollection({
  items: [
    { label: "🔴 Pra ontem", value: "1" },
    { label: "🟡 Quando der", value: "2" },
    { label: "🟢 Sem pressa", value: "3" },
  ],
});

export default function SelecTaskForm({ control, register, errors }) {
  return (
    <Field.Root invalid={!!errors.prioridade} flex="1">
      <Field.Label fontSize={"md"}>Prioridade</Field.Label>
      <Controller
        control={control}
        name="prioridade"
        render={({ field }) => (
          <Select.Root
            {...register("prioridade", { required: true })}
            color={"black"}
            name={field.name}
            value={field.value ? [field.value] : []}
            onValueChange={({ value }) => field.onChange(value[0])}
            onInteractOutside={() => field.onBlur()}
            collection={prioridades}
            highlightedValue
            required
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger
                border={"1px solid gray"}
                rounded={"xl"}
                cursor={"pointer"}
              >
                <Select.ValueText placeholder="Selecione" color={"gray"} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content
                  rounded={"xl"}
                  bgColor={"white"}
                  color={"black"}
                >
                  {prioridades.items.map((prioridade) => (
                    <Select.Item
                      item={prioridade}
                      key={parseInt(prioridade.value)}
                      _hover={{ bg: "#609398" }}
                      rounded={"md"}
                    >
                      {prioridade.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors.prioridades?.message}</Field.ErrorText>
    </Field.Root>
  );
}
