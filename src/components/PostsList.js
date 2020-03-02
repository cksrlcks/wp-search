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
    query getSearchPosts($searchQuery: String!){
        posts(where : {search: $searchQuery}){
            edges{
                node{
                    postId
                    title
                    excerpt
                    date
                }
            }
        }
    }
`;

const PostsList = ({ searchQuery }) => {
    const { loading, error, data } = useQuery(GET_SEARCH_POSTS, {
        variables: { searchQuery }
    })

    if (loading) return <div className="alert_box"><BeatLoader size={10} css={override} color={"#01c080"} /> </div>;
    if (error) return <div className="alert_box">오류가 있습니다.</div>;
    if (!data.posts.edges.length) return <div className="alert_box">검색결과가 없습니다.</div>

    return data.posts.edges.map(post => <PostCard key={post.node.postId} post={post} />)

}

export default PostsList
