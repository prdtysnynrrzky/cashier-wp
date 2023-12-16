document.addEventListener("DOMContentLoaded", function () {
    // Array untuk menyimpan barang-barang dalam keranjang belanja
    const dataBarangFinal = [
      {
        id: 1,
        date: "01/11/2023",
        name: "Nescafe Cappucino",
        purchasePrice: 7000,
        salesPrice: 7500,
        stock: 20,
        sold: 8,
      },
      {
        id: 2,
        date: "02/11/2023",
        name: "Nescafe Latte",
        purchasePrice: 7000,
        salesPrice: 7500,
        stock: 20,
        sold: 8,
      },
      {
        id: 3,
        date: "03/11/2023",
        name: "Nescafe Ice Black",
        purchasePrice: 7000,
        salesPrice: 7500,
        stock: 20,
        sold: 8,
      },
      {
        id: 4,
        date: "04/11/2023",
        name: "Nextar Brownies",
        purchasePrice: 2000,
        salesPrice: 2500,
        stock: 30,
        sold: 12,
      },
      {
        id: 5,
        date: "05/11/2023",
        name: "Nextar Pineapple",
        purchasePrice: 2000,
        salesPrice: 2500,
        stock: 30,
        sold: 12,
      },
      {
        id: 6,
        date: "06/11/2023",
        name: "Nextar Strowberry",
        purchasePrice: 2000,
        salesPrice: 2500,
        stock: 30,
        sold: 12,
      },
    ];

    // Fungsi untuk menampilkan barang-barang dalam keranjang belanja ke dalam tabel dan chart
    function displayCart() {
      const cartItemsContainer = document.getElementById(
        "tb-laporanPenjualan"
      );
      cartItemsContainer.innerHTML = "";

      const labels = [];
      const dataSold = [];

      dataBarangFinal.forEach((item) => {
        // Membuat baris untuk setiap barang dalam keranjang
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>${item.name}</td>
            <td>${item.purchasePrice}</td>
            <td>${item.salesPrice}</td>
            <td>${item.stock}</td>
            <td>${item.sold}</td>
        `;
        cartItemsContainer.appendChild(row);

        // Menambahkan data ke array untuk chart
        labels.push(item.name);
        dataSold.push(item.sold);
      });

      // Membuat chart menggunakan Chart.js
      const ctx = document.getElementById("salesChart").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Barang Terjual",
              data: dataSold,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Menampilkan keranjang saat dokumen selesai dimuat
    displayCart();
  });