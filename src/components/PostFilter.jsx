import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return(
        <div>
            <MyInput
            placeholder="search"
            value={filter.query}
            onChange={ event => setFilter({...filter, query: event.target.value})}
            />
            <MySelect 
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue='For'
            options={[
                {value: 'title', name: 'title'},
                {value: 'body', name: 'description'}
            ]}
            />        
      </div>
    )
}

export default PostFilter;