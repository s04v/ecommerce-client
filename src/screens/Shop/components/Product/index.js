import { Box, Button, Grid, Rating, styled, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from "react-router-dom";

const Controls = styled(Box)`

`

const Price = styled(Typography)`
  font-weight: 500;
  font-size: 18px;
  margin: 8px 0px;
  color: ${props => props.theme.palette.primary.main}
`

const DiscoutPrice = styled(Typography)`
  font-weight: 500;
  font-size: 18px;
  margin: 8px; 0;
  color: ${(props) => props.theme.palette.red};
`

export const Product = ({id, name, brand, price, rate, image, discount}) => {
  console.log(image);
  return (
    <Grid item xs={3} >
      <Box>
        <img src={`http://localhost:3000/public/${image}`} style={{width: "100%", backgroundSize: "cover", height: '250px'}} />
        <Typography sx={{ fontWeight: 500, cursor: "pointer" }} noWrap >
          <Link to={"/product/" + id} >{name}</Link>
        </Typography>
        <Typography sx={{ fontSize: 14, my: 1}}>{brand}</Typography>
        <Rating name="read-only" value={rate} readOnly />
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          {!discount ? <Price>${price}</Price> : 
            <Box sx={{ display: 'flex'}}>
              <Price><del>${price}</del></Price>
              <DiscoutPrice>${price - (price * (discount / 100))}</DiscoutPrice>
            </Box>
          }

        </Box>
      </Box>
    </Grid>
  )
}

export default Product;