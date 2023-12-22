<script lang="ts">
    let tableData: any = [
        {id: "107518224", phone: "0247075198", name: "Phạm Ngọc Cường", quantity: "1" , price: "100000"},
        {id: "107518225", phone: "0247075197", name: "Phạm Văn Cường", quantity: "3" , price: "300000"},
        {id: "107518226", phone: "0247075196", name: "Phạm Công Cường", quantity: "2" , price: "400000"},
    ]

    function totalQuantity() {
        let total = 0;
        tableData.forEach((element: any) => {
            total += parseInt(element.quantity)
        });
        return total;
    }

    function totalPrice() {
        let total = 0;
        tableData.forEach((element: any) => {
            total += parseInt(element.price)
        });
        return total;
    }
</script>

<div class="bg-[#fff] p-4 my-4" style="width: 1000px">
	<div class="flex items-center justify-around">
		<span>
			<img src="/img/logo-new.png" alt="logo" class="h-16" />
		</span>
		<p class="uppercase text-lg">Biên bản bàn giao vận đơn (ID: 1007139). Ngày 01/07/2021</p>
	</div>
	<div class="flex mt-4">
		<p class="ml-2 w-[60%]"><strong>Điểm chuyển phát hiện tại: </strong>Kho 1 - Hiếu</p>
        <p><strong>Ngày giờ in: </strong>20/07/2021 17:18:53</p>
	</div>
    <div class="flex">
		<p class="ml-2 w-[60%]"><strong>Ghi chú: </strong>tutut</p>
        <p><strong>Điểm chuyển phát tiếp theo: </strong>Kho 2 - Hiếu</p>
	</div>
	<table class="receipt-table w-full">
		<thead>
			<tr>
				<th><strong>STT</strong></th>
				<th><strong>Mã đơn hàng</strong></th>
				<th><strong>Người nhận</strong></th>
				<th><strong>SL SP</strong></th>
				<th><strong>Tổng thu</strong></th>
			</tr>
		</thead>
		<tbody>
            {#each tableData as tableRow, index}
                <tr>
                    <td class="text-center">{index + 1}</td>
                    <td>{tableRow.id}</td>
                    <td>{tableRow.phone} {tableRow.name}</td>
                    <td class="text-center">{tableRow.quantity}</td>
                    <td class="text-end">{tableRow.price}</td>
                </tr>
            {/each}
			<tr>
				<td class="text-end" colspan="3">Tổng</td>
				<td class="text-center">{totalQuantity()}</td>
				<td class="text-end">{totalPrice()}</td>
			</tr>
		</tbody>
	</table>
	<div class="w-full flex mt-4 h-40">
		<div class="box-sender w-[50%] text-center">
			<p class="mt-2">Người gửi</p>
			<p>(Ký và ghi rõ họ tên)</p>
		</div>
		<div class="box-receiver w-[50%] text-center">
			<p class="mt-2">Người nhận</p>
			<p>(Ký và ghi rõ họ tên)</p>
		</div>
	</div>
</div>

<style>
	.receipt-table, th, td {
		border: 1px solid black;
		border-collapse: collapse;
	}
	.receipt-table td, .receipt-table th {
		padding: 4px;
	}
	.box-sender {
		border: 1px solid black;
		border-right: none;
	}
	.box-receiver {
		border: 1px solid black;
	}
</style>
