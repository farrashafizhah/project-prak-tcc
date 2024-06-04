// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar supplier
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM supplier";
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil daftar supplier",
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

// [POST] Memasukkan supplier baru ke dalam daftar supplier
router.post("/", async (req, res) => {
  try {
    // mengambil supplier dan info dari request body
    const { supplier, info } = req.body;

    // kalau supplier/info kosong atau gaada kolom supplier/info di request body
    if (!supplier || !info) {
      const msg = `${!supplier ? "Nama" : "NIM"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO supplier (supplier, info) VALUES (?, ?)";
    await connection.promise().query(command, [supplier, info]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan supplier",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data supplier berdasarkan supplierID
router.put("/:supplierID", async (req, res) => {
  try {
    // mengambil supplier dan info dari request body
    const { supplierID } = req.params;
    const { supplier, info } = req.body;

    /// kalau supplier/info kosong atau gaada kolom supplier/info di request body
    if (!supplier || !info) {
      const msg = `${!supplier ? "Nama" : "NIM"} gabole kosong 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE supplier SET supplier = ?, info = ? WHERE supplierID = ?";
    await connection.promise().query(command, [supplier, info, supplierID]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah supplier",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus suatu supplier berdasarkan supplierID
router.delete("/:supplierID", async (req, res) => {
  try {
    const { supplierID } = req.params;

    // Execute query ke database
    const command = "DELETE FROM supplier WHERE supplierID = ?";
    await connection.promise().query(command, [supplierID]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus supplier",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil supplier berdasarkan ID
router.get("/:supplierID", async (req, res) => {
  try {
    // mengambil supplierID dari parameter
    const { supplierID } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM supplier WHERE supplierID = ?";
    const [[data]] = await connection.promise().query(command, [supplierID]);

    if (!data) {
      const error = new Error("supplier tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil supplier",
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
