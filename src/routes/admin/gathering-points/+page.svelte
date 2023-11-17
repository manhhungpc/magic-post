<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import StaffsModel from 'src/components/modal/StaffsModel.svelte';
	import type { OfficeTableInterface } from 'src/utils/interface';
	import OfficesTable from 'src/components/table/OfficesTable.svelte';

	let gatheringPoints: OfficeTableInterface[] = [
		{
			id: '1',
			name: 'Diem tap ket so 1',
			phone: '0123456789',
			address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội',
			manager: 'Nguyen Manh Hung'
		},
		{
			id: '2',
			name: 'Diem tap ket so 2',
			phone: '0987654321',
			address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội',
			manager: 'Pham Manh Phong'
		}
	];
	function createStaff() {
		// (document.getElementById('admin_new_staff') as any).showModal();
	}
	gatheringPoints = new Array(5).fill(gatheringPoints).flat();
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách tài khoản trưởng điểm</h1>
		<button class="btn variant-filled bg-ocean" on:click={createStaff}>
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
		<!-- <StaffsModel id="admin_new_staff" /> -->
	</div>
	<div class="card py-3 px-4 mb-3">
		<span class="mr-2">Tìm kiếm</span>
		<input type="text" placeholder="Nhập tên, mã nhân viên..." class="dui-input dui-input-bordered w-full max-w-xs" />
	</div>
	<div class="card !rounded-b-none h-[calc(100%-7.5rem)]">
		<OfficesTable tableData={gatheringPoints} officeType="tập kết" />
	</div>
</main>
