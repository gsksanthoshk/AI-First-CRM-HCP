import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import Layout from "../components/Layout";
import DashboardCards from "../components/DashboardCards";
import RecentActivity from "../components/RecentActivity";
import InteractionTable from "../components/InteractionTable";

import { getInteractions } from "../services/interactionService";

function Dashboard() {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      const response = await getInteractions();

      console.table(response.data);

      setInteractions(response.data);
    } catch (error) {
      console.error("Failed to load interactions:", error);
    }
  };

  return (
    <Layout>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        AI First CRM Dashboard
      </Typography>

      <DashboardCards />

      <RecentActivity />

      <Typography
        variant="h6"
        sx={{ mt: 3, mb: 2 }}
      >
        Total Interactions: {interactions.length}
      </Typography>

      <InteractionTable interactions={interactions} />
    </Layout>
  );
}

export default Dashboard;