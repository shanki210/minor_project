import React from 'react';
import {Route,Link, Routes} from 'react-router-dom';
import {Layout,Typography,Space} from 'antd';
import {Navbar,Exchanges,Homepage,Cryptocurrencies,CryptoDetails,News,Login,Signup,ProtectedRoute} from './components';
import './App.css'
import { UserAuthContextProvider } from './context/UserAuthContext';



const App = () => {


    


  return (
    <div className='app'>
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='main'>
             <Layout> 
                <div className='routes'>
                <UserAuthContextProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route exact path="/home" element={
                              <ProtectedRoute>
                                    <Homepage />
                              </ProtectedRoute>
                        }>    
                        </Route>
                        <Route exact path="/exchanges" element={
                             <ProtectedRoute>
                                   <Exchanges/>
                             </ProtectedRoute>
                        }>   
                        </Route>
                        <Route exact path="/cryptocurrencies" element={ 
                            <ProtectedRoute>
                                <Cryptocurrencies/>
                            </ProtectedRoute>
                        }> 
                        </Route>
                        <Route exact path="/crypto/:coinId" element={
                            <ProtectedRoute>
                                <CryptoDetails/>
                            </ProtectedRoute>
                        }> 
                        </Route>
                        <Route exact path="/news" element={
                            <ProtectedRoute>
                                <News/>
                            </ProtectedRoute>
                        }> 
                        </Route>
                    </Routes>
                </UserAuthContextProvider>
                    
                </div>
             </Layout> 
        
            <div className='footer' >
                <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
                    Cryptoverse<br/>
                    All right reserved
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>
    </div>
  );
}

export default App;