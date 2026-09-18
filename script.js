// =====================================================
// SCRIPT WEBSITE SEMPARUK KUALA
// Terhubung dengan Google Apps Script + Google Sheet
// =====================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyPB0o6uoS_AK0VI01wySdgXW8JcBAwqpUlMcpKZTPSrpMHXiz6k0tQaKuLqBnZj4CR3A/exec";


// =====================================================
// FORM PENGADUAN
// =====================================================

const form = document.getElementById("saranForm");
const statusPesan = document.getElementById("statusPesan");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nama =
            document.getElementById("nama").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const kategori =
            document.getElementById("kategori").value;

        const judulAduan =
            document.getElementById("judulAduan").value.trim();

        const pesan =
            document.getElementById("pesan").value.trim();


        // Validasi
        if (!nama || !email || !kategori || !judulAduan || !pesan) {

            if (statusPesan) {
                statusPesan.textContent =
                    "Nama, email, kategori, judul aduan, dan isi aduan wajib diisi.";
                statusPesan.style.color = "#b04a4a";
            }

            return;
        }


        if (statusPesan) {

            statusPesan.textContent =
                "Mengirim aduan...";

            statusPesan.style.color =
                "#66736d";
        }


        // Data yang dikirim ke Apps Script
        const data = new URLSearchParams();

        data.append("action", "submit");
        data.append("nama", nama);
        data.append("email", email);
        data.append("kategori", kategori);
        data.append("judulAduan", judulAduan);
        data.append("pesan", pesan);


        try {

            const response = await fetch(SCRIPT_URL, {

                method: "POST",
                body: data

            });


            const result = await response.json();


            if (!result.success) {

                throw new Error(
                    result.message || "Aduan gagal dikirim."
                );

            }


            // Reset form
            form.reset();


            // Tampilkan token pengaduan
            if (statusPesan) {

                statusPesan.innerHTML =
                    "✓ Aduan berhasil dikirim!<br>" +
                    "Simpan token pengaduan kamu:<br>" +
                    "<strong style='font-size:18px;'>" +
                    escapeHTML(result.token) +
                    "</strong><br>" +
                    "<small>Gunakan token ini untuk mengecek status aduan.</small>";

                statusPesan.style.color =
                    "#24664e";
            }


        } catch (error) {

            console.error(
                "Gagal mengirim:",
                error
            );


            if (statusPesan) {

                statusPesan.textContent =
                    "Aduan gagal dikirim. Silakan coba lagi.";

                statusPesan.style.color =
                    "#b04a4a";
            }

        }

    });

}


// =====================================================
// CEK PENGADUAN BERDASARKAN TOKEN
// =====================================================

const cekForm =
    document.getElementById("cekAduanForm");

const tokenCek =
    document.getElementById("tokenPengaduan");

const hasilPengaduan =
    document.getElementById("hasilPengaduan");


if (cekForm) {

    cekForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const token =
                tokenCek.value.trim();


            if (!token) {

                hasilPengaduan.innerHTML =
                    "<strong>Masukkan token pengaduan terlebih dahulu.</strong>";

                hasilPengaduan.style.display =
                    "block";

                return;
            }


            hasilPengaduan.innerHTML =
                "Mengecek pengaduan...";

            hasilPengaduan.style.display =
                "block";


            try {

                const response =
                    await fetch(
                        SCRIPT_URL +
                        "?action=check&token=" +
                        encodeURIComponent(token)
                    );


                const result =
                    await response.json();


                if (!result.success) {

                    hasilPengaduan.innerHTML =
                        "<strong>Pengaduan tidak ditemukan.</strong><br>" +
                        escapeHTML(
                            result.message || ""
                        );

                    return;
                }


                const data =
                    result.data;


                hasilPengaduan.innerHTML = `

                    <div style="
                        display:grid;
                        gap:10px;
                    ">

                        <div>
                            <strong>Token</strong><br>
                            ${escapeHTML(data.token)}
                        </div>

                        <div>
                            <strong>Tanggal</strong><br>
                            ${escapeHTML(data.tanggal)}
                        </div>

                        <div>
                            <strong>Nama</strong><br>
                            ${escapeHTML(data.nama)}
                        </div>

                        <div>
                            <strong>Kategori</strong><br>
                            ${escapeHTML(data.kategori)}
                        </div>

                        <div>
                            <strong>Judul Aduan</strong><br>
                            ${escapeHTML(data.judul)}
                        </div>

                        <div>
                            <strong>Isi Aduan</strong><br>
                            ${escapeHTML(data.isi)}
                        </div>

                        <div>
                            <strong>Status</strong><br>
                            ${escapeHTML(data.status)}
                        </div>

                        <div>
                            <strong>Balasan Admin</strong><br>
                            ${escapeHTML(
                                data.balasan || "Belum ada balasan."
                            )}
                        </div>

                    </div>

                `;


            } catch (error) {

                console.error(
                    "Gagal mengecek:",
                    error
                );


                hasilPengaduan.innerHTML =
                    "Terjadi kesalahan saat mengecek pengaduan.";

            }

        }
    );

}


// =====================================================
// KEAMANAN TAMPILAN DATA
// =====================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
