import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Rating, styled, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, updateCategories, updateHighPrice, updateLowPrice, updateRate } from "../../../store/FilterSlice";
import { useState } from "react";

const FilterBar = styled(Grid)(({theme}) => ({
  padding: "25px 25px",
  borderRadius: "4px",
  border: "1px solid #dedede",
  height: "fit-content",
}));

const Header = styled(Typography)(({theme}) => ({
  padding: "0 0",
  fontWeight: 500,
  fontSize: 18,
}));

const HeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const FilterControls = styled(Box)`
` 

const FilterTitle = styled(Typography)`
  color: ${props => props.theme.palette.neutral};
  font-size: 14px;
`

const Price = styled(Box)`
  display: flex;
  gap: 20px;
`

const ApplyBtn = styled(Button)`
  margin-top: 20px;
`

const ProductsFilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector( state => state.filter);
  const [categories, setCategories] = useState([]);
  const [rate, setRate] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  
  const handleCategories = (e) => {
    const category = e.target.value;
    const checked = e.target.checked;
    let newCategories = categories;
    console.log(newCategories);
    if(checked) {
      newCategories = [...newCategories, category];
    } else {
      newCategories = newCategories.filter(c => c !== category);
    }
    setCategories(newCategories);
  }

  const handleRate = (rate) => {
    setRate(rate);
  }

  const handleLowPrice = (price) => {
    price = parseInt(price, 10);
    if(price < 0 || isNaN(price)) price = 0;

    setLowPrice(price);
  }

  const handleHighPrice = (price) => {
    price = parseInt(price, 10);
    if(isNaN(price)) price = 0;

    setHighPrice(price);
  }

  const handleApply = () => {
    dispatch(updateCategories(categories));
    dispatch(updateRate(rate));
    dispatch(updateLowPrice(lowPrice));
    dispatch(updateHighPrice(highPrice));
  }

  const handleReset = () => {
    dispatch(resetFilters())
    setCategories([]);
    setRate(0);
    setLowPrice(0);
    setHighPrice(0);
  }

  return (
    <FilterBar item xs={3}>
      <HeaderBox>
       <Header>Filter</Header>
       <Typography sx={{ fontSize: 14, color: "grey", cursor: "pointer", textDecoration: "underline" }} onClick={handleReset}>Clean</Typography>
      </HeaderBox>
    <Divider />
    <FilterControls sx={{my: 2}}>
      <FilterTitle>Category</FilterTitle>
      <Box sx={{ display: "flex", flexDirection: "column", my: 1}}>
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Jackets")} value="Jackets" />} label="Jackets" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Shirts")} value="Shirts"/>} label="Shirts" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Jeans")} value="Jeans"/>} label="Jeans" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("T-Shirts")} value="T-Shirts"/>} label="T-Shirts" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Hoodies")} value="Hoodies"/>} label="Hoodies" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Joggers")} value="Joggers"/>} label="Joggers" />
        <FormControlLabel control={<Checkbox size="small" onClick={handleCategories} checked={categories.includes("Loungewear")} value="Loungewear"/>} label="Loungewear" />
      </Box>
      <Divider />
    </FilterControls>
    <FilterControls sx={{my: 2}}>
      <Box sx={{ display: "flex", flexDirection: "column", my: 1}}>
        <FormControl>
          <FilterTitle>Rate</FilterTitle>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="0"
              name="radio-buttons-group"
            >
              <FormControlLabel value="1" control={<Radio checked={rate === 1} />} onClick={() => handleRate(1)} label={<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}> >1 <Rating size="small" name="read-only" value={1} readOnly /></Box>} />
              <FormControlLabel value="2" control={<Radio checked={rate === 2} />} onClick={() => handleRate(2)} label={<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}> >2 <Rating size="small" name="read-only" value={2} readOnly /></Box>} />
              <FormControlLabel value="3" control={<Radio checked={rate === 3} />} onClick={() => handleRate(3)} label={<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}> >3 <Rating size="small" name="read-only" value={3} readOnly /></Box>} />
              <FormControlLabel value="4" control={<Radio checked={rate === 4} />} onClick={() => handleRate(4)} label={<Box sx={{display: 'flex', alignItems: 'center', gap: 1}}> >4 <Rating size="small" name="read-only" value={4} readOnly /></Box>} />
              <FormControlLabel value="5" control={<Radio checked={rate === 5} />} onClick={() => handleRate(5)} label={<Box sx={{display: 'flex', alignItems: 'center', gap: 2}}> 5 <Rating size="small" name="read-only" value={5} readOnly /></Box>} />
            </RadioGroup>
        </FormControl>
      </Box>
      <Divider />
    </FilterControls>
    <FilterTitle>Price</FilterTitle>
    <Price>
        <TextField size="small" value={lowPrice} onChange={(e) => handleLowPrice(e.target.value)} sx={{width: "65px"}} /> _
        <TextField size="small" value={highPrice} onChange={(e) => handleHighPrice(e.target.value)} sx={{width: "65px"}} />
    </Price>
  <ApplyBtn variant="contained" onClick={handleApply}>Apply</ApplyBtn>
</FilterBar>
  );
}

export default ProductsFilterBar;