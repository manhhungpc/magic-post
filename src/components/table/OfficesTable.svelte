<script lang="ts">
	import { PencilLine, Trash2 } from 'lucide-svelte';
	import type { OfficeTableInterface } from 'src/utils/interface';

	export let tableData: OfficeTableInterface[] = [];
	export let officeType: 'giao dịch' | 'tập kết';
</script>

<div class="table-container !rounded-none h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none">
		<thead class="!bg-white">
			<tr>
				<th>Mã điểm</th>
				<th>Tên điểm {officeType}</th>
				<th>SĐT liên lạc</th>
				<th>Trưởng điểm</th>
				<th>Địa chỉ</th>
				{#if officeType == 'giao dịch'}
					<th>Điểm tập kết liên kết</th>
				{/if}
				<th>Thao tác</th>
			</tr>
		</thead>
		<tbody>
			{#each tableData as row, i}
				<tr>
					<td>{row.id}</td>
					<td>{row.name}</td>
					<td>{row.phone}</td>
					<td>{row.manager}</td>
					<td>{row.address}</td>
					<td class="flex items-center gap-3">
						<button type="button" class="btn-icon variant-filled h-8 w-8"><PencilLine size="16" /></button>
						<button type="button" class="btn-icon variant-filled h-8 w-8"><Trash2 size="16" /></button>
					</td>
				</tr>
			{/each}
		</tbody>
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
</style>