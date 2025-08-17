import { useDashboardData } from "../../hooks/useDashboardData";

const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
