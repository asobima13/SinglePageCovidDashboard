import './BarchartV.css'
import Chart from "react-google-charts"
import { tanggal } from '../../MyFunc'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@material-ui/core'

export default function BarchartV({data, title, subtitle}) {

    const [appState, setAppState] = useState({loading: true, data: null})

    useEffect(() => {
        setAppState({loading: true})
        let datum = [["Time", "Confirmed", "Deaths", "Recovered", "Active"]]
        if (data) {
            data.map((e) => datum.push([tanggal(e[0]), e[1], e[2], e[3], e[4]]))
            setAppState({data: datum, loading: false})
        }
    },[data])

    return (
        <div className="barchartV">
            {
                appState.loading ?
                <CircularProgress /> :
                <Chart
                    width={'800px'}
                    height={'300px'}
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={appState.data}
                    options={{
                        // Material design options
                        chart: {
                            title: title,
                            subtitle: subtitle,
                        },
                    }}
                />
            }
        </div>
    )
}
