import { Divider, Grid, Rating, styled, Typography } from "@mui/material";



const Review = ({name, rate, text}) => {
  return (
    <>
      <Grid container >
        <Grid item xs>
          <Typography sx={{ fontSize: "16px" }}>{name}</Typography>
          <Rating size="small" name="read-only" value={rate} readOnly sx={{my: 1}}/>
          <Typography sx={{ }}>{text}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{my: 2}}/>
    </>

  )
}

export default Review;