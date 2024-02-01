import TextField from '@mui/material/TextField';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 선택: 페이지 렌더링 시 포커스 온
  autoFocus?: boolean;
  // 선택: 필수사항 체크 온
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