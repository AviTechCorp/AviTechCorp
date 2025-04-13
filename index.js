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

let currentReplayIndex = 0;
let isPlaying = false;

const replay = () => {
  const replayContainer = document.getElementById('replay-container');
  if (replayContainer.style.display === 'block') {
    replayContainer.style.display = 'none';
  } else {
    replayContainer.style.display = 'block';
    const rangeInput = document.getElementById('replay-range');
    rangeInput.min = 0;
    rangeInput.max = chartData.length - 1;
    rangeInput.value = 0;
    const replayStartLabel = document.getElementById('replay-start-label');
    replayStartLabel.innerText = `Start from: ${chartData[0].time}`;
    rangeInput.addEventListener('input', () => {
      replayStartLabel.innerText = `Start from: ${chartData[rangeInput.value].time}`;
    });
    let playPauseButton = document.getElementById('play-pause-button');
    if (!playPauseButton) {
      playPauseButton = document.createElement('button');
      playPauseButton.id = 'play-pause-button';
      playPauseButton.innerText = 'Play';
      document.getElementById('replay-container').appendChild(playPauseButton);
    }
    playPauseButton.addEventListener('click', () => {
      if (!isPlaying) {
        if (currentReplayIndex === 0) {
          currentReplayIndex = parseInt(rangeInput.value);
        }
        isReplay = true;
        isPlaying = true;
        document.getElementById('replay-button').innerText = 'Stop Replay';
        playPauseButton.innerText = 'Pause';
        replayLoop();
      } else {
        isPlaying = false;
        isReplay = false;
        playPauseButton.innerText = 'Play';
      }
    });
    document.getElementById('start-replay-button').addEventListener('click', () => {
      currentReplayIndex = parseInt(rangeInput.value);
      isReplay = true;
      isPlaying = true;
      document.getElementById('replay-button').innerText = 'Stop Replay';
      playPauseButton.innerText = 'Pause';
      replayLoop();
      replayContainer.style.display = 'none';
    });
  }
};

const replayLoop = () => {
  if (isReplay && currentReplayIndex < chartData.length) {
    series.setData(chartData.slice(0, currentReplayIndex + 1));
    currentReplayIndex++;
    if (isReplay) {
      setTimeout(replayLoop, 100);
    }
  } else {
    isReplay = false;
    document.getElementById('replay-button').innerText = 'Replay';
    const playPauseButton = document.getElementById('play-pause-button');
    if (playPauseButton) {
      playPauseButton.innerText = 'Play';
    }
  }
};

document.getElementById('reset-replay-button').addEventListener('click', () => {
  isReplay = false;
  isPlaying = false;
  currentReplayIndex = 0;
  series.setData(chartData);
  document.getElementById('replay-button').innerText = 'Replay';
  const playPauseButton = document.getElementById('play-pause-button');
  if (playPauseButton) {
    playPauseButton.innerText = 'Play';
  }
});

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

