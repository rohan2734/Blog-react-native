//import React,{createContext,useReducer} from 'react';
import createDataContext from './createDataContext';

// const BlogContext = createContext();

const blogReducer = (state,action) => {
  switch (action.type){
    case 'delete_blogPost':
      return state.filter((blogPost) =>blogPost.id !== action.payload);
    case 'add_blogPost':
      return [
        ...state,
        {
          id: Math.floor(Math.random()*99999),
          title: action.payload.title,
          content:action.payload.content
        }
      ];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return (title,content,callback) => {
    dispatch({type:'add_blogPost',payload:{title,content:content} });
    callback();
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