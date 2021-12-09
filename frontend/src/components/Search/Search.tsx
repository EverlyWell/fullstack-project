import React from 'react';

import './Search.css'

export default function SearchComponent (props: any) {
    const { onSubmit, onChange, value } = props

    return (
        <form onSubmit={onSubmit} className='searchForm'>
            <input type='textbox' onChange={ onChange } value={value} />

            <button> Get more cuteness </button>
        </form>
    )
}
