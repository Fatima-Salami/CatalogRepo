import { Container, Box, Paper, Typography, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useRequests } from '../providers/RequestsContext';
import { useError } from '../providers/ErrorContext';

export default function SignupPage() {
  const { withLoading } = useRequests();
  const errorModel = useError();

  const { handleSubmit, control } = useForm({ defaultValues: { email: '', password: '', name: '' } });

  async function onSubmit(data) {
    try {
      await withLoading(async () => {
        await new Promise(r => setTimeout(r, 400));
      });
      if (errorModel?.push) errorModel.push({ message: 'Signup complete — please login', header: 'Success' });
    } catch (err) {
      if (errorModel?.push) errorModel.push({ message: err?.message || 'Signup failed' });
    }
  }

  return (
    <Container maxWidth="xs" sx={{ minHeight: '74vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
      <Paper elevation={3} sx={{ width: '100%', p: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>Sign up</Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller name="name" control={control} render={({ field }) => <TextField {...field} label="Full name" fullWidth />} />
          <Controller name="email" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Email" fullWidth />} />
          <Controller name="password" control={control} rules={{ required: true }} render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />} />

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 1 }}>
            <Button type="submit" variant="contained">Create account</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
