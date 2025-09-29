import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboBox({ value, onChange, options = [], placeholder }) {
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={options}
      sx={{ minWidth: 200 }}
      disableClearable={false}
      renderInput={(params) => <TextField {...params} label={placeholder} size="small" />}
      freeSolo={false}
      clearOnEscape
    />
  );
}