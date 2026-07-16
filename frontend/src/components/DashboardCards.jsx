import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";

import { getDashboardStats } from "../services/dashboardService";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    total_doctors: 0,
    total_interactions: 0,
    ai_summaries: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Total Doctors",
      value: stats.total_doctors,
    },
    {
      title: "Total Interactions",
      value: stats.total_interactions,
    },
    {
      title: "AI Summaries",
      value: stats.ai_summaries,
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={3}
      sx={{ mt: 4, mb: 4 }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          elevation={4}
          sx={{
            flex: 1,
            textAlign: "center",
            borderRadius: 3,
            py: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
            >
              {card.title}
            </Typography>

            <Typography
              variant="h2"
              fontWeight="bold"
              color="primary"
            >
              {card.value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}