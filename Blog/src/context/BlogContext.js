//import React,{createContext,useReducer} from 'react';
import createDataContext from './createDataContext';

// const BlogContext = createContext();

const blogReducer = (state,action) => {
  switch (action.type){
    case 'add_blogPost':
      return [...state,{title: `Blog Post #${state.length + 1}`}];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({type:'add_blogPost' });
  }
};

export const {Context,Provider} = createDataContext(
  blogReducer,
  {addBlogPost},
  []  
);



// export const BlogProvider = ({children}) => {
//   const [blogPosts,dispatch] = useReducer(blogReducer,[]);

//   // const addBlogPost = () => {
//   //   dispatch({type:'add_blogPost' });
//   // }
//   //addBlogpost : addBlogPost => addBlogPost
//   return (
//     <BlogContext.Provider value={{data: blogPosts,addBlogPost}}  >
//       {children}
//     </BlogContext.Provider>
//   )
// }

// export default BlogContext;