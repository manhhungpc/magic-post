<script lang="ts">
	import '../app.css';
	import { TabGroup, AppBar, TabAnchor } from '@skeletonlabs/skeleton';
</script>

<AppBar class="w-full p-3 h-16 justify-center !bg-transparent">
	<svelte:fragment slot="lead" />
	<TabAnchor href="/">
		<span class="brand">
			<img src="/img/logo2.png" alt="logo" class="h-16 overflow-hidden" />
		</span>
	</TabAnchor>
	<svelte:fragment slot="trail">
		<TabGroup
			justify="justify-end"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			flex="flex-1 lg:flex-none"
			rounded="rounded-md"
			border=""
			class="!bg-transparent w-full"
		>
			<TabAnchor href="/" class="ml-3">
				<span class="link-nav"> Services &nbsp;<i class="fa-solid fa-wrench" /> </span>
			</TabAnchor>
			<TabAnchor href="/" class="ml-3">
				<span class="link-nav"> News &nbsp;<i class="fa-regular fa-newspaper" /> </span>
			</TabAnchor>
			<TabAnchor href="/" class="ml-3">
				<span class="link-nav"> Tracking &nbsp;<i class="fa-solid fa-magnifying-glass" /> </span>
			</TabAnchor>
			<TabAnchor href="/login" class="ml-3">
				<span class="link-nav"> Login &nbsp;<i class="fa-solid fa-user" /> </span>
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>
</AppBar>

<div>
	<slot />
</div>

<style>
	.brand {
		font-size: 24px;
	}
	.link-nav {
		font-size: 16px;
	}
</style>
