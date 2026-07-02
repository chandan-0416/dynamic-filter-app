// import { Stack, TextField } from "@mui/material";

// interface DateRangeValue {
//   from: string;
//   to: string;
// }

// interface DateRangeInputProps {
//   value: DateRangeValue;
//   onChange: (value: DateRangeValue) => void;
// }

// const DateRangeInput = ({
//   value,
//   onChange,
// }: DateRangeInputProps) => {
//   const handleFromChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     onChange({
//       ...value,
//       from: event.target.value,
//     });
//   };

//   const handleToChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     onChange({
//       ...value,
//       to: event.target.value,
//     });
//   };

//   return (
//     <Stack direction="row" spacing={2}>
//       <TextField
//         label="From"
//         type="date"
//         value={value.from}
//         onChange={handleFromChange}
//         sx={{ width: 170 }}
//       />

//       <TextField
//         label="To"
//         type="date"
//         value={value.to}
//         onChange={handleToChange}
//         sx={{ width: 170 }}
//       />
//     </Stack>
//   );
// };

// export default DateRangeInput;

import { Stack, TextField } from "@mui/material";

interface DateRange {
  from: string;
  to: string;
}

interface Props {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

const DateRangeInput = ({
  value,
  onChange,
}: Props) => {
  return (
    <Stack
      direction="row"
      spacing={2}
    >
      <TextField
        label="From"
        type="date"
        value={value.from}
        onChange={(e) =>
          onChange({
            ...value,
            from: e.target.value,
          })
        }
      />

      <TextField
        label="To"
        type="date"
        value={value.to}
        onChange={(e) =>
          onChange({
            ...value,
            to: e.target.value,
          })
        }
      />
    </Stack>
  );
};

export default DateRangeInput;