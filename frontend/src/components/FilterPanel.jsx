function FilterPanel({
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedStringPattern,
    setSelectedStringPattern,
    selectedPlayStyle,
    setSelectedPlayStyle,
    selectedHeadSize,
    setSelectedHeadSize,
 }) {

    function handleClearFilters() {
        setSearchTerm("")
        setSelectedBrand("All")
        setSelectedStringPattern("All")
        setSelectedPlayStyle("All")
        setSelectedHeadSize("All")
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

            <select 
                value={selectedPlayStyle}
                onChange={(e) => setSelectedPlayStyle(e.target.value)}    
            >
                <option value="All">All</option>
                <option value="Spin">Spin</option>
                <option value="Control">Control</option>
            </select>

            <select 
                value={selectedHeadSize}
                onChange={(e) => setSelectedHeadSize(e.target.value)}
            >
                <option value="All">All</option>
                <option value="97">97</option>
                <option value="100">100</option>
            </select>

            <button onClick={handleClearFilters}>
                Clear Filters
            </button>

      </div>
    )
}

export default FilterPanel