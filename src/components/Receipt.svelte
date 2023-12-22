<script lang="ts"></script>

<div class="bg-[#fff] p-4 my-4" style="width: 1000px">
	<div class="flex items-center justify-around">
		<span>
			<img src="/img/logo-new.png" alt="logo" class="h-16" />
		</span>
		<p class="uppercase text-lg">Biên bản bàn giao vận đơn (ID: 1007139). Ngày 01/07/2021</p>
	</div>
	<p class="text-end">Ngày giờ in: 20/07/2021 17:18:53</p>
	<p class="ml-2"><strong>Cửa hàng: </strong>Kho 1 - Hiếu</p>
	<p class="ml-2"><strong>Ghi chú: </strong>tutut</p>
    <table class="receipt-table w-full">
        <thead>
            <tr>
                <th><strong>STT</strong></th>
                <th><strong>STT đơn theo ngày</strong></th>
                <th><strong>ID</strong></th>
                <th><strong>MÃ HVC</strong></th>
                <th><strong>Người nhận</strong></th>
                <th><strong>SL SP</strong></th>
                <th><strong>Tổng thu</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-center">1</td>
                <td>[2] Thành công</td>
                <td>107518224</td>
                <td></td>
                <td>0247075198 Phạm Ngọc Cường</td>
                <td class="text-end">1</td>
                <td class="text-end">100.000</td>
            </tr>
            <tr>
                <td class="text-center">1</td>
                <td>[2] Thành công</td>
                <td>107518224</td>
                <td></td>
                <td>0247075198 Phạm Ngọc Cường</td>
                <td class="text-end">1</td>
                <td class="text-end">100.000</td>
            </tr>
            <tr>
                <td class="text-end" colspan="5">Tổng</td>
                <td class="text-end">2</td>
                <td class="text-end">200.000</td>
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
