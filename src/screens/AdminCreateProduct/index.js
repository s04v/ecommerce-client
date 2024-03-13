import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createProduct,
  getOneProduct,
  updateProduct,
} from "../../api/ProductAPI";
import { useAlert } from "../../lib/Alert";
import { useNavigate, useParams } from "react-router-dom";

import * as yup from "yup";

const UploadPlaceholder = styled(Box)`
  width: 300px;
  height: 400px;
  border: 1px dashed black;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  color: grey;
`;

const ProductImage = styled(Box)`
  width: 300px;
  height: 400px;
  background-size: cover;
  background: url(${(props) => props.src}) no-repeat;
  background-size: cover;
  background-position: center center;
`;

const validationSchema = yup.object({
  name: yup.string("Enter product name").required("Field is required"),
  brand: yup.string("Enter brand name").required("Field is required"),
  category: yup.string("Enter brand name").required("Field is required"),
  price: yup.number("Enter product price").required("Field is required"),
  quantity: yup.number("Enter quantity").required("Field is required"),
  discount: yup.number("Enter product price").min(0).max(99),
  image: yup.mixed().required("Field is required"),
});

const AdminCreateProduct = ({ edit }) => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["product", id], () => getOneProduct(id), {
    enabled: edit ? true : false,
  });
  const { Alert } = useAlert();
  const navigate = useNavigate();
  const productMutation = useMutation(edit ? updateProduct : createProduct);
  const inputFile = useRef(null);

  const initialValues =
    edit && !isLoading
      ? data
      : {
          name: "",
          brand: "",
          price: "",
          quantity: "",
          discount: "",
          category: "",
          sizes: [],
          aboutMe: "",
          image: "",
        };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("brand", values.brand);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("aboutMe", values.aboutMe);
      formData.append("sizes", values.sizes);
      formData.append("quantity", values.quantity);
      if (edit) formData.append("image", values.image);
      else formData.append("image", values.image, values.image.name);

      if (values.discount) formData.append("discount", values.discount);

      productMutation.mutate({ id, formData });
      if (productMutation.isError) {
        Alert.error("Error");
      } else {
        Alert.success("Success");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      }
    },
  });

  const onUploadClick = () => {
    inputFile.current.click();
  };

  const handleSizeSelect = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    if (checked) {
      console.log(value);
      formik.setFieldValue('sizes', [...formik.values.sizes, value]);
    } else {
      console.log(formik.values.sizes);
      const index = formik.values.sizes.indexOf(value);
      const newSizes = [...formik.values.sizes];
      newSizes.splice(index, 1);
      formik.setFieldValue('sizes', newSizes);
    }
  }

  if (isLoading) return <p>Loading</p>;

  console.log(formik.values);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography sx={{ fontSize: "26px", fontWeight: 700, my: 2 }}>
        Create new product
      </Typography>

      <form onSubmit={formik.handleSubmit} sx={{ height: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: "14px", color: "grey" }}>
                Name
              </Typography>
              <TextField
                size="small"
                fullWidth
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  Brand
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  name="brand"
                  onChange={formik.handleChange}
                  value={formik.values.brand}
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
                  helperText={formik.touched.brand && formik.errors.brand}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  Category
                </Typography>
                <TextField
                  select
                  size="small"
                  fullWidth
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                >
                  <MenuItem value="Jackets">Jackets</MenuItem>
                  <MenuItem value="Shirts">Shirts</MenuItem>
                  <MenuItem value="Jeans">Jeans</MenuItem>
                  <MenuItem value="T-Shirts">T-Shirts</MenuItem>
                  <MenuItem value="Hoodies">Hoodies</MenuItem>
                  <MenuItem value="Joggers">Joggers</MenuItem>
                  <MenuItem value="Loungewear">Loungewear</MenuItem>
                </TextField>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  Price
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  name="price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  Quantity
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  name="quantity"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                  error={
                    formik.touched.quantity && Boolean(formik.errors.quantity)
                  }
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  Discount
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  name="discount"
                  onChange={formik.handleChange}
                  value={formik.values.discount}
                  error={
                    formik.touched.discount && Boolean(formik.errors.discount)
                  }
                  helperText={formik.touched.discount && formik.errors.discount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: "14px", mt: 2, color: "grey" }}>
                  About me
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    size="small"
                    rows={4}
                    fullWidth
                    name="aboutMe"
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
                    error={
                      formik.touched.aboutMe && Boolean(formik.errors.aboutMe)
                    }
                    helperText={formik.touched.aboutMe && formik.errors.aboutMe}
                  />
              </Box>
            </Box>
            <Box >
              <Typography sx={{ fontSize: "14px", color: "grey", mt: 2}}>
                  Size
              </Typography>
              <FormGroup row>
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("XS")} onChange={handleSizeSelect} value={"XS"} />} label="XS"size="small" />
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("S")} onChange={handleSizeSelect} value={"S"} />} label="S" size="small" />
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("M")}onChange={handleSizeSelect} value={"M"}/>} label="M" size="small" />
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("L")} onChange={handleSizeSelect} value={"L"}/>} label="L" size="small" />
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("XL")} onChange={handleSizeSelect} value={"XL"}/>} label="XL" size="small" />
                <FormControlLabel control={<Checkbox name="sizes" checked={formik?.values.sizes?.includes("XXL")} onChange={handleSizeSelect} value={"XXL"}/>} label="XXL" size="small" />
              </FormGroup>
            </Box>

          </Grid>
          <Grid item xs={5}>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              ref={inputFile}
              style={{ display: "none" }}
            />
            {formik.values.image ? (
              <ProductImage
                src={
                  edit && typeof formik.values.image === "string"
                    ? `http://localhost:3000/public/${formik.values.image}`
                    : URL.createObjectURL(formik.values.image)
                }
                onClick={onUploadClick}
              />
            ) : (
              <UploadPlaceholder onClick={onUploadClick}>
                Click to browse
              </UploadPlaceholder>
            )}
          </Grid>
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 2, mb: 3, width: "fit-content" }}
          type="submit"
        >
          Save
        </Button>
      </form>
    </Box>
  );
};

export default AdminCreateProduct;
