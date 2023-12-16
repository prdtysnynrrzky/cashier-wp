document.addEventListener("DOMContentLoaded", function () {
    // Data awal barang
    const dataBarang = [
        {
            names: "Nescafe Cappucino",
            purchasePrice: 7000,
            salesPrice: 7500,
            stock: 20
        },
        {
            names: "Nescafe Latte",
            purchasePrice: 7000,
            salesPrice: 7500,
            stock: 20
        },
        {
            names: "Nescafe Ice Black",
            purchasePrice: 7000,
            salesPrice: 7500,
            stock: 20
        },
        {
            names: "Nextar Brownies",
            purchasePrice: 2000,
            salesPrice: 2500,
            stock: 30
        },
        {
            names: "Nextar Pineapple",
            purchasePrice: 2000,
            salesPrice: 2500,
            stock: 30
        },
        {
            names: "Nextar Strowberry",
            purchasePrice: 2000,
            salesPrice: 2500,
            stock: 30
        },
    ];

    // Element tabel
    const tableBody = document.getElementById("tb-dataBarang");

    // Element modal
    const modal = document.getElementById("my_modal_4");

    // Fungsi untuk merender data barang ke dalam tabel
    function renderTableDataBarang() {
        tableBody.innerHTML = "";
        dataBarang.forEach((item, index) => {
            const row = `
                <tr>
                    <th>${index + 1}</th>
                    <td>${item.names}</td>
                    <td>${item.purchasePrice}</td>
                    <td>${item.salesPrice}</td>
                    <td>${item.stock}</td>
                    <td>
                        <button class="btn btn-sm btn-warning text-white font-bold italic" onclick="EditItem(${index})">edit</button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-error text-white font-bold italic" onclick="DeleteItem(${index})">hapus</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Event listener untuk menampilkan modal ketika tombol "Tambah Barang" diklik
    document.querySelector("#addButton").addEventListener("click", function () {
        modal.showModal();
    });

    // Event listener untuk menambah barang baru
    document
        .querySelector("#formKelolaBarang")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            // Mendapatkan nilai dari input
            const names = document.getElementById("namaBarangs").value;
            const purchasePrice = parseFloat(document.getElementById("hargaBeli").value);
            const salesPrice = parseFloat(document.getElementById("hargaJual").value);
            const stock = parseInt(document.getElementById("stock").value);

            // Memeriksa validitas input
            if (names.trim() === "" || isNaN(purchasePrice) || isNaN(salesPrice) || isNaN(stock)) {
                // Menampilkan pesan SweetAlert jika input tidak valid
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Mohon isi semua kolom dengan benar!",
                });
                return;
            }

            // Menambah barang baru ke dalam array dataBarang
            const newItem = { names, purchasePrice, salesPrice, stock };
            dataBarang.push(newItem);

            // Menampilkan pesan SweetAlert setelah berhasil menambah data
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Data barang berhasil ditambahkan.",
            });

            // Mengosongkan nilai input setelah menutup modal
            document.getElementById("namaBarangs").value = "";
            document.getElementById("hargaBeli").value = "";
            document.getElementById("hargaJual").value = "";
            document.getElementById("stock").value = "";

            // Merender ulang data barang ke dalam tabel
            renderTableDataBarang();
            modal.close();
        });

    // Fungsi untuk mengedit barang
    // window.EditItem = function (index) {
    //     const selectedItem = dataBarang[index];

    //     // Menyimpan nilai awal item yang akan diedit
    //     const originalValues = {
    //         names: selectedItem.names,
    //         purchasePrice: selectedItem.purchasePrice,
    //         salesPrice: selectedItem.salesPrice,
    //         stock: selectedItem.stock,
    //     };

    //     // Mengatur nilai pada formulir modal
    //     document.getElementById("namaBarangs").value = originalValues.names;
    //     document.getElementById("hargaBeli").value = originalValues.purchasePrice;
    //     document.getElementById("hargaJual").value = originalValues.salesPrice;
    //     document.getElementById("stock").value = originalValues.stock;

    //     // Menampilkan modal untuk pengeditan
    //     modal.showModal();

    //     // Penanganan formulir untuk pengeditan
    //     const handleEditSubmission = function (event) {
    //         event.preventDefault();

    //         // Memperbarui item yang dipilih dengan nilai baru jika input tidak kosong, sebaliknya menggunakan nilai awal
    //         selectedItem.names = document.getElementById("namaBarangs").value.trim() !== "" ?
    //             document.getElementById("namaBarangs").value :
    //             originalValues.names;

    //         selectedItem.purchasePrice = !isNaN(parseFloat(document.getElementById("hargaBeli").value)) ?
    //             parseFloat(document.getElementById("hargaBeli").value) :
    //             originalValues.purchasePrice;

    //         selectedItem.salesPrice = !isNaN(parseFloat(document.getElementById("hargaJual").value)) ?
    //             parseFloat(document.getElementById("hargaJual").value) :
    //             originalValues.salesPrice;

    //         selectedItem.stock = !isNaN(parseInt(document.getElementById("stock").value)) ?
    //             parseInt(document.getElementById("stock").value) :
    //             originalValues.stock;

    //         // Menampilkan pesan SweetAlert setelah berhasil mengedit data
    //         Swal.fire({
    //             icon: "success",
    //             title: "Berhasil!",
    //             text: "Data barang berhasil diubah.",
    //         });

    //         // Mengosongkan nilai input setelah menutup modal
    //         document.getElementById("namaBarangs").value = "";
    //         document.getElementById("hargaBeli").value = "";
    //         document.getElementById("hargaJual").value = "";
    //         document.getElementById("stock").value = "";

    //         // Merender ulang data barang ke dalam tabel
    //         renderTableDataBarang();
    //         modal.close();
    //     };

    //     // Menghapus event listener sebelumnya untuk mencegah adanya multiple listeners
    //     document.querySelector("#formKelolaBarang").removeEventListener("submit", handleEditSubmission);

    //     // Menambahkan event listener baru
    //     document.querySelector("#formKelolaBarang").addEventListener("submit", handleEditSubmission);
    // };

    // Fungsi untuk menghapus barang
    window.DeleteItem = function (index) {
        const deletedItemName = dataBarang[index].names;

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: `Anda tidak dapat mengembalikan data ${deletedItemName} ini!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // Menghapus item dari array dataBarang
                dataBarang.splice(index, 1);
                // Merender ulang data barang ke dalam tabel
                renderTableDataBarang();

                Swal.fire("Terhapus!", ` ${deletedItemName} telah dihapus.`, "success");
            }
        });
    };

    // Rendering awal
    renderTableDataBarang();
});