"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";

import Profile from "@components/Profile";

const page = () => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const params = useParams();

    const username = searchParams.get('name');
    const userId = params.id;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();

            setPosts(data);
        }

        if (userId) fetchPosts();
    }, [])

    return (
        <Profile
            name={username}
            desc={`Welcome to ${username} profile page`}
            data={posts}
        />
    )
}

export default page;
