import { Stack, TextField } from "@mui/material";

interface NumberRangeValue {
  min: number | "";
  max: number | "";
}

interface NumberRangeInputProps {
  value: NumberRangeValue;
  onChange: (value: NumberRangeValue) => void;
}

const NumberRangeInput = ({
  value,
  onChange,
}: NumberRangeInputProps) => {
  const handleMinChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    onChange({
      ...value,
      min: input === "" ? "" : Number(input),
    });
  };

  const handleMaxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = event.target.value;

    onChange({
      ...value,
      max: input === "" ? "" : Number(input),
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Min"
        type="number"
        value={value.min}
        onChange={handleMinChange}
        sx={{ width: 140 }}
      />

      <TextField
        label="Max"
        type="number"
        value={value.max}
        onChange={handleMaxChange}
        sx={{ width: 140 }}
      />
    </Stack>
  );
};

export default NumberRangeInput;