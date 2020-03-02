import React, { useState } from 'react'
import PostsList from './PostsList';
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const deleteInput = () => {
        setSearchQuery('')
    }
    return (
        <div className="post-search">
            <form className="post-search-form" onSubmit={handleSubmit}>
                <div className="frame">
                    <input type="text" name="searchQuery" value={searchQuery} placeholder="포스트를 검색합니다..." onChange={handleInputChange} />
                    {searchQuery.length > 0 ? <button onClick={deleteInput} className="input_icon delete_button"><FontAwesomeIcon icon={faTimes} className="icon delete" /></button> :
                        <button className="input_icon"><FontAwesomeIcon icon={faSearch} className="icon" /></button>
                    }
                </div>
            </form>
            {searchQuery ?
                <div className="post-search-result">
                    <PostsList searchQuery={searchQuery} />
                </div> :
                <div className="placehold">
                    검색어를 입력해주세요
                </div>
            }
        </div>
    )
}

export default PostSearch
