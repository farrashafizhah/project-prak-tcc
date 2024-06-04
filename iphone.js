// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar iphone
router.get("/iphone", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM iphone";
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar iphone",
      data: data[0],
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan iphone baru ke daftar iphone
router.post("/iphone", async (req, res) => {
  try {
    // mengambil device dan harga dari request body
    const { device, harga } = req.body;

    // kalau device/harga kosong atau gaada kolom device/harga di request body
    if (!device || !harga) {
      const msg = `${!device ? "device" : "harga"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO iphone (device, harga) VALUES (?, ?)";
    await connection.promise().query(command, [device, harga]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan iphone",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data iphone berdasarkan deviceID
router.put("/:deviceID", async (req, res) => {
  try {
    // mengambil deviceID dari parameter
    const { deviceID } = req.params;

    // mengambil device dan harga dari request body
    const { device, harga } = req.body;

    // kalau device/harga kosong atau gaada kolom device/harga di request body
    if (!device || !harga) {
      const msg = `${!device ? "device" : "harga"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE iphone SET device = ?, harga = ? WHERE deviceID = ?";
    await connection.promise().query(command, [device, harga, deviceID]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah data iphone",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus data iphone berdasarkan deviceID
router.delete("/:deviceID", async (req, res) => {
  try {
    // mengambil deviceID dari parameter
    const { deviceID } = req.params;

    // Execute query ke database
    const command = "DELETE FROM iphone WHERE deviceID = ?";
    await connection.promise().query(command, [deviceID]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus iphone",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil data iphone berdasarkan ID
router.get("/:deviceID", async (req, res) => {
  try {
    // mengambil deviceID dari parameter
    const { deviceID } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM iphone WHERE deviceID = ?";
    const [[data]] = await connection.promise().query(command, [deviceID]);

    if (!data) {
      const error = new Error("iphone tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil iphone",
      data: data,
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;
