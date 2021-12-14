import {useState, useEffect} from 'react'


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
