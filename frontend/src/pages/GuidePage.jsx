function GuidePage() {
  return (
    <main className="guide-page">
      <section className="guide-hero">
        <h1>Tennis Racket Guide</h1>
        <p>
          Learn what racket specs mean and how they affect power, control,
          spin, comfort, and maneuverability.
        </p>
      </section>

      <section className="guide-accordion">
        <details className="guide-dropdown">
          <summary>Head Size</summary>
          <p>
            Head size affects forgiveness, power, and control. Larger heads
            usually provide a bigger sweet spot and easier depth, while smaller
            heads usually provide more precision.
          </p>
          <ul>
            <li>98 sq in or smaller: more control and precision.</li>
            <li>100 sq in: balanced forgiveness and control.</li>
            <li>105+ sq in: more forgiveness and easier power.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>Weight</summary>
          <p>
            Weight affects stability, power, comfort, and how demanding the
            racket feels over time.
          </p>
          <ul>
            <li>Lighter rackets are easier to swing and maneuver.</li>
            <li>Heavier rackets usually feel more stable at contact.</li>
            <li>Too much weight can make timing and racket head speed harder.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>Swingweight</summary>
          <p>
            Swingweight describes how heavy the racket feels while swinging, not
            just how heavy it is on a scale.
          </p>
          <ul>
            <li>Lower swingweight: quicker acceleration and easier handling.</li>
            <li>Higher swingweight: more stability, depth, and plow-through.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>Balance</summary>
          <p>
            Balance describes how the racket's weight is distributed between
            the handle and the head.
          </p>
          <ul>
            <li>Head-light: easier handling and quicker reactions.</li>
            <li>Even balance: balanced feel between power and maneuverability.</li>
            <li>Head-heavy: more easy power, but can feel slower to swing.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>Stiffness</summary>
          <p>
            Stiffness affects power, comfort, and feel. Firmer rackets usually
            return more energy to the ball, while softer rackets usually feel
            more flexible and arm-friendly.
          </p>
          <ul>
            <li>Lower stiffness: more comfort and pocketing.</li>
            <li>Higher stiffness: more crisp power, but potentially harsher feel.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>String Pattern</summary>
          <p>
            String pattern affects spin, launch angle, control, and string bed
            response.
          </p>
          <ul>
            <li>16x19: easier spin and power.</li>
            <li>18x20: more control and lower launch angle.</li>
            <li>16x20 or 18x19: balanced options between spin and control.</li>
          </ul>
        </details>

        <details className="guide-dropdown">
          <summary>Beam Width</summary>
          <p>
            Beam width affects power, stability, and feel. Thicker beams usually
            create more easy power, while thinner beams usually give more feel
            and control.
          </p>
          <ul>
            <li>Thinner beam: more classic control feel.</li>
            <li>Thicker beam: more power and easier depth.</li>
          </ul>
        </details>
      </section>
    </main>
  )
}

export default GuidePage