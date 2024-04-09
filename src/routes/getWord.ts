const getURL = 'http://localhost:3001/api/getWords?wordSize=fiveletter'

export function randNum(max: number) {
    return Math.floor(Math.random() * max) + 1;
}

const fetchData = async (url: any) => {
    try {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error('response is not ok!');
        }

        let data = await res.json();
        console.log('data fetched!');
        return data;
    } catch (err) {
        console.log('error fetching data: ', err);
        throw err;
    }
};

export async function getAllWords() {

    try {
        const res = await fetchData(getURL);
        if(res && res.length > 0) {
            let words: string[] = [];

            for(let i = 0; i < res.length; i++) {
                words[i] = res[i].words;
            }

            return words;
        } else {
            throw new Error('no word found!');
        }
    } catch (error) {
        console.error('error in fetch data: ', error);
        throw error;
    }
} 