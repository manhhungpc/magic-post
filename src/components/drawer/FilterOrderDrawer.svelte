<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { Catergority, OrderMsgStatus, OrderStatus } from 'src/utils/enum';
	import { onMount } from 'svelte';

	const drawerStore = getDrawerStore();
	let request: {
		type: Catergority;
		status: OrderStatus;
		sender: string;
		receiver: string;
		address: string;
		fromDate: Date;
		toDate: Date;
	};

	onMount(() => {
		// console.log('Mount drawer');
	});
</script>

<main class="flex flex-col justify-center items-center h-full relative">
	<p class="h4 font-bold py-2">Bộ lọc</p>
	<button
		class="dui-btn dui-btn-sm dui-btn-square dui-btn-ghost absolute right-2 top-2"
		on:click={() => drawerStore.close()}>✕</button
	>
	<div class="dui-divider m-0" />
	<div class="grid grid-cols-2 gap-3 w-full px-5">
		<div>
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Loại hàng</span>
			</label>
			<select
				name="type"
				required
				class="dui-select dui-select-sm dui-select-bordered w-full h-10"
				bind:value={request.type}
			>
				<option value="" disabled selected hidden>Chọn loại hàng gửi</option>
				<option value={Catergority.DOCUMENT}>Tài liệu</option>
				<option value={Catergority.PACKAGE}>Hàng gửi</option>
			</select>
		</div>

		<div>
			<label class="dui-label pb-1" for="status">
				<span class="dui-label-text">Trạng thái</span>
			</label>
			<select
				name="type"
				required
				class="dui-select dui-select-sm dui-select-bordered w-full h-10"
				bind:value={request.status}
			>
				<option value="" disabled selected hidden>Chọn trạng thái</option>
				{#each Object.values(OrderMsgStatus) as msg, i}
					<option value={i}>{msg}</option>
				{/each}
			</select>
		</div>
		<div>
			<label class="dui-label pb-1" for="sender">
				<span class="dui-label-text">Tên người gửi</span>
			</label>
			<input
				type="text"
				name="sender"
				placeholder="Nhập tên người gửi"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={request.sender}
			/>
		</div>
		<div>
			<label class="dui-label pb-1" for="receiver ">
				<span class="dui-label-text">Tên người nhận</span>
			</label>
			<input
				type="text"
				name="sender"
				placeholder="Nhập tên người nhận"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={request.receiver}
			/>
		</div>
		<div>
			<label class="dui-label pb-1" for="address">
				<span class="dui-label-text">Địa chỉ (người gửi, người nhận, gói hàng)</span>
			</label>
			<input
				type="text"
				name="sender"
				placeholder="Nhập địa chỉ"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={request.address}
			/>
		</div>
		<div>
			<label class="dui-label pb-1" for="date">
				<span class="dui-label-text">Thời gian tạo</span>
			</label>
			<div class="flex items-center gap-2">
				<input type="date" name="date" class="dui-input h-10 dui-input-bordered w-full" bind:value={request.fromDate} />
				-
				<input type="date" name="date" class="dui-input h-10 dui-input-bordered w-full" bind:value={request.toDate} />
			</div>
		</div>
	</div>

	<div class="flex-1" />
	<div class="dui-divider m-0" />
	<div class="flex justify-between w-full px-5 pb-3 pt-1">
		<button class="btn variant-outline-tertiary bg-surface-50"> Thiết lập lại bộ lọc </button>
		<div>
			<button class="btn variant-outline-tertiary hover:text-primary-500 hover:variant-outline-error"> Hủy bỏ </button>
			<button class="btn variant-filled bg-primary-600 ml-2"> Lọc </button>
		</div>
	</div>
</main>
