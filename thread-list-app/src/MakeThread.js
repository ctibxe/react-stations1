import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"


function MakeThread(){
    const [title, setTitle] = useState("")
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://railway.bulletinboard.techtrain.dev/threads", {
            method: "POST", // 既存のデータに新しいスレッドを付加する。
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title}),
        })
        //クリックした後の動き
        .then(response => {
            if(response.ok){
                navigate('/');//もとのURLに遷移させる
            }else{
                console.error('Failed to create thread')
            }
        })
        .catch(error => console.error('Error', error))
    }

    return(
        <div>
            <h1>Create New Thread</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter thread title" 
                    required 
                />
                <button type="submit">Create Thread</button>
            </form>
        </div>
    )
}

export default MakeThread;