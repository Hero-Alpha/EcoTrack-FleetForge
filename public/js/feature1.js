// Pie Chart Data
const ctxPie = document.getElementById('emissionPieChart').getContext('2d');
new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['EcoLogistics', 'GreenTrucks', 'CycleDelivery', 'ElectricVans'],
        datasets: [{
            data: [90, 60, 20, 80],
            backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0']
        }]
    }
});

// Bar Chart Data
const ctxBar = document.getElementById('monthlyBarChart').getContext('2d');
new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Emissions (kg)',
            data: [45, 35, 40, 60, 55, 70],
            backgroundColor: '#2e7d32'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});
