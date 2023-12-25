<script lang="ts">
	import { CheckCircle, Eye } from 'lucide-svelte';
	import type { Order, Paginate } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import { Catergority, OrderStatus, OrderType } from 'src/utils/enum';
	import { goto } from '$app/navigation';
	import Paginator from '../Paginator.svelte';
	import Toastify from 'toastify-js';
	import { lastRoute } from 'src/utils/stores';
	import { page } from '$app/stores';

	export let tableData: Order[] = [],
		paginate: Paginate,
		checkedOrders: Set<any>;

	// console.log('🚀 ~ file: ProcessingOrdersTable.svelte:11 ~ tableData:', tableData);
	let checks: boolean[] = [],
		status = OrderStatus.PROCESSING;
	let loading = false,
		error: string;

	$: console.log(status);
	async function onNextProcess(uuid: string) {
		loading = true;
		console.log([uuid]);
		const response = await fetch(`/api/orders/delivery`, {
			method: 'POST',
			body: JSON.stringify({
				orderIds: [uuid],
				deliveryStatus: status
			})
		}).then((res) => res.json());

		loading = false;
		if (response.status != 200) {
			error = response.error ?? 'Unknow error!';
			Toastify({
				text: error,
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'right',
				stopOnFocus: true,
				style: {
					background: '#D41875'
				}
			}).showToast();
			return;
		}

		Toastify({
			text: 'Xác nhận thành công!',
			duration: 3000,
			close: true,
			gravity: 'top',
			position: 'right',
			stopOnFocus: true,
			style: {
				background: '#0FBA81'
			}
		}).showToast();
		checkedOrders = new Set();
		goto(`?typeOrder=${OrderType.DELIVERY}&deliveryStatus=${OrderStatus.COMPLETED}`);
	}
</script>

<div class="table-container !rounded-none h-full overflow-x-hidden">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-white relative z-10">
			<tr>
				<th class="table-cell-fit">STT</th>
				<th>Mã đơn hàng</th>
				<th>Loại hàng</th>
				<th>Cước phí</th>
				<th>Địa chỉ người nhận</th>
				<th class="table-cell-fit">Trạng thái</th>
				<th>Thao tác</th>
			</tr>
		</thead>
		{#if tableData.length == 0}
			<tbody class="h-full relative">
				<EmptyData css="absolute top-1/4" message="Không có dữ liệu!" />
			</tbody>
		{:else}
			<tbody>
				{#each tableData as row, i}
					<tr class:row-selected={checks[i] == true}>
						<td class="table-cell-fit">{i + 1}</td>
						<td>{row.orderId}</td>
						<td>{row.categority == Catergority.DOCUMENT ? 'Tài liệu' : 'Hàng hóa'}</td>
						<td>{row.mainCharge.toLocaleString()}</td>
						<td>
							{row.receiverCustomer.address}
						</td>
						<td class="table-cell-fit">
							<select
								class="dui-select dui-select-sm dui-select-bordered dui-select-ghost font-bold"
								bind:value={status}
							>
								<option value={OrderStatus.PROCESSING} selected>Đang giao</option>
								<option class="text-greenNew" value={OrderStatus.SUCCESS_DELIVERY}>Giao thành công</option>
								<option class="text-fail" value={OrderStatus.FAILED_DELIVERY}>Giao không thành công</option>
							</select>
						</td>
						<td class="flex items-center gap-3">
							<button
								type="button"
								class="btn-icon variant-filled-primary h-8 w-8"
								on:click={() => {
									lastRoute.set($page.url.href);
									goto(`/manage/orders/${row.id}`);
								}}
							>
								<Eye size="16" />
							</button>
							<div class="dui-tooltip dui-tooltip-bottom" data-tip="Xác nhận hoàn thành đơn hàng">
								<button
									type="button"
									disabled={status == OrderStatus.PROCESSING}
									class="btn-icon variant-filled bg-ocean h-8 w-8"
									on:click={() => onNextProcess(row.id)}
								>
									<CheckCircle size="16" />
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
		<tfoot />
	</table>
</div>
<Paginator {paginate} />

<style>
	thead th {
		position: sticky;
		top: 0;
		background-color: #fff;
		text-transform: none;
	}

	.table tbody td {
		padding-left: 1rem;
		vertical-align: middle;
	}

	.dui-tooltip:before {
		left: -200%;
	}

	.row-selected {
		@apply bg-primary-100;
	}

	.row-selected:hover {
		@apply bg-primary-200;
	}

	.dui-select > option {
		font-weight: 700;
	}
</style>
