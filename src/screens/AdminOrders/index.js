import { Box, Menu, MenuItem, styled, TextField, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import Order from "./components/Order";
import { getOrders } from "../../api/OrderAPI";
import { useQuery } from "react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const OrderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
` 
const SortVariant = styled(Typography)`
  padding: 4px 15px;
  width: auto;
  display: inline-block;
  margin-bottom: 8px;
  cursor: pointer;
  ${props => props.active ? `
    border-bottom: 2px solid ${props.theme.palette.primary.main};
    color: ${props.theme.palette.primary.main};
  `: ''}
`

const NewBadge = styled(Typography)`
  text-align: center;
  color: white;
  padding: 5px 12px;
  font-size: 14px;
  width: fit-content;
  border-radius: 20px;
  background-color: #0071e0;
`

const PackedBadge = styled(Typography)`
  text-align: center;
  color: white;
  padding: 5px 12px;
  font-size: 14px;
  width: fit-content;
  border-radius: 20px;
  background-color: #9c62b4;
`


const InTransitBadge = styled(Typography)`
  text-align: center;
  padding: 5px 12px;
  font-size: 14px;
  width: fit-content;
  border-radius: 20px;
  background-color: #f7c973;
`

const AdminOrders = () => {
  const [status, setStatus] = useState("New");
  const { data, isLoading } = useQuery("orders", getOrders);

  if(isLoading)
    return <p>Loading</p>
  return (
    <>
    <Typography sx={{ fontSize: "26px", fontWeight: 700, my: 2 }}>Orders</Typography>
    <SortVariant active={status === "New"} onClick={() => setStatus("New")}>New</SortVariant>
    <SortVariant active={status === "Packed"} onClick={() => setStatus("Packed")}>Packed</SortVariant>
    <SortVariant active={status === "In Transit"} onClick={() => setStatus("In Transit")}>In Transit</SortVariant>
    <SortVariant active={status === "Delivered"} onClick={() => setStatus("Delivered")}>Delivered</SortVariant>

    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{width: "100px"}}>ID</TableCell>
          <TableCell sx={{width: "150px"}}>Items quantity</TableCell>
          <TableCell sx={{width: "20%"}}>Price</TableCell>
          <TableCell sx={{width: "20%"}}>Address</TableCell>
          <TableCell sx={{width: "20%"}}>Date</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data?.filter(o => o.status === status).map(order => {
          let quantity = 0; 
          let price = 0;
          
          order.products.forEach((p) => {
            quantity += p.quantity;
            price += p.quantity * p.price;
          });

          return <TableRow>
            <TableCell>
              <Link to={`/admin/orders/${order.id}`} >Order#{order.id}</Link>
            </TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>${price}</TableCell>
            <TableCell>{order.city}, {order.country}</TableCell>
            <TableCell>{new Date(order.date).toLocaleDateString('eu-EU', {day: 'numeric', month: '2-digit', year: 'numeric'})}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>

    {/* <OrderBox>
      <Order />
      <Order />
    </OrderBox> */}
    </>
  )
}

export default AdminOrders;