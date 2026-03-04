<script lang="ts">
	import ConversionProgress from '$lib/components/conversion-progress.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { Spinner } from '$lib/components/ui/spinner';
	import { Check, Download, X } from '@lucide/svelte';

	let state = 2;
</script>

<section class="mt-12 flex justify-center">
	<ConversionProgress files={[]} reset={() => {}} />
</section>

<section class="mt-24 flex justify-center">
	<!---->
	<div class="w-full max-w-lg rounded-lg bg-card p-4">
		{#if state === 0}
			<!-- Loading FFmpeg -->
			<div class="my-2 flex items-center justify-center gap-2">
				<Spinner class="size-6" />
				<span class="font-medium tracking-wide">Loading FFmpeg</span>
			</div>
		{:else if state === 1}
			<!-- Converting -->
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<Spinner class="size-6" />
					<span class="text-sm font-medium">Converting files...</span>
				</div>

				<div class="flex items-center gap-4">
					<span class="text-sm font-medium text-muted-foreground tabular-nums">1 / 1</span>
					<Button variant="outline">
						<X /> Cancel
					</Button>
				</div>
			</div>

			<div class="mt-6">
				<Progress value={100} class="animate-pulse" />
			</div>
		{:else if state === 2}
			<!-- Done -->
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<Check class="size-5" />
					<span class="text-sm font-medium">Conversion finished</span>
				</div>

				<Button>
					{#if false}
						<Spinner />
					{:else}
						<Download />
					{/if}
					Download files
				</Button>
			</div>
		{/if}
	</div>
	<!---->
</section>
