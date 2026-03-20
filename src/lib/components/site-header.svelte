<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import * as Popover from '$lib/components/ui/popover';
	import { Menu, SquareArrowOutUpRight, SunMoon } from '@lucide/svelte';
	import { mode, setMode, toggleMode } from 'mode-watcher';
	import { MediaQuery } from 'svelte/reactivity';
	import { Button } from './ui/button';
	import Switch from './ui/switch/switch.svelte';

	let isMenuOpen = $state(false);

	const isDesktop = new MediaQuery('min-width: 1024px');

	$effect(() => {
		if (isMenuOpen && isDesktop.current) isMenuOpen = false;
	});

	afterNavigate(() =>
		setTimeout(() => {
			isMenuOpen = false;
		}, 50)
	);

	const isDark = $derived(mode.current === 'dark');

	function handleCheckedChange(checked: boolean) {
		setMode(checked ? 'dark' : 'light');
	}
</script>

<header class="sticky top-0 z-50 w-full bg-background">
	<nav class="h-14 px-4 md:px-8">
		<!-- Desktop View-->
		<div class="hidden h-full items-center justify-between lg:flex">
			<div class="flex items-center gap-0.5">
				<Button variant="ghost" href="/" class="gap-0 text-lg font-bold">
					<span>Web</span>
					<span class="text-primary">FF</span>
				</Button>
				<Button variant="ghost" href="/image-converter">Image Converter</Button>
				<Button variant="ghost" href="/video-converter">Video Converter</Button>
				<Button variant="ghost" href="/audio-converter">Audio Converter</Button>
				<Button variant="ghost" href="/web-optimizer">Web Optimizer</Button>
				<!-- <Button variant="ghost" href="/video-compressor">Video Compressor</Button> -->
			</div>

			<div class="flex items-center">
				<Button variant="ghost" size="icon-lg" onclick={toggleMode}>
					<SunMoon class="size-6" />
				</Button>
			</div>
		</div>

		<!-- Mobile View-->
		<div class="flex h-full items-center justify-between lg:hidden">
			<div class="flex items-center">
				<Button variant="ghost" href="/" class="gap-0 text-lg font-bold">
					<span>Web</span>
					<span class="text-primary">FF</span>
				</Button>
			</div>

			<div class="flex items-center">
				<Button variant="ghost" size="icon-lg" onclick={() => (isMenuOpen = !isMenuOpen)}>
					<Menu class="size-6" />
				</Button>
			</div>
		</div>
	</nav>
</header>

<Popover.Root bind:open={isMenuOpen}>
	<Popover.Trigger />
	<Popover.Content
		class="flex h-(--main-height) w-screen flex-col rounded-none border-none bg-background/90 backdrop-blur"
		preventScroll>
		<div class="px-4 py-2 font-semibold text-muted-foreground">Conversion Tools</div>
		<a href="/quick" class="w-full px-4 py-2 text-2xl font-semibold">Quick Convert</a>
		<a href="/web" class="w-full px-4 py-2 text-2xl font-semibold">Web Optimize</a>
		<div class="w-full px-4 py-2 text-2xl font-semibold text-muted-foreground">Video Compress</div>

		<div class="mt-8 px-4 py-2 font-semibold text-muted-foreground">Other Pages</div>
		<div class="w-full px-4 py-2 text-2xl font-semibold text-muted-foreground">About</div>
		<a
			href="https://github.com/vassn/webff"
			target="_blank"
			class="flex w-full items-center gap-2 px-4 py-2 text-2xl font-semibold">
			<span>GitHub</span>
			<SquareArrowOutUpRight />
		</a>

		<div class="mt-8 px-4 py-2 font-semibold text-muted-foreground">Page Options</div>
		<label
			for="theme-switch"
			class="flex w-full items-center justify-between px-4 py-2 text-start text-2xl font-semibold">
			<span>Dark Mode</span>
			<Switch id="theme-switch" class="scale-125" checked={isDark} onCheckedChange={handleCheckedChange} />
		</label>
	</Popover.Content>
</Popover.Root>

<style>
	:root {
		--main-height: calc(100vh - 3.5rem);
	}
</style>
