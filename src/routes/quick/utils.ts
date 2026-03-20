import { ffcore } from '$lib/utils/ffcore.svelte';
import { getFileBaseName, type FileState } from '$lib/utils/utils';
import { toast } from 'svelte-sonner';

// Validation

export function isUploadValid(files: FileState[]): boolean {
	// 5e8 => 5*10^8 bytes => 500MB limit per file
	if (!files.every((file) => file.input.size < 5e8)) {
		toast.error('Each uploaded file must be under 500MB');
		return false;
	}

	const baseType = files[0].input.type.split('/')[0];

	if (!files.every((file) => file.input.type.split('/')[0] === baseType)) {
		toast.error('All uploaded files must share the same media type');
		return false;
	}

	if (!['image', 'video', 'audio'].includes(baseType)) {
		toast.error("An uploaded file's media type is not supported");
		return false;
	}

	return true;
}

// Options

type Format = {
	label: string;
	extension: string;
	options: string[];
	mime?: 'image/png' | 'image/jpeg';
};

const x264Options = [
	'-c:v',
	'libx264',
	'-preset',
	'superfast',
	'-crf',
	'23',
	'-vf',
	'scale=trunc(iw/2)*2:trunc(ih/2)*2',
	'-c:a',
	'aac',
	'-b:a',
	'128k',
	'-sn',
	'-dn',
	'-threads',
	'4'
];

const formats: Record<string, Format[]> = {
	video: [
		{ label: 'MP4', extension: '.mp4', options: x264Options },
		{ label: 'MOV', extension: '.mov', options: x264Options },
		{ label: 'MKV', extension: '.mkv', options: x264Options },
		{
			label: 'AVI',
			extension: '.avi',
			options: [
				'-c:v',
				'mpeg4',
				'-vtag',
				'xvid',
				'-q:v',
				'5',
				'-c:a',
				'libmp3lame',
				'-b:a',
				'128k',
				'-sn',
				'-dn',
				'-threads',
				'4'
			]
		},
		{
			label: 'WMV',
			extension: '.wmv',
			options: ['-c:v', 'wmv2', '-q:v', '5', '-c:a', 'wmav2', '-b:a', '128k', '-sn', '-dn', '-threads', '4']
		}
	],
	image: [
		{ label: 'JPEG', extension: '.jpeg', options: [], mime: 'image/jpeg' },
		{ label: 'PNG', extension: '.png', options: [], mime: 'image/png' },
		{ label: 'GIF', extension: '.gif', options: [] },
		{ label: 'TIFF', extension: '.tiff', options: [] },
		{ label: 'BMP', extension: '.bmp', options: [] }
	],
	audio: [
		{ label: 'MP3', extension: '.mp3', options: ['-c:a', 'libmp3lame', '-q:a', '4'] },
		{ label: 'WAV', extension: '.wav', options: ['-c:a', 'pcm_s16le'] },
		{ label: 'FLAC', extension: '.flac', options: ['-c:a', 'flac'] },
		{ label: 'OGG', extension: '.ogg', options: ['-c:a', 'libvorbis', '-q:a', '4'] }
	]
};

export function getFormats(files: FileState[]): Format[] {
	if (!files.length) return [];
	const category = files[0].input.type.split('/')[0];
	return formats[category] ?? [];
}

// Conversion

export async function convert(files: FileState[], targetLabel: string): Promise<void> {
	const targetFormat = getFormats(files).find((f) => f.label === targetLabel)!;

	for (const file of files) {
		try {
			file.status = 'converting';
			const outputName = getFileBaseName(file.input) + targetFormat.extension;

			if (targetFormat.mime) {
				await convertImage(file, targetFormat.mime);
			} else {
				file.output = await ffcore.transcode(file.input, targetFormat.options, outputName);
			}

			file.status = 'done';
		} catch (error) {
			file.status = 'error';
			if (!targetFormat.mime) {
				await ffcore.load();
			}
		}
	}
}

async function convertImage(file: FileState, mime: 'image/png' | 'image/jpeg'): Promise<void> {
	const extension = mime.split('/')[1];
	const bitmap = await createImageBitmap(file.input);
	const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	const ctx = canvas.getContext('2d')!;
	if (mime === 'image/jpeg') {
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	ctx.drawImage(bitmap, 0, 0);
	bitmap.close();
	const blob = await canvas.convertToBlob({ type: mime, ...(mime === 'image/jpeg' && { quality: 0.92 }) });
	file.output = new File([blob], `${getFileBaseName(file.input)}.${extension}`);
}
