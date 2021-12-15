import {useState, useEffect} from 'react'

/* This file is called when showing code snippets and comments at the homepage to show also who has posted them. */

function FetchUsername({id}) {
    const [users, setUsers] = useState([]);

        /* Find users from the database. */
        useEffect(() => {
            fetch("/users")
            .then(response => response.json())
            .then(json => setUsers(json))
        }, [])


    const name = users.map((user) => {
        if(user._id===id) {
            return <>{user.username}</>
        }
    })
    return (<>{name}</> )
}

export default FetchUsername
