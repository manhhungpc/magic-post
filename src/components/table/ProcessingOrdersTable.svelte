<script lang="ts">
	import { ArrowsUpFromLine, Eye, PencilLine, Trash2 } from 'lucide-svelte';
	import type { Order, Paginate } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import { Catergority } from 'src/utils/enum';
	import { formatDate } from 'src/utils/helper';
	import { goto } from '$app/navigation';
	import Paginator from '../Paginator.svelte';

	export let tableData: Order[] = [],
		paginate: Paginate,
		checkedOrders: Set<any>;

	let checkAll: boolean = false,
		checks: boolean[] = [];

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
								on:click={() => goto(`/manage/customer-order/${row.orderId}`)}
							>
								<Eye size="16" />
							</button>
							<div class="dui-tooltip dui-tooltip-bottom" data-tip="Đơn giao dịch mới">
								<button type="button" class="btn-icon variant-filled bg-ocean h-8 w-8">
									<ArrowsUpFromLine size="16" />
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
