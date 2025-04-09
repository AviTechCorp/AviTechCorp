fetch('https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&limit=1000')
  .then(response => response.json())
  .then(data => {
    const chartData = data.map(candle => ({
      time: candle[0] / 1000,
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
    }));

    const chartContainer = document.getElementById('tvchart');
    const chart = LightweightCharts.createChart(chartContainer, {
      width: chartContainer.offsetWidth,
      height: chartContainer.offsetHeight,
    });

    const series = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    series.setData(chartData);

    // Add event listener to resize chart on window resize
    window.addEventListener('resize', () => {
      chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
    });
  });
