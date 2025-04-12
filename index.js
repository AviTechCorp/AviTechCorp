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

const fetchData = (interval) => {
  fetch(`https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&limit=1000`)
    .then(response => response.json())
    .then(data => {
      const chartData = data.map(candle => ({
        time: candle[0] / 1000,
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
      }));
      series.setData(chartData);
    });
};
document.getElementById('dropdown-button').addEventListener('click', () => {
  document.getElementById('dropdown-menu').classList.toggle('show');
});

document.getElementById('1m-button').addEventListener('click', () => {
  fetchData('1m');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('3m-button').addEventListener('click', () => {
  fetchData('3m');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('5m-button').addEventListener('click', () => {
  fetchData('5m');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('15m-button').addEventListener('click', () => {
  fetchData('15m');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('30m-button').addEventListener('click', () => {
  fetchData('30m');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('1h-button').addEventListener('click', () => {
  fetchData('1h');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('2h-button').addEventListener('click', () => {
  fetchData('2h');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('4h-button').addEventListener('click', () => {
  fetchData('4h');
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('1d-button').addEventListener('click', () => {
  fetchData('1d');
  document.getElementById('dropdown-menu').classList.remove('show');
});
window.addEventListener('click', (e) => {
  if (!e.target.matches('.dropdown-button') && !e.target.matches('.dropdown-button *')) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    }
  }
});

fetchData('1m');

window.addEventListener('resize', () => {
  chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
});
