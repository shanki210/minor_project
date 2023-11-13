import React from 'react';
import {Route,Link, Routes} from 'react-router-dom';
import {Layout,Typography,Space} from 'antd';
import {Navbar,Exchanges,Homepage,Cryptocurrencies,CryptoDetails,News,Login,Signup,ProtectedRoute,CoinsTable,CoinPage} from './components';
import './App.css'
import { UserAuthContextProvider } from './context/UserAuthContext';
import Alert from './components/Alert';



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
                        {/* <Route exact path="/exchanges" element={
                             <ProtectedRoute>
                                   <Exchanges/>
                             </ProtectedRoute>
                        }>   
                        </Route> */}

                        <Route exact path="/cryptocurrencies" element={ 
                            <ProtectedRoute>
                                <Cryptocurrencies/>
                            </ProtectedRoute>
                        }> 
                        </Route>
                        <Route exact path="/coins/:id" element={
                            <ProtectedRoute>
                                <CoinPage/>
                            </ProtectedRoute>
                        }> 
                        </Route>
                        <Route exact path="/coinstable" element={
                            <ProtectedRoute>
                                <CoinsTable/>
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
             {/* <Alert/> */}
        
            <div className='footer' >
                <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
                    Cryptoverse<br/>
                    All right reserved
                </Typography.Title>
                <Space>
                    <Link to="/home">Home</Link>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>
    </div>
  );
}

export default App;