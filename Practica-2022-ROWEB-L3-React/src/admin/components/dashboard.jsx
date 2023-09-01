import './dashboard.css';
import React, {useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import DashboardService from '../dashboard.service';
import { CategoryScale, LinearScale, PointElement, LineElement, Chart } from "chart.js";

const Dashboard = () => {


  const [totalUsers, setTotalUsers] = useState([]);
  const [newUsers, setNewUsers] = useState(0);  
  const [moneyReceived, setMoneyReceived] = useState(0); 
  const [orders, setOrders] = useState(0); 

  const [data, setData] = useState([]);
  const [labels3, setLabels3] = useState([]);
  const [labels2, setLabels2] = useState([]);
  const [labels1, setLabels1] = useState([]);

  const [data3, setData3] = useState({
    labels: labels3,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: labels2,
    datasets: [
      {
        label: "Money received last 30 days",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  });
  const [data1, setData1] = useState({
    labels: labels2,
    datasets: [
      {
        label: "Users last 30 days",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
      },
    ],
  });
  

  Chart.register(CategoryScale);
  Chart.register(LinearScale);
  Chart.register(PointElement);
  Chart.register(LineElement);


  const getAllStatistics = async () => {
    DashboardService.getAllData().then((response) => {
        setData(response.data.data);
        console.log('response',response.data.data);
    })
  };


  useEffect(() => {
    getAllStatistics();
  }, []);


  useEffect(() => {
    if (data.length > 2) {
      data[2].map(element => {
        setNewUsers(newUsers + element.count);
        console.log('el',newUsers);

      });

      
      const newLabels = data[2].map(element => element.date);
      setLabels3(newLabels);
      const newData3 = data[2].map(element => element.count);
      setData3({
        labels: labels3,
        datasets: [
          {
            label: "New Users",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: newData3,
          },
        ],
      });
    }


    if(data.length > 0) {
      data[0].map(element => {
        setOrders(orders + element.count);
      });

      const newLabels = data[0].map(element => element.date);
      setLabels1(newLabels);
      const newData1 = data[0].map(element => element.count);
      setData1({
        labels: labels1,
        datasets: [
          {
            label: "Orderse last 30 days",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: newData1,
          },
        ],
      });
    }


    if(data.length > 1) {
      data[1].map(element => {
        setMoneyReceived(moneyReceived + parseInt(element.count));
      });

      const newLabels = data[1].map(element => element.date);
      setLabels2(newLabels);
      const newData2 = data[1].map(element => element.count);
      setData2({
        labels: labels2,
        datasets: [
          {
            label: "Money received last 30 days",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: newData2,
          },
        ],
      });
    }

  }, [data]);


    return (
      <>
        <header>
          <h1>Dashboard</h1>
        </header>
        <main>
          <section className="widget-row">
            <div className="widget">
              <div className="widget-content">
                <p className="widget-subtitle">Orders last 30 days</p>
                <p className="widget-text">{orders}</p>
              </div>
            </div>
            <div className="widget">
              <div className="widget-content">
                <p className="widget-subtitle">Money received last 30 days</p>
                <p className="widget-text">{moneyReceived}</p>
              </div>
            </div>
            <div className="widget">
              <div className="widget-content">
                <p className="widget-subtitle">New users last 30 days</p>
                <p className="widget-text">{newUsers}</p>
              </div>
            </div>
          </section>
          <section className="chart-row">
            <div className="chart-container">
              <Line data={data1} />
            </div>
            <div className="chart-container">
              <Line data={data2} />
            </div>
            <div className="chart-container">
              <Line data={data3} />
            </div>
          </section>
        </main>
      </>
    );
}
  
  export default Dashboard;