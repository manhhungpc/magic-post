<script lang="ts">
	import { goto } from '$app/navigation';
	import { Eye, PackagePlus, Printer } from 'lucide-svelte';
	import { Catergority } from 'src/utils/enum';
	import type { Order } from 'src/utils/interface';

	export let orderData: Order, id: string;

	let checked = false;
</script>

<div class="card w-full mb-1 !rounded-sm" class:!bg-primary-100={checked}>
	<div class="p-4 pb-3 grid grid-cols-2 gap-2">
		<div class="flex items-start gap-1">
			<input
				class="dui-checkbox dui-checkbox-primary dui-checkbox-sm rounded-sm border-[#000]"
				type="checkbox"
				bind:checked
				on:change
			/>
			<b>Mã đơn: &nbsp;</b>
			<span class="text-primary-400">
				{orderData.orderId}
			</span>
		</div>
		<div class="flex justify-end gap-3">
			<div class="dui-tooltip dui-tooltip-bottom" data-tip="Xem chi tiết">
				<button
					type="button"
					class="btn-icon bg-orange variant-filled h-8 w-8"
					on:click={() => goto(`/manage/customer-order/${id}`)}
				>
					<Eye size="16" />
				</button>
			</div>
			<div class="dui-tooltip dui-tooltip-bottom before:-left-full" data-tip="In giấy biên nhận">
				<button
					type="button"
					class="btn-icon dui-btn-outline dui-btn-secondary border border-orange h-8 w-8"
					on:click={() => goto(`/invoice/${id}`)}
				>
					<Printer size="16" />
				</button>
			</div>
		</div>

		<div class="flex gap-1" style="border-right: 1px solid #a3a3a3;">
			<b>Trạng thái:</b>

			<span class="flex items-center gap-1 text-greenNew">Mới <PackagePlus size={18} /></span>
		</div>

		<div class="grid grid-cols-2">
			<span>
				<b>Loại:</b>
				{orderData.categority == Catergority.DOCUMENT ? 'Tài liệu' : 'Hàng hóa'}
			</span>
			<div>
				<b>Cước phí: </b>
				{orderData.mainCharge} ₫
			</div>
		</div>

		<div style="border-right: 1px solid #a3a3a3;">
			<b>Người gửi:</b>
			<p>{orderData.senderCustomer.name} &nbsp; (<b>SĐT: &nbsp;</b>{orderData.senderCustomer.phoneNo})</p>
			<p>{orderData.senderCustomer.address}</p>
		</div>
		<div>
			<b>Người nhận:</b>
			<p>{orderData.receiverCustomer.name} &nbsp; (<b>SĐT: &nbsp;</b>{orderData.receiverCustomer.phoneNo})</p>
			<p>{orderData.receiverCustomer.address}</p>
		</div>
	</div>
	<div class="trail-dash" />
</div>

<style>
	.card:hover .trail-dash {
		visibility: visible;
	}
	.trail-dash {
		visibility: hidden;
		height: 0.1875rem;
		width: 100%;
		background-position-x: -1.875rem;
		background-size: 7.25rem 0.1875rem;
		background-image: repeating-linear-gradient(
			45deg,
			#6fa6d6,
			#6fa6d6 33px,
			transparent 0,
			transparent 41px,
			#f18d9b 0,
			#f18d9b 74px,
			transparent 0,
			transparent 82px
		);
	}
</style>
