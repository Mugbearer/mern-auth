import { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Login
        </label>
      </div>

      <div className="form-group">
        <TextField
          size="small"
          variant="outlined"
          className="form-control"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        <FormControl variant="outlined" size="small" className="form-control">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className="text-center mt-4">
        <Button variant="contained" disabled={!email || !password}>
          Submit
        </Button>
      </div>
    </div>
  );
}
