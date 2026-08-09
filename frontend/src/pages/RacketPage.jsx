import FilterPanel from "../components/FilterPanel"
import RacketList from "../components/RacketList"

function RacketsPage({
  rackets,
  filteredRackets,
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
  handleDeleteRacket,
  handleUpdateRacket,
  editingRacket,
  setEditingRacket,
}) {
  return (
    <main className="racket-page">
      <h1>Browse Rackets</h1>

      <p>
        Search and filter rackets by brand, string pattern, head size, and play style.
      </p>

      <FilterPanel
        brands={brands}
        stringPatterns={stringPatterns}
        playStyles={playStyles}
        headSizes={headSizes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedStringPattern={selectedStringPattern}
        setSelectedStringPattern={setSelectedStringPattern}
        selectedPlayStyle={selectedPlayStyle}
        setSelectedPlayStyle={setSelectedPlayStyle}
        selectedHeadSize={selectedHeadSize}
        setSelectedHeadSize={setSelectedHeadSize}
      />

      <p>Showing {filteredRackets.length} of {rackets.length} rackets</p>

      {filteredRackets.length === 0 && (
        <p>No rackets match your filters.</p>
      )}

      <RacketList
        rackets={filteredRackets}
        handleDeleteRacket={handleDeleteRacket}
        handleUpdateRacket={handleUpdateRacket}
        editingRacket={editingRacket}
        setEditingRacket={setEditingRacket}
      />
    </main>
  )
}

export default RacketsPage