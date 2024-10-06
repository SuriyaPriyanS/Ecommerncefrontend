import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar} = useSnackbar();
    const location = useLocation();
    const [price, setPrice]= useState([0, 2000000]);
    const [category, setCategory]= useState(location.serach ? location.search.split(" ")[1]: "");
    const [ratings, setRatings]= useState(0);
    //pagination
    const [currentpage, setCurrentpage] = useState();
     //filter toggles
     const [categoryToggle, setCategoryToggle] = useState(true);
     const [ratingsToggle, setRatingsToggle] = useState(true);

     const { products, loading, error, success, filteredProductsCount, resultPerPage } = useSelector((state) => state.products);
     const keyword = params.keyword;

     const priceHandler = ()=> {
        setPrice(newPrice);
     }
     const clearFilter = ()=> {
        setPrice([0, 2000000]);
        setCategory("");
        setRatings(0);
     }

     useEffect(()=> {
        if ( error){
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
 
        }
        if (success) {
            enqueueSnackbar(success, { variant:'success' });
            dispatch(clearSuccess());
        }
        dispatch(getProducts(keyword, price, category, ratings, currentpage));
     },[dispatch, keyword, category, price, ratings, currentpage, error, enqueueSnackbar]);
    return (
        <>
        <MetaData title="All Products | Flipkart" />

        <MinCategory />
        <main className="w-full mt-14 sm:mt-0">

            {/* <!-- row --> */}
            <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                {/* <!-- sidebar column  --> */}
                <div className="hidden sm:flex flex-col w-1/5 px-1">

                    {/* <!-- nav tiles --> */}
                    <div className="flex flex-col bg-white rounded-sm shadow">

                        {/* <!-- filters header --> */}
                        <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                            <p className="text-lg font-medium">Filters</p>
                            <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" onClick={() => clearFilters()}>clear all</span>
                        </div>

                        <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                            {/* price slider filter */}
                            <div className="flex flex-col gap-2 border-b px-4">
                                <span className="font-medium text-xs">PRICE</span>

                                <Slider
                                    value={price}
                                    onChange={priceHandler}
                                    valueLabelDisplay="auto"
                                    getAriaLabel={() => 'Price range slider'}
                                    min={0}
                                    max={200000}
                                />

                                <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                    <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[0].toLocaleString()}</span>
                                    <span className="font-medium text-gray-400">to</span>
                                    <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[1].toLocaleString()}</span>
                                </div>
                            </div>
                            {/* price slider filter */}

                            {/* category filter */}
                            <div className="flex flex-col border-b px-4">

                                <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                    <p className="font-medium text-xs uppercase">Category</p>
                                    {categoryToggle ?
                                        <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                        <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                    }
                                </div>

                                {categoryToggle && (
                                    <div className="flex flex-col pb-1">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="category-radio-buttons-group"
                                                onChange={(e) => setCategory(e.target.value)}
                                                name="category-radio-buttons"
                                                value={category}
                                            >
                                                {categories.map((el, i) => (
                                                    <FormControlLabel value={el} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                )}

                            </div>
                            {/* category filter */}

                            {/* ratings filter */}
                            <div className="flex flex-col border-b px-4">

                                <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                    <p className="font-medium text-xs uppercase">ratings</p>
                                    {ratingsToggle ?
                                        <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                        <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                    }
                                </div>

                                {ratingsToggle && (
                                    <div className="flex flex-col pb-1">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="ratings-radio-buttons-group"
                                                onChange={(e) => setRatings(e.target.value)}
                                                value={ratings}
                                                name="ratings-radio-buttons"
                                            >
                                                {[4, 3, 2, 1].map((el, i) => (
                                                    <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}<StarIcon sx={{ fontSize: "12px", mr: 0.5 }} /> & above</span>} />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                )}

                            </div>
                            {/* ratings filter */}

                        </div>

                    </div>
                    {/* <!-- nav tiles --> */}

                </div>
                {/* <!-- sidebar column  --> */}

                {/* <!-- search column --> */}
                <div className="flex-1">

                    {!loading && products?.length === 0 && (
                        <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                            <img draggable="false" className="w-1/2 h-44 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Search Not Found" />
                            <h1 className="text-2xl font-medium text-gray-900">Sorry, no results found!</h1>
                            <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                        </div>
                    )}

                    {loading ? <Loader /> : (
                        <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                            <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                {products?.map((product) => (
                                        <Product {...product} key={product._id} />
                                    ))
                                }
                            </div>
                            {filteredProductsCount > resultPerPage && (
                                <Pagination
                                    count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                    page={currentPage}
                                    onChange={(e, val) => setCurrentPage(val)}
                                    color="primary"
                                />
                            )}
                        </div>
                    )}
                </div>
                {/* <!-- search column --> */}
            </div >
            {/* <!-- row --> */}

        </main >
    </>
    );
};

export default Products;