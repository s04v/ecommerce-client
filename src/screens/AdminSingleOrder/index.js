import { Box, Divider, Paper, styled, Typography } from "@mui/material"
import Product from "./components/Product"
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';
import { useParams } from 'react-router-dom';
import { getOneOrder, updateOrder } from "../../api/OrderAPI";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";

const FieldName = styled(Typography)`
  color: grey;
  font-size: 14px;
  margin-top: 16px;

`

const ProductBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px; 
`

const Status = styled(Box)`
  border: 1px solid #dedede;
  width: fit-content;
  padding: 4px;
  font-size: 14px;
  width: 80px;
  text-align: center;
  cursor: pointer;
`
const Opened = styled(Status)`
  ${props => props.active ? `
    border: 2px solid gray;
    color: gray;
    font-weight: 600;
  ` : ''
  }
`

const Packed = styled(Status)`
  ${props => props.active ? `
    border: 2px solid #0043ce;
    color: #0043ce;
    font-weight: 600;
  ` : ''
  }
`

const InTransit = styled(Status)`
  ${props => props.active ? `
    border: 2px solid #f1c21b;
    color: #f1c21b;
    font-weight: 600;
  ` : ''
  }
`

const Delivered = styled(Status)`
  ${props => props.active ? `
    border: 2px solid #24A148;
    color: #24A148;
    font-weight: 600;
  ` : ''
  }
`

const OrderedItems = styled(Box)`
  width: 80%;
  padding: 8px 18px;
  height: 75vh;
  display: flex;
  margin: 20px 0;
  flex-direction: column;
`

const CustomerInfo = styled(Box)`
  margin-bottom: 30px;
  padding: 8px 18px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
`

const AdminSingleOrder = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery("order", () => getOneOrder(id));
  const orderMutation = useMutation(updateOrder);

  const [status, setStatus] = useState("");

  useEffect(() => {
    if(!isLoading)
      setStatus(data.status);
  }, [data]);

  const changeStatus = (newStatus) => {
    setStatus(newStatus);
    orderMutation.mutate({id, data: { status: newStatus }});
  }

  if(isLoading)
    return <p>Loading</p>
    
  console.log(data);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
      <Typography sx={{ fontSize: "26px", fontWeight: 700, mt: 2 }}>Order#{data.id}</Typography>
      <Typography sx={{ fontSize: "14px",  color: 'grey' }}>{new Date(data.date).toLocaleDateString('eu-EU', {day: 'numeric', month: '2-digit', year: 'numeric'})}</Typography>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Opened active={status === "New"} onClick={() => changeStatus("New")}>New</Opened>
        <Packed active={status === "Packed"} onClick={() => changeStatus("Packed")}>Packed</Packed>
        <InTransit active={status === "In Transit"} onClick={() => changeStatus("In Transit")}>In Transit</InTransit>
        <Delivered active={status === "Delivered"} onClick={() => changeStatus("Delivered")}>Delivered</Delivered>
      </Box>
      <Box sx={{ display: 'flex' }}>

        <OrderedItems>
          <Typography sx={{ fontWeight: 600 }}>Ordered Items</Typography>
          <Divider sx={{ mt: 1, mb: 2 }}/>
          <Box sx={{ overflowY: 'scroll', maxHeight: '100%', position: 'relative'}}>
            {data.products?.map(p => <Product data={p} />)}
          </Box>

          <Divider sx={{ my: 2, mt: 'auto'}}/>
          <Box sx={{width: 'fit-content',display: 'flex', ml: 'auto'}}>
            <Typography sx={{ mr: 1 }}>Total price: </Typography>
            <Typography sx={{ fontWeight: 600 }}> ${data.price}</Typography>
          </Box>      
        </OrderedItems>
        <CustomerInfo>
          <Typography sx={{ fontWeight: 600 }}>Customer Info</Typography>
          <Divider sx={{ mt: 1, mb: 2 }}/>
          <Box sx={{  width: '100%', height: '100%'}}>
              
              <Box sx={{ display: 'flex', gap: 2}}>
                <ContactEmergencyIcon />
                <Typography>{data.name}</Typography>
              </Box>
              <br />
              <Box sx={{ display: 'flex', gap: 2}}>
                <LocalPhoneIcon />
                <Typography>{data.phone}</Typography>
              </Box>
              <br />
              <Box sx={{ display: 'flex', gap: 2}}>
                <PublicIcon />
                <Typography>{data.city}, {data.country}</Typography>
              </Box>
              <br />
              <Box sx={{ display: 'flex', gap: 2}}>
                <BusinessIcon />
                <Typography>{data.address}</Typography>
              </Box>
          </Box>
        </CustomerInfo>
      </Box>
    </Box>
  )
}

export default AdminSingleOrder;