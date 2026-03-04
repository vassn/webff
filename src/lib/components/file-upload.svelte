<script lang="ts">
	import type { FileState } from '$lib/utils/utils';
	import { Upload } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	let { onUpload }: { onUpload: (files: FileState[]) => void | Promise<void> } = $props();

	let isDragged = $state(false);

	function handleUpload(files: File[]) {
		if (files.length) onUpload(files.map((file) => ({ input: file, status: 'idle' })));
		else toast.error('Error while trying to upload files');
	}

	function handleChange(event: Event) {
		event.preventDefault();
		isDragged = false;
		handleUpload(Array.from((event.target as HTMLInputElement).files ?? []));
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragged = false;
		if (event.dataTransfer?.files) handleUpload(Array.from(event.dataTransfer.files ?? []));
	}

	function handleDragover(event: DragEvent) {
		event.preventDefault();
		isDragged = true;
	}
</script>

<label
	ondrop={handleDrop}
	ondragover={handleDragover}
	ondragleave={() => (isDragged = false)}
	for="file_upload"
	class={[
		'z-40 flex h-90 w-full max-w-3xl flex-col items-center justify-center rounded-lg border border-dashed select-none hover:border-foreground',
		isDragged ? 'border-foreground' : 'border-muted-foreground'
	]}>
	<Upload class="size-8 text-muted-foreground" />
	<div class="py-4 text-lg font-medium">Upload Files</div>
	<div class="text-sm text-muted-foreground">Drag and drop or click to upload</div>
	<div class="text-sm text-muted-foreground">Accepts files up to 500MB in size.</div>
</label>

<input onchange={handleChange} id="file_upload" type="file" multiple class="hidden" />
