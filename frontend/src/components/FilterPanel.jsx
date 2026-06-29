function FilterPanel({
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedStringPattern,
    setSelectedStringPattern,
 }) {

    function handleClearFilters() {
        setSearchTerm("")
        setSelectedBrand("All")
        setSelectedStringPattern("All")
    }

    return (
        <div>
            <input type="text"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by brand or model"
            />

            <select 
                value={selectedBrand} 
                onChange={(e) => setSelectedBrand(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Wilson">Wilson</option>
                <option value="Babolat">Babolat</option>
                <option value="Yonex">Yonex</option>
            </select>

            <select 
                value={selectedStringPattern} 
                onChange={(e) => setSelectedStringPattern(e.target.value)}
            >
                <option value="All">All</option>
                <option value="16x19">16x19</option>
                <option value="18x20">18x20</option>
                <option value="16x20">16x20</option>
            </select>

            <button onClick={handleClearFilters}>
                Clear Filters
            </button>

      </div>
    )
}

export default FilterPanel