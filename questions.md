1. What is the difference between Component and PureComponent? give an example where it might break
   my app.

On PureComponents, React does a shallow comparison of the props with “shouldComponentUpdate” to see
if the component needs to be re rendered. On normal components, React compares the new html with the
old html, and if there are changes then re renders it to the DOM.

It may break your app if you are using a PureComponent for performance reasons (the component takes
too long to render), but you are not passing memoized props with useMemo or useCallback. This will
cause React to do the extra work of comparing the props (they will always be different), and also re
rendering the component again when is not needed.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

If you want to propagate props from a parent to x amount of children, if a child in the middle of
the propagation has a restrictive shouldComponentUpdate, then the props of the context won’t be
propagated to all of the children.

3. Describe 3 ways to pass information from a component to its PARENT.

On the new version of React, currently there are 2 options for passing information to a parent. (you
could also use libraries for this like Zustand or Redux).

With a context:

```
// Parent.tsx

const ParentContext = createContext({})

const Parent = ( {children} ) => {
  const [something, setSomething] = useState()

  return (
    <ParentContext.Provider value={{setSomething}}>{children}</ParentContext.Provider>
  )
}

// Child.tsx
const Child = () => {
  const {setSomething} = useContext(ParentContext);
  setSomething('hi')

  return null
}
```

With props:

```
// Parent.tsx
const Parent = ( ) => {
  const [something, setSomething] = useState()

  return (<Child setSomething={setSomething} />)
}

// Child.tsx
const Child = ({setSomething}) => {
  setSomething('hi')

  return null
}
```

4. Give 2 ways to prevent components from re-rendering.

1. Using React.memo + useMemo + useCallback React.memo is a util that converts your component into a
   “PureComponent”. Using this, React will do a shallow comparison of the props being passed to the
   component, and if they are the same, it won’t re render it.

For this to work, the props passed also need to be memoized if they are objects or functions,
because if not, when the parent component re renders, it will create a new instance of these values,
re rendering the child even though it’s using memo.

Also you can pass a second function to React.memo to do the comparison yourself.

```
const A = () => {
   const [update, setUpdate] = useState()

   const method = useCallback(() => {}, [])
   const value = useMemo(..., [])

   return (
      <>
      <B method={method} value={value} /> // it won’t re render
      <button onClick={() => setUpdate(update++)}>update</button>
      </>
   )
}

const B = memo(() => {...})
```

2. useMemo for rendering components You can also use useMemo for rendering components.

```
const A = () => {
   const [update, setUpdate] = useState()

   const myLargeComponentRendered = useMemo(() => <MyLargeComponent /> , [])

   return (
      <>
      {myLargeComponentRendered}
      <button onClick={() => setUpdate(update++)}>update</button>
      </>
   )
}
```

5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are a way of wrapping multiple components or dom elements without the need of adding an
extra dom element wrapper. We need it because React expects us to always return a single element
from a component or a function.

It may break your app if you don’t use it when you want to return multiple elements.

If you are rendering several fragments inside a map and don’t pass a the key prop it will also break
your app.

6. Give 3 examples of the HOC pattern.

A Higher order component is a component that receives another component as a prop and adds extra
functionality to it.

Examples:

1. For forms, when you have multiple form elements (Select, Input, Textarea), but all of them
   display the error messages or label with the same style. You would create a HOC component that
   renders those components, and if there is an error or label, render that as well.
2. When you want to add a tooltip to an element, you can create a Tooltip component that receives
   the element that you want to add the tooltip to.
3. When you want to render a modal with different contents, you can create a Modal component that
   receives any component as prop and renders it covering the whole page.

4. what's the difference in handling exceptions in promises, callbacks and async...await.

Inside of promises, you would reject the exception, and then catch it when using the promise.
Example:

```
new Promise((resolve, reject) => {
reject("my exception")
}).catch((err) => console.log(err)) // ‘my exception’
```

Callbacks are functions passed to other functions. You could use them to handle exceptions like
this.

```
const handler = (errorCb) => {
   server().catch(errorCb)
}
```

Async await is a way of handling promises states.

```
const getData = async () => {
   try {
       await server()
      // handle success
   } catch (error) {
      // handle error
   } finally {
     // handle end
   }
}
```

The best way would be to use async await to avoid callback hell and make the code cleaner (in my
opinion).

8. How many arguments does setState take and why is it async.

setState takes one argument and is async because it could result in an expensive operation. If it
were sync, it could potentially block the main javascript thread, preventing other updates from
coming in while we are processing the operation. Making it async allows for batching of updates.

9. List the steps needed to migrate a Class to Function Component.

You have to convert all the class specific methods (remove constructor, replace “this” variables
with const). Also you need to update the previous hooks with the new ones (useState, useEffect).

10. List a few ways styles can be used with components.

Importing a individual style file to a component Passing them as props to the element –->
style={{display: ‘none’}} Create global styles targeting the class of the component

11. How to render an HTML string coming from the server.

Using dangerouslySetInnerHtml:

```
dangerouslySetInnerHtml={{__html: <your_string_here>}}
```
