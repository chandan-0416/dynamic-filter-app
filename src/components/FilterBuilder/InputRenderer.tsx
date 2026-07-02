import TextInput from "../FilterInputs/TextInput";
import NumberInput from "../FilterInputs/NumberInput";
import DateInput from "../FilterInputs/DateInput";
import SelectInput from "../FilterInputs/SelectInput";
import MultiSelectInput from "../FilterInputs/MultiSelectInput";
import BooleanInput from "../FilterInputs/BooleanInput";
import NumberRangeInput from "../FilterInputs/NumberRangeInput";
import DateRangeInput from "../FilterInputs/DateRangeInput";
import { FieldType, type FilterFieldConfig, type FilterOperator } from "../../types/filter";

interface InputRendererProps {
  field?: FilterFieldConfig;
  operator: FilterOperator;
  value: unknown;
  onChange: (value: unknown) => void;
}

const InputRenderer = ({
  field,
  operator,
  value,
  onChange,
}: InputRendererProps) => {
  if (!field) return null;

  switch (field.type) {
    case FieldType.TEXT:
      return (
        <TextInput
          value={value as string}
          onChange={onChange}
        />
      );

case FieldType.NUMBER:

  if (operator === "between") {
    return (
      <NumberRangeInput
        value={
          (value as {
            min: number | "";
            max: number | "";
          }) ?? {
            min: "",
            max: "",
          }
        }
        onChange={onChange}
      />
    );
  }

  return (
    <NumberInput
      value={(value as number) ?? ""}
      onChange={onChange}
    />
  );

 case FieldType.DATE:

  if (operator === "between") {
    return (
      <DateRangeInput
        value={
          (value as {
            from: string;
            to: string;
          }) ?? {
            from: "",
            to: "",
          }
        }
        onChange={onChange}
      />
    );
  }

  return (
    <DateInput
      value={(value as string) ?? ""}
      onChange={onChange}
    />
  );

    case FieldType.SELECT:
      return (
         <SelectInput
         value={String(value)}
          options={field.options ?? []}
          onChange={onChange}
        />
      );

case FieldType.MULTI_SELECT:
  return (
    <MultiSelectInput
      value={Array.isArray(value) ? value : []}
      options={field.options ?? []}
      onChange={onChange}
    />
  );

    case FieldType.BOOLEAN:
      return (
        <BooleanInput
          value={Boolean(value)}
          onChange={onChange}
        />
      );

    default:
      return null;
  }
};

export default InputRenderer;