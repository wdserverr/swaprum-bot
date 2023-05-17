import fetch from "node-fetch";
import { address } from "./address.js";
import cron from "node-cron";

async function fetchData() {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36:"
    }

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
}

// Jadwalkan eksekusi fetchData setiap 1 jam
cron.schedule("0 * * * *", async () => {
    console.log("Fetching data...");
    await fetchData();
});

// Eksekusi fetchData sekali saat menjalankan script
fetchData();
