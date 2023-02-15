import Chart from "react-apexcharts";
import {useState} from 'react'

export const StockChart = ({chartData, symbol}) => {
    const [dateFormat, setDateFormat] = useState("24h");    
    const {day, week, year, fiveYears} = chartData;

    const determineTimeFormat = () => {
        switch (dateFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            case "5y":
                return fiveYears;
            default:
                return day;
            }
        }
                        
    const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y > 0 
        ? "#26c281" 
        : "#ed3419";
    
    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "yyyy MMM dd HH:MM"
            }
        }
    }

    const renderButtonSelect = (button) => {
        const classes = "btn m-1 ";
        if(button === dateFormat) {
            return classes + "btn-primary";
        } 
        return classes + "btn-outline-primary";
    }

    const series = [{
        name: symbol,
        data: determineTimeFormat()
    }]

    return (
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart options={options} series={series} type="area" width="100%" />
            <div>
                <button className={renderButtonSelect("24h")}
                    onClick={() => setDateFormat("24h")}>24h</button>
                <button className={renderButtonSelect("7d")}
                    onClick={() => setDateFormat("7d")}>7d</button>
                <button className={renderButtonSelect("1y")}
                    onClick={() => setDateFormat("1y")}>1y</button>
                <button className={renderButtonSelect("5y")}
                    onClick={() => setDateFormat("5y")}>5y</button>
            </div>
        </div>
    )
}

export default StockChart