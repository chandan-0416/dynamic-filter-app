import { MenuItem, TextField } from "@mui/material";

interface BooleanInputProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const BooleanInput = ({
  value,
  onChange,
}: BooleanInputProps) => {
  return (
    <TextField
      select
      label="Value"
      value={value ? "true" : "false"}
      onChange={(event) =>
        onChange(event.target.value === "true")
      }
      sx={{ minWidth: 180 }}
    >
      <MenuItem value="true">True</MenuItem>
      <MenuItem value="false">False</MenuItem>
    </TextField>
  );
};

export default BooleanInput;