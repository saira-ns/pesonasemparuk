// ===============================
// GOOGLE SHEETS
// ===============================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_oI78pXqiAS0tCljoJhuMqv-l4S4xqpiPc-lXos6Y3cZ5GDTRz8TU0NF7vG4k2zTO/exec";


// Ambil form dan status pesan
const form = document.getElementById("saranForm");
const statusPesan = document.getElementById("statusPesan");


// Pastikan form tersedia
if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();


        // Ambil data dari form
        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const kategori = document.getElementById("kategori").value;
        const pesan = document.getElementById("pesan").value.trim();


        // Validasi
        if (!nama || !email || !pesan) {

            alert("Nama, email, dan pesan wajib diisi ya 😊");

            return;
        }


        // Siapkan data
        const data = new URLSearchParams();

        data.append("nama", nama);
        data.append("email", email);
        data.append("kategori", kategori);
        data.append("pesan", pesan);


        // Ubah status
        if (statusPesan) {
            statusPesan.textContent = "Mengirim pesan...";
            statusPesan.style.color = "#66736d";
        }


        try {

            // Kirim ke Google Apps Script
            await fetch(SCRIPT_URL, {

                method: "POST",

                body: data,

                mode: "no-cors"

            });


            // Berhasil
            alert("Pesan berhasil dikirim! Terima kasih sudah memberikan saran 😊");


            // Kosongkan form
            form.reset();


            // Status
            if (statusPesan) {

                statusPesan.textContent =
                    "✓ Pesan kamu sudah dikirim ke pengelola desa.";

                statusPesan.style.color = "#24664e";
            }


        } catch (error) {

            console.error("Error:", error);


            alert("Pesan gagal dikirim. Silakan coba lagi.");


            if (statusPesan) {

                statusPesan.textContent =
                    "Pesan gagal dikirim. Silakan coba lagi.";

                statusPesan.style.color = "#b04a4a";
            }

        }

    });

}
