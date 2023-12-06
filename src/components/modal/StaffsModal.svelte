<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { Roles, type StaffsInteface } from 'src/utils/interface';
	import { onMount } from 'svelte';

	export let id: string,
		staff: StaffsInteface | null = null;

	let fullName: string,
		email: string,
		address: string,
		phoneNo: string,
		dateOfBirth: string,
		role = Roles.TRANSACTION_LEADER;
	let loading = false,
		error: string;

	async function createNewStaff() {
		error = '';
		const body = {
			fullName,
			dateOfBirth,
			phoneNo,
			address,
			email,
			role
		};

		Object.values(body).some(async (value) => {
			if (!value) {
				error = 'Có dữ liệu bắt buộc bị để trống!';
				return;
			}

			loading = true;
			const response = await fetch('/api/admin/staffs', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			const staffData = await response.json();

			if (staffData.status == 201) {
				(document.getElementById(id) as any).close();
				invalidate((url) => url.pathname.includes('/api/admin/staffs'));
				goto('/admin/staffs');
			}
			loading = false;
			return;
		});
	}

	async function updateStaff(staffId: string) {
		error = '';
		const body = {
			fullName,
			dateOfBirth,
			phoneNo,
			address,
			email,
			role
		};
		console.log('🚀 ~ file: StaffsModal.svelte:63 ~ body:', body);

		Object.values(body).some(async (value) => {
			if (!value) {
				error = 'Có dữ liệu bắt buộc bị để trống!';
				return;
			}

			loading = true;
			const response = await fetch(`/api/admin/staffs/${staffId}`, {
				method: 'PUT',
				body: JSON.stringify(body)
			});

			const staffData = await response.json();

			if (staffData.status == 201 || (staffData.status == 200 && staff)) {
				(document.getElementById(id) as any).close();
				invalidate((url) => url.pathname.includes('/api/admin/staffs'));
			}
			loading = false;
			return;
		});
	}

	onMount(() => {
		if (staff) {
			role = staff.role.id;
			fullName = staff.fullName;
			email = staff.email;
			address = staff.address;
			phoneNo = staff.phoneNo;
			dateOfBirth = staff.dateOfBirth;
		}
	});
</script>

<dialog {id} class="dui-modal">
	<div class="dui-modal-box w-[44%] max-w-3xl py-4 overflow-hidden">
		<form method="dialog">
			<button class="dui-btn dui-btn-sm dui-btn-square dui-btn-ghost absolute right-2 top-3">✕</button>
		</form>
		<h3 class="text-xl text-center mb-2">
			{staff ? 'Chỉnh sửa' : 'Thêm mới'} nhân viên trưởng điểm
		</h3>
		<div class="dui-divider m-0 -mx-6" />
		<main>
			<label class="dui-label pb-1" for="name">
				<span class="dui-label-text required-label">Họ và tên</span>
			</label>
			<input
				type="text"
				bind:value={fullName}
				name="name"
				placeholder="Nhập họ tên"
				class="dui-input h-10 dui-input-bordered w-full"
			/>

			<label class="dui-label pb-1" for="email">
				<span class="dui-label-text required-label">Email</span>
			</label>
			<input
				type="text"
				bind:value={email}
				name="email"
				placeholder="Nhập email"
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

			<div class="flex justify-between gap-3">
				<div class="w-full">
					<label class="dui-label pb-1" for="phone">
						<span class="dui-label-text required-label">Số điện thoại</span>
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
					<label class="dui-label pb-1" for="dob">
						<span class="dui-label-text required-label">Ngày sinh</span>
					</label>
					<input
						type="date"
						bind:value={dateOfBirth}
						name="dob"
						placeholder="Nhập địa chỉ"
						class="dui-input h-10 dui-input-bordered w-full"
					/>
				</div>
			</div>

			<label class="dui-label pb-1" for="role-radio">
				<span class="dui-label-text required-label">Chức vụ</span>
			</label>
			{#if staff && staff.workAt}
				<input
					type="text"
					value={staff.role.name}
					name="role"
					disabled
					class="dui-input h-10 dui-input-bordered w-full mb-3"
				/>
			{:else}
				<div class="grid grid-cols-2 gap-3">
					<label class="dui-label cursor-pointer justify-start">
						<input
							type="radio"
							on:change={() => (role = Roles.TRANSACTION_LEADER)}
							name={staff ? `role-radio-${staff.id}` : 'role-radio'}
							class="dui-radio dui-radio-sm checked:bg-primary-500"
							checked={role == Roles.TRANSACTION_LEADER}
						/>
						<span class="dui-label-text ml-2">Trưởng điểm giao dịch</span>
					</label>
					<label class="dui-label cursor-pointer justify-start">
						<input
							type="radio"
							on:change={() => (role = Roles.GATHERING_LEADER)}
							name={staff ? `role-radio-${staff.id}` : 'role-radio'}
							class="dui-radio dui-radio-sm checked:bg-primary-500"
							checked={role == Roles.GATHERING_LEADER}
						/>
						<span class="dui-label-text ml-2">Trưởng điểm tập kết</span>
					</label>
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
			<button
				class="btn variant-filled bg-primary-600"
				class:animate-spin={loading}
				disabled={loading}
				on:click={() => (staff ? updateStaff(staff.id) : createNewStaff())}
			>
				<!-- {#if loading}
					<span class="dui-loading dui-loading-spinner dui-loading-sm" />
				{:else}
					Thêm mới
				{/if} -->
				{staff ? 'Lưu' : 'Thêm mới'}
			</button>
		</div>
	</div>
	<form method="dialog" class="dui-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
