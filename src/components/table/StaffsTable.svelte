<script lang="ts">
	import { PencilLine, Trash2 } from 'lucide-svelte';
	import type { Paginate, StaffsInteface } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import StaffsModal from '../modal/StaffsModal.svelte';
	import DeleteConfirmModal from '../modal/DeleteConfirmModal.svelte';
	import { goto, invalidate } from '$app/navigation';
	import Paginator from '../Paginator.svelte';
	import type { PaginationSettings } from '@skeletonlabs/skeleton';

	export let tableData: StaffsInteface[] = [],
		paginate: Paginate;

	let paginationSettings = {
		page: paginate?.currentPage - 1,
		limit: paginate.perPage,
		size: paginate?.totalItems,
		amounts: [5, 10]
	} satisfies PaginationSettings;

	function openEditStaffModal(id: string) {
		(document.getElementById(id) as any).showModal();
	}

	function openDeleteStaffModal(id: string) {
		(document.getElementById(id) as any).showModal();
	}

	function onPageChange(e: CustomEvent): void {
		const pageSize = paginate.perPage;
		const pageNumber = e.detail + 1;
		// paginationSettings.page = e.detail + 1;

		goto(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
	}

	function onAmountChange(e: CustomEvent) {
		const pageSize = e.detail;
		const pageNumber = paginate.currentPage;
		paginationSettings.limit = pageSize;
		goto(`?pageSize=${pageSize}&pageNumber=${pageNumber}`);
	}

	async function deleteStaff(deleteId: string) {
		const response = await fetch(`/api/admin/staffs/${deleteId}`, {
			method: 'DELETE'
		});

		if (response.status == 200) {
			invalidate((url) => url.pathname.includes('/api/admin/staffs'));
		}
	}
</script>

<div class="table-container !rounded-md !rounded-b-none h-[calc(100%-3.5rem)] relative">
	<table class="table table-hover overflow-auto !bg-transparent" class:h-full={tableData.length == 0}>
		<thead class="!bg-white">
			<tr>
				<th>STT</th>
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
						<td>{i + 1}</td>
						<td>{row.userId}</td>
						<td>{row.fullName}</td>
						<td>{row.role.name}</td>
						<td>{row.workAt ? row.workAt.name : 'Chưa có'}</td>
						<td class="flex items-center gap-3">
							<button
								type="button"
								class="btn-icon variant-filled h-8 w-8"
								on:click={() => openEditStaffModal('edit-staff-' + row.userId)}
							>
								<PencilLine size="16" />
							</button>
							<StaffsModal id={'edit-staff-' + row.userId} staff={row} />
							<button
								type="button"
								class="btn-icon variant-filled h-8 w-8"
								on:click={() => {
									openDeleteStaffModal('delete-staff-' + row.userId);
								}}
							>
								<Trash2 size="16" />
							</button>
							<DeleteConfirmModal
								id={'delete-staff-' + row.userId}
								message={`Xóa trưởng điểm <b>${row.fullName}</b>?`}
								confirmAction={() => deleteStaff(row.id)}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}

		<tfoot />
	</table>
</div>
{#if tableData.length != 0}
	<Paginator {paginate} />
{/if}

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

	.btn-icon {
		background-color: #4784af;
	}

	:global(.paginator-select) {
		border-radius: 6px !important;
		padding: 2px 6px !important;
		min-width: 50px !important;
	}
</style>
