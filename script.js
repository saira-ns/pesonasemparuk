const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_oI78pXqiAS0tCljoJhuMqv-l4S4xqpiPc-lXos6Y3cZ5GDTRz8TU0NF7vG4k2zTO/exec";

const form = document.getElementById("saranForm");
const statusPesan = document.getElementById("statusPesan");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const kategori = document.getElementById("kategori").value;
  const pesan = document.getElementById("pesan").value.trim();

  if (!nama || !email || !pesan) {
    alert("Nama, email, dan pesan wajib diisi ya 😊");
    return;
  }

  const data = new URLSearchParams();

  data.append("nama", nama);
  data.append("email", email);
  data.append("kategori", kategori);
  data.append("pesan", pesan);

  statusPesan.textContent = "Mengirim pesan...";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: data,
      mode: "no-cors"
    });

    alert("Pesan berhasil dikirim! Terima kasih 😊");

    form.reset();
    statusPesan.textContent =
      "Pesan kamu sudah dikirim ke pengelola desa.";

  } catch (error) {
    console.error(error);
    alert("Pesan gagal dikirim. Silakan coba lagi.");
    statusPesan.textContent =
      "Pesan gagal dikirim. Silakan coba lagi.";
  }
});
