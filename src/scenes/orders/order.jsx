import { Box, Paper, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useOrderDetailsData } from "../../hooks/useFetchData";
import { tokens } from "../../theme";

const OrderDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, loading, error } = useOrderDetailsData(id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!data?.order) return <p>No order found.</p>;

  const order = data.order;

  const columns = [
    { field: "itemId", headerName: "Item ID", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
  ];

  return (
    <Box m="20px">
      <Header title={`Order #${order.order_id}`} subtitle="Order Details" />

      {/* Order Info */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: colors.primary[400],
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order Information
        </Typography>
        <Typography>Buyer ID: {order.buyerId}</Typography>
        <Typography>Supplier ID: {order.supplierId}</Typography>
        <Typography>Status: {order.status}</Typography>
        <Typography>Amount: {order.amount}</Typography>
        <Typography>
          Ordered At: {new Date(order.orderDate).toLocaleString()}
        </Typography>
      </Paper>

      {/* Items Table */}
      <Box
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={order.items.map((item, index) => ({ ...item, id: index }))}
          columns={columns}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default OrderDetails;
