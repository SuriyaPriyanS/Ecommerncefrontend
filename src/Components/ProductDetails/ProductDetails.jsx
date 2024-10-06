import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Slider } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToWishlist,  clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            enqueueSnackbar("Product is already in your wishlist", { variant: 'warning' });
            return;
        }
        dispatch(addToWishlist(productId));
        enqueueSnackbar("Product added to your wishlist", { variant: 'success' });
    };

    const reviewSubmitHandler = () => {
        if (!rating || !comment.trim()) {
            enqueueSnackbar("Please provide a rating and a comment", { variant: "error" });
            return;
        }

        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);

        dispatch(newReview(formData));
        setOpen(false);
    };

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product added to cart", { variant: 'success' });
    };

    const handleDialogClose = () => {
        setOpen(!open);
    };

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    };

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }

        if (success) {
            enqueueSnackbar("Review submitted successfully", { variant: "success" });
            dispatch(clearErrors());
        }

        dispatch(getProductDetails(productId));
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        if (product?.category) {
            dispatch(getSimilarProducts(product.category));
        }
    }, [dispatch, product]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <main className="mt-12 sm:mt-0">
                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <img key={i} draggable="false" className="w-full h-96 object-contain" src={item.url} alt={product.name} />
                                            ))}
                                        </Slider>
                                        <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                            <span onClick={addToWishlistHandler} className={`cursor-pointer ${itemInWishlist ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}>
                                                <LocalOfferIcon />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex gap-3">
                                        {product.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "Go To CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button onClick={buyNow} disabled={product.stock < 1} className={`p-4 w-1/2 flex items-center justify-center gap-2 text-white rounded-sm shadow ${product.stock < 1 ? "bg-red-600 cursor-not-allowed" : "bg-primary-orange hover:shadow-lg"}`}>
                                            <FlashOnIcon />
                                            {product.stock < 1 ? "Out of Stock" : "BUY NOW"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Add more content and structure as needed */}
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
