import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const Product = ({
  _id,
  name,
  images,
  ratings,
  numofReviews,
  price,
  cuttedPrice,
}) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const itemInWishlist = wishlistItems.some((i) => i.Product === _id);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(_id));
      enqueueSnackbar("Remove from Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(_id));
      enqueueSnackbar("Added to Wishlist", { variant: "success" });
    }
  };
  return (
    <div className="flex flex-col items-start gap-3 px-4 py-6 relative hover:shadow-lg rounded-sm">
      <Link
        to={`/product/${_id}`}
        className="flex flex-col items-center text-center group "
      >
        <div className="w-44 h-48">
          <img
            draggable="false"
            className="w-full h-full object-contain "
            src={images && images[0].url}
            alt=""
          />
        </div>
        <h2 className="text-sm mt-4 group-hover:text-primary-blue text-left">
          {name.length > 85 ? `${name.substring(0, 85)}... ` : name}
        </h2>
      </Link>
      {/*image & product title*/}
      <div className="flex flex-col gap-2 items-start">
        <span className=" text-sm text-gray-500 font-medium flex gap-2 items-center ">
          <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
            {ratings.toFixed(1)}
            <StarIcon sx={{ fontSize: "14px" }} />{" "}
          </span>

          <span>({numofReviews})</span>
        </span>

        <div className="flex items-center gap-1.5 text-md font-medium">
          <span>${price.toLocalestring()}</span>
          <span className="text-gray-500 line-through text-xs">
            ${cuttedPrice.toLocalestring()}
          </span>
          <span className="text-xs text-primary-green">
            {getDiscount(price, cuttedPrice)}%nbsp;off
          </span>
        </div>
      </div>
      <span
        onClick={addToWishlistHandler}
        className={`${
          itemInWishlist ? "text-red-500" : "hover: text-red-500 text-gray-300"
        }abolute top-6 right-6 cursor-pointer`}
      >
        <FavoriteIcon sx={{ fontSize: "18px" }} />
      </span>
    </div>
  );
};

export default Product;
