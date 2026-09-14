/* ==========================================
DESA SEMPARUK KUALA - MAIN SCRIPT
========================================== */
​document.addEventListener('DOMContentLoaded', () => {
​// 1. Header Scroll Effect
const header = document.getElementById('mainHeader');
if (header) {
window.addEventListener('scroll', () => {
if (window.scrollY > 30) {
header.classList.add('scrolled');
} else {
header.classList.remove('scrolled');
}
}, { passive: true });
}
​// 2. Mobile Nav Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
navToggle.addEventListener('click', () => {
navLinks.classList.toggle('show');
});
​navLinks.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
navLinks.classList.remove('show');
});
});
}
​// 3. Form Kontak Integration (Google Apps Script)
const formKontak = document.getElementById('formKontak');
if (formKontak) {
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHo7ku2vAYbHox6VTctvb8V516si6ByckzFwc1wOpJSC26aT9oJkMvZkZk4FEiaetM/exec";
​formKontak.addEventListener('submit', function (e) {
e.preventDefault();
​const btn = document.getElementById('btnKirim');
const status = document.getElementById('statusPesan');
​btn.disabled = true;
btn.textContent = 'Mengirim Pesan...';
if (status) status.style.display = 'none';
​const payload = {
nama: document.getElementById('inputNama') ? document.getElementById('inputNama').value : '',
email: document.getElementById('inputEmail') ? document.getElementById('inputEmail').value : '',
pesan: document.getElementById('inputPesan') ? document.getElementById('inputPesan').value : ''
};
​fetch(SCRIPT_URL, {
method: 'POST',
mode: 'no-cors',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(payload)
})
.then(() => {
if (status) {
status.style.display = 'block';
status.style.color = '#3d7a46';
status.textContent = '✓ Terima kasih! Pesan dan saran Anda telah berhasil terkirim.';
}
formKontak.reset();
})
.catch(err => {
if (status) {
status.style.display = 'block';
status.style.color = '#c0392b';
status.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi.';
}
console.error(err);
})
.finally(() => {
btn.disabled = false;
btn.textContent = 'Kirim Pesan';
});
});
}
​});
​// 4. Galeri Filter Function
function filterGallery(category, button) {
const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => btn.classList.remove('active'));
if (button) button.classList.add('active');
​const cards = document.querySelectorAll('.gallery-card');
cards.forEach(card => {
if (category === 'all' || card.dataset.category === category) {
card.style.display = 'block';
} else {
card.style.display = 'none';
}
});
}
​// 5. Image Modal Lightbox Function
function openModal(imageSrc, title, desc) {
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
​if (modal && modalImg) {
modalImg.src = imageSrc;
if (modalTitle) modalTitle.textContent = title;
if (modalDesc) modalDesc.textContent = desc;
modal.classList.add('active');
document.body.style.overflow = 'hidden';
}
}
​function closeModal(event) {
if (!event || event.target.id === 'imageModal') {
closeModalForce();
}
}
​function closeModalForce() {
const modal = document.getElementById('imageModal');
if (modal) {
modal.classList.remove('active');
document.body.style.overflow = '';
}
}
​document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeModalForce();
});
