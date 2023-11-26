<script lang="ts">
	import { PencilLine, Trash2 } from 'lucide-svelte';
	import type { StaffsInteface } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';

	export let tableData: StaffsInteface[] = [];
</script>

<div class="table-container !rounded-b-none !rounded-md h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-white">
			<tr>
				<th>Mã nhân viên</th>
				<th>Họ tên</th>
				<th>Chức vụ</th>
				<th>Điểm quản lý</th>
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
					<tr>
						<td>{row.userId}</td>
						<td>{row.fullName}</td>
						<td>{row.role.name}</td>
						<td>{row.workAt ? row.workAt.name : 'Chưa có'}</td>
						<td class="flex items-center gap-3">
							<button type="button" class="btn-icon variant-filled h-8 w-8"><PencilLine size="16" /></button>
							<button type="button" class="btn-icon variant-filled h-8 w-8"><Trash2 size="16" /></button>
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
</style>
