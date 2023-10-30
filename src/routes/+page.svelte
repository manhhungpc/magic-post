<script lang="ts">
	import { onMount } from 'svelte';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Typed from 'typed.js';

	const services = [
		{
			name: 'Transport',
			icon: `<i class="fa-solid fa-truck-fast"></i>`
		},
		{
			name: 'Find sites',
			icon: `<i class="fa-solid fa-magnifying-glass-location"></i>`
		},
		{
			name: 'Tracking',
			icon: `<i class="fa-solid fa-map-location-dot"></i>`
		},
		{
			name: 'Invoices',
			icon: `<i class="fa-solid fa-receipt"></i>`
		},
		{
			name: 'Statistics',
			icon: `<i class="fa-solid fa-chart-line"></i>`
		},
		{
			name: 'Customer Services',
			icon: `<i class="fa-solid fa-headset"></i>`
		}
	];
	let tabSet: number = 0;

	onMount(() => {
		new Typed('.type-writing', {
			strings: ['fast.', 'economical.', 'reliable.', 'flexible.'],
			startDelay: 1200,
			typeSpeed: 50,
			backSpeed: 50,
			loop: true
		});
	});
</script>

<main>
	<div class="home">
		<div class="slogan">
			<h1 class="h1 mb-12">
				Move ahead with <span class="text-primary-400">speed</span> and
				<span class="text-primary-400">ease</span>.
			</h1>
			<h1 class="h1 mb-12">
				Let our team of experts handle the details, so you can focus on what matters the most:
				<span class="text-primary-400">your business and customers.</span>
			</h1>
			<h1 class="h1 mb-12">Our service is <span class="type-writing text-amber-600" /></h1>
			<div class="w-full flex gap-5">
				<button type="button" class="btn btn-xl variant-filled hover:variant-filled-primary">
					Our services &nbsp;<i class="fa-solid fa-down-long" />
				</button>
			</div>
		</div>
		<div class="relative top-0 left-0">
			<div class="bg-color" />
			<img src="/img/bg-transport.jpg" alt="bg" class="bg-pic" />
		</div>
	</div>

	<div class="services">
		<TabGroup justify="justify-center" flex="flex-1 lg:flex-none" class="h-max w-4/5 ">
			<Tab bind:group={tabSet} name="tab1" value={0} class="w-1/2 text-2xl">Track you order</Tab>
			<Tab bind:group={tabSet} name="tab2" value={1} class="w-1/2 text-2xl">Our services</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<div class="w-full p-3 bg-surface-200 rounded-md flex gap-5">
						<input type="text" placeholder="Your order id" class="dui-input dui-input-bordered dui-input-lg w-full" />
						<button type="button" class="btn variant-filled-primary rounded-md w-1/5">Follow</button>
					</div>
				{:else if tabSet === 1}
					<div class="logo-cloud grid-cols-3 gap-2 w-full h-[60vh] [&>.logo-item]:bg-secondary-400">
						{#each services as service}
							<div class="logo-item text-2xl card-hover">
								<div>{@html service.icon}</div>
								<p>{service.name}</p>
							</div>
						{/each}
					</div>
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</main>

<style>
	main {
		overflow-x: hidden;
	}
	.home {
		padding-top: 20px;
		height: calc(100vh - 4rem);

		display: grid;
		grid-template-columns: 1.3fr 1fr;
		overflow: hidden;
	}

	.slogan {
		color: rgba(var(--color-surface-600) / 1);
		font-weight: 900;
		padding: 3.5rem 0 0 1.5rem;
	}

	.bg-color {
		position: relative;
		top: 0;
		left: 0;
		height: 100%;
		max-height: 60rem;
		width: 100%;
		border-radius: 12px 0 0 12px;
		background-image: url(/img/bg-color.svg);
		background-repeat: no-repeat;
		background-attachment: local;
		background-position: center;
		background-size: cover;
	}

	.bg-pic {
		position: absolute;
		top: 15%;
		left: 30px;
		border-radius: 12px 0 0 12px;
	}

	.services {
		height: 100vh;
		display: flex;
		justify-content: center;
		/* align-items: center; */
		padding-top: 100px;
		background-color: rgba(var(--color-surface-50) / 1) !important;
		/* display: grid;
		grid-template-columns: repeat(3, 1fr); */
	}
</style>
