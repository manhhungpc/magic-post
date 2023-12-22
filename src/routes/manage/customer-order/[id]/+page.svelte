<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import Loading from 'src/components/Loading.svelte';
	import { Catergority } from 'src/utils/enum';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<div class="flex justify-between">
		<div class="flex gap-5 items-center">
			<a href="/manage/customer-order" class="btn-icon btn-icon-sm variant-filled">
				<ArrowLeft size="18" />
			</a>
			<p class="uppercase">Thông tin đơn đặt hàng</p>
		</div>
	</div>
	{#await data.streamed?.orders}
		<Loading message="Đang lấy dữ liệu mới nhất" />
	{:then orders}
		<div class="md:flex justify-between">
			<div class="card rounded-lg p-4 md:w-[49%] mt-4">
				<p class="text-xl font-bold">Thông tin người gửi</p>
				<hr class="my-2" />
				<div>
					<span><strong>Họ và tên người gửi: </strong></span>
					<span>{orders.data.senderCustomer.name}</span>
				</div>
				<div>
					<span><strong>Số điện thoại người gửi: </strong></span>
					<span>{orders.data.senderCustomer.phoneNo}</span>
				</div>
				<div>
					<span><strong>Địa chỉ người gửi: </strong></span>
					<span>{orders.data.senderCustomer.address}</span>
				</div>
			</div>

			<div class="card rounded-lg p-4 md:w-[49%] mt-4">
				<p class="text-xl font-bold">Thông tin người nhận</p>
				<hr class="my-2" />
				<div>
					<span><strong>Họ và tên người nhận: </strong></span>
					<span>{orders.data.receiverCustomer.name}</span>
				</div>
				<div>
					<span><strong>Số điện thoại người nhận: </strong></span>
					<span>{orders.data.receiverCustomer.phoneNo}</span>
				</div>
				<div>
					<span><strong>Địa chỉ người nhận: </strong></span>
					<span>{orders.data.receiverCustomer.address}</span>
				</div>
			</div>
		</div>

		<div class="md:flex justify-between">
			<div class="card rounded-lg p-4 mt-4 grow">
				<p class="text-xl font-bold">Thông tin đơn hàng</p>
				<hr class="my-2" />
				<div class="lg:flex">
					<div class="lg:w-[50%]">
						<div>
							<span><strong>Ngày tạo: </strong></span>
							<span>{new Date(orders.data.createAt).getDate()} -</span>
							<span>{new Date(orders.data.createAt).getMonth() + 1} -</span>
							<span>{new Date(orders.data.createAt).getFullYear()}</span>
						</div>
						<div>
							<span><strong>Loại hàng gửi: </strong></span>
							{#if orders.data.categority == Catergority.PACKAGE}
								<span>Hàng hóa</span>
							{:else}
								<span>Tài liệu</span>
							{/if}
						</div>
					</div>
					<div>
						<div>
							<span><strong>Khối lượng thực tế: </strong></span>
							<span>{orders.data.weight} kg</span>
						</div>
						<div>
							<span><strong>Tổng tiền: </strong></span>
							<span>{orders.data.mainCharge} vnđ</span>
						</div>
					</div>
				</div>
				<div>
					{#if orders.data.contextOrders}
						<p><strong>Nội dung trị giá bưu gửi:</strong></p>
						<table class="text-center w-full">
							<thead>
								<tr>
									<td><strong>Nội dung</strong></td>
									<td><strong>Số lượng</strong></td>
									<td><strong>Trị giá</strong></td>
									<td><strong>Giấy tờ đính kèm</strong></td>
								</tr>
							</thead>
							<tbody>
								{#each orders.data.contextOrders as orderData}
									<tr>
										<td>{orderData.context}</td>
										<td>{orderData.quantity}</td>
										<td>{orderData.value}</td>
										<td>{orderData.documentNo}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/if}
				</div>
				<a class="tracking-link" href="/tracking">Theo dõi đơn hàng</a>
			</div>

			<div class="card rounded-lg p-4 mt-4 md:ml-4">
				<p class="text-xl font-bold">QR Code</p>
				<hr class="my-2" />
				<img src={orders.data.urlQrCode} alt="urlQrCode" width="150" />
			</div>
		</div>
	{/await}
</main>

<style>
	td {
		border: 1px solid black;
	}
	thead {
		background-color: #eeeeee;
	}
	.tracking-link {
		color: rgb(59, 130, 246);
	}
</style>
