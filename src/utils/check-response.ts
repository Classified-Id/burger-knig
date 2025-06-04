export const checkResponse = async (res: Response) => {
	if (res.ok) return res.json();
	if (res.status === 403 || res.status === 401) {
		const error = await res.json();
		return Promise.reject(error);
	}
	return Promise.reject(`Ошибка ${res.status}`);
};
