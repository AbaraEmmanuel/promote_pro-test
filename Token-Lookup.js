const { ethers } = require('ethers');
const readline = require('readline');

// Replace this with your actual Infura project ID
const INFURA_PROJECT_ID = '48ae4003554c43cdaa490562d2160257';

// Standard ERC20 ABI to interact with the contract
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

// Set up readline to get user input from the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to format large numbers with commas
function formatNumberWithCommas(value) {
  return new Intl.NumberFormat().format(value);
}

// Function to fetch token details from the provided contract address
async function getTokenDetails(contractAddress) {
  const infuraUrl = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;
  const provider = new ethers.JsonRpcProvider(infuraUrl);
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  try {
    // Fetch token details
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const rawTotalSupply = await contract.totalSupply();

    // Convert the total supply based on decimals (ethers.js v6)
    const totalSupply = ethers.formatUnits(rawTotalSupply, decimals); // Updated format

    // Format the totalSupply with commas
    const formattedTotalSupply = formatNumberWithCommas(totalSupply);

    console.log(`
        Token Details:
        Name: ${name}
        Symbol: ${symbol}
        Decimals: ${decimals}
        Total Supply: ${formattedTotalSupply}
    `);
  } catch (error) {
    console.error('Error fetching token details:', error);
  }

  rl.close();
}

// Prompt user for contract address
rl.question('Enter the token contract address: ', (contractAddress) => {
  getTokenDetails(contractAddress.trim());
});
