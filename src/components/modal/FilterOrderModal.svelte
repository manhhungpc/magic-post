<script lang="ts">
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { Catergority, LocationDepth, OrderMsgStatus, OrderStatus } from 'src/utils/enum';
	import { onMount } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { LocationSchema } from 'src/utils/interface';
	import { X } from 'lucide-svelte';
	import { removeAccents } from 'src/utils/helper';

	export let id: string;
	let locations: LocationSchema[];
	let request = {
		type: '',
		status: '',
		sender: '',
		receiver: '',
		address: '',
		fromDate: '',
		toDate: ''
	};

	let locationAutocomplete: AutocompleteOption<string>[] = [];
	const locationSettings: PopupSettings = {
		event: 'focus-click',
		target: 'location',
		placement: 'top'
	};

	async function getLocationData(depth: number, provinceCode?: number, districtCode?: number) {
		const response = await fetch(`/api/location-vn?depth=${depth}&province=${provinceCode}&district=${districtCode}`, {
			method: 'GET'
		});

		const data = await response.json();
		return data.data;
	}

	function onLocationSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		request.address = event.detail.label;
	}

	function resetFilter() {
		request = {
			type: '',
			status: '',
			sender: '',
			receiver: '',
			address: '',
			fromDate: '',
			toDate: ''
		};
	}
	onMount(async () => {
		locations = await getLocationData(LocationDepth.PROVINCE);
		locations.map((loc) => {
			const nonAccentLocation = removeAccents(loc.name);
			locationAutocomplete = [
				...locationAutocomplete,
				{
					label: `${loc.name}`,
					value: `${loc.name}`,
					keywords: `${loc.name}, ${nonAccentLocation}`,
					meta: { healthy: false }
				}
			];
		});
	});
</script>

<dialog {id} class="dui-modal">
	<div class="dui-modal-box w-[50%] max-w-3xl py-4">
		<form method="dialog">
			<button class="dui-btn dui-btn-sm dui-btn-square dui-btn-ghost absolute right-2 top-3">✕</button>
		</form>
		<p class="h4 font-bold pt-2 text-center">Bộ lọc</p>
		<div class="dui-divider m-0 -mx-6" />

		<div class="grid grid-cols-2 gap-3 w-full pb-2">
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
				<label class="dui-label pb-1" for="date">
					<span class="dui-label-text">Thời gian tạo</span>
				</label>
				<div class="flex items-center gap-2">
					<input
						type="date"
						name="date"
						class="dui-input h-10 dui-input-bordered w-full"
						bind:value={request.fromDate}
					/>
					-
					<input type="date" name="date" class="dui-input h-10 dui-input-bordered w-full" bind:value={request.toDate} />
				</div>
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
					<span class="dui-label-text">Địa chỉ (người gửi, người nhận)</span>
				</label>
				<input
					type="search"
					name="sender"
					placeholder="Nhập địa chỉ"
					class="autocomplete dui-input h-10 dui-input-bordered w-full"
					bind:value={request.address}
					use:popup={locationSettings}
				/>
				<div data-popup="location" class="card !bg-[#fff] w-full max-w-sm max-h-60 p-4 overflow-y-auto">
					<div class="w-full flex justify-end sticky top-0">
						<button class="dui-btn dui-btn-square dui-btn-xs">
							<X size={15} />
						</button>
					</div>
					<Autocomplete
						bind:input={request.address}
						options={locationAutocomplete}
						on:selection={onLocationSelection}
					/>
				</div>
			</div>
		</div>

		<div class="flex-1" />
		<div class="dui-divider m-0 -mx-6" />
		<div class="flex justify-between w-full pb-3 pt-1">
			<button class="btn variant-outline-tertiary bg-surface-50" on:click={resetFilter}> Thiết lập lại bộ lọc </button>
			<div class="flex justify-end gap-2">
				<form method="dialog">
					<button class="btn variant-outline-tertiary hover:text-primary-500 hover:variant-outline-error"> Hủy </button>
				</form>
				<button class="btn variant-filled bg-primary-600"> Lọc </button>
			</div>
		</div>
	</div>
	<form method="dialog" class="dui-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
