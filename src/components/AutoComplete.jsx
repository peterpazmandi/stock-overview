import {useState, useEffect, useContext} from 'react'
import {WatchListContext} from '../context/watchListContext'
import finnHub from '../apis/finnHub'

export const AutoComplete = () => {
    const {addStock} = useContext(WatchListContext);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null;

        return (
            <ul 
                className={`dropdown-menu ${dropDownClass}`} 
                style={{height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer"}}>
                {
                    results.map((result, index) => {
                        return (
                            <li 
                                onClick={() => {
                                    addStock(result.symbol);
                                    setSearch("");
                                }}
                                key={result.description + "_" + index} 
                                className='dropdown-item'>{result.description} ({result.symbol})</li>
                        )
                    })
                }
            </ul>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                setResults(response.data.result);
            } catch (error) {

            }
        }
        if (search.length > 0) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [search])

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input 
                    id="search" 
                    className="form-control" 
                    style={{backgroundColor: "rgba(145,158,171,0.04)"}}
                    placeholder="Search"
                    autoComplete="off"
                    type="text" 
                    onChange={(e) => setSearch(e.target.value)}/>
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    )
}

export default AutoComplete