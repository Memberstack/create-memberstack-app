/**
 * Use the `expression` prop with the `<Switch>` component to conditionally render
 * certain elements.
 * When an `<Switch>` compares a value from it's children's `case` prop
 * and the comparison is "truthy" - it only renders that matching child.
 * When the comparison is "falsey", it continues through the children until it finds
 * a match, or renders the `fallback` prop.
 **/

const Switch = props => {
  var hasFallback = props.hasOwnProperty('fallback');
  var hasExpression = props.hasOwnProperty('expression');
  if (!hasExpression || !hasFallback) {
    throw new Error('<Switch> requires both an `expression` prop and a `fallback` prop.');
  }

  return (
    props.children.find(child => {
      if (!child.props.hasOwnProperty('case')) {
        throw new Error('Children of <Switch> require a `case` prop.');
      }
      return child.props.case === props.expression;
    }) || props.fallback
  );
};

export default Switch;
