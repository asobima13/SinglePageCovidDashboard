import './Barchart.css'
import Chart from "react-google-charts"
import { useState, useEffect } from 'react'

export default function Barchart({data, title, titlebawah, titlesamping}) {

    const [appState, setAppState] = useState({loading: true, data: null})
    
    useEffect(() => {
        setAppState({loading: true})
        let datum = [[titlesamping, titlebawah]];
        if (data) {
            data.map((e) => datum.push(e))
            setAppState({data: datum, loading: false})
        }
    },[data, titlebawah, titlesamping])

    return (
        <div className="barchart">
            {
                appState.loading ?
                <p>Data is being fetched..</p> :
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={appState.data}
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
            }
        </div>
    )
}
