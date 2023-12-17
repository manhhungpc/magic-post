<script lang="ts">
	import { goto } from '$app/navigation';
	import { ArrowLeft, Eye, FilePlus2, PlusCircle } from 'lucide-svelte';
	import CustomerInfo from 'src/components/CustomerInfo.svelte';
	import DetailsOrder from 'src/components/DetailsOrder.svelte';
	import { Catergority } from 'src/utils/enum';
	import type { ContextOrders } from 'src/utils/interface';
	import Toastify from 'toastify-js';

	let orderContexts: ContextOrders[] = [{ context: undefined, quantity: 0, value: 0, documentNo: 0 }];
	let loading = false;

	function addOrderContent() {
		orderContexts = [...orderContexts, { context: '', quantity: 0, value: 0, documentNo: 0 }];
	}

	function removeOrderContent(i: number) {
		orderContexts.splice(i, 1);
		orderContexts = orderContexts;
	}

	let body = {
		categority: undefined,
		weight: 0,
		senderCustomer: {
			name: '',
			phoneNo: '',
			address: ''
		},
		receiverCustomer: {
			name: '',
			phoneNo: '',
			address: ''
		},
		contextOrders: []
	};

	async function createCustomerOrder() {
		loading = true;
		if (orderContexts.length >= 1 && orderContexts[0].context != undefined) {
			//@ts-ignore
			body.contextOrders = orderContexts;
		}

		const newOrder = await fetch('/api/orders/customer', {
			method: 'POST',
			body: JSON.stringify(body)
		}).then((res) => res.json());
		console.log('🚀 ~ file: +page.svelte:49 ~ createCustomerOrder ~ newOrder:', newOrder);

		loading = false;
		if (newOrder.status != 201) {
			Toastify({
				text: 'Tạo đơn không thành công! Lỗi: ' + newOrder.err,
				duration: 3000,
				close: true,
				gravity: 'top',
				position: 'right',
				stopOnFocus: true,
				style: {
					background: '#D41875'
				}
			}).showToast();
			return;
		}
		goto(`/invoice/${newOrder.data.id}`);
	}
</script>

<main>
	<div class="flex justify-between">
		<div class="flex gap-5 items-center">
			<a href="/manage/customer-order" class="btn-icon btn-icon-sm variant-filled">
				<ArrowLeft size="18" />
			</a>
			<p class="title uppercase font-vn">Tạo đơn đặt hàng mới</p>
		</div>

		<button type="button" class="btn variant-filled bg-[#2460E5]" on:click={createCustomerOrder} disabled={loading}>
			<FilePlus2 size="20" class="mr-2" />Lưu và in đơn hàng
			{#if loading}
				<span class="dui-loading dui-loading-spinner dui-loading-sm" />
			{/if}
		</button>
	</div>
	<div class="main-info">
		<div class="card rounded-lg p-4">
			<p class="text-xl font-bold">Thông tin người gửi</p>
			<hr class="my-2" />
			<CustomerInfo target="gửi" bind:customer={body.senderCustomer} />
		</div>
		<div class="card rounded-lg p-4">
			<p class="text-xl font-bold">Thông tin người nhận</p>
			<hr class="my-2" />
			<CustomerInfo target="nhận" bind:customer={body.receiverCustomer} />
		</div>
	</div>

	<div class="card rounded-lg p-4 mt-4">
		<p class="text-xl font-bold">Thông tin đơn hàng</p>
		<hr class="my-2" />

		<div class="mb-2">
			<label class="dui-label pb-1" for="type">
				<span class="dui-label-text">Loại hàng gửi</span>
			</label>
			<select
				name="type"
				required
				class="dui-select dui-select-sm dui-select-bordered w-full h-10"
				bind:value={body.categority}
			>
				<option value="" disabled selected hidden>---Chọn loại hàng gửi---</option>
				<option value={Catergority.DOCUMENT}>Tài liệu</option>
				<option value={Catergority.PACKAGE}>Hàng hóa</option>
			</select>
		</div>
		<div class="mb-2">
			<label class="dui-label pb-1" for="name">
				<span class="dui-label-text">Khối lượng thực tế (kg)</span>
			</label>
			<input
				type="number"
				step="any"
				name="name"
				placeholder="Nhập khối lượng"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={body.weight}
			/>
		</div>

		{#if body.categority == Catergority.PACKAGE}
			<label class="dui-label pb-1" for="name">
				<span class="dui-label-text">Nội dung giá trị bưu gửi</span>
			</label>
			{#each orderContexts as content, i}
				<DetailsOrder index={i} bind:content remove={() => removeOrderContent(i)} />
			{/each}

			<div class="dui-tooltip dui-tooltip-right" data-tip="Thêm nội dung">
				<button type="button" class="btn-icon w-max" on:click={addOrderContent}>
					<PlusCircle class="text-ocean" size="28" />
				</button>
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		padding-bottom: 60px;
	}

	.title {
		font-size: 22px;
		font-weight: 800;
		line-height: 28px;
	}

	.main-info {
		display: grid;
		grid-template-columns: auto auto;
		gap: 15px;
		margin-top: 16px;
	}

	select:invalid {
		color: #9ca3af;
	}

	select:focus {
		color: #000;
	}
</style>
