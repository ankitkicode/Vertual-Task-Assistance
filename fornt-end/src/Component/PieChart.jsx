import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({tasks}) => {

  // const isToday = (dateStr) => {
  //   const date = new Date(dateStr);
  //   const today = new Date();
  //   return date.toDateString() === today.toDateString();
  // };

  // const todayTasks = tasks.filter(task => isToday(task.date));

  const statusCounts = {
    Pending: 0,
    Progress: 0,
    Completed: 0,
  };

  tasks.forEach(task => {
    if (statusCounts[task.status] !== undefined) {
      statusCounts[task.status]++;
    }
  });

  const series = Object.values(statusCounts);
  const labels = Object.keys(statusCounts);

  const chartOptions = {
    chart: {
      width: 330,
      type: 'donut',
    },
    labels,
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: true,
    },
    fill: {
      type: 'gradient',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-500">No tasks for today.</p>
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="donut"
          width={320}
        />
      )}
    </div>
  );
};

export default PieChart;
