import './BarchartV.css'
import Chart from "react-google-charts"
import { tanggal } from '../../MyFunc'
import { dataWeek } from '../../DummyData'
import { useEffect } from 'react'

export default function BarchartV({data, title, subtitle}) {

    let datum = []

    datum.push(["Time", "Confirmed", "Deaths", "Recovered", "Active"])
    const pushDatum = () => {
        data.map((e) => {
            const {Date, Confirmed, Deaths, Recovered, Active} = e
            // if (i<7)
            datum.push([tanggal(Date), Confirmed, Deaths, Recovered, Active])
        })
    }

    useEffect(() => {
        pushDatum()
    },[datum])

    return (
        <div className="barchartV">
            <Chart
                width={'800px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={dataWeek}
                options={{
                    // Material design options
                    chart: {
                    title: title,
                    subtitle: subtitle,
                    },
                }}
            />
        </div>
    )
}
