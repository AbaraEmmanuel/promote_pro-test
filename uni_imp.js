const axios = require('axios');
const prompt = require('prompt-sync')();

const etherscanApiKey = '71K8AK55JD7APG6KMQYC343SWP4ZCTTUCH'; // Replace with your Etherscan API key
const etherscanApiBase = 'https://api.etherscan.io/api';

// Function to get Ether balance for a given address
async function getEtherBalance(address) {
    try {
        const response = await axios.get(etherscanApiBase, {
            params: {
                module: 'account',
                action: 'balance',
                address: address,
                tag: 'latest',
                apikey: etherscanApiKey,
            },
        });

        const data = response.data;
        if (data.status === '1') {
            const balanceInEther = data.result / 1e18; 
            console.log(`Ether balance for address ${address}: ${balanceInEther} ETH`);
        } else {
            console.error('Error fetching balance:', data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }
}

// Function to get current gas prices
async function getGasFees() {
    try {
        const response = await axios.get(etherscanApiBase, {
            params: {
                module: 'proxy',
                action: 'eth_gasPrice',
                apikey: etherscanApiKey,
            },
        });

        const data = response.data;
        
        if (data.result) { // Check for the result key
            const gasPriceInWei = parseInt(data.result, 16); // Convert hex to decimal (Wei)
            const gasPriceInGwei = gasPriceInWei / 1e9; // Convert Wei to Gwei
            console.log(`Current Ethereum gas price: ${gasPriceInGwei} Gwei`);
        } else {
            console.error('Error fetching gas prices:', data.message || 'Invalid response');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message || error);
    }
}

async function main() {
    const address = prompt('Please enter the Ethereum address: ');
    
    await getEtherBalance(address);
    await getGasFees();
}

main();