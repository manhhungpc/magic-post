<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	console.log('🚀 ~ file: +page.svelte:3 ~ userData:', data);
	let user = {
		id: null,
		userId: null,
		fullName: null,
		dateOfBirth: null,
		phoneNo: null,
		address: null,
		role: { id: null, name: null },
		email: null
	};

	invalidateAll();

	async function getUserData() {
		const response = await fetch('/api/user/me', {
			method: 'GET'
		});

		user = (await response.json()).data;
		return user;
	}

	onMount(async () => {
		await getUserData();
	});
</script>

<main>
	<div class="md:w-[50%] w-[80%] m-auto flex flex-col items-center">
		<h3 class="h3 mt-3 mb-3">THÔNG TIN CÁ NHÂN</h3>
		<div>
			<img src="/img/bg-color.svg" alt="bg-login" class="overflow-clip rounded-full w-28 h-28" />
		</div>
		<div class="md:flex w-full justify-between block">
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="name">Họ và tên:</label>
				<input type="text" bind:value={user.fullName} class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="code">Mã nhân viên:</label>
				<input
					type="text"
					bind:value={user.userId}
					class="dui-input dui-input-bordered h-10 rounded-md w-full"
					disabled
				/>
			</div>
		</div>
		<div class="w-full">
			<label class="mt-3" for="position">Chức vụ:</label>
			<input
				type="text"
				bind:value={user.role.name}
				class="dui-input dui-input-bordered h-10 rounded-md w-full"
				disabled
			/>
		</div>
		<div class="md:flex w-full justify-between block">
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="phone">Số điện thoại:</label>
				<input type="number" bind:value={user.phoneNo} class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="birthday">Ngày sinh:</label>
				<input type="date" bind:value={user.dateOfBirth} class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
		</div>
		<div class="w-full">
			<label class="mt-3" for="email">Email:</label>
			<input type="text" bind:value={user.email} class="dui-input dui-input-bordered h-10 rounded-md w-full" />
		</div>
		<div class="w-full">
			<label class="mt-3" for="address">Địa chỉ:</label>
			<input type="text" bind:value={user.address} class="dui-input dui-input-bordered h-10 rounded-md w-full" />
		</div>
	</div>
</main>

<style>
	input[disabled] {
		border: 1px solid #adadad;
	}
</style>
