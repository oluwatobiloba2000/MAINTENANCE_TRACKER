import React from 'react';
import './loader.css';
import {LoadingOutlined} from '@ant-design/icons';
import logo from '../../assests/images/logo.svg';

const Loader = (props) =>{

    return(
        <div className={`tracky-loader ${props && props.loading ? 'open-loader': 'close-loader'}`}>
          <img width="100" height="200" src={logo} alt="Loading ...."/>
          <LoadingOutlined style={{fontSize: '40px', color: 'rgb(47 125 229)', marginTop: '22px'}}/>
        </div>
    )
}

export default Loader;