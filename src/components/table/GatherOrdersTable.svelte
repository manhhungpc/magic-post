<script lang="ts">
	import { ArrowsUpFromLine, PencilLine, Trash2 } from 'lucide-svelte';
	import type { GatherOrderInteface } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';

	export let tableData: GatherOrderInteface[] = [];

	let checkAll: boolean = false,
		checkedOrder: boolean[] = [];

	function selectAllRow() {
		if (checkAll) {
			checkedOrder = new Array(tableData.length).fill(true);
		} else {
			checkedOrder = new Array(tableData.length).fill(false);
		}
	}
</script>

<div class="table-container !rounded-none h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-white relative z-10">
			<tr>
				<th>
					<input
						class="dui-checkbox dui-checkbox-primary dui-checkbox-sm rounded-sm border-[#000]"
						type="checkbox"
						bind:checked={checkAll}
						on:change={selectAllRow}
					/>
				</th>
				<th>STT</th>
				<th>Mã đơn hàng</th>
				<th>Điểm giao dịch</th>
				<th>Trạng thái</th>
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
					<tr class:row-selected={checkedOrder[i] == true}>
						<td>
							<input
								class="dui-checkbox dui-checkbox-primary dui-checkbox-sm rounded-sm border-[#000]"
								type="checkbox"
								bind:checked={checkedOrder[i]}
								on:change={() => {
									if (checkedOrder[i] == false && checkAll == true) checkAll = false;
								}}
							/>
						</td>
						<td>{i + 1}</td>
						<td>{row.orderId}</td>
						<td>{row.address}</td>
						<td>
							<div class=" p-1 bg-greenNew-600 w-min rounded text-[#fff]">Mới</div>
						</td>
						<td class="flex items-center gap-3">
							<button type="button" class="btn-icon variant-filled h-8 w-8"><PencilLine size="16" /></button>
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
