import React from 'react'
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import { Link } from 'react-router-dom'
import News from './News'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import "../components/Login.css"
import UserSidebar from './UserSidebar'


const {Title} = Typography;


const Homepage = () => {



  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };



  const {data,isFetching} = useGetCryptosQuery(10);
  console.log(data);

  const globalStats = data?.data?.stats;

  if(isFetching) return 'Loading...'

  return (
    <div>
      {/* <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
      </Row> */}
      <div className='home-heading-container'>
    

       
      {/* <Button className="logout-button" variant="primary" onClick={handleLogout}>
        Log out
      </Button> */}
      <UserSidebar/>
   
      
      
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified/>
        <div className='home-heading-container'>
          <Title level={2} className='home-title'>Latest Crypto News</Title>
          <Title level={3} className='show-more'><Link to="/news">Show More</Link></Title>
        </div>  
      <News simplified/>
    </div>
  )
}

export default Homepage