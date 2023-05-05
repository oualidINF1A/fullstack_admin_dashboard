import React from 'react'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import { DownloadOutlined, Today, PersonAdd, AttachMoney, CalendarMonth } from '@mui/icons-material'
import {Box, Button, Typography, useTheme, useMediaQuery} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import BreakdownChart from 'components/BreakdownChart'
import OverviewChart from 'components/OverviewChart'
import { useGetDashboardQuery } from 'state/api'
import Loading from 'components/Loading'
import StatBox from 'components/StatBox'

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const customerIncreasePercentage = "+14%" 
  const daySalesIncreasePercentage = "+24%"
  const monthSalesIncreasePercentage = "+7%"
  const yearlySalesIncreasePercentage = "+42%"

  const transactioncolumns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];


  if(!data || isLoading) return <Loading/>

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to your dashboard"/>

        <Box>
          <Button 
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color:theme.palette.background.alt,
            fontSize:"14px",
            fontWeight:"bold",
            padding:"10px 20px",

          }}>
            <DownloadOutlined sx={{marginRight:"10px"}}/>
            Download Reports</Button>
        </Box>
      </FlexBetween>

      <Box mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="160px"
      gap="20px"
      sx={{
        "& > div": {
          gridColumn:isNonMediumScreen ? undefined : "span 12",
        }
      }}
      >
        {/* Row 1  */}
        <StatBox title="Total Customers" value={data && data.totalCustomers}
        increase={customerIncreasePercentage} description="Since last month" icon={
          <PersonAdd sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
        } page="customers"/>
        <StatBox title="Sales Today" value={data && data.todayStats.totalSales}
        increase={daySalesIncreasePercentage} description="Since last month" icon={
          <Today sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
        } page="daily"/>

        <Box gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard data={data && data.overviewChart}/>
        </Box>

        <StatBox title="Monthly Sales" value={data && data.thisMonthStats.totalSales}
        increase={monthSalesIncreasePercentage} description="Since last month" icon={
          <CalendarMonth sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
        } page="monthly"/>

        <StatBox title="Yearly Sales" value={data && data.yearlySalesTotal}
        increase={yearlySalesIncreasePercentage} description="Since last month" icon={
          <AttachMoney sx={{color:theme.palette.secondary[300], fontSize:"26px"}}/>
        }/>

        {/* Row 2  */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root" : {
                border:"none",
                borderRadius:"5rem",
            },
            "& .MuiDataGrid-cell" : {
                borderBottom:"none",
            },
            "& .MuiDataGrid-columnHeaders" : {
                backgroundColor:theme.palette.background.alt,
                color:theme.palette.secondary[200],
                borderBottom:"none",
            },
            "& .MuiDataGrid-virtualScroller" : {
                backgroundColor:theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer" : {
                backgroundColor:theme.palette.primary.light,
                color:theme.palette.secondary[200],
                borderTop:"none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text"  :{
                color:`${theme.palette.secondary[200]} !important`,
            }
        }}
        >
          <DataGrid 
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={transactioncolumns} 
            >
          </DataGrid>
        </Box>

        <Box
        gridColumn="span 4"
        gridRow="span 3"
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"
        > 
          <Typography variant="h6" sx={{color:theme.palette.secondary[100] }}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard/>
          <Typography p="0 0.6rem" fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
              Breakdown of all sales by category for the last year.
          </Typography>
        </Box>

      </Box>
    </Box>
  )
}

export default Dashboard