import { GraphQLClient, gql } from 'graphql-request';
import { tool } from 'ai';
import { z } from 'zod';

const endpoint = `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/HzQEXpsJuq7XQa4zXEJU38aUnG7mgZ6gA74HauHyYZzQ`;
const graphQLClient = new GraphQLClient(endpoint);

const subgraphs = [
  {
    id: "HzQEXpsJuq7XQa4zXEJU38aUnG7mgZ6gA74HauHyYZzQ",
    network: "base-mainnet",
    description: "Silo Finance Base"
  },
  {
    id: "GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz",
    network: "base-mainnet",
    description: "Uniswap V3 Base"
  },
]

export const theGraphTools = {
  getAvailableSubgraphs: tool({
    description: 'Get information about available subgraphs',
    parameters: z.object({
      limit: z.number().optional().describe('Number of subgraphs to fetch, defaults to 5')
    }),
    execute: async ({ limit = 5 }) => {
      return subgraphs.map((subgraph) => `${subgraph.id} - ${subgraph.network} - ${subgraph.description}`).join("\n");
    }
  }),
  getTokens: tool({
    description: 'Get information about tokens from The Graph',
    parameters: z.object({
      limit: z.number().optional().describe('Number of tokens to fetch, defaults to 5')
    }),
    execute: async ({ limit = 5 }) => {
      const query = gql`
        {
          tokens(first: ${limit}) {
            id
            name
            symbol
            decimals
          }
        }
      `;
      const data = await graphQLClient.request(query);
      return JSON.stringify(data);
    }
  }),

  getRewardTokens: tool({
    description: 'Get information about reward tokens from The Graph',
    parameters: z.object({
      limit: z.number().optional().describe('Number of reward tokens to fetch, defaults to 5')
    }), 
    execute: async ({ limit = 5 }) => {
      const query = gql`
        {
          rewardTokens(first: ${limit}) {
            id
            token {
              id
            }
            type
          }
        }
      `;
      const data = await graphQLClient.request(query);
      return JSON.stringify(data);
    }
  }),

  getSubgraphSchema: tool({
    description: 'Get the GraphQL schema for a subgraph',
    parameters: z.object({
      subgraphId: z.string().describe('The ID of the subgraph to fetch the schema for')
    }),
    execute: async ({ subgraphId }) => {
      const query = gql`
        query IntrospectionQuery {
          __schema {
            types {
              name
              description
              fields {
                name
                description
                type {
                  name
                }
              }
            }
          }
        }
      `;
      const endpoint = `https://gateway.thegraph.com/api/${process.env.THE_GRAPH_API_KEY}/subgraphs/id/${subgraphId}`;
      const client = new GraphQLClient(endpoint);
      const data = await client.request(query);
      return JSON.stringify(data, null, 2);
    }
  })
};