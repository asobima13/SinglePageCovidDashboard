import './Barchart.css'
import Chart from "react-google-charts"

export default function Barchart({data, title, titlebawah, titlesamping}) {

    let datum = [[titlesamping, titlebawah]]
    data.map((e,i) => {
        const {Country_Region, Confirmed} = e.attributes
        if (i<10)
        datum.push([Country_Region, Confirmed])
    })

    return (
        <div className="barchart">
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={datum}
                options={{
                    title: title,
                    chartArea: { width: '50%' },
                    hAxis: {
                    title: titlebawah,
                    minValue: 0,
                    },
                    vAxis: {
                    title: titlesamping,
                    },
                    legend: 'none'
                }}
            />
        </div>
    )
}
