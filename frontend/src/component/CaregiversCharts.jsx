import { useEffect } from 'react';
import Chart from 'chart.js/auto';

let chartInstance;  // Store the chart instance

const CaregiversCharts = ({ data: caregiversData = [] }) => {

  useEffect(() => {
    const canvas = document.getElementById('caregiversOverview');

    if (!canvas) return; 

    // Set canvas internal resolution
    canvas.width = 300; 
    canvas.height = 300; 

    const ctx = canvas.getContext('2d');

    // Destroy existing chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Calculate counts for caregivers' statuses
    const activeCount = caregiversData.filter(caregiver => caregiver.status === 'active').length || 0;
    const registeredCount = caregiversData.filter(caregiver => caregiver.status === 'registered').length || 0;
    const inactiveCount = caregiversData.filter(caregiver => caregiver.status === 'inactive').length || 0;

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [registeredCount, activeCount, inactiveCount],
          backgroundColor: ['#00008B', '#0000FF', '#ADD8E6'], // Dark blue, Blue, Light blue colors
          borderWidth: 5,
          borderRadius: 10,
          hoverOffset: 4,
        }],
        labels: ['Registered', 'Active', 'Inactive'] // Labels for the chart
      },
      options: {
        circumference: 180, // Semi-circle
        rotation: -90, // Start from the top
        cutout: '70%', // Increase cutout to make the doughnut shape thinner and enhance gap visibility
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
          tooltip: {
            enabled: true, // Tooltip will display on hover
          },
        }
      },
      plugins: [{
        id: 'customCenterText',
        beforeDraw: function(chart) {
          const ctx = chart.ctx;
          const width = chart.width;
          const height = chart.height;
          const centerX = width / 2;
          const centerY = height / 2;
      
          ctx.save();
      
          // Adjust the position for "Total" text and its count
          ctx.textAlign = 'center';
          ctx.font = 'bold 20px Arial';
          ctx.fillStyle = '#000';
          ctx.fillText('Total', centerX, centerY + 30);  // Move "Total" text lower
          ctx.fillText(registeredCount + activeCount + inactiveCount, centerX, centerY + 60);  // Move the number lower
          ctx.restore();
        }
      }]
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [caregiversData]);

  return (
    <canvas 
      id="caregiversOverview" 
      style={{ width: '300px', height: '300px' }} // Adjust CSS width and height as needed
    />
  );
};

export default CaregiversCharts;
