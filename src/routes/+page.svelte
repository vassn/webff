<script lang="ts">
	import { Clapperboard, Computer, Cpu, Globe, Image, Minimize, Music, PanelsTopLeft, Shield } from '@lucide/svelte';
</script>

<svelte:head>
	<title>WebFF | Home</title>
</svelte:head>

<section class="pt-12 text-center">
	<h1 class="pb-6 text-5xl font-semibold tracking-tight">Private In-Browser Media Converter</h1>
	<p class="mx-auto max-w-[60ch] text-lg text-muted-foreground">
		Securely convert and optimize your files without ever uploading them to a server. No ads, no tracking, no server
		limits, no artificial wait times.
	</p>
</section>

<section class="mx-auto grid max-w-5xl grid-cols-1 gap-4 pt-12 md:grid-cols-2 lg:grid-cols-3 lg:pt-16">
	<a
		href="/image-converter"
		class="rounded-lg border border-l-4 border-l-primary bg-card p-4 font-medium shadow-lg duration-150 hover:border-primary">
		<div class="mb-2.5 flex items-center gap-2.5">
			<Image /> <span class="text-lg">Image Converter</span>
		</div>
		<p class="text-sm text-muted-foreground">
			Convert images to any popular format, such as JPEG, PNG, WebP, GIF, TIFF, or BMP.
		</p>
	</a>

	<a
		href="/video-converter"
		class="rounded-lg border border-l-4 border-l-primary bg-card p-4 font-medium shadow-lg duration-150 hover:border-primary">
		<div class="mb-2.5 flex items-center gap-2.5">
			<Clapperboard /> <span class="text-lg">Video Converter</span>
		</div>
		<p class="text-sm text-muted-foreground">
			Convert videos to any popular format, such as MP4, MOV, MKV, WebM, AVI, or WMV.
		</p>
	</a>

	<a
		href="/audio-converter"
		class="rounded-lg border border-l-4 border-l-primary bg-card p-4 font-medium shadow-lg duration-150 hover:border-primary">
		<div class="mb-2.5 flex items-center gap-2.5">
			<Music /> <span class="text-lg">Audio Converter</span>
		</div>
		<p class="text-sm text-muted-foreground">Convert audio to any popular format, such as MP3, WAV, FLAC, or OGG.</p>
	</a>

	<a
		href="/web-optimizer"
		class="rounded-lg border border-l-4 border-l-primary bg-card p-4 font-medium shadow-lg duration-150 hover:border-primary">
		<div class="mb-2.5 flex items-center gap-2.5">
			<Globe /> <span class="text-lg">Web Optimizer</span>
		</div>
		<p class="text-sm text-muted-foreground">Convert images and videos into optimized WebP and WebM formats.</p>
	</a>

	<div class="rounded-lg border border-l-4 border-l-primary bg-card p-4 font-medium shadow-lg duration-150">
		<div class="mb-2.5 flex items-center gap-2.5">
			<Minimize /> <span class="text-lg">Video Compressor</span>
		</div>
		<p class="text-sm text-muted-foreground italic">Work in progress.</p>
	</div>
</section>

<hr class="mx-auto mt-32 mb-12 max-w-6xl" />

<section class="mx-auto grid max-w-4xl grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
	<div class="p-6">
		<p class="flex items-center justify-center gap-2.5">
			<Shield class="size-6" />
			<span class="text-lg font-bold">100% Private</span>
		</p>
		<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
			Files never leave your device. Since processing happens entirely in-browser, your data is never uploaded, stored,
			or shared with anyone.
		</p>
	</div>

	<div class="p-6">
		<p class="flex items-center justify-center gap-2.5">
			<Computer class="size-6" />
			<span class="text-lg font-bold">Fully Local</span>
		</p>
		<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
			Skip the wait for slow uploads. Conversions start instantly because everything happens on your own computer, not a
			distant server.
		</p>
	</div>

	<div class="p-6">
		<p class="flex items-center justify-center gap-2.5">
			<PanelsTopLeft class="size-6" />
			<span class="text-lg font-bold">Simple UI</span>
		</p>
		<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
			No ads, no popups, just clean, straightforward tools designed to help you get your work done without any
			distractions.
		</p>
	</div>

	<div class="p-6">
		<p class="flex items-center justify-center gap-2.5">
			<Cpu class="size-6" />
			<span class="text-lg font-bold">Powerful Tech</span>
		</p>
		<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
			Built on FFmpeg and WebAssembly. Professional-grade media tools running directly in your browser with no software
			or plugins to install.
		</p>
	</div>
</section>

<hr class="mx-auto mt-12 mb-32 max-w-6xl" />

<section id="faqs" class="text-center">
	<h2 class="text-4xl font-semibold tracking-widest">FAQs</h2>
</section>

<section class="pt-6 text-center">
	<p>Work in progress.</p>
</section>
