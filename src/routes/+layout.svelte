<script lang="ts">
	import '../app.css';
	import { TabGroup, AppBar, TabAnchor } from '@skeletonlabs/skeleton';
	import { Newspaper, Truck, User2, MapPin } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<header class:shadow-xl={$page.url.pathname.startsWith('/admin')}>
	<AppBar class="w-full p-3 pl-6 h-16 justify-center ">
		<svelte:fragment slot="lead" />
		<TabAnchor href="/">
			<span class="brand">
				<img src="/img/logo-new.png" alt="logo" class="h-16 overflow-hidden" />
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
					<span class="link-nav flex"> Services &nbsp;<Truck /> </span>
				</TabAnchor>
				<TabAnchor href="/" class="ml-3">
					<span class="link-nav flex"> News &nbsp;<Newspaper size={20} /> </span>
				</TabAnchor>
				<TabAnchor href="/tracking" class="ml-3">
					<span class="link-nav flex"> Tracking &nbsp;<MapPin size={20} /></span>
				</TabAnchor>
				<TabAnchor href="/login" class="ml-3">
					<span class="link-nav flex"> Login &nbsp;<User2 size={20} /></span>
				</TabAnchor>
			</TabGroup>
		</svelte:fragment>
	</AppBar>
</header>

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
