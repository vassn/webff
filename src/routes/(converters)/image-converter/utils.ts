import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, type FileState } from '$lib/utils/utils';

export const formats = [
	{ label: 'JPEG', extension: '.jpeg' },
	{ label: 'PNG', extension: '.png' },
	{ label: 'WEBP', extension: '.webp' },
	{ label: 'GIF', extension: '.gif' },
	{ label: 'TIFF', extension: '.tiff' },
	{ label: 'BMP', extension: '.bmp' }
];

export async function convert(files: FileState[], target: string): Promise<void> {
	for (const file of files) {
		try {
			file.status = 'converting';
			const outputName = getFileBaseName(file.input) + target;

			if (target === '.jpeg' || target === '.png' || target === '.webp') {
				file.output = await convertCanvas(file.input, target, outputName);
			} else {
				file.output = await ffcore.transcode(file.input, [], outputName);
			}

			file.status = 'done';
		} catch (error) {
			file.status = 'error';
			if (target !== '.jpeg' && target !== '.png' && target !== '.webp') {
				await ffcore.load();
			}
		}
	}
}

async function convertCanvas(file: File, format: '.jpeg' | '.png' | '.webp', outputName: string): Promise<File> {
	const bitmap = await createImageBitmap(file);
	const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	const ctx = canvas.getContext('2d')!;

	if (format === '.jpeg') {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	ctx.drawImage(bitmap, 0, 0);
	bitmap.close();

	if (format === '.jpeg') {
		return new File([await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.92 })], outputName);
	} else if (format === '.webp') {
		return new File([await canvas.convertToBlob({ type: 'image/webp', quality: 0.85 })], outputName);
	} /* else if (format === '.png') */ else {
		return new File([await canvas.convertToBlob({ type: 'image/png' })], outputName);
	}
}
