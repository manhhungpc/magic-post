<script lang="ts">
	import { PencilLine, Trash2 } from 'lucide-svelte';
	import type { OfficesInterface, Paginate } from 'src/utils/interface';
	import EmptyData from '../EmptyData.svelte';
	import OfficeModal from '../modal/OfficeModal.svelte';
	import DeleteConfirmModal from '../modal/DeleteConfirmModal.svelte';
	import { goto, invalidate } from '$app/navigation';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	export let tableData: OfficesInterface[] = [],
		paginate: Paginate;
	export let officeType: 'giao dịch' | 'tập kết' | 'toàn bộ';

	let paginationSettings = {
		page: paginate?.currentPage - 1,
		limit: paginate.perPage,
		size: paginate?.totalItems,
		amounts: [5, 10]
	} satisfies PaginationSettings;

	async function showEditOfficeModal(modalId: string, officeId: string) {
		(document.getElementById(modalId) as any).showModal();
	}

	function showDeleteOfficeModal(modalId: string) {
		(document.getElementById(modalId) as any).showModal();
	}

	async function deleteOffice(deleteId: string) {
		const response = await fetch(`/api/admin/offices/${deleteId}`, {
			method: 'DELETE'
		});

		if (response.status == 200) {
			invalidate((url) => url.pathname.includes('/api/admin/offices'));
		}
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
</script>

<div class="table-container !rounded-b-none !rounded-md h-[calc(100%-3.5rem)]">
	<table class="table table-hover overflow-auto !bg-transparent !rounded-none" class:h-full={tableData.length == 0}>
		<thead class="!bg-[#fff]">
			<tr>
				<th>STT</th>
				<th>Mã điểm</th>
				{#if officeType == 'toàn bộ'}
					<th>Loại điểm</th>
				{/if}
				<th>Tên điểm {officeType != 'toàn bộ' ? officeType : ''}</th>
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
						{#if officeType == 'toàn bộ'}
							<td>{row.typePoint == 'GP' ? 'Tập kết' : 'Giao dịch'}</td>
						{/if}
						<td>{row.name}</td>
						<td>{row.phoneNo}</td>
						<td>{row.admin ? row.admin.fullName : 'Không có'}</td>
						<td>{row.address}</td>
						{#if officeType == 'giao dịch'}
							<td>{row.gatheringPoint?.name}</td>
						{/if}
						<td class="flex items-center gap-3">
							<button
								type="button"
								class="btn-icon variant-filled h-8 w-8"
								on:click={() => showEditOfficeModal('edit-office' + row.pointId, row.id)}
							>
								<PencilLine size="16" />
							</button>
							<OfficeModal id={'edit-office' + row.pointId} officeData={row} />
							<button
								type="button"
								class="btn-icon variant-filled h-8 w-8"
								on:click={() => showDeleteOfficeModal('delete-office' + row.pointId)}
							>
								<Trash2 size="16" />
							</button>
							<DeleteConfirmModal
								id={'delete-office' + row.pointId}
								message={`Xác nhận xóa <b>${row.name}</b>?`}
								confirmAction={() => deleteOffice(row.id)}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		{/if}
		<tfoot />
	</table>
</div>
<div class="px-3 flex items-center gap-3 bg-[#fff] h-14 w-full rounded-b-md">
	<span class=" whitespace-nowrap">Số hàng trên trang : </span>
	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		showPreviousNextButtons={true}
		class="w-full bg-[#fff]"
		amountText=""
		showNumerals
		maxNumerals={1}
		buttonClasses="!px-3 !py-1.5 fill-current hover:fill-primary-500"
	/>
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

	.btn-icon {
		background-color: #4784af;
	}

	:global(.paginator-select) {
		border-radius: 6px;
		padding: 2px 6px;
		min-width: 50px;
	}
</style>
