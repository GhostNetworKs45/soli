import axios from "axios";

async function getGasPrice() {
   const price = await axios.get('https://gasstation-mainnet.matic.network');
   return price;
}

export default getGasPrice;