import { useState, useEffect } from 'react';
import finnHub from '../apis/finnHub'

export const StockData = (symbol) => {
    const [stockData, setStockData] = useState();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/stock/profile2", {
                    params: {
                        symbol: symbol.symbol
                    }
                })
                console.log(response.data);
                if(isMounted) {
                    setStockData(response.data);
                }
            } catch (error) {

            }
        }
        fetchData();
        return () => (isMounted = false);
    }, [symbol]);

    return (
        <div>
            { stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 mt-5 mb-5">
                    <div className="col">
                        <div>
                            <span className="fw-bold me-2">
                                Name: 
                            </span>
                            {stockData.name}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                Country: 
                            </span>
                            {stockData.country}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                Ticker: 
                            </span>
                            {stockData.ticker}
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold me-2">
                                Exchange: 
                            </span>
                            {stockData.exchange}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                Industry: 
                            </span>
                            {stockData.finnhubIndustry}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                IPO: 
                            </span>
                            {stockData.ipo}
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold me-2">
                                MarketCap: 
                            </span>
                             {Math.floor(stockData.marketCapitalization)}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                Shares Outstanding: 
                            </span>
                            {stockData.shareOutstanding}
                        </div>
                        <div>
                            <span className="fw-bold me-2">
                                URL: 
                            </span>
                            <a href={stockData.weburl}>{stockData.weburl}</a>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}