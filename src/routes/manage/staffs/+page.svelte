<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import Loading from 'src/components/Loading.svelte';
	import StaffsModal from 'src/components/modal/StaffsModal.svelte';
	import StaffsTable from 'src/components/table/StaffsTable.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { mergeQueries } from 'src/utils/helper';
	import { debounce } from 'src/lib/debounce';

	export let data: PageData;

	let userId: string;

	function searchUserId() {
		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		const newQuery = mergeQueries(currentQuery, new URLSearchParams({ userId }));
		goto(`?${newQuery}`);
	}

	function showStaffModal() {
		(document.getElementById('manager_new_staff') as any).showModal();
	}
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách tài khoản nhân viên</h1>
		<button class="btn variant-filled bg-ocean" on:click={showStaffModal}>
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
		<StaffsModal id="manager_new_staff" title="nhân viên" showSelectRole={false} />
	</div>
	<div class="card p-4 mb-3 !bg-[#fff]">
		<span class="mr-2">Tìm kiếm</span>
		<input
			type="text"
			placeholder="Nhập mã nhân viên..."
			class="dui-input dui-input-bordered w-full max-w-xs !h-8"
			bind:value={userId}
			on:input={() => debounce(null, searchUserId)}
		/>
	</div>
	<div class="card !rounded-b-none h-[calc(100%-7.5rem)]">
		{#await data.streamed?.staffs}
			<Loading message="Đang lấy dữ liệu mới nhất" />
		{:then staffs}
			<StaffsTable tableData={staffs.data.content} paginate={staffs.data.paginate} />
		{:catch err}
			<p>Error :/</p>
		{/await}
	</div>
</main>
