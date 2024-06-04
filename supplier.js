// Ngambil elemen form
const formulir = document.querySelector("form");

// // Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_supplier = document.querySelector("#supplier");
  const elemen_info = document.querySelector("#info");

  // Ngambil value (info) dari elemen input
  const supplierID = elemen_supplier.dataset.supplierID;
  const supplier = elemen_supplier.value;
  const info = elemen_info.value;

  // Ngecek apakah harus POST atau PUT
  if (supplierID == "") {
    // Tambah catatan
    axios
      .post("https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa", {
        supplier,
        info,
      })
      .then(() => {
        // bersihin formnya
        elemen_supplier.dataset.supplierID = "";
        elemen_supplier.value = "";
        elemen_info.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa/${supplierID}`, {
        supplier,
        info,
      })
      .then(() => {
        // bersihin formnya
        elemen_supplier.dataset.supplierID = "";
        elemen_supplier.value = "";
        elemen_info.value = "";

        // manggil fungsi get catatan biar datanya direfresh
        getCatatan();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil catatan
function getCatatan() {
  axios
    .get("https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa")
    .then(({ data }) => {
      const table = document.querySelector("#table-mhs");
      const { data: supplier } = data;
      let tampilan = "";
      let no = 1;

      for (const sup of supplier) {
        tampilan += tampilkanCatatan(no, sup);
        no++;
      }
      table.innerHTML = tampilan;

      hapusCatatan();
      editCatatan();
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function tampilkanCatatan(no, sup) {
  return `
    <tr>
      <td>${no}</td>
      <td class="supplier">${sup.supplier}</td>
      <td class="info">${sup.info}</td>
      <td><button data-id=${sup.supplierID} class='btn-edit'>Edit</button></td>
      <td><button data-id=${sup.supplierID} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

function hapusCatatan() {
  const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

  kumpulan_tombol_hapus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const supplierID = btn.dataset.supplierID;
      axios
        .delete(`https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa/${supplierID}`)
        .then(() => getCatatan())
        .catch((error) => console.log(error));
    });
  });
}

function editCatatan() {
  const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

  kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const supplierID = tombol_edit.dataset.supplierID;
      const supplier =
        tombol_edit.parentElement.parentElement.querySelector(
          ".supplier"
        ).innerText;
      const info =
        tombol_edit.parentElement.parentElement.querySelector(".info").innerText;

      // Ngambil elemen input
      const elemen_supplier = document.querySelector("#supplier");
      const elemen_info = document.querySelector("#info");

      elemen_supplier.dataset.supplierID = supplierID;
      elemen_supplier.value = supplier;
      elemen_info.value = info;
    });
  });
}

getCatatan();
