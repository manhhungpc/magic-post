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
	import PopupAutocomplete from '../PopupAutocomplete.svelte';

	export let id: string;
	export let filterOptions: {
		fromTP?: boolean;
		fromGP?: boolean;
		customerInfo?: boolean;
	};
	export let defaultQuery: URLSearchParams | undefined = undefined;
	let locations: LocationSchema[], error: string;
	let request = {
		categority: '',
		status: '',
		sender: '',
		receiver: '',
		senderAddress: '',
		receiverAddress: '',
		fromDate: '',
		toDate: '',
		fromAddress: ''
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

	async function getListTP() {
		const points = await fetch('/api/gathering-points/transaction-points', { method: 'GET' }).then((res) => res.json());
		if (points.status != 200) {
			error = points.error;
			return;
		}

		const formatData: AutocompleteOption<string>[] = [];
		for (let point of points.data) {
			const slug = removeAccents(point);
			formatData.push({ label: point, value: point, keywords: `${point}, ${slug}` });
		}
		return formatData as any;
	}

	async function getListGP() {
		const query = $page.url.search;
		const points = await fetch(`/api/gathering-points/points?${query}`, { method: 'GET' }).then((res) => res.json());
		if (points.status != 200) {
			error = points.error;
			return;
		}

		const formatData: AutocompleteOption<string>[] = [];
		for (let point of points.data) {
			const slug = removeAccents(point);
			formatData.push({ label: point, value: point, keywords: `${point}, ${slug}` });
		}
		return formatData as any;
	}

	function selectSenderAddress(event: CustomEvent<AutocompleteOption<string>>): void {
		request.senderAddress = event.detail.label;
	}

	function selectReceiverAddress(event: CustomEvent<AutocompleteOption<string>>): void {
		request.receiverAddress = event.detail.label;
	}

	function resetFilter() {
		//@ts-ignore
		Object.keys(request).forEach((prop) => (request[prop] = ''));
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
			createAtTo: request.toDate,
			fromAddress: request.fromAddress
		});

		let currentQuery = new URLSearchParams($page.url.searchParams.toString());

		if (defaultQuery) {
			currentQuery = new URLSearchParams(mergeQueries(defaultQuery, currentQuery));
		}

		const newQuery = mergeQueries(currentQuery, query);
		console.log('🚀 ~ file: FilterOrderModal.svelte:119 ~ onFilter ~ newQuery:', newQuery);

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
					keywords: `${loc.name}, ${nonAccentLocation}`
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
					<option value={Catergority.PACKAGE}>Hàng hóa</option>
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

			{#if filterOptions.customerInfo}
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
			{/if}

			{#if filterOptions.fromTP}
				<div>
					<label class="dui-label pb-1" for="sender">
						<span class="dui-label-text">Địa chỉ điểm giao dịch</span>
					</label>
					{#await getListTP() then points}
						<PopupAutocomplete target="fromTP" bind:input={request.fromAddress} optionsData={points} />
					{/await}
				</div>
			{/if}

			{#if filterOptions.fromGP}
				<div>
					<label class="dui-label pb-1" for="sender">
						<span class="dui-label-text">Địa chỉ điểm tập kết</span>
					</label>
					{#await getListGP() then points}
						<PopupAutocomplete target="fromTP" bind:input={request.fromAddress} optionsData={points} width="max-w-md" />
					{/await}
				</div>
			{/if}
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
