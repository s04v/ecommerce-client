import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../api/ProductAPI";
import Review from "./components/Review";
import * as yup from "yup";
import { useAlert } from "../../lib/Alert";
import { createReview, getReviews } from "../../api/ReviewAPI";
import Cart from "../../lib/Cart";

const SizeBox = styled(Box)`
  display: flex;
  gap: 5px;
`;
const SizeButton = styled(Typography)`
  min-width: 35px !important;
  padding: 5px !important;
  color: ${(props) => props.theme.palette.text.black};
  border: 3px solid
    ${(props) => (props.active ? props.theme.palette.primary.main : "#f2f2f2")};
  text-align: center;
  cursor: pointer;
  font-size: 12px;
`;

const Price = styled(Typography)`
  font-size: 22px;
  font-weight: 800;
  margin: 8px 0;
  color: ${(props) => props.theme.palette.red};
`;

const StrikePrice = styled(Typography)`
  font-size: 22px;
  font-weight: 800;
  margin: 8px 0;
  color: grey;
  text-decoration: line-through;
`;

const validationSchema = yup.object({
  name: yup.string("Enter your name").required("The field is required"),
});

const Product = () => {
  const { Alert } = useAlert();
  const { id } = useParams();
  const product = useQuery(["product", id], () => getOneProduct(id));
  const reviews = useQuery(["reviews", id], () => getReviews(id));
  const reviewMutation = useMutation(createReview, { onSuccess: () => reviews.refetch()});

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => (quantity > 1 ? setQuantity(quantity - 1) : null);

  const addToCart = () => {
    if(!size)
      return Alert.warning("Please select the size");
    console.log(product);
    const item = { name: product.data.name, brand: product.data.brand, price: product.data.price, image: product.data.image, id, size, quantity };
    Cart.add(item);
    console.log(Cart.get());
    Alert.success("Item added");
  }

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      text: "",
      rate: 1,
    },
    onSubmit: (values) => {
      values.id = id;
      reviewMutation.mutate(values);
      Alert.success("Success");

      if(reviewMutation.isError) {
        Alert.error('Error');
      } else {
        Alert.success('Success');
        formik.resetForm();
      }
    },
  });

  if(product.isLoading || reviews.isLoading)
    return <div className="loading"></div>
  
  return (
    <Box sx={{ pb: 10 }}>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box>
          <img src={`http://localhost:3000/public/${product.data.image}`} style={{ width: "500px" }} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>
            {product.data.name}
          </Typography>
          <Typography sx={{ fontWeight: 400 }}>{product.data.brand}</Typography>
          <Rating
            name="read-only"
            value={product.data.rate}
            readOnly
            sx={{ my: 1 }}
          />
          {!product.data.discount ? <Price>${product.data.price}</Price> : 
            <Box sx={{ display: 'flex', gap: 1}}>
              <StrikePrice>${product.data.price}</StrikePrice>
              <Price>${product.data.price - (product.data.price * (product.data.discount / 100))}</Price>
            </Box>
          }
          
          <TextField select label="Size"sx={{width: "80px", mt: 2}} size="small" value={size} onChange={(e) => setSize(e.target.value)}>
            <MenuItem value="XS" disabled={!product.data.sizes.includes("XS")}>XS</MenuItem>
            <MenuItem value="S" disabled={!product.data.sizes.includes("S")}>S</MenuItem>
            <MenuItem value="M" disabled={!product.data.sizes.includes("M")}>M</MenuItem>
            <MenuItem value="L" disabled={!product.data.sizes.includes("L")}>L</MenuItem>
            <MenuItem value="XL" disabled={!product.data.sizes.includes("XL")}>XL</MenuItem>
            <MenuItem value="XXL" disabled={!product.data.sizes.includes("XXL")}>XXL</MenuItem>
          </TextField>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", gap: 1, height: "40px", my: 2 }}>
            <ButtonGroup size="small">
              <Button variant="contained" onClick={decreaseQuantity}>
                -
              </Button>
              <Typography sx={{ display: "flex", alignItems: "center", px: 2 }}>
                {quantity}
              </Typography>
              <Button variant="contained" onClick={increaseQuantity}>
                +
              </Button>
            </ButtonGroup>
            <Button variant="contained" size="small" onClick={addToCart}>
              ADD TO CART
            </Button>
          </Box>

          <Typography sx={{mt: 2}}>
            {product.data.aboutMe}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <Divider sx={{ my: 2 }} />
        <Typography sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}>
          Reviews
        </Typography>
        {reviews.data.map(item=> <Review {...item} />)}
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <Typography sx={{ fontSize: "22px" }}>Add a Review</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 1 }}>
              Your rating
              <Rating size="small" name="rate" value={formik.values.rate} onChange={formik.handleChange} />
            </Box>
            <TextField
              fullWidth
              size="small"
              placeholder="Name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Comment (optional)"
              name="text"
              onChange={formik.handleChange}
              value={formik.values.text}
              multiline
              rows={7}
              sx={{ my: 1 }}
            />
            <Button variant="contained" type="submit" sx={{ my: 1 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
