import { useParams } from 'react-router-dom'
import {useEffect, useState} from 'react'
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';
import { StockData } from '../components/StockData'

const formatData = (data) => {
    const formattedData = data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Math.floor(data.c[index])
        }
    });
    return formattedData;
}

export const StockDetailPage = () => {
    const [chartData, setChartData] = useState();
    const { symbol } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime()/1000);
            
            let oneDay;
            if (date.getDay() === 6) {
                oneDay = currentTime - 2*24*60*60;
            } else if (date.getDay() === 0) {
                oneDay = currentTime - 3*24*60*60;
            } else {
                oneDay = currentTime - 24*60*60;
            }

            let oneWeek = currentTime - 7*24*60*60;
            let oneYear = currentTime - 365*24*60*60;
            let fiveYears = currentTime - 5*365*24*60*60;
            
            const responses = await Promise.all([finnHub.get("/stock/candle", {
                params: {
                    symbol: symbol,
                    from: oneDay,
                    to: currentTime,
                    resolution: 30
                }
            }), finnHub.get("/stock/candle", {
                params: {
                    symbol: symbol,
                    from: oneWeek,
                    to: currentTime,
                    resolution: 60
                }
            }), finnHub.get("/stock/candle", {
                params: {
                    symbol: symbol,
                    from: oneYear,
                    to: currentTime,
                    resolution: "W"
                }
            }), finnHub.get("/stock/candle", {
                params: {
                    symbol: symbol,
                    from: fiveYears,
                    to: currentTime,
                    resolution: "W"
                }
            })]);
            setChartData({
                day: formatData(responses[0].data),
                week: formatData(responses[1].data),
                year: formatData(responses[2].data),
                fiveYears: formatData(responses[3].data),
            })
        }
        fetchData();
    }, [symbol])

    return (
        <div>
            { chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol} />
                </div>
            )}
        </div>
    )
}

export default StockDetailPage