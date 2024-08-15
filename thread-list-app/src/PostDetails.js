import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
    const { threadId } = useParams(); // URLからthread_idを取得
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts?offset=20`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    console.error('Unexpected API response:', data);
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, [threadId]);

    
    return (
        <div>
            <h1>Posts in Thread {threadId}</h1>
            <ul>
                {posts.map(posts => (
                    <li key={posts.id}>
                        <h2>{posts.post}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostDetails;
