<script lang="ts">
	import { CheckCircle, Eye, Info } from 'lucide-svelte';
	import type { Order, Paginate } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import { Catergority, OrderStatus, OrderType } from 'src/utils/enum';
	import { formatDate } from 'src/utils/helper';
	import { goto } from '$app/navigation';
	import Paginator from '../Paginator.svelte';
	import Toastify from 'toastify-js';
	import { page } from '$app/stores';
	import { lastRoute } from 'src/utils/stores';

	export let tableData: Order[] = [],
		paginate: Paginate,
		checkedOrders: Set<any>;
	export let showGPColumn = false;
	export let tooltip = 'Xác nhận đã nhận';

	let checkAll: boolean = false,
		checks: boolean[] = [];
	let loading = false,
		loadingIndex = 0,
		error: string;

	function selectAllRow() {
		if (checkAll) {
			checks = new Array(tableData.length).fill(true);
			checkedOrders = new Set(tableData.map((td) => td.orderId));
		} else {
			checks = new Array(tableData.length).fill(false);
			checkedOrders = new Set();
		}
	}

	function onSelectOrder(i: number, row: Order) {
		if (checks[i] == true) checkedOrders.add(row.id);
		else checkedOrders.delete(row.id);
		checkedOrders = checkedOrders;
		if (checks.every((v) => v == true) && checks.length == tableData.length) checkAll = true;
		if (checks[i] == false && checkAll == true) checkAll = false;
	}

	async function onNextProcess(uuid: string, index: number) {
		loading = true;
		loadingIndex = index;
		const response = await fetch(`/api/orders/delivery`, {
			method: 'POST',
			body: JSON.stringify({
				orderIds: [uuid]
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
		if ($page.url.search == `?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.PROCESSING}`) {
			goto(`?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.CREATE_SEND}`);
			return;
		}
		goto(`?typeOrder=${OrderType.TRANSACTION}&deliveryStatus=${OrderStatus.PROCESSING}`);
	}
</script>

<div class="table-container !rounded-none h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-white relative z-10">
			<tr>
				<th class="table-cell-fit">
					<div class="flex items-center gap-2">STT</div>
				</th>
				<th>Mã đơn hàng</th>
				<th>Loại hàng</th>
				<th>Cước phí</th>
				<th>Từ điểm GD</th>
				{#if showGPColumn}
					<th>Điểm TK đích</th>
				{:else}
					<th>Ngày tạo</th>
				{/if}
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
						<td class="flex items-center gap-3 table-cell-fit">
							{i + 1}
						</td>
						<td>{row.orderId}</td>
						<td>{row.categority == Catergority.DOCUMENT ? 'Tài liệu' : 'Hàng hóa'}</td>
						<td>{row.mainCharge.toLocaleString()}</td>
						<td>
							<div class="dui-dropdown dui-dropdown-hover dui-dropdown-bottom">
								<div tabindex="0" role="button">
									<span class="text-link flex items-center gap-1">
										{row.orderDelivery.fromLocation.name}
										<Info size={18} />
									</span>
								</div>
								<ul class="dui-dropdown-content z-[5] dui-menu p-3 shadow bg-base-100 rounded-lg w-96 text-[#000]">
									<div class="mb-2"><b>Mã điểm:</b> {row.orderDelivery.fromLocation.pointId}</div>
									<div class="mb-2"><b>SĐT:</b> {row.orderDelivery.fromLocation.phoneNo}</div>
									<div><b>Địa chỉ:</b> {row.orderDelivery.fromLocation.address}</div>
								</ul>
							</div>
						</td>
						{#if showGPColumn}
							<td>
								<div class="dui-dropdown dui-dropdown-hover dui-dropdown-bottom">
									<div tabindex="0" role="button">
										<span class="text-link flex items-center gap-1">
											{row.orderDelivery.toLocation.name}
											<Info size={18} />
										</span>
									</div>
									<ul class="dui-dropdown-content z-[5] dui-menu p-3 shadow bg-base-100 rounded-lg w-80 text-[#000]">
										<div class="mb-2"><b>Mã điểm:</b> {row.orderDelivery.toLocation.pointId}</div>
										<div class="mb-2"><b>SĐT:</b> {row.orderDelivery.toLocation.phoneNo}</div>
										<div><b>Địa chỉ:</b> {row.orderDelivery.toLocation.address}</div>
									</ul>
								</div>
							</td>
						{:else}
							<td>
								{formatDate(row.createAt)}
							</td>
						{/if}
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
							<div class="dui-tooltip dui-tooltip-bottom" data-tip={tooltip}>
								<button
									type="button"
									class="btn-icon variant-filled bg-greenNew h-8 w-8"
									on:click={() => onNextProcess(row.id, i)}
									disabled={loading}
								>
									{#if loading && loadingIndex == i}
										<span class="dui-loading dui-loading-spinner dui-loading-sm" />
									{:else}
										<CheckCircle size="16" />
									{/if}
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
		left: -100%;
	}

	.row-selected {
		@apply bg-primary-100;
	}

	.row-selected:hover {
		@apply bg-primary-200;
	}
</style>
