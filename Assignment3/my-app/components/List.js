import { useState, useEffect } from 'react';

export default function List(props) {
    const [users, setUsers] = useState([
        { 'user': 'fred',    'active': false, 'age': 40 },
        { 'user': 'pebbles', 'active': false, 'age': 1  },
        { 'user': 'barney',  'active': true,  'age': 36 }
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{ // used to demo the state "loading"
        setTimeout(() => {
            setLoading( false ); 
        }, 3000);
    }, []); 

    if(loading) return null; 

    // else // not necessary
        return (
            <div >
                <h2>List Component</h2>
                <p>Week 4 - Conditionally Displaying Data</p>

                <b>Logical &amp;&amp; Operator (If)</b>
                { users[0].active && <p>{users[0].user} is Active!</p> }
                { users[2].active && <p>{users[2].user} is Active!</p> }

                <b>Ternary Operator (If-Else)</b>
                {users[0].active ? (
                    <p>{users[0].user} is Active!</p>
                ) : (
                    <p>{users[0].user} is Inactive!</p>
                )}

                <b>Array.map() (Iteration)</b>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Active</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => 
                            <tr key={index}>
                                <td>{user.user}</td>
                                <td>{user.active ? "yes" : "no"}</td>
                                <td>{user.age}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );

}
