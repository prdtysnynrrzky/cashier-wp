document.addEventListener("DOMContentLoaded", function () {
  const data = [];
  const tableBody = document.getElementById("tb-kasir");
  const totalBayarElement = document.getElementById("totalBayar");
  const tunaiInput = document.getElementById("tunai");
  const kembalianElement = document.getElementById("totalKembalian");
  const bayarButton = document.getElementById("bayar");
  const printButton = document.getElementById("print");
  const modal = document.getElementById("my_modal_3");

  function renderTable() {
    tableBody.innerHTML = "";
    data.forEach((item, index) => {
      const row = `
      <tr>
        <th>${index + 1}</th>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>
          <button class="btn btn-sm btn-error text-white font-bold italic" onclick="kasirDeleteItem(${item.id
        })">hapus</button>
        </td>
      </tr>
    `;
      tableBody.innerHTML += row;
    });
  }

  function updateTotalBayar() {
    const totalBayar = data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    totalBayarElement.textContent = totalBayar;
    bayarButton.disabled = data.length === 0 || totalBayar === 0;
  }

  document
    .querySelector(".btn-info")
    .addEventListener("click", function () {
      modal.showModal();
    });

  document
    .querySelector("#formTambahBarang")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("namaBarang").value;
      const price = parseFloat(
        document.getElementById("hargaBarang").value
      );
      const quantity = parseInt(
        document.getElementById("jumlahBarang").value
      );

      if (name.trim() === "" || isNaN(price) || isNaN(quantity)) {
        // Tampilkan pesan SweetAlert jika input tidak valid
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Mohon isi semua kolom dengan benar!",
        });
        return;
      }

      const newItem = { id: data.length + 1, name, price, quantity };
      data.push(newItem);

      // Tampilkan pesan SweetAlert setelah berhasil menambah data
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data barang berhasil ditambahkan.",
      });

      // Kosongkan nilai input setelah menutup modal
      document.getElementById("namaBarang").value = "";
      document.getElementById("hargaBarang").value = "";
      document.getElementById("jumlahBarang").value = "";

      renderTable();
      updateTotalBayar();
      modal.close();
    });

  bayarButton.addEventListener("click", function () {
    const tunai = parseFloat(tunaiInput.value);
    const totalBayar = parseFloat(totalBayarElement.textContent);
    const kembalian = tunai - totalBayar;

    if (isNaN(tunai) || tunai <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silakan masukkan jumlah pembayaran yang valid.",
      });
      return;
    }

    if (kembalian < 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pembayaran tidak mencukupi. Silakan masukkan jumlah yang cukup.",
      });
      return;
    }

    kembalianElement.textContent = kembalian;

    // Aktifkan tombol print
    printButton.disabled = false;
  });

  // SweetAlert untuk konfirmasi hapus
  window.kasirDeleteItem = function (itemId) {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const index = data.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          data.splice(index, 1);
          renderTable();
          updateTotalBayar();

          // Tampilkan pesan SweetAlert setelah berhasil menghapus data
          Swal.fire("Terhapus!", "Data barang telah dihapus.", "success");
        }
      }
    });
  };

  // Fungsi untuk mencetak struk
  printButton.addEventListener("click", function () {
    const storeName = "HM Mart";
    const storeAddress = "Jl. Panglima Sudirman No.86, Beru, Kec. Wlingi";
    const storePhone = "(0342) 691224";
    const shoppingCart = data;
    const formattedDate = new Date().toLocaleDateString();

    // Fungsi untuk menghasilkan kode acak untuk Approval Code
    function generateRandomCode() {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Struk Belanja</title>
              </head>
              <body>
                  <style>
                      body {
                          font-family: 'Arial', sans-serif;
                          margin: 20px;
                      }

                      .receipt {
                          text-align: left;
                          margin: 0 auto;
                          padding: 20px;
                      }

                      .store-info {
                          text-align: center;
                          font-weight: bold;
                          margin-bottom: 20px;
                      }

                      .title {
                          text-align: center;
                          font-size: 1.5em;
                          margin: 20px 0;
                      }

                      .item-list {
                          margin-top: 20px;
                      }

                      table {
                          width: 100%;
                          border-collapse: collapse;
                          margin-top: 10px;
                      }

                      th, td {
                          padding: 15px;
                          text-align: left;
                      }

                      .item-list th {
                          background-color: #e0e0e0;
                      }

                      .total {
                          margin-top: 20px;
                          font-weight: bold;
                      }

                      .barcode {
                        text-align: center;
                        margin-top: 20px;
                      }

                      .barcode img {
                          max-width: 100%;
                          height: auto;
                      }

                      .thank-you {
                        font-size: 1em;
                        font-weight: bold;
                        text-align: center;
                      }

                      .code-section {
                          margin-top: 20px;
                          text-align: right;
                      }

                      hr {
                        border: none;
                        border-top: 5px dashed #000;
                        margin: 20px 0;
                      }

                      hr.linear {
                        border: none;
                        border-top: 1px solid #000;
                        margin: 20px 0;
                      }
                  </style>
                  <div class="receipt">
                      <div class="store-info">
                          <div>${storeName}</div>
                          <div>${storeAddress}</div>
                          <div>${storePhone}</div>
                      </div>
                      <hr />
                      <div class="title">CASH RECEIPT</div>
                      <hr />
                      <div class="item-list">
                        <table>
                          <thead>
                            <tr>
                              <th>Nama Barang</th>
                              <th>Harga</th>
                                      <th>Jumlah</th>
                                      <th>Total</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  ${shoppingCart
        .map(
          (item) => `
                                              <tr>
                                                  <td>${item.name}</td>
                                                  <td>Rp ${item.price}</td>
                                                  <td>${item.quantity}</td>
                                                  <td>Rp ${item.price * item.quantity
            }</td>
                                              </tr>
                                          `
        )
        .join("")}
                              </tbody>
                          </table>
                      </div>
                      <hr class="linear" />
                      <div class="total">
                        <table>
                              <tr>
                                  <td>Total Bayar:</td>
                                  <td style="text-align: right;">Rp ${totalBayarElement.textContent
      }</td>
                              </tr>
                              <tr>
                                  <td>Tunai:</td>
                                  <td style="text-align: right;">Rp ${tunaiInput.value
      }</td>
                              </tr>
                              <tr>
                                  <td>Kembalian:</td>
                                  <td style="text-align: right;">Rp ${kembalianElement.textContent
      }</td>
                              </tr>
                        </table>
                      </div>
                      <hr class="linear" />
                      <h1 class="thank-you">Terima Kasih Atas Kunjungan Anda</h1>
                      <div class="barcode">
                        <img src="assets/barcode.png" alt="Barcode">
                        </div>
                      <div class="code-section">
                      <p>Tanggal: ${formattedDate}</p>
                      <p>Kode Transaksi: ${generateRandomCode()}</p>
                      </div>
                    </div>
                  </body>
              </html>
            `);

    printWindow.document.close();
    printWindow.print();
  });

  
  // Rendering awal
  renderTable();
  updateTotalBayar();
  printButton.disabled = true;
});