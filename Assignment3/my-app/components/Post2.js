import useSWR from 'swr';

// define the "fetcher" function.  This Can also be defined globally using SWRConfig (https://swr.vercel.app/docs/global-configuration)
const fetcher = (...args) => fetch(...args).then((res) => res.json()); 

export default function Post2() { // SSR

  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts/1', fetcher);

  if (error) return <div>Failed to load</div>

  return (
    <>
      <h2>Post2 Component</h2>
      <p>Week 4 - Fetching API Data after Hydration (Client-side data fetching with recommended SWR - using "useSWR(...)" to replace useState() and "useEffect(fetch(...))" )</p>
      
      <strong>User ID:</strong> {data?.userId}<br />
      <strong>Title:</strong> {data?.title}<br />
      <strong>Body:</strong> {data?.body}<br />
    </>
  );
}