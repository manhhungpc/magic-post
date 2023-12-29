<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import StaffsTable from 'src/components/table/StaffsTable.svelte';
	import StaffsModel from 'src/components/modal/StaffsModal.svelte';
	import type { PageData } from './$types';
	import Loading from 'src/components/Loading.svelte';
	import { debounce } from '$lib/debounce';
	import { goto } from '$app/navigation';

	export let data: PageData | any;
	let userId: string;
	function showStaffModal() {
		(document.getElementById('admin_new_staff') as any).showModal();
	}

	function onSearchUser() {
		if (!userId) goto(`/admin/staffs`);
		goto(`?userId=${userId}`);
	}
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách tài khoản trưởng điểm</h1>
		<button class="btn variant-filled bg-ocean" on:click={showStaffModal}>
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
		<StaffsModel id="admin_new_staff" />
	</div>
	<div class="card p-4 mb-3 !bg-[#fff]">
		<span class="mr-2">Tìm kiếm</span>
		<input
			type="text"
			placeholder="Nhập tên, mã nhân viên..."
			class="dui-input dui-input-bordered w-full max-w-xs !h-8"
			bind:value={userId}
			on:change={() => debounce(null, onSearchUser)}
		/>
	</div>
	<div class="card h-[calc(100%-7.5rem)]">
		{#await data.staffs.promise}
			<Loading message="Đang lấy dữ liệu mới nhất" />
		{:then staffs}
			<StaffsTable tableData={staffs.data.content} paginate={staffs.data.paginate} />
		{:catch err}
			<p>Error :(</p>
		{/await}
	</div>
</main>
