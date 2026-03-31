<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import * as Popover from '$lib/components/ui/popover';
	import { Menu, SquareArrowOutUpRight } from '@lucide/svelte';
	import { mode, setMode } from 'mode-watcher';
	import type { ClassValue } from 'svelte/elements';
	import { MediaQuery } from 'svelte/reactivity';
	import { Button } from './ui/button';
	import { Switch } from './ui/switch';

	let { class: classValue, parentHeight }: { class?: ClassValue; parentHeight: number } = $props();

	$effect(() => {
		document.documentElement.style.setProperty('--nav-height', `${parentHeight}px`);
	});

	let isMenuOpen = $state(false);

	const isDesktop = new MediaQuery('min-width: 1024px');

	$effect(() => {
		if (isMenuOpen && isDesktop.current) isMenuOpen = false;
	});

	const isDark = $derived(mode.current === 'dark');

	function handleCheckedChange(checked: boolean) {
		setMode(checked ? 'dark' : 'light');
	}

	afterNavigate(() =>
		setTimeout(() => {
			isMenuOpen = false;
		}, 50)
	);
</script>

<nav class={classValue}>
	<div class="flex h-full items-center justify-between">
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

<Popover.Root bind:open={isMenuOpen}>
	<Popover.Trigger hidden />
	<Popover.Content
		class="mt-(--nav-height) flex h-(--main-height) w-screen flex-col rounded-none border-none bg-background/90 backdrop-blur"
		preventScroll>
		<div class="px-4 py-2 font-semibold text-muted-foreground">Conversion Tools</div>
		<a href="/image-converter" class="w-full px-4 py-2 text-2xl font-semibold">Image Converter</a>
		<a href="/video-converter" class="w-full px-4 py-2 text-2xl font-semibold">Video Converter</a>
		<a href="/audio-converter" class="w-full px-4 py-2 text-2xl font-semibold">Audio Converter</a>

		<div class="mt-8 px-4 py-2 font-semibold text-muted-foreground">Optimization Tools</div>
		<a href="/web-optimizer" class="w-full px-4 py-2 text-2xl font-semibold">Web Optimizer</a>
		<div class="w-full px-4 py-2 text-2xl font-semibold text-muted-foreground">Video Compressor</div>

		<div class="mt-8 px-4 py-2 font-semibold text-muted-foreground">Other Pages</div>
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
		--nav-height: 3.5rem; /* fallback */
		--main-height: calc(100vh - var(--nav-height));
	}
</style>
