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

