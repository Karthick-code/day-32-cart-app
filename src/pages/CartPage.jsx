import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../slices/cartSlice';
import { Button, IconButton, Card, CardContent, Typography, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './CartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const totalQuantity = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const totalAmount = items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0).toFixed(2);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <div className="cart-items">
        {items.map(item => (
          <Card key={item.id} className="cart-item-card">
            <CardMedia
              component="img"
              height="140"
              image={item.thumbnail}
              alt={item.title}
              className="cart-item-thumbnail"
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
              <Typography variant="body1" color="text.primary">
                Price: ${item.price.toFixed(2)}
              </Typography>
              <Typography variant="body1" color="text.primary">
                Discount: {item.discountPercentage.toFixed(2)}%
              </Typography>
              <div className="quantity-controls">
                <IconButton
                  aria-label="decrease quantity"
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <RemoveIcon />
                </IconButton>
                <span>{item.quantity}</span>
                <IconButton
                  aria-label="increase quantity"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <AddIcon />
                </IconButton>
              </div>
              <Typography variant="body1" color="text.primary">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="summary">
        <h2>Summary</h2>
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount}</p>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
