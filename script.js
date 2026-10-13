script.js
let audioAlarm = document.getElementById('suaraAlarm');
let timerJedaElement = document.getElementById('timerJedaSholat');
let statusSholatElement = document.getElementById('statusSholat');

// --- 1. LOGIKA SHOLAT & ALARM TENGGANG WAKTU ---
let detikTenggang = 10 * 60; // 10 Menit = 600 detik
let timerInterval = null;

// Simulasi Waktu Dzuhur Tiba
function waktuDzuhurTiba() {
  statusSholatElement.innerText = "🚨 Waktu Dzuhur Tiba! Silakan bersiap-siap.";
  
  timerInterval = setInterval(() => {
    detikTenggang--;
    
    let menit = Math.floor(detikTenggang / 60);
    let detik = detikTenggang % 60;
    timerJedaElement.innerText = `Tenggang Waktu: ${menit}:${detik < 10 ? '0' : ''}${detik}`;

    // Jika waktu 10 menit habis dan belum kirim foto
    if (detikTenggang <= 0) {
      clearInterval(timerInterval);
      nyalakanAlarm();
    }
  }, 1000);
}

function nyalakanAlarm() {
  statusSholatElement.innerText = "💥 ALARM BERISIK NYALA! KAU BELUM SHOLAT!";
  audioAlarm.play();
}

function kirimBuktiSholat() {
  let fileInput = document.getElementById('inputFotoSholat');
  if (fileInput.files.length === 0) {
    alert("Wajib sertakan foto bukti sedang sholat/mukena/sajadah!");
    return;
  }

  // Matikan Alarm
  audioAlarm.pause();
  audioAlarm.currentTime = 0;
  clearInterval(timerInterval);

  statusSholatElement.innerText = "✅ Alhamdulillah, Sholat Selesai & Foto Terverifikasi!";
  timerJedaElement.innerText = "Tenggang Waktu: Selesai";

  // Tampilkan Gambar Bukti
  let reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('previewSholat').innerHTML = `<p>Bukti Foto Kamu:</p><img class="preview-img" src="${e.target.result}">`;
  };
  reader.readAsDataURL(fileInput.files[0]);
}

// Jalankan simulasi waktu dzuhur otomatis saat web dibuka
waktuDzuhurTiba();


// --- 2. LOGIKA PR & DEADLINE ---
function tambahTugas() {
  let nama = document.getElementById('namaTugas').value;
  let mulai = document.getElementById('waktuMulai').value;
  let deadline = document.getElementById('waktuDeadline').value;
  let fotoSoal = document.getElementById('fotoSoalPR').files[0];

  if (!nama || !mulai || !deadline || !fotoSoal) {
    alert("Isi semua data tugas dan foto soalnya terlebih dahulu!");
    return;
  }

  let list = document.getElementById('daftarTugas');
  let li = document.createElement('li');

  let reader = new FileReader();
  reader.onload = function(e) {
    li.innerHTML = `
      <strong>📌 ${nama}</strong>
      <span>Mulai: ${mulai} | Deadline: ${deadline}</span>
      <p>Foto Soal:</p>
      <img class="preview-img" src="${e.target.result}">
      <br>
      <label>Upload Foto Lembar Jawaban Selesai:</label>
      <input type="file" onchange="selesaikanTugas(this)">
    `;
    list.appendChild(li);
  };
  reader.readAsDataURL(fotoSoal);
}

function selesaikanTugas(input) {
  if (input.files.length > 0) {
    alert("Selamat! Tugas kamu selesai dan fotonya sudah tersimpan.");
    input.parentElement.style.background = "#c8e6c9"; // Berubah warna hijau
  }
}