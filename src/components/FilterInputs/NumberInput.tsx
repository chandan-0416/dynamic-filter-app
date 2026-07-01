import type { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface NumberInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
}

const NumberInput = ({
  value,
  onChange,
}: NumberInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      onChange("");
      return;
    }

    onChange(Number(inputValue));
  };

  return (
    <TextField
      type="number"
      label="Value"
      value={value}
      onChange={handleChange}
      sx={{ minWidth: 180 }}
      slotProps={{
        htmlInput: {
          step: "any",
        },
      }}
      size="small"
    />
  );
};

export default NumberInput;