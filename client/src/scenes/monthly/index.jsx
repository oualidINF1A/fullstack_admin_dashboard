import React, { useMemo} from 'react'
import { Box, useTheme } from '@mui/material'
import Header from 'components/Header'
import { ResponsiveLine } from '@nivo/line'
import { useGetSalesQuery } from 'state/api'
import Loading from 'components/Loading'

const  Monthly = () => {

  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: totalUnits },
        ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if(!data || isLoading) return <Loading/>

  return <Box m="1.5rem 2.5rem">
    <Header title="Monthly sales" subtitle="Chart of monthly sales" />

    <Box height="75vh">

      <ResponsiveLine
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{datum: 'color'}}
        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        enableArea={true}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 90,
          legend: "Month",
          legendOffset: 60,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total sales",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
                {
                  anchor: "top-right",
                  direction: "column",
                  justify: false,
                  translateX: 50,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
        }
      />
      
    </Box>

  </Box>
}

export default  Monthly