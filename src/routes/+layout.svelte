<script lang="ts">
	import '../app.css';
	import 'toastify-js/src/toastify.css';
	import { TabGroup, AppBar, TabAnchor } from '@skeletonlabs/skeleton';
	import { Newspaper, Truck, User2, MapPin, FileText, LogOut, UserCircle, AlignJustify } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initLazy } from '$lib/lazyLoad';
	import { Roles } from 'src/utils/enum';
	import { getUserStorage } from 'src/lib/userLocalStorage';
	import type { StaffsInteface } from 'src/utils/interface';
	// import { initializeStores } from '@skeletonlabs/skeleton';

	// initializeStores();
	initLazy();

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: PageData;
	let user: StaffsInteface;
	$: data.userData && (user = getUserStorage());

	let manageRoute: string;
	$: manageRoute = data.userData?.role.id == Roles.ADMIN ? '/admin' : '/manage/customer-order';

	$: innerWidth = 0;

	let expand: boolean = false;
</script>

<svelte:window bind:innerWidth />

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
			{#if innerWidth <= 768}
				<button
					class="ml-[calc(100%-24px)]"
					on:click={() => {
						expand = !expand;
					}}
				>
					<AlignJustify />
				</button>
			{/if}
			{#if innerWidth > 768 || expand}
				<TabGroup
					justify="justify-end"
					active="variant-filled-primary"
					hover="hover:variant-soft-primary"
					flex="flex-1 lg:flex-none"
					rounded="rounded-md"
					border=""
					class="header-tab-group !bg-transparent w-full !overflow-visible"
				>
					{#if data.accessToken && data.userData?.role.id != Roles.ADMIN}
						<div class="flex items-center">
							<span class="type-point-hidden"
								>Điểm {user.workAt?.typePoint == 'TP' ? 'giao dịch' : 'tập kết'}&nbsp;</span
							>
							<span class="type-point-display text-primary-500">{user.workAt?.name}</span>
						</div>
					{/if}
					<TabAnchor href="/" class="ml-3">
						<span class="link-nav flex"> Tin tức &nbsp;<Newspaper size={20} /> </span>
					</TabAnchor>

					{#if data.accessToken}
						<TabAnchor href={manageRoute} class="ml-3">
							<span class="link-nav flex"> Quản lý &nbsp;<FileText size={20} /></span>
						</TabAnchor>
						<TabAnchor class="tab-profile ml-3 !p-0">
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
			{/if}
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

	@media (max-width: 768px) {
		:global(.header-tab-group > .tab-list) {
			position: absolute;
			right: 12px;
			top: 64px;
			display: flex;
			flex-direction: column;
			z-index: 2;
			background-color: rgb(var(--color-tertiary-300) / var(--tw-bg-opacity));
			border-radius: 0.5rem;
			box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		}
		.type-point-hidden {
			display: none;
		}
		.type-point-display {
			padding: 0.5rem 1rem;
			margin-left: 0.75rem;
		}
		:global(.tab-profile) {
			text-align: start;
		}
	}
</style>
