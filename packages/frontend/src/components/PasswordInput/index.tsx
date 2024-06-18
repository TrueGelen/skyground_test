import { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = forwardRef<HTMLInputElement, StandardTextFieldProps>(
  (props, ref) => {
    const { value, ...rest } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const fieldType = showPassword ? "text" : "password";

    return (
      <TextField
        ref={ref}
        value={value}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        type={fieldType}
        {...rest}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
