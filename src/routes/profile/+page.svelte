<script lang="ts">
	export let data;
	console.log('🚀 ~ file: +page.svelte:3 ~ userData:', data);
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
				<input type="text" class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="code">Mã nhân viên:</label>
				<input type="text" class="dui-input dui-input-bordered h-10 rounded-md w-full" disabled />
			</div>
		</div>
		<div class="w-full">
			<label class="mt-3" for="position">Chức vụ:</label>
			<input type="text" class="dui-input dui-input-bordered h-10 rounded-md w-full" disabled />
		</div>
		<div class="md:flex w-full justify-between block">
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="phone">Số điện thoại:</label>
				<input type="number" class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
			<div class="md:w-[48%] w-full">
				<label class="mt-3" for="birthday">Ngày sinh:</label>
				<input type="date" class="dui-input dui-input-bordered h-10 rounded-md w-full" />
			</div>
		</div>
		<div class="w-full">
			<label class="mt-3" for="email">Email:</label>
			<input type="text" class="dui-input dui-input-bordered h-10 rounded-md w-full" />
		</div>
		<div class="w-full">
			<label class="mt-3" for="address">Địa chỉ:</label>
			<input type="text" class="dui-input dui-input-bordered h-10 rounded-md w-full" />
		</div>
	</div>
</main>

<style>
	input[disabled] {
		border: 1px solid #adadad;
	}
</style>
