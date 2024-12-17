export const post = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}