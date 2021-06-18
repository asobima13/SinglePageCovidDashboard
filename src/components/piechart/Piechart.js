import './Piechart.css'
import Chart from "react-google-charts"

export default function Piechart({data, title}) {

    const datum = [['Status', 'Total']]
    const dat = data[0].attributes

    Object.getOwnPropertyNames(dat).map((val) => {
        // console.log(val)
        if (val === "Confirmed")
            datum.push([`${val} :
            ${dat[val]}`, dat[val]])
        if (val === "Deaths")
            datum.push([`${val} :
            ${dat[val]}`, dat[val]])
        if (val === "Recovered")
            datum.push([`${val} :
            ${dat[val]}`, dat[val]])
        if (val === "Active")
            datum.push([`${val} :
            ${dat[val]}`, dat[val]])
        // if (val !== ("Last_Update"||"Country_Region"||"Lat"||"Long_"||"OBJECTID")) {
        //     datum.push([`${val} : ${dat[val]}`, dat[val]])
        //     console.log(val)
        // }
    })

    return (
        <div className="piechart">
            <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={datum}
            options={{
                title: title,
                is3D: false,
                // legend: 'none',
                // tooltip: { trigger: 'none' },
                pieSliceText: 'label',
                // sliceVisibilityThreshold: 0.2, // 20%
            }}
            // rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}
