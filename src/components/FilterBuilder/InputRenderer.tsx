import TextInput from "../FilterInputs/TextInput";
import NumberInput from "../FilterInputs/NumberInput";
import DateInput from "../FilterInputs/DateInput";
import SelectInput from "../FilterInputs/SelectInput";
import MultiSelectInput from "../FilterInputs/MultiSelectInput";
import BooleanInput from "../FilterInputs/BooleanInput";

import { FieldType, type FilterFieldConfig } from "../../types/filter";

interface InputRendererProps {
  field?: FilterFieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}

const InputRenderer = ({
  field,
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
    
      return (
        <NumberInput
          value={value as number}
          onChange={onChange}
        />
      );

    case FieldType.DATE:
      return (
        <DateInput
          value={value as string}
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