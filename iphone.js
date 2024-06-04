// Ngambil elemen form
const formulir = document.querySelector("form");

// // Bikin trigger event submit pada elemen form
formulir.addEventListener("submit", (e) => {
  e.preventDefault();
  kirim();
});

function kirim() {
  // Ngambil elemen input
  const elemen_device = document.querySelector("#device");
  const elemen_harga = document.querySelector("#harga");

  // Ngambil value (nidn) dari elemen input
  const deviceID = elemen_device.dataset.deviceID;
  const device = elemen_device.value;
  const harga = elemen_harga.value;

  // Ngecek apakah harus POST atau PUT
  if (deviceID == "") {
    // Tambah catatan
    axios
      .post("https://dosen-llz4uecrhq-et.a.run.app/dosen", {
        device,
        harga,
      })
      .then(() => {
        // bersihin formnya
        elemen_device.dataset.deviceID = "";
        elemen_device.value = "";
        elemen_harga.value = "";

        // manggil fungsi get catatan biar datanya di-refresh
        getCatatan();
      })
      .catch((error) => console.log(error.message));
  } else {
    axios
      .put(`https://dosen-llz4uecrhq-et.a.run.app/dosen/${deviceID}`, {
        device,
        harga,
      })
      .then(() => {
        // bersihin formnya
        elemen_device.dataset.deviceID = "";
        elemen_device.value = "";
        elemen_harga.value = "";

        // manggil fungsi get catatan biar datanya direfresh
        getCatatan();
      })
      .catch((error) => console.log(error));
  }
}

// Ngambil catatan
function getCatatan() {
  axios
    .get("https://dosen-llz4uecrhq-et.a.run.app/dosen")
    .then(({ data }) => {
      const table = document.querySelector("#table-dosen");
      const { data: iphone } = data;
      let tampilan = "";
      let no = 1;

      for (const iph of iphone) {
        tampilan += tampilkanCatatan(no, iph);
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

function tampilkanCatatan(no, iphone) {
  return `
    <tr>
      <td>${no}</td>
      <td class="device">${iphone.device}</td>
      <td class="harga">${iphone.harga}</td>
      <td><button data-id=${iphone.deviceID} class='btn-edit'>Edit</button></td>
      <td><button data-id=${iphone.deviceID} class='btn-hapus'>Hapus</button></td>
    </tr>
  `;
}

function hapusCatatan() {
  const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

  kumpulan_tombol_hapus.forEach((btn) => {
    btn.addEventListener("click", () => {
      const deviceID = btn.dataset.deviceID;
      axios
        .delete(`https://dosen-llz4uecrhq-et.a.run.app/dosen/${deviceID}`)
        .then(() => getCatatan())
        .catch((error) => console.log(error));
    });
  });
}

function editCatatan() {
  const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

  kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
      const deviceID = tombol_edit.dataset.deviceID;
      const device =
        tombol_edit.parentElement.parentElement.querySelector(
          ".device"
        ).innerText;
      const harga =
        tombol_edit.parentElement.parentElement.querySelector(
          ".harga"
        ).innerText;

      // Ngambil elemen input
      const elemen_device = document.querySelector("#device");
      const elemen_harga = document.querySelector("#harga");

      elemen_device.dataset.deviceID = deviceID;
      elemen_device.value = device;
      elemen_harga.value = harga;
    });
  });
}

getCatatan();
