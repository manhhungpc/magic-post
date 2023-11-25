<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { X } from 'lucide-svelte';
	import { OfficeType, Roles, type StaffsInteface } from 'src/utils/interface';
	import { slide } from 'svelte/transition';

	export let id: string, leaderData: StaffsInteface[];

	// let leaderList: StaffsInteface[] = leaderData;

	let name: string,
		address: string,
		phoneNo: string,
		dateOfBirth: string,
		type = OfficeType.GATHERING,
		leader = '',
		leaderInfo = '';
	let loading = false,
		error: string;

	function onLeaderSelect(event: CustomEvent<AutocompleteOption<string>>): void {
		leaderInfo = event.detail.label;
		leader = event.detail.value;
	}

	async function createNewOffice() {
		const body = {
			name,
			dateOfBirth,
			phoneNo,
			address,
			adminId: leader,
			type
		};

		Object.values(body).some(async (value) => {
			if (!value) {
				error = 'Có dữ liệu bắt buộc bị để trống!';
				return;
			}

			loading = true;
			const response = await fetch('/api/admin/offices', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			const officesData = await response.json();

			if (officesData.status == 201) {
				(document.getElementById(id) as any).close();
				invalidate('/api/admin/offices?type=GP');
				invalidate('/api/admin/offices?type=TP');
			}
			loading = false;
			return;
		});
	}

	let leaderPopupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'leader-autofill',
		placement: 'top'
	};
	let leaderAutoComplete: AutocompleteOption<string>[] = [];

	$: {
		leaderAutoComplete = [];

		leaderData
			.filter((leader) => {
				return leader.role.id == (type == OfficeType.TRANSACTION ? Roles.TRANSACTION_LEADER : Roles.GATHERING_LEADER);
			})
			.map((leader) => {
				leaderAutoComplete = [
					...leaderAutoComplete,
					{
						label: `${leader.userId} - ${leader.fullName}`,
						value: `${leader.id}`,
						keywords: `${leader.fullName}, ${leader.userId}, ${leader.email}`,
						meta: { healthy: false }
					}
				];
			});
	}
</script>

<dialog {id} class="dui-modal">
	<div class="dui-modal-box w-[44%] max-w-3xl py-4">
		<form method="dialog">
			<button class="dui-btn dui-btn-sm dui-btn-square dui-btn-ghost absolute right-2 top-3">✕</button>
		</form>
		<h3 class="text-xl text-center mb-2">Thêm mới điểm giao dịch/tập kết</h3>
		<div class="dui-divider m-0 -mx-6" />
		<main class="mb-3">
			<label class="dui-label pb-1" for="name">
				<span class="dui-label-text required-label">Tên điểm</span>
			</label>
			<input
				type="text"
				bind:value={name}
				name="name"
				placeholder="Nhập tên điểm"
				class="dui-input h-10 dui-input-bordered w-full"
			/>

			<label class="dui-label pb-1" for="address">
				<span class="dui-label-text required-label">Địa chỉ</span>
			</label>
			<input
				type="text"
				bind:value={address}
				name="address"
				placeholder="Nhập địa chỉ"
				class="dui-input h-10 dui-input-bordered w-full"
			/>

			<label class="dui-label pb-1" for="address">
				<span class="dui-label-text required-label">Loại văn phòng</span>
			</label>
			<div class="grid grid-cols-2 gap-3">
				<label class="dui-label cursor-pointer justify-start">
					<input
						type="radio"
						on:change={() => (type = OfficeType.GATHERING)}
						name="role-radio"
						class="dui-radio dui-radio-sm checked:bg-primary-500"
						checked
					/>
					<span class="dui-label-text ml-2">Điểm tập kết</span>
				</label>
				<label class="dui-label cursor-pointer justify-start">
					<input
						type="radio"
						on:change={() => (type = OfficeType.TRANSACTION)}
						name="role-radio"
						class="dui-radio dui-radio-sm checked:bg-primary-500"
					/>
					<span class="dui-label-text ml-2">Điểm giao dịch</span>
				</label>
			</div>

			<div class="flex justify-between gap-3">
				<div class="w-full">
					<label class="dui-label pb-1" for="phone">
						<span class="dui-label-text required-label">Số điện thoại văn phòng</span>
					</label>
					<input
						type="text"
						bind:value={phoneNo}
						name="phone"
						placeholder="Nhập số điện thoại"
						class="dui-input h-10 dui-input-bordered w-full"
					/>
				</div>
				<div class="w-full">
					<label class="dui-label pb-1" for="leader">
						<span class="dui-label-text required-label">Trưởng điểm quản lý</span>
					</label>
					<input
						type="search"
						name="leader"
						placeholder="Chọn trưởng điểm"
						class="dui-input h-10 dui-input-bordered w-full"
						use:popup={leaderPopupSettings}
						bind:value={leaderInfo}
					/>
					<div data-popup="leader-autofill" class="card w-full max-w-sm max-h-60 p-4 overflow-y-auto">
						<div class="w-full flex justify-end sticky top-0">
							<button id="close_select_leader" class="dui-btn dui-btn-square dui-btn-xs">
								<X size={15} />
							</button>
						</div>
						<Autocomplete
							options={leaderAutoComplete}
							bind:input={leader}
							on:selection={onLeaderSelect}
							transitionOutParams={{ delay: 0, duration: 0 }}
						/>
					</div>
				</div>
			</div>

			{#if type == OfficeType.TRANSACTION}
				<div transition:slide={{ duration: 200 }}>
					<label class="dui-label pb-1" for="name">
						<span class="dui-label-text required-label">Điểm tập kết liên kết</span>
					</label>
					<input
						type="text"
						name="name"
						placeholder="Chọn điểm tập kết"
						class="dui-input h-10 dui-input-bordered w-full"
					/>
				</div>
			{/if}
		</main>
		<div class="dui-divider m-0 -mx-6" />
		{#if error}
			<p class="text-fail text-end font-bold mt-1">{error}</p>
		{/if}
		<div class="flex justify-end gap-3 mt-[6px]">
			<form method="dialog">
				<button class="btn variant-outline-tertiary hover:text-primary-500 hover:variant-outline-error">
					Hủy bỏ
				</button>
			</form>
			<button class="btn variant-filled bg-primary-600" disabled={loading} on:click={createNewOffice}>
				{#if loading}
					<span class="dui-loading dui-loading-spinner dui-loading-sm" />
				{:else}
					Thêm mới
				{/if}
			</button>
		</div>
	</div>
	<form method="dialog" class="dui-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
