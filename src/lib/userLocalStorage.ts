export function setUserStorage(data: any) {
	console.log('🚀 ~ file: userLocalStorage.ts:2 ~ setUserStorage ~ data:', data);
	localStorage.setItem('user', JSON.stringify(data));
}

export function getUserStorage() {
	const user = localStorage.getItem('user');
	if (!user) {
		return null;
	}
	return JSON.parse(user);
}
