const BASE_API_URL ="http://localhost:3333"

export async function listQuadras(){
    try {
        const finalUrl = `${BASE_API_URL}/quadra/list`
        const response = await fetch(finalUrl)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return undefined
    }
}