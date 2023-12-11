<script lang="ts">
	import { XCircle } from 'lucide-svelte';
	import type { ContextOrders } from 'src/utils/interface';

	export let index: number,
		content: ContextOrders,
		remove = () => {};
</script>

<div class="flex items-center mb-3">
	<p class="w-4">{index + 1}.</p>
	<div class="grid grid-cols-3 gap-2 w-full">
		<div class="flex gap-1">
			<label class="dui-label whitespace-nowrap" for="type">
				<span class="dui-label-text">Nội dung:</span>
			</label>
			<input
				type="text"
				placeholder="Nhập nội dung"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={content.context}
			/>
		</div>
		<div class="flex gap-1">
			<label class="dui-label whitespace-nowrap" for="type">
				<span class="dui-label-text">Số lượng:</span>
			</label>
			<input
				type="number"
				placeholder="Nhập số lượng"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={content.quantity}
			/>
		</div>
		<div class="flex gap-1">
			<label class="dui-label whitespace-nowrap" for="type">
				<span class="dui-label-text">Trị giá:</span>
			</label>
			<input
				type="number"
				placeholder="Nhập trị giá"
				class="dui-input h-10 dui-input-bordered w-full"
				bind:value={content.value}
			/>
		</div>
	</div>
	<button type="button" class="btn-icon w-max ml-2" on:click={remove}>
		<XCircle class="text-primary-500" />
	</button>
</div>
