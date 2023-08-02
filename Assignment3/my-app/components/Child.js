function Child(props) {
    return (
        <>
            <h2>Child Component</h2>
            <p>Week 3 - Component: Passing message (data) back to parent component</p>
            <button onClick={(e) => props.sendMessage("Hello, Parent")}>Send Message to Parent</button>
        </>
    );
}
  
export default Child;