import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card = styled(Box)(({theme}) => ({
  borderRadius: "4px",
  width: "650px",
  padding: "15px 20px",
  border: "1px solid #dedede",
  height: "400px",
}))
  

const Product = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 7px 0;
`

const Sales = styled(Typography)(({theme}) => ({
  padding: "3px 7px",
  borderRadius: "5px",
  marginLeft: "auto"
}))

const PopularProducts = () => {
  return (
    <Card>
      <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>Popular products</Typography>
      <Product>
        <img src="assets/product.jpg" style={{ width: "40px", height: "40px" }} />
        <Typography>Unisex Cotton Neck Hoodie</Typography>
        <Sales >120 sales</Sales>
      </Product>
      <Product>
        <img src="assets/product.jpg" style={{ width: "40px", height: "40px" }} />
        <Typography>Unisex Cotton Neck Hoodie</Typography>
        <Sales >120 sales</Sales>
      </Product>
      <Product>
        <img src="assets/product.jpg" style={{ width: "40px", height: "40px" }} />
        <Typography>Unisex Cotton Neck Hoodie</Typography>
        <Sales >120 sales</Sales>
      </Product>
      <Product>
        <img src="assets/product.jpg" style={{ width: "40px", height: "40px" }} />
        <Typography>Unisex Cotton Neck Hoodie</Typography>
        <Sales >120 sales</Sales>
      </Product>
      <Product>
        <img src="assets/product.jpg" style={{ width: "40px", height: "40px" }} />
        <Typography>Unisex Cotton Neck Hoodie</Typography>
        <Sales >120 sales</Sales>
      </Product>
    </Card>
  )
}

export default PopularProducts;