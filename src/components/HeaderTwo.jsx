import React from "react";
import { Link } from 'react-router-dom';

    const HeaderTwo = ({ links = [] }) => {
      return (
        <div
          className="p-3 mb-4  border d-inline-block" style={{backgroundColor: '#ecece7'
            ,width:'100%',
            border: '50px #00796b solid ',borderRadius:'20px'}}>
          {links.map((link, index) => (
            <span key={index}>
              <Link to={link.href} style={{textDecoration: 'none',color: 'black',fontSize:'20px',marginRight:'10px',
              fontWeight: 'bold',}}> {link.label}
              </Link>
              {index < links.length - 1 && ' / '}
            </span>
          ))}
        
        </div>
     
      );
    };
    
export default HeaderTwo;