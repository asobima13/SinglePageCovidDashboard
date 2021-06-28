import './Piechart.css'
import Chart from "react-google-charts"
import { useState, useEffect } from 'react'
export default function Piechart({data, title}) {

    const [appState, setAppState] = useState({loading: true, data: null})

    useEffect(() => {
        setAppState({loading: true})
        let datum = [['Status', 'Total']]
        if (data) {
            data.map((e) => datum.push(e))
            setAppState({data: datum, loading: false})
        }
    }, [data]);

return (
    <div className="piechart">
        {  appState.loading ?
            <p>Data is being fetched..</p> :
            <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={appState.data}
            options={{
                title: title,
                is3D: false,
                // legend: 'none',
                // tooltip: { trigger: 'none' },
                pieSliceText: 'label',
                // sliceVisibilityThreshold: 0.2, // 20%
            }}
            />
        // rootProps={{ 'data-testid': '1' }}
        }
    </div>
)
}