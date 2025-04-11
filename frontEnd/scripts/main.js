const form = document.getElementById("url-form");
const longUrlInput = document.getElementById("longUrl");
const slugInput = document.getElementById("slug");
const urlList = document.getElementById("url-list");

const API_BASE = "http://localhost:3000";

async function fetchUrls() {
  const res = await fetch(`${API_BASE}/links`);
  const data = await res.json();

  urlList.innerHTML = "";
  data.forEach((url) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      <span>${url.longUrl}</span>
      <a href="${API_BASE}/${url.slug}" target="_blank" class="btn btn-sm btn-outline-success">${url.slug}</a>
    `;
    urlList.appendChild(item);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const longUrl = longUrlInput.value;
  const slug = slugInput.value;

  try {
    const res = await fetch(`${API_BASE}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl, slug }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Erro ao criar URL");
      return;
    }

    longUrlInput.value = "";
    slugInput.value = "";

    fetchUrls();
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
});

fetchUrls();
