const { request, gql } = require('graphql-request');

// Replace with your actual API key
const apiKey = '7763c26ee4e5841b83b0512ded0ff290';

// Endpoint for querying the subgraph
const endpoint = `https://gateway.thegraph.com/api/${apiKey}/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV`;

// Query to fetch factory and bundle information
const query = gql`
{
  factories(first: 5) {
    id
    poolCount
    txCount
    totalVolumeUSD
  }
  bundles(first: 5) {
    id
    ethPriceUSD
  }
}
`;

async function fetchData() {
  try {
    const data = await request(endpoint, query);
    
    // Formatting the output for better readability
    const ethPrice = parseFloat(data.bundles[0].ethPriceUSD).toFixed(2);
    const factory = data.factories[0];
    const totalVolume = parseFloat(factory.totalVolumeUSD).toLocaleString(undefined, { minimumFractionDigits: 2 });

    console.log(`Current ETH Price: $${ethPrice}`);
    console.log(`Factory ID: ${factory.id}`);
    console.log(`Pool Count: ${factory.poolCount}`);
    console.log(`Total Volume (USD): $${totalVolume}`);
    console.log(`Transaction Count: ${factory.txCount}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to fetch the data
fetchData();
