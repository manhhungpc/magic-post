<script lang="ts">
	import { ChevronsRight, ClipboardList } from 'lucide-svelte';
	import { formatDate } from 'src/utils/helper';

	export let trackingData: any[];

	const firstTrack = trackingData.at(0);
	const lastTrack = trackingData.at(-1);
	let remainTrack: any[] = [];

	$: if (firstTrack.id != lastTrack.id) {
		remainTrack = trackingData.slice(1, -1).reverse();
	}
</script>

<ul>
	<li>
		<div class="flex">
			<div class="flex">
				<div class="flex flex-col items-center">
					<div class="tracking-hr-tran grow" />
					<div class="tracking-icon tracking-icon-success">
						<ChevronsRight class="w-5 h-5" />
					</div>
					{#if firstTrack != lastTrack}
						<div class="tracking-hr grow" />
					{:else}
						<div class="tracking-hr-tran grow" />
					{/if}
				</div>
				<div class="mx-5 tracking-text-success font-semibold font-sans min-w-[9.5rem] flex items-center">
					{formatDate(lastTrack.createAt)}
				</div>
			</div>
			<div class="flex items-center">
				<div class="tracking-text-success py-3"><strong>{lastTrack.messageStatus}</strong></div>
				<!-- <a class="tracking-link-image" href="/">Xem hình ảnh giao hàng</a> -->
			</div>
		</div>
	</li>

	{#each remainTrack as tracking}
		<li>
			<div class="flex">
				<div class="flex">
					<div class="flex flex-col items-center min-w-[2rem]">
						<div class="tracking-hr grow" />
						<div class="tracking-dot rounded-full w-3 h-3" />
						<div class="tracking-hr grow" />
					</div>
					<div class="mx-5 font-sans min-w-[9.5rem] flex items-center">{formatDate(tracking.createAt)}</div>
				</div>
				<div>
					<div class="text-[#000] py-3">{tracking.messageStatus}</div>
				</div>
			</div>
		</li>
	{/each}

	{#if firstTrack != lastTrack}
		<li>
			<div class="flex">
				<div class="flex">
					<div class="flex flex-col items-center">
						<div class="tracking-hr grow" />
						<div class="tracking-icon">
							<ClipboardList class="w-5 h-5" />
						</div>
						<div class="tracking-hr-tran grow" />
					</div>
					<div class="mx-5 font-sans min-w-[9.5rem] flex items-center">{formatDate(firstTrack.createAt)}</div>
				</div>
				<div class="flex items-center">
					<div class="py-3"><strong>{firstTrack.messageStatus}</strong></div>
				</div>
			</div>
		</li>
	{/if}
</ul>

<style>
	.tracking-hr {
		background-color: gray;
		width: 1px;
	}

	.tracking-hr-tran {
		background-color: transparent;
		width: 1px;
	}

	.tracking-icon {
		border: 1px solid gray;
		color: gray;
		border-radius: 9999px;
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 2rem;
		min-height: 2rem;
	}

	.tracking-dot {
		background-color: gray;
	}

	.tracking-icon-success {
		min-width: 2rem;
		min-height: 2rem;
		background-color: #26ab9a;
		border: none;
		color: white;
	}

	.tracking-text-success {
		color: #26ab9a;
	}

	.font-sans {
		font-size: 18px;
	}
</style>
