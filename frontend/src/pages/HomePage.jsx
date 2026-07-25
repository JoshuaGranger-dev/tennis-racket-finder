import Questionnaire from "../components/Questionnaire"

function HomePage() {
  return (
    <main>
      <section>
        <h1>Find the Right Tennis Racket for Your Game</h1>

        <p>
          Answer a few questions about your play style, racket needs, swing speed,
          and comfort priorities. The app compares your answers against racket
          specs and recommends your best matches.
        </p>
      </section>

      <section>
        <Questionnaire />
      </section>
    </main>
  )
}

export default HomePage