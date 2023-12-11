<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { setUserStorage } from 'src/lib/userLocalStorage';
	import { token } from 'src/utils/stores';

	let username: string, password: string;
	let loading = false,
		error: string;

	async function onLogin() {
		const body = {
			userId: username,
			password: password
		};
		if (!username || !password) {
			error = 'Thông tin đăng nhập bị để trông';
			return;
		}
		loading = true;
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(body)
		});

		const data = await response.json();

		const user = await fetch('/api/user/me', {
			method: 'GET'
		}).then((res) => res.json());
		if (user.status == 200) setUserStorage(user.data);

		loading = false;
		if (data.status != 200 || user.status != 200) {
			error = data.error;
			return;
		}

		token.set(data.data.accessToken);
		// invalidateAll();
		goto('/profile');
	}
</script>

<main>
	<div>
		<img src="/img/login-bg.svg" alt="bg-login" />
	</div>
	<div class="flex-1 flex justify-center">
		<div class="card bg-white p-4 w-[60%] rounded-lg">
			<h3 class="h3 text-center">Đăng nhập</h3>
			<p class="text-center text-surface-300">Dành cho nhân viên và khách hàng</p>
			<label class="label mt-3" for="username">
				<span class="label-text">Mã nhân viên / Email</span>
			</label>
			<input
				type="search"
				name="username"
				placeholder="Mã nhân viên"
				class="dui-input dui-input-bordered h-10 rounded-md w-full"
				bind:value={username}
			/>
			<label class="label mt-3" for="password">
				<span class="label-text">Mật khẩu</span>
			</label>
			<input
				type="password"
				placeholder="Mật khẩu"
				class="dui-input h-10 dui-input-bordered rounded-md w-full"
				bind:value={password}
			/>
			{#if error}
				<p class="text-fail font-bold mt-1">Thông tin đăng nhập không chính xác!</p>
			{/if}

			<div class="mt-3">
				Chưa có tài khoản khách hàng? <a href="/register" class="link">Đăng ký ngay!</a>
			</div>
			<button
				type="button"
				disabled={loading}
				class="btn variant-filled-primary w-full !rounded-md mt-3"
				on:click={onLogin}
			>
				{#if loading}
					<span class="dui-loading dui-loading-spinner dui-loading-sm" />
				{:else}
					Đăng nhập
				{/if}
			</button>
		</div>
	</div>
</main>

<style>
	main {
		height: calc(100vh - 4rem);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 5rem;
	}

	.dui-input:focus {
		outline: none;
		border: 1px solid #0fba81;
	}
</style>
