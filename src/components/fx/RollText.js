/**
 * RoiHeads-style link text roll-over: the label slides up and an identical
 * copy slides in from below when the parent link/button is hovered.
 * Pure CSS (see fx.css).
 */
export default function RollText({ children, className = "" }) {
  return (
    <span className={`fx-roll ${className}`}>
      <span className="fx-roll__top">{children}</span>
      <span className="fx-roll__bottom" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}
