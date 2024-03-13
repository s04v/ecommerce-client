import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { styled } from "@mui/material/styles";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PopularProducts from "./components/PopularProducts";
import SalesStatistics from "./components/SalesStatistics";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getOrderStatistics } from '../../api/OrderAPI';

const ReportCard = styled(Box)`
  border: 1px solid #dedede;
  border-radius: 4px;
  width: 24%;
  padding: 15px 20px;
`

const CardBox = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const AdminPanel = () => {
  const {data, isLoading} = useQuery("orderStatistics", getOrderStatistics);

  if(isLoading)
    return <p>Loading</p>

  return (
    <>
      <Typography sx={{ fontSize: "26px", fontWeight: 700, my: 2 }}>Welcome to Dashboard</Typography>
      <CardBox>
        <ReportCard sx={{ backgroundColor: "#00fd57ba" }}>
          <CurrencyExchangeIcon sx={{mb: 4}} />
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>${data.totalSales}</Typography>
          <Typography sx={{ color: "grey" }}>Total sales</Typography>
        </ReportCard>
        <ReportCard>
          <CurrencyExchangeIcon sx={{mb: 4}} />
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>{data.newOrders}</Typography>
          <Typography sx={{ color: "grey" }}>New orders</Typography>
        </ReportCard>
        <ReportCard>
          <AutorenewIcon sx={{mb: 4}} />
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>{data.orderProcessing}</Typography>
          <Typography sx={{ color: "grey" }}>Order processing</Typography>
        </ReportCard>
        <ReportCard>
          <AssignmentTurnedInIcon sx={{mb: 4}} />
          <Typography sx={{ fontSize: "26px", fontWeight: 600 }}>{data.completedOrders}</Typography>
          <Typography sx={{ color: "grey" }}>Completed orders</Typography>
        </ReportCard>
      </CardBox>
      <CardBox sx={{flexWrap: "unset", gap: 3, mt: 3 }}>
        <SalesStatistics  />
        <PopularProducts />
      </CardBox>
    </>


  )
}

export default AdminPanel;