## What is the difference between Component and PureComponent? give an example where it might break my app.
- React component is that a React component doesn’t implement shouldComponentUpdate() by default, while Pure component does
- It could break the app when uses chidlren props

## Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

- Because of the way  shouldComponentUpdate changes the rendering part of the component tree, this could block the context propagation

## Describe 3 ways to pass information from a component to its PARENT.

- Pass a function as a prop to the Child component.
- Using a context

## Give 2 ways to prevent components from re-rendering.

-  Memoization using useMemo() and UseCallback() Hooks

## What is a fragment and why do we need it? Give an example where it might break my app.

- it affects the overall component rendering time

## Give 3 examples of the HOC pattern.

- Redux's connect 
- Relay's createContainer
- Reusing logic

## what's the difference in handling exceptions in promises, callbacks andasync...await.

- Promises: promise.catch(e => {})
- Callbacks : try {} catch {}

## How many arguments does setState take and why is it async.

- it takes two arguments
- Because it can result in an expensive operation

## List the steps needed to migrate a Class to Function Component.

- Change the class keyword to function and remove the extends React.Component part
- Place the contents of the render() method in the function body
- Convert all other methods on the class to stand-alone functions
- Remove the constructor function
- Inline any props into the function declaration using object destructuring
- Get rid of any use of this. to reference methods or variables

## List a few ways styles can be used with components.

- Add the Global Styles to “index.html” File
- Create a Style for Each Individual Component
- Adding Inline Style to React Component Elements
- Attach style property to JavaScript Style Object

## How to render an HTML string coming from the server.

- You can use dangerouslySetInnerHTML attributes to render your html strings.








