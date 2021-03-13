import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { AddShoppingCart, CallMissedSharp, ShoppingCart } from '@material-ui/icons' 

import logo from '../../assets/logo.jpg' 
import useStyles from './styles' 
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => { 
    const classes = useStyles(); 
    const location =useLocation();

    return (
     <> 
       <AppBar position="Fixed"  className={classes.appBar} color="inherit"> 
         <Toolbar>
             <Typography component={Link} to='/' variant="h6" className={classes.title} color="inherit">
                 <img src={logo} alt="fashion.js" height="80vh" className={classes.image}>
                 </img>
             </Typography> 
             <div className={classes.grow} /> 

             {location.pathname ===  '/' && (
             <div className={classes.Button}> 
             <Link to="/cart">

                 <IconButton aria-label="show cart items" color="inherit">
                     <Badge badgeContent={totalItems} color="secondary">
                         <ShoppingCart />
                     </Badge>
                 </IconButton>
             </Link>
             </div> 
             )}
         </Toolbar>

       </AppBar>

     </>
  )
}

export default Navbar