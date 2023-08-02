// refactor the Post1 code to use "props" instead: 
export default function Post3(props) { // SSG
  return (
    <>
      <h2>Post3 Component</h2>
      <p>Week 4 - Fetching API Data for Pre-Rendered HTML (The getStaticProps function in index.js always runs on the server and the Post page with the "props" (post data) is pre-rendered on server)</p>
    
      <strong>User ID:</strong> {props.post?.userId}<br />
      <strong>Title:</strong> {props.post?.title}<br />
      <strong>Body:</strong> {props.post?.body}<br />
    </>
  )
}