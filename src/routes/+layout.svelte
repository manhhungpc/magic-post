<script lang="ts">
	import '../app.css';
	import { TabGroup, AppBar, TabAnchor } from '@skeletonlabs/skeleton';
	import { Newspaper, Truck, User2, MapPin, FileText, LogOut, UserCircle } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Roles } from 'src/utils/interface';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initLazy } from '$lib/lazyLoad';

	initLazy();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	$: console.log('🚀 ~ file: +layout.svelte:16 ~ data:', data);

	let manageRoute: string;
	$: manageRoute = data.userData?.role.id == Roles.ADMIN ? '/admin' : '/manage';
</script>

<svelte:head>
	<title>MagicPost | Hệ thống quản lý chuyển phát</title>
</svelte:head>
<header>
	<AppBar class="w-full p-3 pl-6 h-16 justify-center !bg-tertiary-300">
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
				class="!bg-transparent w-full !overflow-visible"
			>
				<TabAnchor href="/" class="ml-3">
					<span class="link-nav flex"> Tin tức &nbsp;<Newspaper size={20} /> </span>
				</TabAnchor>

				{#if data.accessToken}
					<TabAnchor href={manageRoute} class="ml-3">
						<span class="link-nav flex"> Quản lý &nbsp;<FileText size={20} /></span>
					</TabAnchor>
					<TabAnchor href="/profile" class="ml-3 !p-0">
						<div class="dui-dropdown dui-dropdown-hover dui-dropdown-bottom dui-dropdown-end">
							<div tabindex="0" role="button">
								<span class="link-nav flex py-2 px-4"> {data.userData.fullName} &nbsp;<User2 size={20} /></span>
							</div>
							<ul class="dui-dropdown-content z-[5] dui-menu p-3 shadow bg-base-100 rounded-lg w-52 text-[#000]">
								<li><a href="/profile"> <UserCircle size={20} /> Hồ sơ cá nhân</a></li>
								<li><a href="/logout" data-sveltekit-reload> <LogOut size={20} /> Đăng xuất</a></li>
							</ul>
						</div>
					</TabAnchor>
				{:else}
					<TabAnchor href="/tracking" class="ml-3">
						<span class="link-nav flex"> Theo dõi &nbsp;<MapPin size={20} /></span>
					</TabAnchor>
					<TabAnchor href="/" class="ml-3">
						<span class="link-nav flex"> Dịch vụ &nbsp;<Truck /> </span>
					</TabAnchor>
					<TabAnchor href="/login" class="ml-3">
						<span class="link-nav flex"> Đăng nhập &nbsp;<User2 size={20} /></span>
					</TabAnchor>
				{/if}
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

	:global(.tab-list) {
		overflow: visible;
	}
</style>
