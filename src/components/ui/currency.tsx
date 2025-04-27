export default function Currency({ value }: { value: number }) {
	return (
		<span className={value > 0 ? 'text-emerald-400' : 'text-red-500'}>
			{value.toLocaleString('en-US', {
				style: 'currency',
				currency: 'INR',
			})}
		</span>
	);
}
