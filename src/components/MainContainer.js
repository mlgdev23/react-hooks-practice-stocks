import React, { useState, useEffect } from "react"
import StockContainer from "./StockContainer"
import PortfolioContainer from "./PortfolioContainer"
import SearchBar from "./SearchBar"

function MainContainer() {
   const [stocks, setStocks] = useState([])
   // const [portfolio, setPortfolio] = useState([])
   const [sortBy, setSortBy] = useState("Alphabetically")
   const [filterBy, setFilterBy] = useState("All")

   useEffect(() => {
      fetch("http://localhost:3001/stocks")
         .then(r => r.json())
         .then(stocks => {
           const modifiedStocks = stocks.map((stock) => {
             return {...stock, inPortfolio: false}
           })
           setStocks(modifiedStocks)
         })
   }, [])
console.log(stocks)

   function handleAddStockToPortfolio(addedStock) {
      
      if (!addedStock.inPortfolio) {
         const updatedStocks = stocks.map((stock) => {
           if (stock.id === addedStock.id) {
            return {...stock, inPortfolio: true}
           } else {
            return stock
           }
         })
         setStocks(updatedStocks)
      }
   }

   function handleRemoveStockFromPortfolio(removedStock) {
      const updatedStocks = stocks.map((stock) => {
         if (stock.id === removedStock.id) {
          return {...stock, inPortfolio: false}
         } else {
          return stock
         }
       })
       setStocks(updatedStocks)
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

   const portfolioStocks = stocks.filter(stock => stock.inPortfolio)

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
                  portfolio={portfolioStocks}
                  onStockClick={handleRemoveStockFromPortfolio}
               />
            </div>
         </div>
      </div>
   )
}

export default MainContainer
