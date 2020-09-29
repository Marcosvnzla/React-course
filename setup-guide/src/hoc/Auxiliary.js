// aux makes possible rendering adjacent elements without an unnecessary div tag
// also react has this functionality built in with <React.Fragment>

const aux = (props) => {
  return props.children;
};

export default aux;
