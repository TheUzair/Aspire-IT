import { useEffect } from 'react'; 
import Chart from 'chart.js/auto';

let chartInstance;  // Store the chart instance

const ChildrenCharts = ({ data: childrenData = [] }) => {

  useEffect(() => {
    const canvas = document.getElementById('childrenOverview');

    if (!canvas) return; // Ensure canvas is ready

    // Set canvas internal resolution
    canvas.width = 200;  // Set the width attribute
    canvas.height = 200; // Set the height attribute

    const ctx = canvas.getContext('2d');

    // Destroy existing chart instance before creating a new one
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Calculate counts with default values
    const activeCount = childrenData.filter(child => child.status === 'active').length || 0;
    const registeredCount = childrenData.filter(child => child.status === 'registered').length || 0;
    const inactiveCount = childrenData.filter(child => child.status === 'inactive').length || 0;

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [registeredCount, activeCount, inactiveCount],
          backgroundColor: ['#A52A2A', '#FFA500', '#D81B60'], // Brown, Orange, Yellow colors
          borderWidth: 5, // Increase border width for visible gaps
          borderRadius: 10, // Rounded edges for each slice
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
            display: false,
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
  }, [childrenData]);

  return (
    <canvas 
      id="childrenOverview" 
      style={{ width: '200px', height: '200px' }} // Adjust CSS width and height as needed
    />
  );
};

export default ChildrenCharts;
