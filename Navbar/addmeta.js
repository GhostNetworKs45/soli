export function addmeta(){
const tokenAddress = '0xc00971105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'HelloCoin';
const tokenDecimals = 18;
const tokenImage = 'https://assets.codepen.io/4625073/1.jpeg';

async function addTokenFunction() {

try {
  
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', 
      options: {
        address: tokenAddress, 
        symbol: tokenSymbol, 
        decimals: tokenDecimals, 
        image: tokenImage, 
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('HelloWorld Coin has not been added');
  }
} catch (error) {
  console.log(error);
}
}
}
export addmeta;