import { MenuItem, TextField } from "@mui/material";

interface SelectInputProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectInput = ({
  value,
  options,
  onChange,
}: SelectInputProps) => {
  return (
    <TextField
      select
      label="Value"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      sx={{ minWidth: 200 }}
    >
      {options.map((option) => (
        <MenuItem
          key={option}
          value={option}
        >
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;