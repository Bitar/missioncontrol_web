import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './app/auth/Login';
import  Home  from './app/dashboard/Home';
import  Leagues  from './app/league/Leagues';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter , useNavigate ,Navigate , Routes, Route } from 'react-router-dom';
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/style.react.scss'
import { LayoutProvider } from './_metronic/layout/core';


function checkToken(){
  return (localStorage.getItem('token') !== null)
}

function RequireAuth({ children } : {children:any}) {
  const authed  = checkToken();
  console.log(authed)
  return authed === true ? children : <Navigate to="/login" replace />;
}



function App(){
  const navigate = useNavigate()
 
  const onLogin = (success: boolean) => {
    if(success === true){
        navigate("/")
    }
  }

  return (
          <main className='h-full'>
              <Routes>
                  <Route path="/"  element= {<RequireAuth><Home/></RequireAuth>} />
                  <Route path="/home" element={<RequireAuth><Home/></RequireAuth>}  />
                   <Route path="/leagues/:id"  element= {<RequireAuth><Leagues leagues={undefined} id={undefined} isLoading={false}/></RequireAuth>}  />  
                  <Route path="/login" element={checkToken() ? <Navigate to="/" /> : <Login onLogin={(success)=> onLogin(success) } />} />
              </Routes>
          </main>
  )
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
   <LayoutProvider>

    <App />
    </LayoutProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
