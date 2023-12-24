import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Share from '@mui/icons-material/Share';
import RoundIconCard from 'components/cards/statistics/RoundIconCard';


const DefaultPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (value) => {
    let options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (value < 1) {
      options = { minimumFractionDigits: 8, maximumFractionDigits: 8 };
    }
    return `$${new Intl.NumberFormat('en-US', options).format(value)}`;
  };

  const formatDate = (datetime) => {
    return new Date(datetime).toLocaleString(undefined, { month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: false });
  };

  const [hasData, setHasData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://robustness.ai:3008/predicted');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      const processPredData = (predData, timeField) => {
        if (predData && predData.length > 0) {
          const lastItem = predData[predData.length - 1];
          const average = (lastItem.open + lastItem.high + lastItem.low + lastItem.close) / 4;
          return {
            secondary: formatCurrency(average),
            change: Number(Number(lastItem.change).toFixed(2)),
            content: formatDate(lastItem[timeField]),
            data: [formatCurrency(lastItem.open), formatCurrency(lastItem.high), formatCurrency(lastItem.low), formatCurrency(lastItem.close)],
          };
        } else {
          throw new Error('No data available');
        }
      };
      setData({
        pred_1h: processPredData(fetchedData.pred_1h, 'datetime'),
        pred_1d: processPredData(fetchedData.pred_1d, 'date'),
      });
      setHasData(true);
    } catch (error) {
      console.error('Error during fetch:', error);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  // Fetch data immediately
  fetchData();

  // Get the current date and time
  const now = new Date();

  // Calculate the time difference to the next hour
  const diff = 60 * 60 * 1000 - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

  // Fetch data after the time difference plus a small delay
  const delay = 1 * 60 * 1000; // 1 minute times 60 seconds times 1000 milliseconds
  const timeoutId = setTimeout(() => {
    fetchData();

    // Then fetch data every 30 seconds
    const intervalId = setInterval(() => {
      if (!hasData) {
        fetchData();
      } else {
        // If data is fetched successfully, clear the interval
        clearInterval(intervalId);
      }
    }, 30 * 1000); // 30 seconds times 1000 milliseconds

    // Clear the interval after 5 minutes
    setTimeout(() => {
      clearInterval(intervalId);
    }, 5 * 60 * 1000); // 5 minutes times 60 seconds times 1000 milliseconds

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, diff + delay);

  // Clear the timeout when the component is unmounted
  return () => {
    clearTimeout(timeoutId);
  };
}, [hasData]);

  if (loading) {
    return <CircularProgress />;
  }
  console.log(data);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
  <Grid item xs={12} lg={4} sm={6}>
    <RoundIconCard
      primary="1-Hour Forecast"
      secondary={data.pred_1h ? data.pred_1h.secondary : ''}
      percentage={data.pred_1h.change}
      content={data.pred_1h.content}
      iconPrimary={Share}
      color="primary.main"
      bgcolor="primary.lighter"
      data={data.pred_1h.data}
      names={['Open', 'High', 'Low', 'Close']}
      isLoss={data.pred_1h.change < 0 ? true : data.pred_1h.change > 0 ? false : null}
    />
  </Grid>
  <Grid item xs={12} lg={4} sm={6}>
    <RoundIconCard
      primary="1-Day Forecast"
      secondary={data.pred_1d ? data.pred_1d.secondary : ''}
      percentage={data.pred_1d.change}
      content={data.pred_1d.content}
      iconPrimary={Share}
      color="primary.main"
      bgcolor="primary.lighter"
      data={data.pred_1d.data}
      names={['Open', 'High', 'Low', 'Close']}
      isLoss={data.pred_1d.change < 0 ? true : data.pred_1d.change > 0 ? false : null}
    />
  </Grid>
</Grid>
    
  );

  // return (
  //   // <Grid container rowSpacing={4.5} columnSpacing={3}>
  //   //   <Grid item xs={12} lg={4} sm={6}>
  //   //     <RoundIconCard
  //   //       primary="price"
  //   //       secondary={data.secondary}
  //   //       content={data.content}
  //   //       iconPrimary={Share}
  //   //       color="primary.main"
  //   //       bgcolor="primary.lighter"
  //   //       data={data.data}
  //   //     />
  //   //   </Grid>
  //   // </Grid>
  // );
};

export default DefaultPage;