import rmAccent from 'remove-accents';

export function formatDate(date: string) {
	// Format time as "hh:mm"
	const time = new Date(date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

	// Format date as "dd/MM/yyyy"
	const formattedDate = new Date(date).toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	return `${time} | ${formattedDate}`;
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

export function mergeQueries(currentQuery: URLSearchParams, nextQuery: URLSearchParams) {
	if (currentQuery.get('pageNumber')) {
		currentQuery.set('pageNumber', '1');
	}
	for (let [key, val] of nextQuery.entries()) {
		currentQuery.set(key, val);
	}

	return removeNullQueries(currentQuery).toString();
}

export function hasEmptyField(obj: any) {
	for (const key in obj) {
		const value = obj[key];
		if (
			!value || // Check for undefined, null, empty string, or 0
			(typeof value === 'object' && (value.length === 0 || hasEmptyField(value))) // Check for empty arrays or objects
		) {
			return true;
		}
	}
	return false;
}
