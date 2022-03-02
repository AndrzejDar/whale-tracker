import React, { useEffect, useRef } from "react";
const { Chart, registerables } = require("chart.js");
Chart.register(...registerables);

//d1 underlaying price chart .prices .dates
//d2 actual data - np wallet balance .balances .dates
function DrawChart({ d1, d2 }) {
  const myCanvas = useRef(null);

  useEffect(async() => {
    if (d1.dates) {
      d2.balances = await spreadDataToDates(d2, d1.dates);
      drawMainChart("btc");
      
    }
  }, [d1]);

  //const mChartCanvas = <canvas id="myChart"></canvas>;

  function drawMainChart(token) {
    console.log("Drawing init chart");
    let labels = d1.dates; //change to d1 when token data imported
    let data = {
      labels: labels,
      datasets: [
        {
          label: token + " price",
          type: "line",
          backgroundColor: "rgba(52, 128, 202, 0.4)",
          borderColor: "rgba(52, 128, 202,0.4)",
          data: d1.prices,
          borderWidth: 2,
          borderJoinStyle: "bevel",
          pointBorderWidth: 0,
          pointHitRadius: 0,
          hidden: false,
          yAxisID: "logScale",
        },
        {
          label: "wallet ballance",
          type: "line",
          //backgroundColor: wColor,
          barThickness: "flex",
          //barPercentage: 1,
          categoryPercentage: 1,
          //borderWidth: wBarThickness,
          backgroundColor: "#dc3545",
          borderColor: "#dc3545",
          data: d2.balances,
          yAxisID: "normalScale",
          order: 2,
          hidden: false,
        },
        // {
        //   label: "S&P wallet",
        //   type: "bar",
        //   backgroundColor: "rgba(117, 6, 6, 0.5)",
        //   borderColor: "rgba(117, 6, 6,0.1)",
        //   data: spW,
        //   yAxisID: "myScale2",
        //   order: 1,
        //   hidden: false,
        // },
      ],
    };

    let config = {
      data: data,
      options: {
        scales: {
          logScale: {
            type: "logarithmic",
            position: "left",
            min: function (context) {
              let a = context.chart.data.datasets[0].data[0];
              context.chart.data.datasets[0].data.forEach((el) => {
                if (el < a) a = el;
              });
              return a;
            },
            max: function (context) {
              let a = context.chart.data.datasets[0].data[0];
              context.chart.data.datasets[0].data.forEach((el) => {
                if (el > a) a = el;
              });
              return a;
            },
          },
          normalScale: {
            /*type: "logarithmic",*/
            position: "right",
            //min: 0,
          },
        },
        elements: {
          point: {
            radius: 1,
          },
        },
      },
    };

    const mChart = new Chart(myCanvas.current, config);
  }

  return (
    <div>
      <canvas ref={myCanvas}></canvas>
      {/* {mChartCanvas}         */}
    </div>
  );
}

function spreadDataToDates(d2, dates) {
  const d2balances = [];
  console.log("dates should be equal: "+d2.dates[0]+" =? "+dates[0]);

  //iterate throught operations and combaine for one day
  let tmpD2Days = [];
  let tmpD2Balance = [];

  for (let i = 0; i < d2.dates.length; i++) {
if(i!=0){
    if (d2.dates[i] != d2.dates[i - 1]) {
      tmpD2Days.push(d2.dates[i]);
      tmpD2Balance.push(d2.balances[i]);
    } else {      
      tmpD2Balance[tmpD2Balance.length - 1] =
      d2.balances[i];
      //console.log(tmpD2Balance[tmpD2Balance.length - 1]);
    }}else{
      tmpD2Days.push(d2.dates[i]);
      tmpD2Balance.push(d2.balances[i]);
      //console.log(tmpD2Balance[tmpD2Balance.length - 1]);
    }
      
    
  }
//console.log(tmpD2Days);
//console.log(tmpD2Balance);

  //iterate throught evry day and fill balance gaps
  dates.forEach((date) => {
    if (date === tmpD2Days[0]) {
      d2balances.push(tmpD2Balance[0]);
      tmpD2Balance.shift();
      tmpD2Days.shift();
    } else {
      //console.log(d2balances[d2balances.length - 1]);
      d2balances.push(d2balances[d2balances.length - 1]);
    }
  });
  //console.log(d2balances);
  return d2balances;
}

export default DrawChart;
