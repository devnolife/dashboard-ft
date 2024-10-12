import { Grid } from "@mui/material";
import HeaderDashboard from "./component/CardDashboard";
import FormKegiatan from "./FormKegiatan";
import ActivityTimeline from "./ActivityTimeline";
import CardKelompok from "./component/CardKelompok";
const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HeaderDashboard />
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={5}>
          <FormKegiatan />
        </Grid>
        <Grid item xs={3}>
          <CardKelompok />
        </Grid>
        <Grid item xs={4}>
          <ActivityTimeline />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
