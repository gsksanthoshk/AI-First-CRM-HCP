import {
  Card,
  CardContent,
  Typography
} from "@mui/material";

export default function StatCard({
  title,
  value
}) {

  return (

    <Card
      elevation={3}
      sx={{
        borderRadius: 3
      }}
    >

      <CardContent>

        <Typography
          color="text.secondary"
        >
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 2
          }}
        >
          {value}
        </Typography>

      </CardContent>

    </Card>

  );

}