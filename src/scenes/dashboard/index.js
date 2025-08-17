import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { useDashboardData } from "../../hooks/useFetchData";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, loading, error } = useDashboardData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const stats = [
    { label: "Total Orders", value: data.totalOrders },
    { label: "Total Revenue", value: `₹${data.totalRevenue}` },
    { label: "Avg. Order Value", value: `₹${data.averageOrderValue}` },
    { label: "Orders in Production", value: data.ordersInProduction },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* STATS CARDS */}
      <Grid container spacing={3} mt={2}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: colors.primary[400],
                borderRadius: "16px",
              }}
            >
              <Typography variant="h6" color={colors.grey[100]}>
                {stat.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                mt={1}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
