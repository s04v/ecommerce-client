import { Box, styled, Typography } from "@mui/material"

const ProductBox = styled(Box)`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
`

const Product = (props) => {
  return(
    <ProductBox>
        <img src={`http://localhost:3000/public/${props.data.image}`} style={{ width: "50px", marginRight: "8px" }} />
        <Box sx={{ alignSelf: 'start' }}>
          <Typography sx={{ fontWeight: 600 }}>{props.data.name}</Typography>
          <Typography sx={{ color: 'gray', fontSize: 14 }}>{props.data.brand}</Typography>
          <Typography sx={{ color: 'gray', fontSize: 14 }}>Size: {props.data.size}</Typography>
        </Box>

      <Typography sx={{ ml: 'auto', mr: 10}}>${props.data.price} x {props.data.quantity}</Typography>
      <Typography sx={{ fontWeight: 600}}>${props.data.price * props.data.quantity} </Typography>
    </ProductBox>
  )
}

export default Product;