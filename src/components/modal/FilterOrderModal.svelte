<script lang="ts">
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { Catergority, LocationDepth } from 'src/utils/enum';
	import { onMount } from 'svelte';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { LocationSchema } from 'src/utils/interface';
	import { X } from 'lucide-svelte';
	import { mergeQueries, removeAccents } from 'src/utils/helper';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let id: string;
	let locations: LocationSchema[];
	let request = {
		categority: '',
		status: '',
		sender: '',
		receiver: '',
		senderAddress: '',
		receiverAddress: '',
		fromDate: '',
		toDate: ''
	};

	let locationAutocomplete: AutocompleteOption<string>[] = [];
	const senderSettings: PopupSettings = {
		event: 'focus-click',
		target: 'sender',
		placement: 'top'
	};

	const receiverSettings: PopupSettings = {
		event: 'focus-click',
		target: 'receiver',
		placement: 'top'
	};

	async function getLocationData(depth: number, provinceCode?: number, districtCode?: number) {
		const response = await fetch(`/api/location-vn?depth=${depth}&province=${provinceCode}&district=${districtCode}`, {
			method: 'GET'
		});

		const data = await response.json();
		return data.data;
	}

	function selectSenderAddress(event: CustomEvent<AutocompleteOption<string>>): void {
		request.senderAddress = event.detail.label;
	}

	function selectReceiverAddress(event: CustomEvent<AutocompleteOption<string>>): void {
		request.receiverAddress = event.detail.label;
	}

	function resetFilter() {
		request = {
			categority: '',
			status: '',
			sender: '',
			receiver: '',
			senderAddress: '',
			receiverAddress: '',
			fromDate: '',
			toDate: ''
		};
	}

	function onFilter() {
		const query = new URLSearchParams({
			categorityOrder: request.categority,
			status: request.status,
			senderName: request.sender,
			receiverName: request.receiver,
			senderAddress: request.senderAddress,
			receiverAddress: request.receiverAddress,
			createAtFrom: request.fromDate,
			createAtTo: request.toDate
		});

		const currentQuery = new URLSearchParams($page.url.searchParams.toString());
		if (currentQuery.get('pageNumber')) {
			currentQuery.set('pageNumber', '1');
		}

		const newQuery = mergeQueries(currentQuery, query);

		goto(`?${newQuery}`);

		(document.getElementById(id) as any).close();
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
				<label class="dui-label pb-1" for="type">
					<span class="dui-label-text">Loại hàng</span>
				</label>
				<select
					name="type"
					required
					class="dui-select dui-select-sm dui-select-bordered w-full h-10"
					bind:value={request.categority}
				>
					<option value="" disabled selected hidden>Chọn loại hàng gửi</option>
					<option value={Catergority.DOCUMENT}>Tài liệu</option>
					<option value={Catergority.PACKAGE}>Hàng gửi</option>
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
					<span class="dui-label-text">Địa chỉ người gửi</span>
				</label>
				<input
					type="search"
					name="sender"
					placeholder="Nhập địa chỉ"
					class="autocomplete dui-input h-10 dui-input-bordered w-full"
					bind:value={request.senderAddress}
					use:popup={senderSettings}
				/>
				<div data-popup="sender" class="card !bg-[#fff] w-full max-w-sm max-h-60 p-4 overflow-y-auto">
					<div class="w-full flex justify-end sticky top-0">
						<button class="dui-btn dui-btn-square dui-btn-xs">
							<X size={15} />
						</button>
					</div>
					<Autocomplete
						bind:input={request.senderAddress}
						options={locationAutocomplete}
						on:selection={selectSenderAddress}
					/>
				</div>
			</div>
			<div>
				<label class="dui-label pb-1" for="address">
					<span class="dui-label-text">Địa chỉ người nhận</span>
				</label>
				<input
					type="search"
					name="sender"
					placeholder="Nhập địa chỉ"
					class="autocomplete dui-input h-10 dui-input-bordered w-full"
					bind:value={request.receiverAddress}
					use:popup={receiverSettings}
				/>
				<div data-popup="receiver" class="card !bg-[#fff] w-full max-w-sm max-h-60 p-4 overflow-y-auto">
					<div class="w-full flex justify-end sticky top-0">
						<button class="dui-btn dui-btn-square dui-btn-xs">
							<X size={15} />
						</button>
					</div>
					<Autocomplete
						bind:input={request.receiverAddress}
						options={locationAutocomplete}
						on:selection={selectReceiverAddress}
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
				<button class="btn variant-filled bg-primary-600" on:click={onFilter}> Lọc </button>
			</div>
		</div>
	</div>
	<form method="dialog" class="dui-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
