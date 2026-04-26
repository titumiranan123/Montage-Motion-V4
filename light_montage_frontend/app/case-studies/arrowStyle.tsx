export function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 24,
    transform: "translateY(-50%)",
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid #e0e0e0",
    background: "#fff",
    fontSize: 24,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.2s, background 0.2s",
    color: "#333",
  };
}