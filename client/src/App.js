import './App.css';
import {Layout} from './components';
import {CreatePostPage, IndexPage, LoginPage, RegisterPage, PostPage} from './pages';
import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from './components/UserContext';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path={'/login'} element={<LoginPage/>}/>
          <Route path={'/register'} element={<RegisterPage/>}/>
          <Route path={'/create'} element={<CreatePostPage/>}/>
          <Route path={'/post/:id'} element={<PostPage/>}/>
          <Route path={'/edit/:id'} element={<EditPostPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
