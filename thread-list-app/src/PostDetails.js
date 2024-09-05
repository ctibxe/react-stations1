import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetails() {
    const { threadId } = useParams(); // URLからthread_idを取得
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    // 投稿一覧をサーバーから取得する関数
    const fetchPosts = () => {
        fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data.posts)) {
                    setPosts(data.posts);
                } else {
                    console.error('Unexpected API response:', data);
                }
            })
            .catch(error => console.error('Error fetching posts:', error));
    };

    // 初回レンダリング時に投稿一覧を取得
    useEffect(() => {
        fetchPosts();
    }, [threadId]);

    const onChange = (e) => {
        setNewPost(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`, {
            method: "POST", // 既存のデータに新しい投稿を付加する
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ post: newPost }), // 投稿内容をサーバーに送信
        })
            .then(response => response.json())
            .then(data => {
                // 投稿が成功したら投稿一覧を再取得して更新する
                if (data) {
                    fetchPosts(); // 投稿後に最新の投稿を再取得
                    setNewPost(""); // フォームをリセット
                }
            })
            .catch(error => console.error('Error posting new data:', error));
    };

    return (
        <div>
            <h1>Posts in Thread {threadId}</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.post}</h2>
                    </li>
                ))}
            </ul>

            {/* 投稿フォーム */}
            <form style={{ textAlign: "right" }} onSubmit={handleSubmit}>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="投稿しよう！"
                    value={newPost} // フォームの値を連動させる
                    onChange={onChange}
                ></textarea>
                <button type="submit">投稿</button>
            </form>
        </div>
    );
}

export default PostDetails;
