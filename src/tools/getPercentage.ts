export function getPercentage(num: number, total: number) {
	return ((num / total) * 100).toFixed(2);
}