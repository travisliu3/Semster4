import { useState, useEffect } from "react";

export default function Post1() { // CSR

  const [post, setPost] = useState(); // or useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/1`).then(res => res.json()).then(data => {
      setPost(data);
    })
  }, []);

  if (!post) return <p>No post data</p> 

  return (
    <>
      <h2>Post1 Component</h2>
      <p>Week 4 - Fetching API Data after Hydration (Client-side data fetching using "useEffect(fetch(...))" )</p>

      <strong>User ID:</strong> {post?.userId}<br />
      <strong>Title:</strong> {post?.title}<br />
      <strong>Body:</strong> {post?.body}<br />
    </>
  )
}