<script lang="ts">
	import { PlusCircle } from 'lucide-svelte';
	import OfficesTable from 'src/components/table/OfficesTable.svelte';
	import OfficeModal from 'src/components/modal/OfficeModal.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;
	console.log('🚀 ~ file: +page.svelte:9 ~ data:', data);
	let officeType: 'giao dịch' | 'tập kết' = 'tập kết';

	function showOfficeModal() {
		(document.getElementById('new_office_modal') as any).showModal();
	}

	$: {
		if (officeType == 'tập kết') {
			goto('?type=GP');
		}
		if (officeType == 'giao dịch') {
			goto('?type=TP');
		}
	}
</script>

<main class="h-full">
	<div class="flex justify-between items-center mb-3">
		<h1 class="h3 uppercase">Danh sách điểm tập kết - điểm giao dịch</h1>
		<button class="btn variant-filled bg-ocean" on:click={showOfficeModal}>
			<PlusCircle class="mr-1" size="20" /> Thêm mới
		</button>
		<OfficeModal id="new_office_modal" leaderData={data.staffs.data} />
	</div>
	<div class="card p-4 mb-3 grid grid-cols-3 gap-10 !bg-[#fff]">
		<div class="flex items-center">
			<span class="mr-2 min-w-max">Tìm kiếm</span>
			<input
				type="text"
				placeholder="Nhập tên, mã nhân viên..."
				class="dui-input dui-input-bordered !h-8 w-full max-w-xs"
			/>
		</div>
		<div class="flex items-center">
			<span class="mr-2 min-w-max">Loại điểm</span>
			<select
				name="type"
				required
				class="dui-select dui-select-sm dui-select-bordered w-full !h-8"
				bind:value={officeType}
			>
				<option value="giao dịch">Điểm giao dịch</option>
				<option value="tập kết">Điểm tập kết</option>
			</select>
		</div>
	</div>
	{#await data.offices}
		loading...
	{:then offices}
		<div class="card !rounded-b-none h-[calc(100%-7.5rem)]">
			<OfficesTable tableData={offices.data} {officeType} />
		</div>
	{/await}
</main>

<style>
	select:invalid {
		color: #9ca3af;
	}

	select:focus {
		color: #000;
	}
</style>
