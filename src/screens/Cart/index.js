import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DeliveryInfo from "./components/DeliveryInfo";
import ProductItem from "./components/ProductItem";
import CartStorage from "../../lib/Cart";
import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { createOrder } from "../../api/OrderAPI";
import { useAlert } from "../../lib/Alert";
import { useNavigate } from "react-router-dom";

const CartBox = styled(Box)(({ theme }) => ({
  border: "1px solid #dedede",
  padding: "25px",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  width: "1000px",
}));

const CheckoutBox = styled(Box)(({ theme }) => ({
  gap: "15px",
  alignItems: "center",
  marginTop: "auto",
}));

const InfoBox = styled(Box)(({ theme }) => ({
  border: "1px solid #dedede",
  width: "100%",
  padding: "25px",
}));

const validationSchema = yup.object({
  name: yup.string("Enter name").required("Field is required"),
  phone: yup.string("Enter phone number").required("Field is required"),
  country: yup.string("Enter country").required("Field is required"),
  city: yup.string("Enter city").required("Field is required"),
  address: yup.string("Enter address").required("Field is required"),
});

const Cart = () => {
  const [items, setItems] = useState(CartStorage.get());
  const { Alert } = useAlert();
  const navigate = useNavigate();
  const orderMutation = useMutation(createOrder, { onSuccess: () => onSuccessOrder()});

  const getTotalPrice = () => {
    let price = 0;
    items.forEach((item) => (price += item.price * item.quantity));
    return price;
  };

  const onDeleteItem = (id) => {
    console.log(id);
    CartStorage.remove(id);
    setItems(CartStorage.get());
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    },
    onSubmit: async (values) => {
      let products = CartStorage.get();
      products = products.map(({ id, quantity, size, price }) => ({ id, quantity, size, price }) );
      console.log(products);
      orderMutation.mutate({...values, products})
    },
  });

  const onSuccessOrder = () => {
    Alert.success("Order created");
    setTimeout(() => {
      CartStorage.removeAll();
      navigate('/');
    }, 500);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ pb: 10, display: "flex", gap: "15px" }}>
        <InfoBox>
            <Typography sx={{ mb: 2, fontWeight: 600, fontSize: 18 }}>
              Delivery information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, color: "grey" }}>Name</Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled={!items.length}
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, color: "grey" }}>
                  Phone number
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled={!items.length}
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, color: "grey" }}>
                  Country
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled={!items.length}
                  name="country"
                  onChange={formik.handleChange}
                  value={formik.values.country}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, color: "grey" }}>City</Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled={!items.length}
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: 14, color: "grey" }}>
                  Address
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled={!items.length}
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
            </Grid>
        </InfoBox>
        <CartBox>
          {!items.length ? (
            <Typography sx={{ textAlign: "center" }}>Cart is empty</Typography>
          ) : (
            items.map((item) => (
              <ProductItem {...item} onDeleteItem={onDeleteItem} />
            ))
          )}
          <CheckoutBox>
            <Typography>Enter discount code:</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Total price:</Typography>
              <Typography>${getTotalPrice()}</Typography>
            </Box>
            <Divider sx={{ borderColor: "gray", my: 2 }} />
            <Button variant="contained" fullWidth disabled={!items.length} type="submit">
              Checkout
            </Button>
          </CheckoutBox>
        </CartBox>
      </Box>
    </form>

  );
};

export default Cart;
