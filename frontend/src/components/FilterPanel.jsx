function FilterPanel({
    brands,
    stringPatterns,
    playStyles,
    headSizes,
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
        <div className="filter-panel">
            <input type="text"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by brand or model"
            />

            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                >
                <option value="All">Brand</option>
                {brands.map((brand) => (
                    <option key={brand} value={brand}>
                    {brand}
                    </option>
                ))}
            </select>

            <select
                value={selectedStringPattern}
                onChange={(e) => setSelectedStringPattern(e.target.value)}
                >
                <option value="All">String Pattern</option>
                {stringPatterns.map((pattern) => (
                    <option key={pattern} value={pattern}>
                    {pattern}
                    </option>
                ))}
            </select>

            <select
                value={selectedPlayStyle}
                onChange={(e) => setSelectedPlayStyle(e.target.value)}
                >
                <option value="All">Play Style</option>
                {playStyles.map((style) => (
                    <option key={style} value={style}>
                    {style}
                    </option>
                ))}
            </select>

           <select
                value={selectedHeadSize}
                onChange={(e) => setSelectedHeadSize(e.target.value)}
                >
                <option value="All">Head Size</option>
                {headSizes.map((size) => (
                    <option key={size} value={size}>
                    {size} sq in
                    </option>
                ))}
            </select>

            <button onClick={handleClearFilters}>
                Clear Filters
            </button>

      </div>
    )
}

export default FilterPanel