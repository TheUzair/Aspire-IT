import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const AttendanceCharts = ({ data = [] }) => {
  useEffect(() => {
    const ctx = document.getElementById('cdDriveChart');

    if (!ctx) return; // Ensure canvas is ready

    // Ensure data is an array before processing
    if (!Array.isArray(data)) return;

    // Extract data values from props
    const onTimeCount = data.filter(attendee => attendee.status === 'on-time').length;
    const lateCount = data.filter(attendee => attendee.status === 'late attendance').length;
    const dayOffCount = data.filter(attendee => attendee.status === 'take day-off').length;
    const notPresentCount = data.filter(attendee => attendee.status === 'not-present').length;

    // Destroy existing chart instance before creating a new one if needed
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    // Create a new chart
    window.chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [onTimeCount, lateCount, dayOffCount, notPresentCount],
          backgroundColor: ['#4B0082', '#FF0000', '#FFA500', '#808080'], // Indigo, Red, Orange, Gray
          borderWidth: 5,
          borderColor: '#fff',
          hoverOffset: 4,
          borderRadius: 10,
        }],
        labels: ['On-time', 'Late-attendance', ' Day-off', 'Not-present'] // Labels for the chart
      },
      options: {
        cutout: '70%', 
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true // Disable default tooltips
          }
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

          // Center text for the total attendance and capacity
          ctx.save();
          ctx.textAlign = 'center';
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = '#000';
          ctx.fillText(`${onTimeCount + lateCount + dayOffCount + notPresentCount}`, centerX, centerY - 10);  // Display total attendance in center
          ctx.font = 'bold 18px Arial';
          ctx.fillText('/2000', centerX, centerY + 20);  // Display capacity in center
          ctx.restore();
        }
      }]
    });

    // Cleanup function to destroy chart on unmount
    return () => {
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ width: '100%', maxWidth: '1000px', height: '100%' }}>
      <canvas id="cdDriveChart" />
    </div>
  );
};

export default AttendanceCharts;
