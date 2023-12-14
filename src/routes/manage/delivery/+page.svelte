<script lang="ts">
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import GatherOrdersTable from 'src/components/table/GatherOrdersTable.svelte';

	let tabSet: 'coming' | 'processing' = 'processing';
</script>

<main class="h-full">
	<TabGroup rounded="rounded-tl-md rounded-tr-md" class="h-[calc(100%-6rem)]">
		<Tab bind:group={tabSet} name="tab2" value="processing" class="w-1/3">
			<span class:text-surface-400={tabSet != 'processing'}>Đang xử lý</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="coming" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đang giao</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value="coming" class="w-1/3">
			<span class:text-surface-400={tabSet != 'coming'}>Đã hoàn thành</span>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class="card !rounded-b-none h-full !bg-transparent">
				{#if tabSet == 'processing'}
					Tab 1
				{:else if tabSet == 'coming'}
					<GatherOrdersTable tableData={[]} />
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</main>
