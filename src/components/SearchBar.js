import React from "react"

function SearchBar({ sortBy, filterBy, setSortBy, setFilterBy }) {
   return (
      <div>
         <strong>Sort by:</strong>
         <label>
            <input
               type="radio"
               value="Alphabetically"
               name="sort"
               checked={sortBy === "Alphabetically"}
               onChange={e => setSortBy(e.target.value)}
            />
            Alphabetically
         </label>
         <label>
            <input
               type="radio"
               value="Price"
               name="sort"
               checked={sortBy === "Price"}
               onChange={e => setSortBy(e.target.value)}
            />
            Price
         </label>
         <br />
         <label>
            <strong>Filter:</strong>
            <select
               onChange={e => setFilterBy(e.target.value)}
               value={filterBy}
            >
               <option value="All">All Stocks</option>
               <option value="Tech">Tech</option>
               <option value="Sportswear">Sportswear</option>
               <option value="Finance">Finance</option>
            </select>
         </label>
      </div>
   )
}

export default SearchBar
