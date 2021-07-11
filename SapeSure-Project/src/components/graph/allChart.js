import fetch from 'node-fetch';
import { Chart} from 'chart.js';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const donutApi = "https://api.npoint.io/076c05ac049efde8590b";
const pieApi = "https://api.npoint.io/53a28bcfaa6958e7aa77";
const barApi = "https://api.npoint.io/d9079ccce070e00ff03d";

async function getDonutChart() {
  const response = await fetch(donutApi);
  const res = await response.json();
  const actions = res.data.stats.map((list) => list.id);
  const values = res.data.stats.map((list) => list.value);
  let totalValue = 0;
  for(let i=0; i<values.length; i+=1){
    totalValue += values[i];
  }
  totalValue = totalValue.toLocaleString('en-US', {maximumFractionDigits:2});
  const dataVal = {
    labels: actions,
    datasets: [
      {
        data: values,
        borderWidth: 0,
        backgroundColor: ["#9c106c", "#12b0e2", "#ffd337"],
      },
    ],
  };
/* eslint-disable no-new */
new Chart("myChart", {
    type: "doughnut",
    /* eslint-disable object-shorthand */
    data: dataVal,
    plugins: [{
     /* eslint-disable func-names */
      beforeDraw: function(chart) {
        const [width, height, ctx] = [chart.chart.width, chart.chart.height, chart.chart.ctx];
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";
        const [text, textX, textY] = [`$${totalValue}`, Math.round((width - ctx.measureText(`$${totalValue}`).width) / 2), height / 2]
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
  }],
    options: {
      responsive: true,
      cutoutPercentage: 60,
      rotation: -0.5 * Math.PI - (180 / 180) * Math.PI,
      tooltips: {
        callbacks: {
          title(tooltipItem, dataValue) {
            let str = dataValue.labels[tooltipItem[0].index];
            str = capitalizeFirstLetter(str);
            return `${str}:`;
          },
          label:function(tooltipItem, data) {
            const itemtool=data.datasets[0].data[tooltipItem.index];
            const toolval = itemtool.toLocaleString('en-US', {maximumFractionDigits:2});
            return `$${toolval}`;
            }
          },
          caretPadding: -20,
          backgroundColor: '#FFF',
          titleFontSize: 12,
          titleFontColor: '#000',
          bodyFontColor: '#000',
          bodyFontSize: 12,
          displayColors: false,
          cornerRadius:0,
          caretSize: 0,
          borderColor: '#808080',
          borderWidth : 1
        },
      legend: {
        display: false,
      },
    },
  });
}
getDonutChart();

async function getPieChart() {
  const response = await fetch(pieApi);
  const res = await response.json();
  // const ids = res.data.stats.map((list) =>  list.id);
  const ids = ["SapeSure", "Claimant"];
  const values = res.data.stats.map((list) => list.value);

new Chart("myChartpie", {
    type: "pie",
    data: {
      labels: ids,
      datasets: [
        {
          data: values,
          borderWidth: 0,
          backgroundColor: ["#9c106c", "#ffd337"],
        },
      ],
    },
    options: {
      responsive: true,
      rotation: -0.5 * Math.PI - (270 / 180) * Math.PI,
      tooltips: {
        callbacks: {
            title(tooltipItem, data) {
              // let str = data.labels[tooltipItem[0].index];
              // str = capitalizeFirstLetter(str);
              // return `${str}:`;
              const str = data.labels[tooltipItem[0].index];
              return `${str}:`;
            },
            label(tooltipItem, data) {
              return `${data.datasets[0].data[tooltipItem.index]}%`;
            },
          },
          caretPadding: -50,
          backgroundColor: '#FFF',
          titleFontSize: 12,
          titleFontColor: '#000',
          bodyFontColor: '#000',
          bodyFontSize: 12,
          displayColors: false,
          cornerRadius:0,
          caretSize: 0,
          borderColor: '#808080',
          borderWidth : 1
      },
      legend: {
        display: false,
      },
    },
    centerText: {
      display: true,
      text: "",
    },
  });
}
getPieChart();

async function getBarChart() {
  const response = await fetch(barApi);
  const res = await response.json();

  const values = res.data.stats.map((list) => list.value);
 
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const barrColors = [
    "#9c106c",
    "#9c106c",
    "#9c106c",
    "#9c106c",
    "#9c106c",
    "#9c106c",
    "#9c106c",
  ];
  const barrColors2 = [
    "#feeaa1",
    "#feeaa1",
    "#feeaa1",
    "#feeaa1",
    "#feeaa1",
    "#feeaa1",
    "#feeaa1",
  ];

  const totalValue = ["3000","3000","3000","3000","3000","3000","3000"]

  new Chart("myChartbar", {
    type: "bar",
    data: {
      labels: days,
      datasets: [{
          backgroundColor: barrColors,
          data: values
        },
        {
          backgroundColor: barrColors2,
          data: totalValue
        }
      ]
    },

    options: {
      responsive: true,
      scales: {
        xAxes: [{
            gridLines: {
              drawOnChartArea: false,
              display: false,
              color: "rgba(0, 0, 0, 0)",
            },
            stacked: true,
            barPercentage: 1
          }],

        yAxes: [{
          stacked: false,
            gridLines: {
              drawOnChartArea: false,
              display: false,
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          title() {
            return null;
          },
          label(tooltipItem, data) {
            const itemtool = data.datasets[0].data[tooltipItem.index];
            const toolval = itemtool.toLocaleString('en-US', {maximumFractionDigits:2});
            return `${toolval}`;
          },
          },
          backgroundColor: '#FFF',
          bodyFontColor: '#000',
          bodyFontSize: 14,
          bodyFontStyle: "bold",
          displayColors: false,
          cornerRadius:0,
          caretSize: 0,
          borderColor: '#808080',
          borderWidth : 1
        },
      legend: {
        display: false,
      },
    },
    centerText: {
      display: true,
      text: "",
    }
  });
}
getBarChart();

