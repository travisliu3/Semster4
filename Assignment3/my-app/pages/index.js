import Hello from '../components/Hello';
import Clock from '../components/Clock';
import Child from '../components/Child';

import ClickCounter from '../components/ClickCounter';
import Post1 from '../components/Post1';
import Post2 from '../components/Post2';
import Post3 from '../components/Post3';
import List from '../components/List';

// This function gets called at build time and executed on the server side
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await res.json();

  return { props: { staticPost: data } }; // the function that returns a promise is often written using the async / await syntax
}

export default function Home(props) { // "props" added for the Post component

  function handleMessage(msg){ // for Week 3 Child component
    console.log(`Child Says: ${msg}`)	
  }	

  return (
    <>
      <ClickCounter />
      <hr />

      <Post1 />
      <hr />
      <Post2 />
      <hr />
      <Post3 post={props.staticPost} />
      <hr />

      <List />
      <hr />

      {/* Week 3 components: */}

      {/* <Hello />
      <Hello></Hello> */}
      <Hello fName="Jason" lName="Perez" avatarUrl="https://reqres.in/img/faces/2-image.jpg"/>
      <hr />
      
      <Clock locale="en-CA" />
      <hr />

      <Child sendMessage={handleMessage}/>
      <hr />

    </>
  )
}
