import React, { useState, useEffect } from "react"
import StockContainer from "./StockContainer"
import PortfolioContainer from "./PortfolioContainer"
import SearchBar from "./SearchBar"

function MainContainer() {
   const [stocks, setStocks] = useState([])
   const [portfolio, setPortfolio] = useState([])
   const [sortBy, setSortBy] = useState("Alphabetically")
   const [filterBy, setFilterBy] = useState("All")

   useEffect(() => {
      fetch("http://localhost:3001/stocks")
         .then(r => r.json())
         .then(setStocks)
   }, [])

   function handleAddStockToPortfolio(addedStock) {
      const foundStock = portfolio.find(stock => stock.id === addedStock.id)
      if (!foundStock) {
         setPortfolio([...portfolio, addedStock])
      }
   }

   function handleRemoveStockFromPortfolio(removedStock) {
      const filteredPorfolio = portfolio.filter(
         stock => stock.id !== removedStock.id
      )
      setPortfolio(filteredPorfolio)
   }

   const sortedStocks = [...stocks].sort((stockA, stockB) => {
      if (sortBy === "Alphabetically") {
         return stockA.name.localeCompare(stockB.name)
      } else {
         return stockA.price - stockB.price
      }
   })

   const filteredStocks = sortedStocks.filter(stock => {
      if (filterBy === "All") {
         return true
      } else {
         return stock.type.toLowerCase() === filterBy.toLowerCase()
      }
   })

   return (
      <div>
         <SearchBar
            sortBy={sortBy}
            filterBy={filterBy}
            setSortBy={setSortBy}
            setFilterBy={setFilterBy}
         />
         <div className="row">
            <div className="col-8">
               <StockContainer
                  stocks={filteredStocks}
                  onStockClick={handleAddStockToPortfolio}
               />
            </div>
            <div className="col-4">
               <PortfolioContainer
                  portfolio={portfolio}
                  onStockClick={handleRemoveStockFromPortfolio}
               />
            </div>
         </div>
      </div>
   )
}

export default MainContainer
