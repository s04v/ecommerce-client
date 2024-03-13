import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, styled, TextField, Typography } from "@mui/material";

const InfoBox = styled(Box)(({ theme }) => ({
  border: "1px solid #dedede",
  width: "100%",
  padding: "25px",
}));

const DeliveryInfo = ( ) => {
  return (
    <InfoBox>
      <Typography sx={{ mb: 2, fontWeight: 600, fontSize: 18 }}>Delivery information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, color: 'grey'}}>Name</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, color: 'grey'}}>Phone number</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, color: 'grey'}}>Country</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, color: 'grey'}}>City</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 14, color: 'grey'}}>Address</Typography>
          <TextField size="small" fullWidth />
        </Grid>
      </Grid>
    </InfoBox>
  )
};

export default DeliveryInfo;