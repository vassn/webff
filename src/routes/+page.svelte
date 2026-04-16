<script lang="ts">
	import {
		CircleQuestionMark,
		Clapperboard,
		Computer,
		Cpu,
		Globe,
		Image,
		Minimize,
		Music,
		PanelsTopLeft,
		Shield
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>WebFF | Home</title>
</svelte:head>

<section class="space-y-4 pt-12 text-center lg:space-y-6">
	<h1 class="text-4xl font-semibold tracking-tight lg:text-5xl">Private In-Browser Media Converter</h1>
	<p class="mx-auto max-w-[60ch] text-base text-muted-foreground lg:text-lg">
		Securely convert and optimize your files without ever uploading them to a server. No ads, no tracking, no server
		limits, no artificial wait times.
	</p>
</section>

<section class="mx-auto max-w-3xl pt-12 lg:pt-16 xl:max-w-5xl">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
			<p class="text-sm text-muted-foreground">Work in progress.</p>
		</div>

		<a
			href="/#about"
			class="rounded-lg border border-l-4 bg-card p-4 font-medium shadow-lg duration-150 hover:border-muted-foreground">
			<div class="mb-2.5 flex items-center gap-2.5">
				<CircleQuestionMark /> <span class="text-lg">About WebFF</span>
			</div>
			<p class="text-sm text-muted-foreground">
				Learn more about the site, how it works, and what technologies it uses.
			</p>
		</a>
	</div>
</section>

<section class="mx-auto max-w-4xl gap-4 pt-36 lg:gap-6 lg:pt-48">
	<div class="grid grid-cols-1 lg:grid-cols-2">
		<div class="p-6">
			<p class="flex items-center justify-center gap-2.5">
				<Shield class="size-6" />
				<span class="text-lg font-bold">100% Private</span>
			</p>
			<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
				Files never leave your device. Since processing happens entirely in-browser, your data is never uploaded,
				stored, or shared with anyone.
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
				<Computer class="size-6" />
				<span class="text-lg font-bold">Fully Local</span>
			</p>
			<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
				Skip the wait for slow uploads. Conversions start instantly because everything happens on your own computer, not
				a distant server.
			</p>
		</div>

		<div class="p-6">
			<p class="flex items-center justify-center gap-2.5">
				<Cpu class="size-6" />
				<span class="text-lg font-bold">Powerful Tech</span>
			</p>
			<p class="mx-auto max-w-prose pt-4 text-center text-muted-foreground">
				Built on FFmpeg and WebAssembly. Professional-grade media tools running directly in your browser with no
				software or plugins to install.
			</p>
		</div>
	</div>
</section>

<section id="about" class="mt-12 pt-24 lg:pt-36">
	<h2 class="flex justify-center text-4xl font-semibold tracking-wide">
		About Web <span class="text-primary">FF</span>
	</h2>
</section>

<section class="mx-auto max-w-prose space-y-8 pt-8">
	<p class="text-center">Work in progress.</p>
</section>
