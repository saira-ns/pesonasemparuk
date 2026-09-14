/* HEADER SCROLL */
const header = document.getElementById('mainHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* MOBILE NAV TOGGLE */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));
}

/* GALLERY FILTER */
function filterGallery(category, button) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.gallery-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
  });
}

/* IMAGE MODAL */
function openModal(img, title, desc) {
  const modal = document.getElementById('imageModal');
  if (!modal) return;
  modal.classList.add('active');
  document.getElementById('modalImage').src = img;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalDesc').textContent = desc;
  document.body.style.overflow = 'hidden';
}
function closeModal(event) {
  if (event.target.id === 'imageModal') closeModalForce();
}
function closeModalForce() {
  const modal = document.getElementById('imageModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModalForce();
});

/* VIDEO PLAYER */
function startVideo(videoId, posterId) {
  const video = document.getElementById(videoId);
  const poster = document.getElementById(posterId);
  if (!video) return;

  if (poster) poster.style.display = 'none';
  video.controls = true;

  const promise = video.play();
  if (promise !== undefined) {
    promise.catch(() => {
      if (poster) poster.style.display = 'flex';
    });
  }
}

document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', () => {
    const errorBox = document.getElementById(
      video.id === 'videoSunset' ? 'errorSunset' : 'errorSungai'
    );
    if (errorBox) errorBox.style.display = 'block';
  });

  video.addEventListener('playing', () => {
    const posterId = video.id === 'videoSunset' ? 'posterSunset' : 'posterSungai';
    const poster = document.getElementById(posterId);
    if (poster) poster.style.display = 'none';
  });
});

/* SCROLL REVEAL ANIMATION */
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: .08 });
  reveals.forEach(el => observer.observe(el));
}

/* INTEGRASI FORM KONTAK KE GOOGLE SHEETS VIA APPS SCRIPT */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHo7ku2vAYbHox6VTctvb8V516si6ByckzFwc1wOpJSC26aT9oJkMvZkZk4FEiaetM/exec";
const formKontak = document.getElementById('formKontak');

if (formKontak) {
  formKontak.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = document.getElementById('btnKirim');
    const status = document.getElementById('statusPesan');
    
    btn.disabled = true;
    btn.textContent = 'Mengirim...';
    status.style.display = 'none';

    const payload = {
      nama: document.getElementById('inputNama').value,
      email: document.getElementById('inputEmail').value,
      pesan: document.getElementById('inputPesan').value
    };

    fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      status.style.display = 'block';
      status.style.color = 'var(--green)';
      status.textContent = '✓ Terima kasih! Pesan Anda telah tersimpan.';
      formKontak.reset();
    })
    .catch(err => {
      status.style.display = 'block';
      status.style.color = '#c0392b';
      status.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi.';
      console.error(err);
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = 'Kirim Pesan';
    });
  });
}
