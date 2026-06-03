// Button.js — default export (the component) + named export (its styles)

export default function Button({ label, onClick }) {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.style.cssText = Object.entries(ButtonStyles)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}:${v}`)
    .join(";");
  btn.addEventListener("click", onClick);
  return btn;
}

export const ButtonStyles = {
  padding:         "10px 20px",
  backgroundColor: "#1976D2",
  color:           "#ffffff",
  border:          "none",
  borderRadius:    "4px",
  cursor:          "pointer",
  fontSize:        "14px",
};