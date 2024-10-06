import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {

    const navigate = useNavigate();

    const {} = useSelector(state => state.user)
     
    useEffect(()=> {
        // Fetch user data from backend
        // navigate to dashboard if user is authenticated
        if (isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);


    return (
        <>
        <MetaData title="My Profile" />
      
        {loading ? (
          <Loader />
        ) : (
          <>
            <MinCategory />
            <main className="w-full mt-12 sm:mt-0">
              {/* Row */}
              <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">
                <Sidebar activeTab="profile" />
      
                {/* Details Column */}
                <div className="flex-1 overflow-hidden shadow bg-white">
                  {/* Edit Info Container */}
                  <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                    {/* Personal Info */}
                    <div className="flex flex-col gap-5 items-start">
                      <span className="font-medium text-lg">
                        Personal Information
                        <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-8 cursor-pointer">
                          Edit
                        </Link>
                      </span>
      
                      <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                        <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                          <label className="text-xs text-gray-500">First Name</label>
                          <input
                            type="text"
                            value={user.name.split(" ")[0]}
                            className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                            disabled
                          />
                        </div>
                        <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                          <label className="text-xs text-gray-500">Last Name</label>
                          <input
                            type="text"
                            value={getLastName()}
                            className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                            disabled
                          />
                        </div>
                      </div>
      
                      {/* Gender */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-sm">Your Gender</h2>
                        <div className="flex items-center gap-8" id="radioInput">
                          <div className="flex items-center gap-4 text-gray-500 cursor-not-allowed">
                            <input
                              type="radio"
                              name="gender"
                              checked={user.gender === "male"}
                              id="male"
                              className="h-4 w-4 cursor-not-allowed"
                              disabled
                            />
                            <label htmlFor="male" className="cursor-not-allowed">
                              Male
                            </label>
                          </div>
                          <div className="flex items-center gap-4 text-gray-500 cursor-not-allowed">
                            <input
                              type="radio"
                              name="gender"
                              checked={user.gender === "female"}
                              id="female"
                              className="h-4 w-4 cursor-not-allowed"
                              disabled
                            />
                            <label htmlFor="female" className="cursor-not-allowed">
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
      
                    {/* Email Address Info */}
                    <div className="flex flex-col gap-5 items-start">
                      <span className="font-medium text-lg">
                        Email Address
                        <Link to="/account/update" className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer">
                          Edit
                        </Link>
                        <Link to="/password/update" className="text-sm text-primary-blue font-medium ml-3 sm:ml-8">
                          Change Password
                        </Link>
                      </span>
      
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                          <label className="text-xs text-gray-500">Email Address</label>
                          <input
                            type="email"
                            value={user.email}
                            className="text-sm outline-none border-none cursor-not-allowed text-gray-500"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
      
                    {/* Mobile Number Info */}
                    <div className="flex flex-col gap-5 items-start">
                      <span className="font-medium text-lg">
                        Mobile Number
                        <span className="text-sm text-primary-blue font-medium ml-3 sm:ml-8 cursor-pointer" id="mobEditBtn">
                          Edit
                        </span>
                      </span>
      
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                          <label className="text-xs text-gray-500">Mobile Number</label>
                          <input
                            type="tel"
                            value="+917871336138"
                            className="text-sm outline-none border-none text-gray-500 cursor-not-allowed"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
      
                    {/* FAQs */}
                    <div className="flex flex-col gap-4 mt-4">
                      <span className="font-medium text-lg mb-2">FAQs</span>
                      <h4 className="text-sm font-medium">
                        What happens when I update my email address (or mobile number)?
                      </h4>
                      <p className="text-sm">
                        Your login email id (or mobile number) changes, likewise. You'll receive all your account related
                        communication on your updated email address (or mobile number).
                      </p>
      
                      <h4 className="text-sm font-medium">
                        When will my account be updated with the new email address (or mobile number)?
                      </h4>
                      <p className="text-sm">
                        It happens as soon as you confirm the verification code sent to your email (or mobile) and save the
                        changes.
                      </p>
      
                      <h4 className="text-sm font-medium">
                        What happens to my existing account when I update my email address (or mobile number)?
                      </h4>
                      <p className="text-sm">
                        Updating your email address (or mobile number) doesn't invalidate your account. Your account remains
                        fully functional. You'll continue seeing your Order history, saved information, and personal details.
                      </p>
      
                      <h4 className="text-sm font-medium">Does my Seller account get affected when I update my email address?</h4>
                      <p className="text-sm">
                        We have a 'single sign-on' policy. Any changes will reflect in your Seller account also.
                      </p>
                    </div>
      
                    {/* Deactivate Account */}
                    <Link className="text-sm text-primary-blue font-medium" to="/">
                      Deactivate Account
                    </Link>
                  </div>
      
                  {/* Footer Image */}
                  <img
                    draggable="false"
                    className="w-full object-contain"
                    src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/myProfileFooter_4e9fe2.png"
                    alt="footer"
                  />
                </div>
              </div>
            </main>
          </>
        )}
      </>
      
    );
};

export default Account;