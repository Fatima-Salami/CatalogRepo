import { Dialog, DialogTitle, DialogContent,DialogActions, Button, Typography } from "@mui/material";

export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

const styleBackdrop = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    width: "100%",
};
const styleBox = {
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    maxWidth: 1300, // Increased width
    width: "98%",   // Increased percentage width
};

  return (
    <Dialog  fullWidth style={styleBackdrop} open={Boolean(product)}>
  <DialogTitle>{product?.name}</DialogTitle>
  <DialogContent style={styleBox} dividers>
    <Typography>Category: {product?.category}</Typography>
    <Typography>Price: ${product?.price}</Typography>
    <Typography>Rating: {product?.rating}</Typography>
    <Typography>Description: {product?.description}</Typography>
  </DialogContent>
  <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
</Dialog>
  );
}
