import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  required?: boolean;
}

function Index({ label, type, name, value, onChange, autoFocus, required }: InputFieldProps) {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      required={required}
    />
  );
};

export default Index;