<script lang="ts">
	import { PencilLine, Trash2 } from 'lucide-svelte';
	import type { OfficesInterface } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';

	export let tableData: OfficesInterface[] = [];
	export let officeType: 'giao dịch' | 'tập kết';

	$: if (officeType == 'giao dịch') {
		tableData = tableData.map((td) => {
			return { ...td, gatheringPoint: 'Test' };
		});
	}
</script>

<div class="table-container !rounded-b-none !rounded-md h-full">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-[#fff]">
			<tr>
				<th>STT</th>

				<th>Mã điểm</th>
				<th>Tên điểm {officeType ? officeType : ''}</th>
				<th>SĐT liên lạc</th>
				<th>Trưởng điểm</th>
				<th>Địa chỉ</th>
				{#if officeType == 'giao dịch'}
					<th>Điểm tập kết liên kết</th>
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
					<tr>
						<td>{i + 1}</td>
						<td>{row.pointId}</td>
						<td>{row.name}</td>
						<td>{row.phoneNo}</td>
						<td>{row.admin ? row.admin.fullName : 'Không có'}</td>
						<td>{row.address}</td>
						{#if officeType == 'giao dịch'}
							<th>{row.gatheringPoint}</th>
						{/if}
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
