import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
const OrderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "120px",
  border: "1px solid #dedede",
  padding: "16px",
  gap: "10px",
  alignItems: "center",
  borderRadius: "5px"
}));


const Order = () => {
  return (
    <OrderBox>
      <Box>
        <Typography sx={{ fontSize: "20px" }}>Order#121</Typography>
        <Typography sx={{ color: "grey", fontSize: 14 }}>10 items</Typography>
        <Typography sx={{ color: "grey", fontSize: 14 }}>Poland, Lublin</Typography>
        <Typography sx={{ color: "grey", fontSize: 14 }}>2.02.2023</Typography>
      </Box>
      <Typography sx={{ fontSize: "20px", fontWeight: 600, ml: "auto" }}>$50</Typography>
    </OrderBox>
  );
};

export default Order;
