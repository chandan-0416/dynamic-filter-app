import { Autocomplete, TextField } from "@mui/material";

interface MultiSelectInputProps {
  value: unknown;
  options: string[];
  onChange: (value: string[]) => void;
}

const MultiSelectInput = ({
  value,
  options,
  onChange,
}: MultiSelectInputProps) => {
  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedValues}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Value"
          placeholder="Select Skills"
        />
      )}
      sx={{ minWidth: 250 }}
    />
  );
};

export default MultiSelectInput;