// export default function Hello() {
//     return <p>Hello World!</p>
// }

// the component that accepts "props"
export default function Hello(props) {
    return (
      <>
        <h2>Hello Component</h2>
        <p>Week 3 - Component: Accepting "Props"</p>
        <p>Hello {props.fName} {props.lName}! <img src={props.avatarUrl} alt="" /></p>
      </>
      
    );
}

Hello.defaultProps = {
    fName: 'First Name',
    lName: 'Last Name',
};