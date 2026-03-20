function calculateBitrates(targetSizeMB: number, durationSeconds: number): number {
	// Apply a 5% safety margin to ensure we never overshoot the target
	const safeTargetMB = targetSizeMB * 0.95;

	// 1 Megabyte = 8192 Kilobits
	const targetTotalKilobits = safeTargetMB * 8192;

	// Total allowed bitrate (Video + Audio combined) per second
	const totalBitrateKbps = Math.floor(targetTotalKilobits / durationSeconds);

	// We dedicate 128 kbps to our audio stream
	const audioBitrateKbps = 128;

	// The video stream gets whatever is left over
	let videoBitrateKbps = totalBitrateKbps - audioBitrateKbps;

	// Safety fallback: Prevent negative or impossibly low bitrates if the user
	// tries to compress a massive 2-hour movie into 10MB.
	if (videoBitrateKbps < 100) {
		videoBitrateKbps = 100;
	}

	return videoBitrateKbps;
}

// Get duration from an invisible <video> element

const compressionOptions = (videoBitrateKbps: number) => [
	'-c:v',
	'libx264',
	'-b:v',
	`${videoBitrateKbps}k`,
	'-maxrate',
	`${videoBitrateKbps}k`,
	'-bufsize',
	`${videoBitrateKbps * 2}k`,
	'-preset',
	'superfast',
	'-threads',
	'4',
	'-vf',
	'scale=trunc(iw/2)*2:trunc(ih/2)*2',
	'-c:a',
	'aac',
	'-b:a',
	'128k',
	'-sn',
	'-dn'
];
