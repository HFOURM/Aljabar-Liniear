document.getElementById('calculate').addEventListener('click', function () {
    // Menentukan ordo matriks
    const isOrdo2 = document.getElementById('ordo_2').checked;
    const isOrdo3 = document.getElementById('ordo_3').checked;

    const size = isOrdo2 ? 2 : (isOrdo3 ? 3 : 0); // Validasi ukuran(ordo) matriks

    if (size === 0) {
        alert("Silakan pilih ordo 2x2 atau 3x3 terlebih dahulu.");
        return;
    }

// Fungsi untuk mengatur visibilitas input sesuai ordo
function updateMatrixInputs() {

}

// Tambahkan event listener ke radio button
document.getElementById('ordo_2').addEventListener('change', updateMatrixInputs);
document.getElementById('ordo_3').addEventListener('change', updateMatrixInputs);

// Event listener untuk tombol Hapus
document.getElementById('clear').addEventListener('click', function () {
    // Mengosongkan semua input di matriks A dan B
    for (let i = 1; i <= (document.getElementById('ordo_2').checked ? 2 : 3); i++) {
        for (let j = 1; j <= (document.getElementById('ordo_2').checked ? 2 : 3); j++) {
            document.getElementById(`a${i}${j}`).value = '';
            document.getElementById(`b${i}${j}`).value = '';
        }
    }
    // Menghapus hasil
    document.getElementById('result').innerHTML = '';

    // Reset radio button operasi
    const operations = document.getElementsByName('operation');
    operations.forEach(op => op.checked = false);
    
    // Atur ulang tampilan input matrix ke 3x3 agar bisa mulai lagi dari awal
    updateMatrixInputs();
});

// Jalankan saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', updateMatrixInputs);

    // Fungsi parser yang bisa memproses input string menjadi angka
    function parseInputValue(val) {
    val = val.replace(",", "."); // Ganti koma dengan titik
    if (val.includes("/")) {
        const parts = val.split("/");
        if (parts.length === 2) {
            const numerator = parseFloat(parts[0]);
            const denominator = parseFloat(parts[1]);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
                return numerator / denominator;
            }
        }
    }
    return parseFloat(val);
}

    // Ambil nilai dari Matrix A dan B berdasarkan ukuran ordo
    const a = [];
    const b = [];

    for (let i = 1; i <= size; i++) {
        const rowA = [];
        const rowB = [];
        for (let j = 1; j <= size; j++) {
            const valA = parseInputValue(document.getElementById(`a${i}${j}`).value) || 0;
            const valB = parseInputValue(document.getElementById(`b${i}${j}`).value) || 0;
            rowA.push(valA);
            rowB.push(valB);
        }
        a.push(rowA);
        b.push(rowB);
    }

    const result = [];
    const operations = [];

    // Penjumlahan
    if (document.getElementById('addition').checked) {
        operations.push('Penjumlahan');
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
    }

    // Pengurangan
    if (document.getElementById('subtraction').checked) {
        operations.push('Pengurangan');
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
    }

    // Perkalian
    if (document.getElementById('multiplication').checked) {
        operations.push('Perkalian');
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                let sum = 0;
                for (let k = 0; k < size; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
    }
    
    // Perkalian dengan skalar K
    if (document.getElementById('scalarMultiplication').checked) {
        operations.push('Perkalian Skalar');
        const k = parseInputValue(prompt("Masukkan nilai skalar K:"));
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = a[i][j] * k;
            }
        }
    }
    
    // Determinan
    if (document.getElementById('determinant').checked) {
        operations.push('Determinan');
        let det;
        if (size === 2) {
            // Determinan untuk matriks 2x2
            det = a[0][0] * a[1][1] - a[0][1] * a[1][0];
            result.push([det]); // Menyimpan hasil determinan
        } else if (size === 3) {
            // Determinan untuk matriks 3x3
            det = a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
                  a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
                  a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
            result.push([det]); // Menyimpan hasil determinan
        }
    }

    // Pangkatkan
    if (document.getElementById('pangkat').checked) {
        operations.push('Pangkatkan');
        const exponent = parseInt(prompt("Masukkan pangkat:"));
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = a[i][j]; // Inisialisasi dengan nilai matriks A
            }
        }
        for (let exp = 1; exp < exponent; exp++) {
            const temp = [];
            for (let i = 0; i < size; i++) {
                temp[i] = [];
                for (let j = 0; j < size; j++) {
                    let sum = 0;
                    for (let k = 0; k < size; k++) {
                        sum += result[i][k] * a[k][j];
                    }
                    temp[i][j] = sum;
                }
            }
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    result[i][j] = temp[i][j];
                }
            }
        }
    }

    // Transpose
    if (document.getElementById('transpose').checked) {
        operations.push('Transpos');
        for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
                result[i][j] = a[j][i]; // Transpose matriks A
            }
        }
    }

    // Invers
