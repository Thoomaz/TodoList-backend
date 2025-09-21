import { Field, Select, Portal, createListCollection } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const prioridades = createListCollection({
  items: [
    { label: "🔴 Pra ontem", value: "0" },
    { label: "🟡 Quando der", value: "1" },
    { label: "🟢 Sem pressa", value: "2" },
  ],
});

export default function SelecTaskForm({ control, register, errors }) {
  return (
    <Field.Root invalid={!!errors.priority} flex="1">
      <Field.Label fontSize={"md"}>Prioridade</Field.Label>
      <Controller
        control={control}
        name="priority"
        render={({ field }) => (
          <Select.Root
            {...register("priority", { required: true })}
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
                  zIndex={2000}
                >
                  {prioridades.items.map((priority) => (
                    <Select.Item
                      item={priority}
                      key={priority.value}
                      _hover={{ bg: "#609398" }}
                      rounded={"md"}
                    >
                      {priority.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />
      <Field.ErrorText>{errors.priority?.message}</Field.ErrorText>
    </Field.Root>
  );
}
