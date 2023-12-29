<script lang="ts">
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';
	import { LocationDepth } from 'src/utils/enum';
	import { removeAccents } from 'src/utils/helper';
	import type { LocationSchema, OfficesInterface } from 'src/utils/interface';
	import { onMount } from 'svelte';
	import PopupAutocomplete from './PopupAutocomplete.svelte';

	export let fullAddress = '';
	export let address: string = '';
	let location = {
			provinces: [] as LocationSchema[],
			districts: [] as LocationSchema[],
			wards: [] as LocationSchema[]
		},
		provinceCode = -1,
		districtCode = -1;
	let detailAddress: string = '';
	let targetId = crypto.randomUUID();
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

	let autocompleteProvince: AutocompleteOption<string>[] = [];
	let autocompleteDistrict: AutocompleteOption<string>[] = [];
	let autocompleteWard: AutocompleteOption<string>[] = [];

	let provinceValue: string, districtValue: string, wardValue: string;

	$: if (provinceValue) {
		districtValue = '';
		wardValue = '';
		location.wards = [];
		//@ts-ignore
		provinceCode = provinceValue.split('|')[0];
		fullAddress = provinceValue.split('|')[1];
		getLocationData(LocationDepth.DISTRICT, provinceCode).then((data) => {
			location.districts = data;
		});
	}

	$: if (districtValue) {
		//@ts-ignore
		districtCode = districtValue.split('|')[0];
		fullAddress += ' - ' + districtValue.split('|')[1];
		getLocationData(LocationDepth.WARDS, provinceCode, districtCode).then((data) => {
			location.wards = data;
		});
	}

	$: if (wardValue) {
		fullAddress += ' - ' + wardValue.split('|')[1];
	}

	$: {
		autocompleteProvince = [];
		location.provinces.map((p: LocationSchema) => {
			autocompleteProvince = [
				...autocompleteProvince,
				{
					label: p.name,
					value: p.code + '|' + p.name,
					keywords: `${p.name}, ${removeAccents(p.name)}`
				}
			];
		});
	}
	$: {
		autocompleteDistrict = [];
		location.districts.map((p: LocationSchema) => {
			autocompleteDistrict.push({
				label: p.name,
				value: p.code + '|' + p.name,
				keywords: `${p.name}, ${removeAccents(p.name)}`
			});
		});
	}
	$: {
		autocompleteWard = [];
		location.wards.map((p: LocationSchema) => {
			autocompleteWard.push({
				label: p.name,
				value: p.code + '|' + p.name,
				keywords: `${p.name}, ${removeAccents(p.name)}`
			});
		});
	}
</script>

<div class="grid grid-cols-3 gap-1 w-full mb-1">
	<PopupAutocomplete
		optionsData={autocompleteProvince}
		target="autocmp-province-{targetId}"
		placeholder="---Tỉnh/Thành phố---"
		placement="bottom-start"
		bind:value={provinceValue}
	/>

	<PopupAutocomplete
		optionsData={autocompleteDistrict}
		target="autocmp-district-{targetId}"
		placeholder="---Quận/Huyện---"
		placement="bottom"
		bind:value={districtValue}
	/>

	<PopupAutocomplete
		optionsData={autocompleteWard}
		target="autocmp-ward-{targetId}"
		placeholder="---Phường/Xã---"
		placement="bottom-end"
		bind:value={wardValue}
	/>
</div>
<input
	type="text"
	placeholder="Địa chỉ cụ thể"
	class="dui-input h-10 dui-input-bordered w-full"
	bind:value={detailAddress}
/>
