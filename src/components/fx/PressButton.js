import RollText from "./RollText"

/**
 * RoiHeads-style tilted 3D button: a raised face on a darker base that
 * straightens and sinks on hover, with a slow shimmer across the label.
 */
export default function PressButton({ href, onClick, children, icon, variant = "azure", className = "", ...rest }) {
  const Tag = href ? "a" : "button"
  return (
    <Tag href={href} onClick={onClick} className={`fx-press fx-press--${variant} ${className}`} {...rest}>
      <span className="fx-press__face">
        <span className="fx-press__label">
          <RollText>{children}</RollText>
        </span>
        {icon}
      </span>
    </Tag>
  )
}
