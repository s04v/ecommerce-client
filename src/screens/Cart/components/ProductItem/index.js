import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, ButtonGroup, styled, TextField, Typography } from '@mui/material';
import Cart from '../../../../lib/Cart';

const ItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "15px",
  alignItems: "center"
}));

const ProductItem = ({id, image, name, brand, quantity, price, onDeleteItem}) => {
  return (
    <ItemBox>
      <img src={`http://localhost:3000/public/${image}`} style={{ width: "60px" }} />
      <Box sx={{ mb: "auto" }}>
        <Typography sx={{ fontSize: 18 }}>{name}</Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 400}}>{brand}</Typography>
        <Typography sx={{ color: "gray", fontSize: 14}}>Quantity: {quantity}</Typography>
      </Box>
      <Box sx={{display: "flex", gap: 1, height: "30px", my: 2, ml: "auto"}}>
        <ButtonGroup size="small">
        </ButtonGroup> 
      </Box>
      <Typography sx={{ fontSize: "18px" }}>${price}</Typography>
      <DeleteOutlineOutlinedIcon sx={{ fontSize: 28, cursor: "pointer" }}  onClick={() => onDeleteItem(id)} />
    </ItemBox>
  )
}

export default ProductItem;