if (document.getElementById('invers').checked) {
    operations.push('Invers');
    if (size === 2) {
        const det = a[0][0] * a[1][1] - a[0][1] * a[1][0];
        if (det === 0) {
            alert("Matriks tidak memiliki invers (determinant = 0).");
            return;
        }
        result[0] = [fraction(a[1][1], det), fraction(-a[0][1], det)];
        result[1] = [fraction(-a[1][0], det), fraction(a[0][0], det)];
    } else if (size === 3) {
        const det = a[0][0] * (a[1][1] * a[2][2] - a[1][2] * a[2][1]) -
                    a[0][1] * (a[1][0] * a[2][2] - a[1][2] * a[2][0]) +
                    a[0][2] * (a[1][0] * a[2][1] - a[1][1] * a[2][0]);
        if (det === 0) {
            alert("Matriks tidak memiliki invers (determinant = 0).");
            return;
        }
        result[0] = [
            fraction(a[1][1] * a[2][2] - a[1][2] * a[2][1], det),
            fraction(a[0][2] * a[2][1] - a[0][1] * a[2][2], det),
            fraction(a[0][1] * a[1][2] - a[0][2] * a[1][1], det)
        ];
        result[1] = [
            fraction(a[1][2] * a[2][0] - a[1][0] * a[2][2], det),
            fraction(a[0][0] * a[2][2] - a[0][2] * a[2][0], det),
            fraction(a[0][2] * a[1][0] - a[0][0] * a[1][2], det)
        ];
        result[2] = [
            fraction(a[1][0] * a[2][1] - a[1][1] * a[2][0], det),
            fraction(a[0][1] * a[2][0] - a[0][0] * a[2][1], det),
            fraction(a[0][0] * a[1][1] - a[0][1] * a[1][0], det)
        ];
    }
}

// Minor dan kofaktor
if (document.getElementById('minor').checked || document.getElementById('cofactor').checked) {
    const operationType = document.getElementById('minor').checked ? 'Minor' : 'Kofaktor';
    operations.push(operationType);
    for (let i = 0; i < size; i++) {
        result[i] = [];
        for (let j = 0; j < size; j++) {
            // Hitung submatriks dengan menghapus baris i dan kolom j
            const subMatrix = [];
            for (let row = 0; row < size; row++) {
                if (row === i) continue;
                const subRow = [];
                for (let col = 0; col < size; col++) {
                    if (col === j) continue;
                    subRow.push(a[row][col]);
                }
                subMatrix.push(subRow);
            }

            // Hitung determinan submatriks (minor)
            let subDet;
            if (subMatrix.length === 1) {
                subDet = subMatrix[0][0];
            } else if (subMatrix.length === 2) {
                subDet = subMatrix[0][0] * subMatrix[1][1] - subMatrix[0][1] * subMatrix[1][0];
            } else {
                subDet = 0; // jika perlu dapat ditambah untuk ukuran lebih besar
            }

            if (operationType === 'Minor') {
                result[i][j] = subDet;
            } else {
                // Kofaktor = minor * (-1)^(i+j)
                result[i][j] = subDet * Math.pow(-1, i + j);
            }
        }
    }
}

