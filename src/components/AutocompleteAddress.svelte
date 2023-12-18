<script lang="ts">
	import { LocationDepth } from 'src/utils/enum';
	import type { LocationSchema, OfficesInterface } from 'src/utils/interface';
	import { onMount } from 'svelte';

	export let fullAddress = '';
	export let address: string = '';
	// export let addressDataProps: OfficesInterface | null = null;
	let location = {
			provinces: [] as LocationSchema[],
			districts: [] as LocationSchema[],
			wards: [] as LocationSchema[]
		},
		provinceCode = -1,
		districtCode = -1;
	let district: HTMLSelectElement, ward: HTMLSelectElement;
	let detailAddress: string = '';
	$: address = (detailAddress == '' ? '' : `${detailAddress} - `) + fullAddress.split(' - ').reverse().join(' - ');

	async function getLocationData(depth: number, provinceCode?: number, districtCode?: number) {
		const response = await fetch(`/api/location-vn?depth=${depth}&province=${provinceCode}&district=${districtCode}`, {
			method: 'GET'
		});

		const data = await response.json();
		return data.data;
	}

	onMount(async () => {
		location.provinces = await getLocationData(LocationDepth.PROVINCE);
	});
</script>

<div class="grid grid-cols-3 gap-1 w-full mb-1">
	<select
		name="type"
		required
		class="dui-select dui-select-sm dui-select-bordered w-full h-10"
		on:change={(e) => {
			location.wards = [];
			//@ts-ignore
			provinceCode = e.target.value.split('|')[0];
			//@ts-ignore
			fullAddress = e.target.value.split('|')[1];
			getLocationData(LocationDepth.DISTRICT, provinceCode).then((data) => {
				location.districts = data;
				district.selectedIndex = 0;
				ward.selectedIndex = 0;
			});
		}}
	>
		<option value="" disabled selected hidden>---Tỉnh/Thành phố---</option>
		{#each location.provinces as province}
			<option value={province.code + '|' + province.name} label={province.name}>{province.name}</option>
		{/each}
	</select>

	<select
		name="type"
		required
		class="dui-select dui-select-sm dui-select-bordered w-full h-10"
		bind:this={district}
		disabled={location.districts.length == 0}
		on:change={(e) => {
			//@ts-ignore
			districtCode = e.target.value.split('|')[0];
			//@ts-ignore
			fullAddress += ' - ' + e.target.value.split('|')[1];
			ward.selectedIndex = 0;
			getLocationData(LocationDepth.WARDS, provinceCode, districtCode).then((data) => {
				location.wards = data;
			});
		}}
	>
		<option value="" disabled selected hidden>---Quận/Huyện---</option>
		{#each location.districts as district}
			<option value={district.code + '|' + district.name}>{district.name}</option>
		{/each}
	</select>

	<select
		name="type"
		required
		class="dui-select dui-select-sm dui-select-bordered w-full h-10"
		disabled={location.wards.length == 0}
		bind:this={ward}
		on:change={(e) => {
			//@ts-ignore
			fullAddress += ' - ' + e.target.value.split('|')[1];
		}}
	>
		<option value="" disabled selected hidden>---Phường/Xã---</option>
		{#each location.wards as ward}
			<option value={ward.code + '|' + ward.name}>{ward.name}</option>
		{/each}
	</select>
</div>
<input
	type="text"
	placeholder="Địa chỉ cụ thể"
	class="dui-input h-10 dui-input-bordered w-full"
	bind:value={detailAddress}
/>

<style>
	select:invalid {
		color: #9ca3af;
	}

	select:focus {
		color: #000;
	}
</style>
