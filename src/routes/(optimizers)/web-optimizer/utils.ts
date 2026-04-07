import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, getFileType, type FileState } from '$lib/utils/utils';

const generalOptions = ['-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-threads', '4', '-sn', '-dn'];
const webmOptions = ['-c:v', 'libvpx', '-crf', '15', '-cpu-used', '5', '-c:a', 'libvorbis', '-q:a', '4'];

export async function convert(files: FileState[]): Promise<void> {
	for (const file of files) {
		try {
			file.status = 'converting';
			if (getFileType(file.input) === 'image') {
				const outputName = getFileBaseName(file.input) + '.webp';
				const bitmap = await createImageBitmap(file.input);
				const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
				const ctx = canvas.getContext('2d')!;
				ctx.drawImage(bitmap, 0, 0);
				bitmap.close();
				const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.85 });
				file.output = new File([blob], outputName);
			} else {
				const outputName = getFileBaseName(file.input) + '.webm';
				file.output = await ffcore.transcode(file.input, [...generalOptions, ...webmOptions], outputName);
			}
			file.status = 'done';
		} catch (error) {
			file.status = 'error';
			if (getFileType(file.input) === 'video') {
				await ffcore.load();
			}
		}
	}
}
