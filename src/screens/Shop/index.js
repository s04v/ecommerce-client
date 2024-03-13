import { Box, Checkbox, Divider, FormControlLabel, Grid, MenuItem, Slider, styled, TextField, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getProducts } from "../../api/ProductAPI";
import ProductsFilterBar from "../../shared/ui/ProductsFilterBar";
import Product from "./components/Product";
import { useSelector } from "react-redux";

const FilterBar = styled(Grid)`

`
const FilterHeader = styled(Typography)(({theme}) => ({
  backgroundColor: theme.palette.bg.lightGrey,
  textAlign: "center",
  padding: "18px 0",
}));

const FilterControls = styled(Box)`
 
` 
const Price = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
`

const SortHeader = styled(Grid)(({theme}) => ({
  padding: "20px 20px",
  border: "1px solid #dedede"
}));

const ItemsQuantity = styled(Typography)`
  margin: 16px 0;
  color: ${props => props.theme.palette.neutral};
  font-size: 14px;
`

const FilterBadge = styled(Typography)`
  background-color: #ffd079;
  padding: 4px 10px;
  width: fit-content;
  font-size: 12px;
  border-radius: 50px;
`

const Shop = () => {
  const { data, isLoading } = useQuery("products", getProducts);
  const filters = useSelector(state => state.filter);

  
 
  const filterCb = (product) => {

    if(filters.categories.length && !filters.categories.includes(product.category)) {
      return false;
    }

    if(filters.rate !== 0 && !(filters.rate <= product.rate)) {
      return false;
    }

    if(filters.highPrice !== 0 && !(product.price >= filters.lowPrice && product.price <= filters.highPrice)) {
      return false;
    }
    return true;
  }

  if(isLoading)
    return <div className="loading"></div>

  return (
    <Grid container columnSpacing={3} >
      <ProductsFilterBar />
      <Grid item xs={9} >
        <Box>
          <SortHeader container justifyContent="space-between">
            <Grid item sx={{display: "flex", alignItems: "center", gap: 2}}>
            </Grid>
            <Grid item sx={{display: "flex", alignItems: "center", gap: 2}} >
              <Typography>Sort by</Typography>
              <TextField select size="small" sx={{width: "150px", backgroundColor: "white"}}>
                <MenuItem>Name, A to Z</MenuItem>
                <MenuItem>Name, Z to A</MenuItem>
              </TextField>
            </Grid>
          </SortHeader>
          <Box sx={{ display: 'flex', gap: 1, my: 2}}>
            {filters.categories.length ? filters.categories.map(cat => <FilterBadge>{cat}</FilterBadge>) : null}
            {filters.rate !== 0 ? <FilterBadge>> {filters.rate }/5</FilterBadge> : null}
            {filters.highPrice !== 0 ? <FilterBadge>${filters.lowPrice} - ${filters.highPrice}</FilterBadge> : null}
          </Box>
          <Grid container spacing={3}>
            {data.filter(filterCb).map(item => <Product {...item} /> ) }
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
};

export default Shop;