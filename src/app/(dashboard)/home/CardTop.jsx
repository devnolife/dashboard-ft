import { Grid } from "@mui/material"
import CardSurat from "./component/CardSurat"
import CardAdministrasi from "./component/CardAdministrasi"

const CardTop = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={4}>
        <CardAdministrasi />
      </Grid>
      <Grid item xs={12} md={8}>
        <CardSurat />
      </Grid>
    </Grid>
  )
}

export default CardTop
