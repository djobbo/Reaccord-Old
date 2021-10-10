import axios from "axios"
import { Br, Span, Text } from "reaccord"
import { useEffect, useState } from "react"
import { Navigation } from "./Navigation"

interface IPost {
    userId: number
    id: number
    title: string
    body: string
}

export const Post = () => {
    const [page, setPage] = useState(1)
    const [post, setPost] = useState<IPost | null>(null)

    const fetchData = async (page: number) => {
        try {
            const res = await axios.get<IPost>(
                `https://jsonplaceholder.typicode.com/posts/${page}`,
            )
            setPost(res.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchData(page)
    }, [page])

    return (
        <>
            {post ? (
                <Text>
                    <Span bold>{post.title}</Span>
                    <Br />
                    {post.body}
                </Text>
            ) : (
                <Text>Loading Post...</Text>
            )}
            <Navigation page={page} setPage={setPage} />
        </>
    )
}
