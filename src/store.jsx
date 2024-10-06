// Import necessary modules
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { combineReducers } from 'redux';

// Import reducers
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  allUsersReducer,
  userDetailsReducer
} from './reducers/userReducer';

import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
  productReviewsReducer,
  reviewReducer
} from './reducers/productReducer';

import { cartReducer } from './reducers/cartReducer';
import { saveForLaterReducer } from './reducers/saveForLaterReaducer';
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
  paymentStatusReducer
} from './reducers/orderReducer';

import { wishlistReducer } from './reducers/wishlistReducer';

// Combine all reducers
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  newReview: newReviewReducer,
  cart: cartReducer,
  saveForLater: saveForLaterReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  paymentStatus: paymentStatusReducer,
  orderDetails: orderDetailsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  newProduct: newProductReducer,
  product: productReducer,
  users: allUsersReducer,
  userDetails: userDetailsReducer,
  reviews: productReviewsReducer,
  review: reviewReducer,
  wishlist: wishlistReducer,
});

// Initialize localStorage state safely
const loadFromLocalStorage = (key, fallback) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage`, e);
    return fallback;
  }
};

// Set initial state from localStorage if available
let initialState = {
  cart: {
    cartItems: loadFromLocalStorage('cartItems', []),
    shippingInfo: loadFromLocalStorage('shippingInfo', {}),
  },
  saveForLater: {
    saveForLaterItems: loadFromLocalStorage('saveForLaterItems', []),
  },
  wishlist: {
    wishlistItems: loadFromLocalStorage('wishlistItems', []),
  },
};

// Middleware
const middleware = [thunk];

// Create the store
const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
