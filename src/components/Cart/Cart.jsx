import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
const  Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {  
    const classes = useStyles();
    // const isEmpty = !cart.line_items.length; 
    const handleEmptyCart = () => onEmptyCart();
    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in the shopping cart, 
           <Link to='/' className={classes.link}>start adding some!</Link>
        </Typography>
    ); 

   

    const renderCart = () => (
       <> 
        <Grid  container spacing={3}>
              {cart.line_items.map((lineItem) => (
                    <Grid item xs={12} sm={4} key={lineItem.id}>
                       <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart}/>
                    </Grid>
              ))}
        </Grid>

        <div className={classes.cardDetails}> 
        <div className={classes.toolbar} />
             <Typography variant="h4">
                 SubTotal: { cart.subtotal.formatted_with_symbol } 
             </Typography> 

             <div>
                 <Button className={classes.emptyButton} size="large" type="Button" variant="contained" color="secondary" onClick={handleEmptyCart}> Empty Cart</Button>
                 <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="Button" variant="contained" color="primary">Checkout</Button>
             </div>
        </div>
       </>
    )
    if (!cart.line_items) return 'Loading';

  return(
      <Container> 
          <div className={classes.toolbar} /> 

          <Typography className={classes.title} variant="h3" gutterBottom>
               Your Shopping Cart
          </Typography> 
          { !cart.line_items.length ? EmptyCart() : renderCart() }

      </Container>
  )
};

export default Cart;