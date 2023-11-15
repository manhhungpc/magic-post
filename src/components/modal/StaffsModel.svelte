<script lang="ts">
	export let id: string;
</script>

<dialog {id} class="dui-modal">
	<div class="dui-modal-box w-[44%] max-w-3xl py-4">
		<form method="dialog">
			<button class="dui-btn dui-btn-sm dui-btn-square dui-btn-ghost absolute right-2 top-3">✕</button>
		</form>
		<h3 class="text-xl text-center mb-2">Thêm mới nhân viên trưởng điểm</h3>
		<div class="dui-divider m-0 -mx-6" />
		<main>
			<label class="dui-label pb-1" for="name">
				<span class="dui-label-text">Họ và tên</span>
			</label>
			<input type="text" name="name" placeholder="Nhập họ tên" class="dui-input h-10 dui-input-bordered w-full" />
			<label class="dui-label pb-1" for="email">
				<span class="dui-label-text">Email</span>
			</label>
			<input type="text" name="email" placeholder="Nhập email" class="dui-input h-10 dui-input-bordered w-full" />
			<label class="dui-label pb-1" for="address">
				<span class="dui-label-text">Địa chỉ</span>
			</label>
			<input type="text" name="address" placeholder="Nhập địa chỉ" class="dui-input h-10 dui-input-bordered w-full" />
			<div class="flex justify-between gap-3">
				<div class="w-full">
					<label class="dui-label pb-1" for="phone">
						<span class="dui-label-text">Số điện thoại</span>
					</label>
					<input
						type="text"
						name="phone"
						placeholder="Nhập số điện thoại"
						class="dui-input h-10 dui-input-bordered w-full"
					/>
				</div>
				<div class="w-full">
					<label class="dui-label pb-1" for="dob">
						<span class="dui-label-text">Ngày sinh</span>
					</label>
					<input type="date" name="dob" placeholder="Nhập địa chỉ" class="dui-input h-10 dui-input-bordered w-full" />
				</div>
			</div>
			<label class="dui-label pb-1" for="address">
				<span class="dui-label-text">Chức vụ</span>
			</label>
			<div class="grid grid-cols-2 gap-3">
				<label class="dui-label cursor-pointer justify-start">
					<input type="radio" name="role-radio" class="dui-radio dui-radio-sm checked:bg-primary-500" checked />
					<span class="dui-label-text ml-2">Trưởng điểm giao dịch</span>
				</label>
				<label class="dui-label cursor-pointer justify-start">
					<input type="radio" name="role-radio" class="dui-radio dui-radio-sm checked:bg-primary-500" />
					<span class="dui-label-text ml-2">Trưởng điểm tập kết</span>
				</label>
			</div>
		</main>
		<div class="dui-divider m-0 -mx-6" />
		<div class="flex justify-end gap-3 mt-[6px]">
			<form method="dialog">
				<button class="btn variant-outline-tertiary hover:text-primary-500 hover:variant-outline-error">
					Hủy bỏ
				</button>
			</form>
			<button class="btn variant-filled bg-primary-600"> Thêm mới </button>
		</div>
	</div>
	<form method="dialog" class="dui-modal-backdrop">
		<button>close</button>
	</form>
</dialog>
