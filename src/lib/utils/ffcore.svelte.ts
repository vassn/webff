import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

class Converter {
	public ffmpeg?: FFmpeg;
	public state = $state<'undefined' | 'loading' | 'loaded'>('undefined');
	public currentType = $state('');
	public progress = $state(0);

	async load() {
		if (this.state === 'loading') return;
		this.state = 'loading';

		try {
			if (this.ffmpeg) {
				this.ffmpeg.terminate();
				this.ffmpeg = undefined;
				await new Promise((resolve) => setTimeout(resolve, 100));
			}

			const ffmpeg = new FFmpeg();
			const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.10/dist/esm';

			await ffmpeg.load({
				coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
				wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
				workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
			});

			this.progress = 0;
			ffmpeg.on('progress', (event) => {
				this.progress = Math.min(100, Math.max(0, event.progress * 100));
			});

			this.ffmpeg = ffmpeg;
			this.state = 'loaded';
			console.log(`FFmpeg loaded successfully.`);
		} catch (e) {
			this.state = 'undefined';
			console.error('FFmpeg failed to load:', e);
		}
	}

	async transcode(file: File, args: string[], outputName: string) {
		const ffmpeg = this.ffmpeg;
		if (!ffmpeg) return;

		this.currentType = file.type.split('/')[0];

		try {
			await ffmpeg.writeFile(file.name, await fetchFile(file));
			await ffmpeg.exec(['-i', file.name, ...args, outputName]);

			const data = await ffmpeg.readFile(outputName);
			const fileData = typeof data === 'string' ? data : (data as ArrayBufferView<ArrayBuffer>);

			await ffmpeg.deleteFile(file.name);
			await ffmpeg.deleteFile(outputName);

			return new File([new Blob([fileData])], outputName);
		} catch (err) {
			console.warn(err);
			await this.load();
		}
	}
}

export const ffcore = new Converter();
