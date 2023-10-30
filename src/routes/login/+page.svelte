<script lang="ts">
</script>

<main>
	<div>
		<img src="/img/login-bg.svg" alt="bg-login" />
	</div>
	<div class="flex-1 flex justify-center">
		<div class="card bg-white p-4 w-[60%] rounded-lg">
			<h3 class="h3 text-center">Login</h3>
			<p class="text-center text-surface-300">For staff, please use your username!</p>
			<label class="label mt-3" for="username">
				<span class="label-text">Username / Email</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="Username"
				class="dui-input dui-input-bordered h-10 rounded-md w-full"
			/>
			<label class="label mt-3" for="username">
				<span class="label-text">Password</span>
			</label>
			<input type="text" placeholder="Password" class="dui-input h-10 dui-input-bordered rounded-md w-full" />
			<div class="mt-3">
				Not have an account? <a href="/register" class="link">Register now!</a>
			</div>
			<button type="button" class="btn variant-filled-primary w-full rounded-md mt-3">Login</button>
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
