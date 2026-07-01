import { TextField } from "@mui/material";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput = ({
  value,
  onChange,
  placeholder = "Enter value",
}: TextInputProps) => {
  return (
    <TextField
      label="Value"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      fullWidth
      size="small"
    />
  );
};

export default TextInput;