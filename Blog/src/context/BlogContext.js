//import React,{createContext,useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonserver from '../api/jsonserver';
// const BlogContext = createContext();

const blogReducer = (state,action) => {
  switch (action.type){
    case 'get_blogposts':
      return action.payload;
    case 'delete_blogPost':
      return state.filter((blogPost) =>blogPost.id !== action.payload);
    // case 'add_blogPost':
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random()*99999),
    //       title: action.payload.title,
    //       content:action.payload.content
    //     }
    //   ];
    case 'edit_blogPost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonserver.get('/blogposts');
    dispatch({type:'get_blogposts',payload:response.data})
  }; 
}

const addBlogPost = (dispatch) => {
  return async (title,content,callback) => {
    await jsonserver.post('/blogposts',{title,content});
    
    // dispatch({type:'add_blogPost',payload:{title,content:content} });
    if(callback){
      callback();
    }
  }
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonserver.delete(`blogposts/${id}`)
    
    dispatch({type:'delete_blogPost',payload:id})
  }
}

const editBlogPost = (dispatch) => {
  return async (id,title,content,callback) => {
    await jsonserver.put(`/blogposts/${id}`,{title,content});
    
    
    dispatch({type:'edit_blogPost',
      payload:{id,title,content}
    })
    if(callback){
      callback();
    }
  }
}

export const {Context,Provider} = createDataContext(
  blogReducer,
  {addBlogPost,deleteBlogPost,editBlogPost,getBlogPosts},
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