export function formatDate(date: string) {
	// Format time as "hh:mm"
	const time = new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

	// Format date as "dd/MM/yyyy"
	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	return `${time}/ ${formattedDate}`;
}
