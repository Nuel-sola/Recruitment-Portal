import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import pageContext from './pageContext';

export default configureStore({
  reducer: {
    user : user,
    pageContext : pageContext,
    
  },
})