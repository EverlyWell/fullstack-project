import React, { useState } from 'react';

import Search from './Search';

import { useLocation } from 'wouter';


export default function SearchContainer(props: any) {
    const [query, setQuery] = useState('gatitos')
    const [path, pushLocation] = useLocation();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(query)

        pushLocation(`/images/${query}`)
        // changeQuery({query: event.target.value});
    }

    const handleChange = (event: any) => {
        console.log(event.target.value)
        setQuery(event.target.value)
    }

    return <Search onSubmit={handleSubmit} value={query} onChange={handleChange} />
}
