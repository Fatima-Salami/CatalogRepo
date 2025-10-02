import { useNavigate, useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useAuth } from "../providers/AuthContext";
import { useRequests } from "../providers/RequestsContext";
import { useError } from "../providers/ErrorContext";

export default function LoginPage() {
  const { login } = useAuth();
  const { withLoading } = useRequests();
  const errorModel = useError();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    try {
      await withLoading(async () => {
        await login({ email: data.email, password: data.password });
      });
      navigate(from, { replace: true });
    } catch (err) {
      if (errorModel?.push)
        errorModel.push({ message: err?.message || "Login failed" });
    }
  }

  function fillDemo() {
    setValue("email", "demo@demo.com");
    setValue("password", "demo123");
    onSubmit({ email: "demo@demo.com", password: "demo123" });
  }

  return (
    <Container
      maxWidth="xs"
    >
      <Paper elevation={3} sx={{ width: "100%", p: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Sign in
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Password required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                required
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Button type="submit" variant="contained">
              Sign in
            </Button>
            <Button type="button" variant="text" onClick={fillDemo}>
              Use demo
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
