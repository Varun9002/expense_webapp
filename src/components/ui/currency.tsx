export default function Currency({
	value,
	visibleSign,
}: {
	value: number;
	visibleSign?: boolean;
}) {
	return (
		<span className={value >= 0 ? 'text-emerald-400' : 'text-red-500'}>
			{(visibleSign ? value : Math.abs(value)).toLocaleString('en-US', {
				style: 'currency',
				currency: 'INR',
			})}
		</span>
	);
}
