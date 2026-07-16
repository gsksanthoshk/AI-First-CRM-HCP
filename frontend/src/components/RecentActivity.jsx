import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

function RecentActivity() {
  const activities = [
    "Visited Dr. Rajesh - Apollo Hospital",
    "Follow-up scheduled with Dr. Priya",
    "Logged interaction with Dr. Kumar",
    "AI generated meeting summary",
  ];

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default RecentActivity;