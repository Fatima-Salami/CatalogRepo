import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography, Stack, Divider
} from "@mui/material";

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  return (
    <Dialog fullWidth open={Boolean(product)} maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>{product?.name}</DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack spacing={1.5}>
        <Typography>Category: {product?.category}</Typography>
        <Typography>Price: ${product?.price}</Typography>
        <Typography>Rating: {product?.rating}</Typography>
        <Typography>Description: {product?.description}</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
