// =====================================================
// SCRIPT WEBSITE SEMPARUK KUALA
// Terhubung dengan Google Apps Script + Google Sheet
// =====================================================

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby2SshHN0YTUdKkvCnsULps6WO3jkhNK8LHqG2dEwd4xGqXHVGG_J0XFob5pUgkycSd/exec";


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

        const pesan =
            document.getElementById("pesan").value.trim();


        // Validasi
        if (!nama || !email || !pesan) {

            alert(
                "Nama, email, dan pesan wajib diisi ya 😊"
            );

            return;
        }


        if (statusPesan) {

            statusPesan.textContent =
                "Mengirim pesan...";

            statusPesan.style.color =
                "#66736d";
        }


        // Data yang dikirim ke Apps Script
        const data = new URLSearchParams();

        data.append("action", "submit");
        data.append("nama", nama);
        data.append("email", email);
        data.append("kategori", kategori);

        // Untuk sementara isi pesan digunakan
        // sebagai judul + isi agar tetap cocok
        // dengan form kontak kamu.
        data.append("judul", kategori);
        data.append("isi", pesan);


        try {

            await fetch(SCRIPT_URL, {

                method: "POST",

                body: data,

                mode: "no-cors"

            });


            // Karena no-cors tidak memberikan
            // response JSON yang bisa dibaca browser,
            // kita tampilkan pemberitahuan umum.

            form.reset();


            alert(
                "Pesan berhasil dikirim! 😊"
            );


            if (statusPesan) {

                statusPesan.textContent =
                    "✓ Pesan kamu sudah dikirim ke pengelola desa.";

                statusPesan.style.color =
                    "#24664e";
            }


        } catch (error) {

            console.error(
                "Gagal mengirim:",
                error
            );


            alert(
                "Pesan gagal dikirim. Silakan coba lagi."
            );


            if (statusPesan) {

                statusPesan.textContent =
                    "Pesan gagal dikirim. Silakan coba lagi.";

                statusPesan.style.color =
                    "#b04a4a";
            }

        }

    });

}


// =====================================================
// CEK PENGADUAN BERDASARKAN TOKEN
// =====================================================
//
// Bagian ini otomatis aktif apabila nanti
// kontak.html mempunyai:
//
// id="cekForm"
// id="tokenCek"
// id="hasilPengaduan"
//
// =====================================================

const cekForm =
    document.getElementById("cekForm");

const tokenCek =
    document.getElementById("tokenCek");

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

                alert(
                    "Masukkan token pengaduan terlebih dahulu."
                );

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
                        (result.message || "");

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
                            ${escapeHTML(data.balasan)}
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

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
