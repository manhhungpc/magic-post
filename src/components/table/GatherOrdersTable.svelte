<script lang="ts">
	import { ArrowsUpFromLine, ClipboardCheck, Eye, PencilLine, Trash2 } from 'lucide-svelte';
	import type { Order } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import { Catergority, OrderStatus, OrderType } from 'src/utils/enum';
	import { formatDate } from 'src/utils/helper';
	import { goto, invalidate } from '$app/navigation';
	import Toastify from 'toastify-js';
	import { page } from '$app/stores';

	export let tableData: Order[] = [],
		checkedOrders: Set<any>;

	let checkAll: boolean = false,
		checks: boolean[] = [];
	let loading = false,
		error: string;

	function selectAllRow() {
		if (checkAll) {
			checks = new Array(tableData.length).fill(true);
			checkedOrders = new Set(tableData.map((td) => td.id));
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

	async function onNextProcess(uuid: string) {
		loading = true;
		console.log('🚀 ~ file: GatherOrdersTable.svelte:39 ~ onNextProcess ~ loading:', [uuid]);
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
		//đi đên đơn in biên lai xác nhận
		if ($page.url.search == `?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.CONFIRM_RECEIVE}`) {
			goto(`?typeOrder=${OrderType.GATHERING}&deliveryStatus=${OrderStatus.PROCESSING}`);
			return;
		}
		goto('/manage/delivery');
	}
</script>

<div class="table-container !rounded-none h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-white relative z-10">
			<tr>
				<th class="flex items-center gap-3">
					<input
						class="dui-checkbox dui-checkbox-primary dui-checkbox-sm rounded-sm border-[#000]"
						type="checkbox"
						bind:checked={checkAll}
						on:change={selectAllRow}
					/>
					STT
				</th>
				<th>Mã đơn hàng</th>
				<th>Loại hàng</th>
				<th>Cước phí</th>
				<th>Ngày tạo</th>
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
						<td class="flex items-center gap-3">
							<input
								class="dui-checkbox dui-checkbox-primary dui-checkbox-sm rounded-sm border-[#000]"
								type="checkbox"
								bind:checked={checks[i]}
								on:change={() => onSelectOrder(i, row)}
							/>
							{i + 1}
						</td>
						<td>{row.orderId}</td>
						<td>{row.categority == Catergority.DOCUMENT ? 'Tài liệu' : 'Hàng hóa'}</td>
						<td>{row.mainCharge.toLocaleString()}</td>
						<td>
							{formatDate(row.createAt)}
						</td>
						<td class="flex items-center gap-3">
							<button
								type="button"
								class="btn-icon variant-filled h-8 w-8"
								on:click={() => goto(`/manage/orders/${row.id}`)}
							>
								<Eye size="16" />
							</button>
							<div class="dui-tooltip dui-tooltip-bottom" data-tip="Tạo đơn chuyển hàng">
								<button
									type="button"
									class="btn-icon variant-filled bg-primary-500 h-8 w-8"
									on:click={() => onNextProcess(row.id)}
								>
									<ClipboardCheck size="16" />
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
