import Questionnaire from "../components/Questionnaire"

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">Tennis Racket Finder</p>

        <h1>Find the Right Tennis Racket for Your Game</h1>

        <p className="home-intro">
          Answer a few questions about your playing style, comfort needs, and
          racket preferences to get personalized racket recommendations.
        </p>

        <div className="home-highlights">
          <div>
            <h3>Personalized Matches</h3>
            <p>Get rackets ranked by how well they fit your game.</p>
          </div>

          <div>
            <h3>Spec-Based Logic</h3>
            <p>Recommendations use weight, swingweight, balance, string pattern, and more.</p>
          </div>

          <div>
            <h3>Clear Pros & Cons</h3>
            <p>See why each racket fits and what tradeoffs to consider.</p>
          </div>
        </div>
      </section>

      <section className="questionnaire-section">
        <div className="section-heading">
          <h2>Find Your Match</h2>
          <p>
            Start with the questionnaire below. Your results will update based
            on the answers you choose.
          </p>
        </div>

        <Questionnaire />
      </section>
    </main>
  )
}

export default HomePage