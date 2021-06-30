import './Home.css'
import Piechart from '../piechart/Piechart'
import Barchart from '../barchart/Barchart'
import BarchartV from '../barchartv/BarchartV'
import { tanggalWaktu } from '../../MyFunc'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {

    const lastUpdate = tanggalWaktu(new Date())
    const [homeData, setHomeData] = useState({
        piechart: null,
        barchart: null,
        barchartV: null
    })

    useEffect(() => {
        const fetchData = async () => {

            const indoapi = 'https://api.covid19api.com/country/indonesia'
            const globalapi = 'https://api.covid19api.com/summary'

            const getIndo = await axios.get(indoapi)
            const getGlobal = await axios.get(globalapi)

            await axios.all([getIndo, getGlobal])
                .then((allData) => {

                    const datum1 = []
                    const datum2 = []
                    const datum3sortable = []
                    const datum3 = []
                    
                    allData[0].data.map((e,i) => {
                        const {Date, Confirmed, Deaths, Recovered, Active} = e
                        if (i === allData[0].data.length - 1) {
                            datum1.push(
                                [`Confirmed: ${Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, Confirmed],
                                [`Deaths: ${Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, Deaths],
                                [`Recovered: ${Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, Recovered],
                                [`Active: ${Active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, Active]
                            )
                        }
                        if (i > allData[0].data.length - 8) {
                            datum2.push([Date, Confirmed, Deaths, Recovered, Active])
                        }
                        return null
                    })

                    allData[1].data.Countries.map((e,i) => {
                        const { Country, TotalConfirmed } = e;
                        datum3sortable.push([TotalConfirmed, Country])
                        let sortable = datum3sortable
                        if (sortable.length === 192) {
                            sortable.sort((a,b) => b[0] - a[0]).map((item, i) => {
                                if (i < 10) {
                                    datum3.push([item[1],item[0]])
                                }
                                return null
                            })
                        }
                        return null
                    })

                    setHomeData({
                        piechart: datum1,
                        barchartV: datum2,
                        barchart: datum3
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }
            fetchData()
    }, [homeData]);

    return (
        <div className="home">
            <div className="lastUpdate">
                <span>Last Update: {lastUpdate} WIB</span>
            </div>
            <div className="homeWrapper">
                <Piechart data={homeData.piechart} title="Covid-19 Cases in Indonesia"/>
                <Barchart data={homeData.barchart} title="Top 10 Confirmed Covid-19 Countries" titlesamping="Country" titlebawah="Total Confirmed"/>
                <BarchartV data={homeData.barchartV} title="Last 7 Days Covid-19 Cases in Indonesia" subtitle="Confirmed, Deaths, Recovered, Active cases in the last 7 days."/>
            </div>
        </div>
    )
}