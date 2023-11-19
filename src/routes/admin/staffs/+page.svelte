<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import StaffsTable from 'src/components/table/StaffsTable.svelte';
	import StaffsModel from 'src/components/modal/StaffsModel.svelte';
	import type { StaffTableInteface } from 'src/utils/interface';

	let staffs: StaffTableInteface[] = [
		{
			id: '1',
			name: 'Pham Cong Manh Hung',
			role: 'Trưởng điểm tập kết',
			address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội'
		},
		{
			id: '2',
			name: 'Nguyen Xuan Phong',
			role: 'Trưởng điểm giao dịch',
			address: '23 Ngõ 58 Phố Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội'
		}
	];
	function createStaff() {
		(document.getElementById('admin_new_staff') as any).showModal();
	}
	staffs = new Array(5).fill(staffs).flat();
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách tài khoản trưởng điểm</h1>
		<button class="btn variant-filled bg-ocean" on:click={createStaff}>
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
		<StaffsModel id="admin_new_staff" />
	</div>
	<div class="card py-3 px-4 mb-3">
		<span class="mr-2">Tìm kiếm</span>
		<input type="text" placeholder="Nhập tên, mã nhân viên..." class="dui-input dui-input-bordered w-full max-w-xs" />
	</div>
	<div class="card !rounded-b-none h-[calc(100%-7.5rem)]">
		<StaffsTable tableData={staffs} />
	</div>
</main>
