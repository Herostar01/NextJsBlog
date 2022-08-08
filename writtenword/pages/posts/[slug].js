

import styles from '../styles/Slug.module.css'

import {GraphQLClient, gql} from 'graphql-request'


const graphcms = new GraphQLClient("https://api-us-west-2.hygraph.com/v2/cl6fw6sf22pjo01unhk0ydsv5/master")

const QUERY = gql `
    query Post($slug: String!){
        post(where: {slug: $slug}){
            id, 
            title,
            slug,
            datePublished,
            author{
                id,
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
        }
    }
`;


export async function getStaticProps(){
  const {posts} = await graphcms.request(QUERY);
  return{
    props: {
      posts,
    },
    revalidate: 10,
  };
}