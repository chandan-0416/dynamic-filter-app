import TextField from "@mui/material/TextField";

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DateInput = ({ value, onChange }: DateInputProps) => {
  return (
    <TextField
      type="date"
      label="Value"
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{ minWidth: 180 }}
      size="small"
    />
  );
};

export default DateInput;