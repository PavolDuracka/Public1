google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Product', 'Popularity', { role: 'style' }],
        ['FullDigital 24HD DroneCam', 817, 'stroke-color: #ff0000; stroke-width: 2; fill-color: #ff4d4d'],
        ['DJI Mavic 2 pro', 379, 'stroke-color: #e60000; stroke-width: 2; fill-color: #ff3333'],
        ['Brixbau HJ4', 269, 'stroke-color: #cc0000; stroke-width: 2; fill-color: #ff1a1a']
    ]);

    var options = {
        title: '',
        titleTextStyle: {
            color: '#FFFFFF',
            fontSize: 24,
            bold: true,
            italic: false
        },
        chartArea: {
            width: '80%',
            backgroundColor: {
                fill: '#333'
            }
        },
        backgroundColor: '#222', // Background color of the chart container
        hAxis: {
            title: 'Popularity',
            minValue: 0,
            textStyle: {
                color: '#FFFFFF'
            },
            titleTextStyle: {
                color: '#FFFFFF',
                bold: true
            },
            gridlines: {
                color: '#444'
            }
        },
        vAxis: {
            title: 'Product',
            textStyle: {
                color: '#FFFFFF'
            },
            titleTextStyle: {
                color: '#FFFFFF',
                bold: true
            },
            textPosition: 'out',
            viewWindow: {
                max: 3.5,
                min: -0.5
            }
        },
        legend: { 
            position: 'none' 
        },
        bar: { 
            groupWidth: '60%'

        },
        annotations: {
            alwaysOutside: true,
            textStyle: {
                fontSize: 12,
                auraColor: 'none',
                color: '#FFFFFF'
            }
        }
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}