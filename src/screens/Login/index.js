import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{
      marginTop: "10%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%"
    }}>
      <Typography sx={{ fontSize: "26px", fontWeight: 700 }}>Log in</Typography>
      <Typography sx={{ fontWeight: 700, width: "300px", textAlign:"left" }}>Username*</Typography>
      <TextField size="small" sx={{ width: "300px" }} />
      <Typography sx={{ fontWeight: 700, width: "300px", textAlign:"left", mt:2 }}>Password*</Typography>
      <TextField size="small" sx={{ width: "300px" }} />
      <Button variant="contained" sx={{ width: "100px", mt: 2 }}>Login</Button>
    </Box>
  )
}

export default Login;