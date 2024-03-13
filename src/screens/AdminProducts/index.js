import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useMediaQuery } from "@mui/material";
import ProductsFilterBar from "../../shared/ui/ProductsFilterBar";
import Product from "./components/Product";
import { useQuery } from "react-query";
import { getProducts, removeProduct } from "../../api/ProductAPI";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemsQuantity = styled(Typography)`
  color: ${props => props.theme.palette.neutral};
  font-size: 14px;
`

const AdminProducts = () => {
  const [search, setSearch] = useState('');
  let { data, isLoading, refetch } = useQuery('products', getProducts);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
  const [items, setItems] = useState([]);

  const handleChangePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
	};


  useEffect(() => {
    setItems(data);
  },[data]);

  if(isLoading)
    return <div className="loading"></div>

  return (
    <>
      <Typography sx={{ fontSize: "26px", fontWeight: 700, my: 2 }}>Products</Typography>
      <Box sx={{ display: 'flex', gap: 3, height: "89%"}}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}> 
            <Button variant="contained" size="small" sx={{ width: '200px' }}>
              <Link to="/admin/create-product">Create product</Link>
            </Button>
          </Box>
          <ItemsQuantity>Found {data.length} items</ItemsQuantity>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{width: "50px"}}>ID</TableCell>
                  <TableCell sx={{width: "70px"}}>Image</TableCell>
                  <TableCell sx={{width: "30%"}}>Name</TableCell>
                  <TableCell sx={{width: "20%"}}>Brand</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Sales</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ height: "100%" }}>
                {items && items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => ( 
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <img src={'http://localhost:3000/public/' +  item.image} style={{ width: "35px" }} />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.sales}</TableCell>
                    <TableCell align="right" x={{ cursor: "pointer" }} >
                      <Link to={"/admin/edit-product/" + item.id} >Edit</Link>
                    </TableCell>
                  </TableRow>
               ))}
              </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default AdminProducts;