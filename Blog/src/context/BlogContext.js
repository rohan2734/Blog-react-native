//import React,{createContext,useReducer} from 'react';
import createDataContext from './createDataContext';

// const BlogContext = createContext();

const blogReducer = (state,action) => {
  switch (action.type){
    case 'delete_blogPost':
      return state.filter((blogPost) =>blogPost.id !== action.payload);
    case 'add_blogPost':
      return [...state,
        {
          id: Math.floor(Math.random()*99999),
          title: `Blog Post #${state.length + 1}`
        }
      ];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({type:'add_blogPost' });
  }
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({type:'delete_blogPost',payload:id})
  }
}

export const {Context,Provider} = createDataContext(
  blogReducer,
  {addBlogPost,deleteBlogPost},
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