// Fungsi mengubah desimal menjadi pecahan
function fraction(numerator, denominator) {
    // Untuk menemukan pembagi persekutuan terbesar
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(numerator, denominator);
    
    return `${numerator / divisor}/${denominator / divisor}`;
}


    // Menampilkan hasil
    let resultHTML = " ";
    resultHTML += '<table class="result-table">';
    
    // Jika operasi adalah determinan, tampilkan hasil sebagai satu sel
    if (operations.includes('Determinan')) {
        resultHTML += `<tr><td>${result[0][0]}</td></tr>`;
    } else {
        for (let i = 0; i < size; i++) {
            resultHTML += '<tr>';
            for (let j = 0; j < size; j++) {
                resultHTML += `<td>${result[i][j] !== undefined ? result[i][j] : ''}</td>`;
            }
            resultHTML += '</tr>';
        }
    }
    
    resultHTML += '</table>';

    document.getElementById('result').innerHTML = resultHTML;
});

// Fungsi untuk atur visibilitas input sesuai ordo
function updateMatrixInputs() {
    const is2x2 = document.getElementById('ordo_2').checked;

    // Semua sel input dalam matriks A dan B
    const cells = [
        'a13', 'a31', 'a23', 'a32', 'a33',
        'b13', 'b31', 'b23', 'b32', 'b33'
    ];

    // Tampilkan atau sembunyikan input berdasarkan pilihan ordo
    cells.forEach(id => {
        const el = document.getElementById(id);
        if (is2x2) {
            el.parentElement.style.display = 'none'; // sembunyikan <td>
        } else {
            el.parentElement.style.display = ''; // tampilkan kembali
        }
    });
}
// Fungsi untuk memvalidasikan karakter yang di input
function validateMatrixInput(event) {
    const key = event.key;
    const input = event.target;
    const currentValue = input.value;
    
    // Karakter yang diizinkan: angka 0-9, koma, titik, garis miring, minus, dan backspace
    const allowedChars = /[0-9.,\/-]/;

    if (!allowedChars.test(key) && key !== 'Backspace' && key !== 'Delete') {
        event.preventDefault(); // Mencegah input karakter yang tidak diperbolehkan
    }
    // Batasi "-" hanya 1 kali dan hanya di awal
    if (key === '-') {
        if (currentValue.includes('-') || input.selectionStart !== 0) {
            event.preventDefault();
            return;
        }
    }
    // Hitung panjang angka (abaikan -, /, ., ,)
    const numericLength = currentValue.replace(/[^0-9]/g, '').length;
    if (/[0-9]/.test(key) && numericLength >= 3) {
        event.preventDefault(); // Blokir jika sudah 3 digit angka
        return;
    }
}
// Fungsi untuk menyembunikan tabel
function updateTableBVisibility() {
    const operationsOnlyA = ['pangkat','determinant', 'transpose', 'minor', 'cofactor'];
    const matrixB = document.getElementById('matrixB');

    // Cek apakah salah satu operasi hanya membutuhkan tabel A dipilih
    let hideMatrixB = false;
    operationsOnlyA.forEach(opId => {
        if (document.getElementById(opId).checked) {
            hideMatrixB = true;
        }
    });

    if (hideMatrixB) {
        matrixB.style.display = 'none'; // Sembunyikan tabel B
    } else {
        matrixB.style.display = ''; // Tampilkan tabel B
    }
}

// Tambahkan event listener ke radio button
document.getElementById('ordo_2').addEventListener('change', updateMatrixInputs);
document.getElementById('ordo_3').addEventListener('change', updateMatrixInputs);

// Jalankan saat halaman pertama kali dimuat
window.addEventListener('DOMContentLoaded', updateMatrixInputs);

//
window.addEventListener('DOMContentLoaded', () => {
    // Ambil semua input matriks A dan B
    const inputs = document.querySelectorAll('#matrixA input, #matrixB input');
    inputs.forEach(input => {
        input.addEventListener('keypress', validateMatrixInput);
    });
});

//
window.addEventListener('DOMContentLoaded', () => {
    const operationRadios = document.getElementsByName('operation');
    operationRadios.forEach(radio => {
        radio.addEventListener('change', updateTableBVisibility);
    });
});

