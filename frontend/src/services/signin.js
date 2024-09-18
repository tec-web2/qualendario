const BASE_API_URL = "http://localhost:3333";

export async function loginUser(credentials) {
    try {
        const response = await fetch(`${BASE_API_URL}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}