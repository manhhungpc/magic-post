import rmAccent from 'remove-accents';

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

export function removeAccents(string: string) {
	const result = rmAccent(string);
	return result;
}

export function removeNullQueries(query: URLSearchParams) {
	const filterQuery = new URLSearchParams();
	for (let [key, value] of query.entries()) {
		if (value != 'null' && value != '') filterQuery.append(key, value);
	}

	return filterQuery;
}

export function mergeQueries(query1: URLSearchParams, query2: URLSearchParams) {
	for (let [key, val] of query2.entries()) {
		query1.set(key, val);
	}

	return removeNullQueries(query1).toString();
}
