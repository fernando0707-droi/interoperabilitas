const express = require("express");
// const { use } = require("react");

const App = express();

App.use(express.json());

App.get('/',(req, res) => {
    res.send({
        message:'HTTP server praktikum introporabilitas'
    });
});


const mahasiswa = [{
    nim: '362558302142',
    nama: 'Ayaska Fernando',
    status: 'aktif'
},
{
    nim: '36255830',
    nama: 'Khairan Adiokta Arun Nugraha',
    status: 'aktif'
},
{
    nim: '36255830',
    nama: 'Taufiq Hidayat',
    status: 'aktif'
},
{
    nim: '36255830',
    nama: 'Raido Octavian',
    status: 'aktif'
}
];

App.get("/mahasiswa", (req, res) => {
    res.status(200).json(mahasiswa);
});

App.get("/mahasiswa/:nim", (req, res) => {
    const mhs = mahasiswa.find(m => m.nim === req.params.nim);
    if (!mhs) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    res.status(200).json(mhs);
});

App.post("/mahasiswa", (req, res) => {
    const { nim, nama, status } = req.body;

    if (!nim || !nama || !status) {
        return res.status(400).json({ message: "nim, nama, dan status wajib diisi" });
    }

    const mahasiswaBaru = { nim, nama, status };
    mahasiswa.push(mahasiswaBaru);

    res.status(201).json({
        message: "Mahasiswa berhasil ditambahkan",
        data: mahasiswaBaru
    });
});

App.patch("/mahasiswa/:nim", (req, res) => {
    const mhs = mahasiswa.find(m => m.nim === req.params.nim);

    if (!mhs) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    const { nim, nama, status } = req.body;
    if (nama) mhs.nama = nama;
    if (status) mhs.status = status;

    res.status(200).json({
        message: "Mahasiswa berhasil diperbarui",
        data: mhs
    });
});

App.delete("/mahasiswa/:nim", (req, res) => {
    const index = mahasiswa.findIndex(m => m.nim === req.params.nim);

    if (index === -1) {
        return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    const mahasiswaTerhapus = mahasiswa.splice(index, 1);

    res.status(200).json({
        message: "Mahasiswa berhasil dihapus",
        data: mahasiswaTerhapus[0]
    });
});

const pelanggan = [
    {
        id: 'P001',
        nama: 'raido',
        alamat: 'Banyuwangi',
        no_hp: '081234568760'
    },
    {
        id: 'P002',
        nama: 'taufiq',
        alamat: 'Jember',
        no_hp: '082345678901'
    },
    {
        id: 'P003',
        nama: 'adi okta',
        alamat: 'Surabaya',
        no_hp: '083456789012'
    },
    {
        id: 'P004',
        nama: 'hasbi',
        alamat: 'Malang',
        no_hp: '084567890123'
    },
    {
        id: 'P005',
        nama: 'Rudi hermawan',
        alamat: 'Bondowoso',
        no_hp: '085678901234'
    }
];

// GET semua pelanggan
App.get("/pelanggan", (req, res) => {
    res.status(200).json(pelanggan);
});

// GET pelanggan by id
App.get("/pelanggan/:id", (req, res) => {
    const p = pelanggan.find(item => item.id === req.params.id);
    if (!p) {
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    res.status(200).json(p);
});

// POST tambah pelanggan
App.post("/pelanggan", (req, res) => {
    const { id, nama, alamat, no_hp } = req.body;
    if (!id || !nama || !alamat || !no_hp) {
        return res.status(400).json({ message: "id, nama, alamat, dan no_hp wajib diisi" });
    }
    const pelangganBaru = { id, nama, alamat, no_hp };
    pelanggan.push(pelangganBaru);
    res.status(201).json({
        message: "Pelanggan berhasil ditambahkan",
        data: pelangganBaru
    });
});

// PATCH update pelanggan
App.patch("/pelanggan/:id", (req, res) => {
    const p = pelanggan.find(item => item.id === req.params.id);
    if (!p) {
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    const { nama, alamat, no_hp } = req.body;
    if (nama) p.nama = nama;
    if (alamat) p.alamat = alamat;
    if (no_hp) p.no_hp = no_hp;
    res.status(200).json({
        message: "Pelanggan berhasil diperbarui",
        data: p
    });
});

// DELETE pelanggan
App.delete("/pelanggan/:id", (req, res) => {
    const index = pelanggan.findIndex(item => item.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }
    const pelangganTerhapus = pelanggan.splice(index, 1);
    res.status(200).json({
        message: "Pelanggan berhasil dihapus",
        data: pelangganTerhapus[0]
    });
});

App.listen(3000, () => {
    console.log('server sedang berjalan di port 3000')
});

