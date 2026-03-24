/** Animated moth/butterfly at the end of the quiz progress bar (wing flap only; no color button). */
export function QuizProgressButterfly() {
  return (
    <div className="quiz-moth-holder shrink-0" aria-hidden>
      <div className="quiz-moth-box">
        <span className="quiz-moth-rotate3d">
          <figure className="quiz-moth-figure">
            <svg className="quiz-moth-wing quiz-moth-wing--left" viewBox="0 0 119.744 148.477">
              <use href="/quiz-moth-sprite.svg#quiz-moth-shape" />
            </svg>
            <svg className="quiz-moth-wing quiz-moth-wing--right" viewBox="0 0 119.744 148.477">
              <use href="/quiz-moth-sprite.svg#quiz-moth-shape" />
            </svg>
          </figure>
        </span>
      </div>
    </div>
  );
}
