const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();

const photoInput = document.getElementById("photos");
const fileName = document.getElementById("fileName");
photoInput.addEventListener("change", () => {
  const files = [...photoInput.files];
  fileName.textContent = files.length ? `${files.length} image(s) selected. WhatsApp will open; attach these images manually.` : "You can select multiple images. Files will need to be shared separately when the form opens WhatsApp.";
});

document.getElementById("inquiryForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const data = new FormData(this);
  const fields = [
    ["Name", data.get("name")],
    ["Company", data.get("company") || "Not provided"],
    ["Phone", data.get("phone")],
    ["Email", data.get("email") || "Not provided"],
    ["Material", data.get("material")],
    ["Quantity", data.get("quantity") || "Not provided"],
    ["Location", data.get("location")],
    ["Message", data.get("message") || "No additional details"]
  ];
  const message = "Hello GulfCycle, I would like a scrap quotation.\\n\\n" +
    fields.map(([label, value]) => `${label}: ${value}`).join("\\n") +
    (photoInput.files.length ? `\\n\\nI have ${photoInput.files.length} photo(s) to share separately.` : "");
  // Replace this demo number with the company's WhatsApp number in international format, digits only.
  const whatsappNumber = "971500000000";
  document.getElementById("formStatus").textContent = "Opening WhatsApp with your enquiry details…";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
