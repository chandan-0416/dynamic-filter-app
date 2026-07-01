import { Stack, TextField } from "@mui/material";

interface DateRangeValue {
  from: string;
  to: string;
}

interface DateRangeInputProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
}

const DateRangeInput = ({
  value,
  onChange,
}: DateRangeInputProps) => {
  const handleFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      from: event.target.value,
    });
  };

  const handleToChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      to: event.target.value,
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="From"
        type="date"
        value={value.from}
        onChange={handleFromChange}
        sx={{ width: 170 }}
      />

      <TextField
        label="To"
        type="date"
        value={value.to}
        onChange={handleToChange}
        sx={{ width: 170 }}
      />
    </Stack>
  );
};

export default DateRangeInput;