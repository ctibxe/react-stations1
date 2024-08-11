import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ThreadList() {
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        fetch('https://railway.bulletinboard.techtrain.dev/threads?offset=0')
            .then(response => response.json())
            .then(data => setThreads(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <div>
            <h1>Thread List</h1>
            {/*ここでボタン作成*/}
            <Link to="/threads/new">
                <button>Create New Thread</button>
            </Link>
            {/*ここで表の作成*/}
            <ul>
                {threads.map(thread => (
                    <li key={thread.id}>
                        <h2>{thread.title}</h2>
                        <p>{thread.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ThreadList;