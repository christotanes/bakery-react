import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const SearchComponent = () => {
    const [searchTerms, setSearchTerms] = useState({
        name: '',
        type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchTerms(prevTerms => ({
            ...prevTerms,
            [name]: value
        }));
    };

    const handleSearch = async () => {
        try {
            const queryParams = Object.entries(searchTerms)
                .filter(([key, value]) => value)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');
            
            const queryURL = `/products/search?${queryParams}`;

            const response = await fetch(queryURL);
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                name="name"
                placeholder="Search products by name"
                value={searchTerms.name}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="type"
                placeholder="Search products by type"
                value={searchTerms.type}
                onChange={handleInputChange}
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    );
};

export default SearchComponent;
