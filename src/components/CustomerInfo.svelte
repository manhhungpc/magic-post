<script lang="ts">
	import AutocompleteAddress from './AutocompleteAddress.svelte';
	import AutocompleteAddressV2 from './AutocompleteAddressV2.svelte';

	export let target: 'gửi' | 'nhận';
	export let customer: {
		name: string;
		phoneNo: string;
		address: string;
	};

	let fullAddress = '';
</script>

<div class="mb-3">
	<label class="dui-label pb-1" for="name">
		<span class="dui-label-text required-label">Họ và tên người {target}</span>
	</label>
	<input
		type="text"
		name="name"
		placeholder="Họ tên người {target}"
		class="dui-input h-10 dui-input-bordered w-full"
		bind:value={customer.name}
	/>
</div>

<div class="mb-3">
	<label class="dui-label pb-1" for="phone">
		<span class="dui-label-text required-label">Số điện thoại người {target}</span>
	</label>
	<input
		type="text"
		name="phone"
		placeholder="Số điện thoại người {target}"
		class="dui-input h-10 dui-input-bordered w-full"
		bind:value={customer.phoneNo}
	/>
</div>

<div class="w-full mb-3">
	<label class="dui-label pb-1" for="address">
		<span class="dui-label-text required-label">Địa chỉ người {target}</span>
	</label>
	<AutocompleteAddressV2 bind:address={customer.address} {fullAddress} />
</div>
