import fetch from "node-fetch";
import { address } from "./address.js";

async function fetchData() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36:"
    }

    console.log(`\nMulai Mengeksekusi script..\n`)

    for (let i = 0; i < address.length; i++) {
        try {
            let response = await fetch(`https://swaprum.finance/server/claim-free?address=${address[i]}`, {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
        
    }
    console.log(`\n####################################`)
    console.log(`\nClaim Selesai\n`)
    console.log(`####################################\n`)
    Timer()
}

async function Timer() {
const currentTimestamp = Date.now()
const calc = 60 * 60 * 1000 
const targetTimestamp = currentTimestamp + calc 
const oneSecond = 1000 
let timeLeft = targetTimestamp - currentTimestamp
let timer = timeLeft / 1000 / 60

const intervalId = setInterval(() => {
    timeLeft -= oneSecond
    console.log(
        Math.floor(timeLeft / 1000 / 60 / 60),
        'Jam',
        Math.floor((timeLeft / 1000 / 60) % 60),
        'Menit',
        Math.floor((timeLeft / 1000) % 60),
        'Detik remaining...'
    )
}, oneSecond)

if (timeLeft >= 3600000) {
    let hours = Math.floor(timeLeft / 1000 / 60 / 60)
    console.log('Script akan dieksekusi lagi pada', hours, 'Jam')

    setTimeout(() => {
        clearInterval(intervalId)
        main(`${hours} Jam`)
    }, timeLeft)
} else if (timeLeft >= 60000 && timeLeft < 3600000) {
    console.log('Script akan dieksekusi lagi pada', timer, 'menit')
    setTimeout(() => {
        clearInterval(intervalId)
        main(`${timer} menit`)
    }, timeLeft)
} else if (timeLeft < 60000) {
    let second = timeLeft / 1000
    console.log('Script akan dieksekusi lagi pada', second, 'detik')
    setTimeout( async () => {
        clearInterval(intervalId)
        await fetchData();
    }, timeLeft)
}
}

fetchData()
