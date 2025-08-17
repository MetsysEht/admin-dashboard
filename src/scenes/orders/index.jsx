import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useOrdersData } from "../../hooks/useFetchData";
import { tokens } from "../../theme";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, error } = useOrdersData();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  const columns = [
    { field: "orderId", headerName: "ID" },
    {
      field: "supplierId",
      headerName: "Supplier ID",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "buyerId",
      headerName: "Buyer ID",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "orderDate",
      headerName: "Ordered At",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Managing the Orders" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data.orders}
          columns={columns}
          getRowId={(row) => row.orderId}
          onRowClick={(params) => navigate(`/orders/${params.id}`)}
          sx={{
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default Orders;
