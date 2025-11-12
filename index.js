const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// 🔌 Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ragehaste90!', // ganti sesuai password MySQL kamu
  database: 'apikeyc',
  port: 3309
});

db.connect((err) => {
  if (err) {
    console.error('❌ Gagal konek DB:', err);
  } else {
    console.log('✅ Koneksi DB sukses');
  }
});

app.use(express.json());
app.use(express.static('public'));

// 🧩 Buat API key baru
app.post('/create', (req, res) => {
  try {
    const random = crypto.randomBytes(32).toString('base64url');
    const apiKey = `sk-itumy-v1-${random}`;

    const sql = 'INSERT INTO token (token) VALUES (?)';
    db.query(sql, [apiKey], (err, result) => {
      if (err) {
        console.error('❌ Error query:', err);
        return res.status(500).json({ message: 'Gagal menyimpan API key' });
      }

      console.log('✅ API key berhasil dibuat:', apiKey);
      res.json({ apiKey }); // kirim ke client
    });
  } catch (error) {
    console.error('❌ Error generate key:', error);
    res.status(500).json({ message: 'Gagal membuat API key' });
  }
});

