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

let currentPair = 'BTCUSDT';
let currentInterval = '1m';
let isReplay = false;
let replayIndex = 0;
let chartData = [];
const fetchData = (pair = currentPair, interval = currentInterval) => {
  fetch(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=1000`)
    .then(response => response.json())
    .then(data => {
      if (data.code) {
        alert('Invalid pair or interval');
        return;
      }
      chartData = data.map(candle => ({
        time: candle[0] / 1000,
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
      }));
      series.setData(chartData);
    });
};

const replay = () => {
  if (!isReplay) {
    isReplay = true;
    replayIndex = 0;
    document.getElementById('replay-button').innerText = 'Stop Replay';
    replayLoop();
  } else {
    isReplay = false;
    document.getElementById('replay-button').innerText = 'Replay';
  }
};

const replayLoop = () => {
  if (isReplay && replayIndex < chartData.length) {
    series.setData(chartData.slice(0, replayIndex + 1));
    replayIndex++;
    setTimeout(replayLoop, 100); 
  } else {
    isReplay = false;
    document.getElementById('replay-button').innerText = 'Replay';
  }
};

document.getElementById('replay-button').addEventListener('click', replay);

document.getElementById('dropdown-button').addEventListener('click', () => {
  document.getElementById('dropdown-menu').classList.toggle('show');
});

document.getElementById('1m-button').addEventListener('click', () => {
  currentInterval = '1m';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('3m-button').addEventListener('click', () => {
  currentInterval = '3m';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('5m-button').addEventListener('click', () => {
  currentInterval = '5m';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('15m-button').addEventListener('click', () => {
  currentInterval = '15m';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('30m-button').addEventListener('click', () => {
  currentInterval = '30m';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('1h-button').addEventListener('click', () => {
  currentInterval = '1h';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('2h-button').addEventListener('click', () => {
  currentInterval = '2h';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('4h-button').addEventListener('click', () => {
  currentInterval = '4h';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});
document.getElementById('1d-button').addEventListener('click', () => {
  currentInterval = '1d';
  fetchData();
  document.getElementById('dropdown-menu').classList.remove('show');
});

const search = () => {
  currentPair = document.getElementById('pair-input').value.toUpperCase();
  fetchData();
};
document.getElementById('search-button').addEventListener('click', search);
document.getElementById('pair-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    search();
  }
});

window.addEventListener('click', (e) => {
  if (!e.target.matches('.dropdown-button') && !e.target.matches('.dropdown-button *')) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    }
  }
});

fetchData();

window.addEventListener('resize', () => {
  chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight);
});

