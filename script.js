function predict() {
    var nama = document.getElementById('nama').value;
    if (nama.trim() === '') {
        alert('Masukkan nama dengan benar!');
        return;
    }

    // Ambil nilai untuk Q1 sampai Q9
    var jawaban = [];
    for (var i = 1; i <= 9; i++) {
        var nilai = parseInt(document.getElementById('Q' + i).value);
        if (isNaN(nilai)) {
            alert('Masukkan nilai yang benar untuk semua pertanyaan!');
            return;
        }
        jawaban.push(nilai);
    }

    var hasil = evaluasiJawaban(jawaban);
    document.getElementById('skor').innerText = hasil.skor.toFixed(2);
    document.getElementById('interpretasi').innerText = hasil.interpretasi;
    document.getElementById('hasil-nama').innerText = nama;
}

function evaluasiJawaban(jawaban) {
    // Hitung skor untuk kategori berbeda
    var skorMediaSosial = hitungSkorMediaSosial(jawaban.slice(0, 3));
    var skorTidur = hitungSkorTidur(jawaban.slice(3, 6));
    var skorBelajar = hitungSkorBelajar(jawaban.slice(6, 9));

    // Hitung skor keseluruhan
    var skorTotal = (skorMediaSosial + skorTidur + skorBelajar) / 3;

    // Interpretasi hasil
    var interpretasi = interpretasiSkor(skorTotal);

    return {
        skor: skorTotal,
        interpretasi: interpretasi
    };
}

function hitungSkorMediaSosial(jawaban) {
    // Q1, Q2, Q3
    var skor = 0;
    skor += jawaban[0] * 2; // Q1: skala 0-1, bobot 2
    skor += (3 - jawaban[1]) * 1.5; // Q2: skala 0-3 dibalik, bobot 1.5
    skor += jawaban[2] * 1.5; // Q3: skala 0-1, bobot 1.5
    return skor / 5; // Normalisasi ke skala 0-1
}

function hitungSkorTidur(jawaban) {
    // Q4, Q5, Q6
    var skor = 0;
    skor += jawaban[0] * 2; // Q4: skala 0-1, bobot 2
    skor += (1 - jawaban[1]) * 1.5; // Q5: skala 0-1 dibalik, bobot 1.5
    skor += jawaban[2] * 1.5; // Q6: skala 0-1, bobot 1.5
    return skor / 5; // Normalisasi ke skala 0-1
}

function hitungSkorBelajar(jawaban) {
    // Q7, Q8, Q9
    var skor = 0;
    skor += jawaban[0] * 1.5; // Q7: skala 0-1, bobot 1.5
    skor += jawaban[1] * 1.5; // Q8: skala 0-2, bobot 1.5
    skor += jawaban[2] * 2; // Q9: skala 0-1, bobot 2
    return skor / 5; // Normalisasi ke skala 0-1
}

function interpretasiSkor(skor) {
    if (skor > 0.7) {
        return "Baik";
    } else if (skor > 0.4) {
        return "Cukup";
    } else {
        return "Kurang";
    }
}