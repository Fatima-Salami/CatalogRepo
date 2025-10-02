import { Box, Button,Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const PageError = ({ onClose, message, header = 'Error' }) => {
  const errorMessage =
    typeof message === 'string'
      ? message
      : !message?.response
      ? message?.error
        ? message.error
        : message?.message
      : message?.response?.data?.error
      ? message.response.data.error
      : message?.response?.data

  return (
    <Dialog open={Boolean(open)} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{header}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            pt: 2
          }}
        >
          {errorMessage}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          pb: 2
        }}
      >
        <Box
          sx={{
            pt: 2,
            pl: 2
          }}
        >
          <Button variant='contained' onClick={onClose} color='primary' autoFocus>
            Ok
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
 
  )
}

export default PageError
