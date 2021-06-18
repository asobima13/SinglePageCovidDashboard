import './Home.css'
import Piechart from '../piechart/Piechart'
import Barchart from '../barchart/Barchart'
import BarchartV from '../barchartv/BarchartV'
import { tanggalWaktu, tanggal } from '../../MyFunc'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { dataIndonesia, dataWW } from '../../DummyData'

export default function Home() {

    const [dataindo, setDataindo] = useState(dataIndonesia)
    const dataBarchartV = []
    dataBarchartV.push(["Date", "Confirmed", "Deaths", "Recovered", "Active"])
    const tgl = dataWW[0].attributes.Last_Update
    const lastUpdate = tanggalWaktu(new Date())
    // const lastUpdate = tanggalWaktu(new Date(tgl))

    const fetchData = async () => {
        try {
            const res = await axios.get('https://api.covid19api.com/country/indonesia')
            res.data.map((e,i) => {
                const {Date, Confirmed, Deaths, Recovered, Active} = e
                if (i>res.data.length-8)
                dataBarchartV.push([tanggal(Date), Confirmed, Deaths, Recovered, Active])
            })
        } catch (err) {
            console.error(err)
        }
    }

    // const fetchData = async () => {
    //     try {
    //         const res = await axios.get('https://api.kawalcorona.com/indonesia', {
    //             headers: {"Access-Control-Allow-Origin": "*", "Accept": "/", "connection": "keep-alive"}
    //         })
    //         setDataindo(res.data)
    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    useEffect(() => {
        fetchData()
    })

    return (
        <div className="home">
            <div className="lastUpdate">
                <span>Last Update: {lastUpdate} WIB</span>
            </div>
            <div className="homeWrapper">
                <Piechart data={dataindo} title="Covid-19 Cases in Indonesia"/>
                <Barchart data={dataWW} title="Top 10 Confirmed Covid-19 Countries" titlesamping="Country" titlebawah="Total Confirmed"/>
                <BarchartV data={dataBarchartV} title="Last 7 Days Covid-19 Cases in Indonesia" subtitle="Confirmed, Deaths, Recovered, Active cases in the last 7 days."/>
            </div>
        </div>
    )
}