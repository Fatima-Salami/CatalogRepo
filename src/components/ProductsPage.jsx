import { useEffect, useState, useMemo } from "react";
import { useRequests } from "../providers/RequestsContext";
import ComboBox from "./Inputs/ComboBox";
import { DataGrid } from "@mui/x-data-grid";
import ProductDetailModal from "./ProductDetailModal";

import { Box, Typography, TextField, Grid } from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { api } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await api("/products");
      setProducts(res?.data);
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesName = q === "" || (p.name || "").toLowerCase().includes(q);
      const matchesCategory = selectedCategory
        ? p.category === selectedCategory
        : true;
      return matchesName && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const columns = [
    { field: "name", headerName: "Name", flex: 3 },
    { field: "category", headerName: "Category", flex: 3 },
    {
      field: "price",
      headerName: "Price",
      flex: 3,
      type: "number",
      headerAlign: "right",
      align: "right",
    },
    { field: "rating", headerName: "Rating", flex: 3, type: "number" },
    { field: "description", headerName: "Description", flex: 3 },
  ];

  return (
    <Grid container width="100%" spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
          Products Catalog
        </Typography>
        <Grid container spacing={2} mb={3} justifyContent="center">
          <Grid item>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
          </Grid>
          <Grid item>
            <ComboBox
              value={selectedCategory}
              onChange={(v) => {
                setSelectedCategory(v || null);
              }}
              placeholder="Category"
              options={products
                .map((p) => p.category)
                .filter((v, i, a) => a.indexOf(v) === i)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="center">
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: 700, maxWidth: 1200, mx: 'auto' }}>
            <DataGrid
              rows={filtered}
              columns={columns}
              pageSizeOptions={[3, 5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              onRowClick={(params) => setSelectedProduct(params.row)}
              disableRowSelectionOnClick={false}
              getRowId={(row) => row.id}
              pagination
              hideFooterSelectedRowCount
              sx={{
                width: "100%",
                minWidth: 0,
                height: 400,
                borderRadius: 2,
                boxShadow: 1,
                "& .MuiDataGrid-columnHeaders": { bgcolor: "background.paper" },
                "& .MuiDataGrid-row": { cursor: "pointer" },
                "& .MuiDataGrid-row:hover": { bgcolor: "action.hover" },
                "& .Mui-selected": { bgcolor: "primary.light !important" },
                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                  border: "none",
                },
              }}
              componentsProps={{
                panel: { style: { width: "100%" } },
              }}
            />
          </Box>
          </Box>
        </Grid>

        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Grid>
    </Grid>
  );
}
