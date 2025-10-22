import React, { useState, useEffect } from 'react';

function User() {
    const [user, setUser] = useState([]); // Properly declare state
    
    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => setUser(data)) // Update state with fetched data
            .catch(error => console.error('Error fetching user data:', error));
    }, []); // Empty dependency array to run this effect only once

    return (
        <div>
            {user.map((user) => (
                <div key={user._id}>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                </div>
            ))}
        </div>
    );
}

export default User;
