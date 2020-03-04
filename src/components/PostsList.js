import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import PostCard from './PostCard'
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const override = css`
    margin:0 auto;
    text-align:center;
`
const GET_SEARCH_POSTS = gql`
    query getSearchPosts($cursor:String, $searchQuery: String!){
        posts(first:5, after:$cursor, where : {search: $searchQuery}){
            pageInfo{
                endCursor
                hasNextPage
            }
            edges{
                node{
                    postId
                    title
                    excerpt
                    date
                }
            }
            __typename
        }
    }
`;

const PostsList = ({ searchQuery }) => {
    const { loading, error, data, fetchMore } = useQuery(GET_SEARCH_POSTS, {
        variables: { 
            after:null,
            searchQuery
         }
    })

    

    const loadMore = () => {
        
        fetchMore({
            variables:{
                cursor: data.posts.pageInfo.endCursor
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.posts.edges;
                const pageInfo = fetchMoreResult.posts.pageInfo;
                if (!fetchMoreResult) {
                    return prev;
                }
                return {
                    posts: {
                        pageInfo,
                        edges: [...prev.posts.edges, ...newEdges],
                        __typename: "RootQueryToPostConnectionEdge"
                    }

                }
            }
        })
    }

    if (loading) return <div className="alert_box"><BeatLoader size={10} css={override} color={"#01c080"} /> </div>;
    if (error) return <div className="alert_box">오류가 있습니다.</div>;
    if (!data.posts.edges.length) return <div className="alert_box">검색결과가 없습니다.</div>

    return (
        <div>
            {data.posts.edges.map(post => <PostCard key={post.node.postId} post={post} />)}
            {data.posts.pageInfo.hasNextPage && <button onClick={loadMore} className="load_more">더보기</button>}
        </div>
    )

}

export default PostsList
