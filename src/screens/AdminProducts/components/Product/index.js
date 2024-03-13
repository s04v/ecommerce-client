import { Box, styled, Typography } from "@mui/material";

const ProductBox = styled(Box)`
  display: flex;
  gap: 8px;
`


const Product = () => {
  return (
    <ProductBox>
      <img src="./assets/product.jpg" style={{ width: "50px" }} />
      <Typography>Hoodie</Typography>
    </ProductBox>
  )
}

export default Product;