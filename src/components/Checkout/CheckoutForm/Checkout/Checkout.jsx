import React, { useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';  
import Confirmation from '../Confirmation';
import useStyles from '../../CheckoutForm/Checkout/styles';
import AddressForm from '../AddressForm'; 
import { commerce } from '../../../../lib/commerce';
import PaymentForm from '../PaymentForm';
const steps = ['Shippping address', 'Payment details']
const Checkout = ({ cart, order, onCaptureCheckout, error}) => { 
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [ checkoutToken, setCheckoutToken] = useState(null); 
    const [ shippingData, setShippingData] = useState({});
   useEffect(() => { 
    if(cart.id){
      const generateToken = async () => {
          try { 
          
             const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'} );
             
             setCheckoutToken(token);
            } catch  {
            //   if (activeStep !== steps.length) history.pushState('./');
          }

      };
      generateToken(); 
    }
   }, [cart]);
  
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

   const next = (data) => {
      setShippingData(data);
      nextStep();
   } 

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout}/> 

    return(
         <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography> 
                    <Stepper setActiveStep={0} classes={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>                     
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />} 
                </Paper>
            </main>
         </>
    );
}
export default Checkout