import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import  { clearErrors, registerUser} from  '../../actions/userAction'

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {loading, isAuthenticated, error} = useSelector((state)=>state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const {name, email, gender, password, confirmPassword} = user;
    const [ avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState();

    const handleRegister = (e)=> {
        e.PreventDefault();
        if(password.length < 8){
            enqueueSnackbar("Password must be at least 8 characters long.", {variant: "error"});
            return;
        }
        if(password!== confirmPassword){
            enqueueSnackbar("Passwords do not match.", {variant: "error"});
            return;
        }
        if(!avatar){
            enqueueSnackbar("Please select an avatar.", {variant: "error"});
            return;
        }
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);
        dispatch(registerUser(formData));

    }
    const handleDataChange = (e)=> {
        setUser({...user, [e.target.name]: e.target.value});
        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setUser({...user, [e.target.name]: e.target.value});
        }

    }
    useEffect(()=> {
        if(error){
            enqueueSnackbar(error, {variant: "error"});
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            navigate("/");
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
        <MetaData title="Register | Flipkart" />

        {loading && <BackdropLoader />}
        <main className="w-full mt-12 sm:pt-20 sm:mt-0">

            {/* <!-- row --> */}
            <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

                <FormSidebar
                    title="Looks like you're new here!"
                    tag="Sign up with your mobile number to get started"
                />

                {/* <!-- signup column --> */}
                <div className="flex-1 overflow-hidden">

                    {/* <!-- personal info procedure container --> */}
                    <form
                        onSubmit={handleRegister}
                        encType="multipart/form-data"
                        className="p-5 sm:p-10"
                    >
                        <div className="flex flex-col gap-4 items-start">

                            {/* <!-- input container column --> */}
                            <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                <TextField
                                    fullWidth
                                    id="full-name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    onChange={handleDataChange}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleDataChange}
                                    required
                                />
                            </div>
                            {/* <!-- input container column --> */}

                            {/* <!-- gender input --> */}
                            <div className="flex gap-4 items-center">
                                <h2 className="text-md">Your Gender :</h2>
                                <div className="flex items-center gap-6" id="radioInput">
                                    <RadioGroup
                                        row
                                        aria-labelledby="radio-buttons-group-label"
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel name="gender" value="male" onChange={handleDataChange} control={<Radio required />} label="Male" />
                                        <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                    </RadioGroup>
                                </div>
                            </div>
                            {/* <!-- gender input --> */}

                            {/* <!-- input container column --> */}
                            <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleDataChange}
                                    required
                                />
                                <TextField
                                    id="confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    name="cpassword"
                                    value={cpassword}
                                    onChange={handleDataChange}
                                    required
                                />
                            </div>
                            {/* <!-- input container column --> */}

                            <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                <Avatar
                                    alt="Avatar Preview"
                                    src={avatarPreview}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleDataChange}
                                        className="hidden"
                                    />
                                    Choose File
                                </label>
                            </div>
                            <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                            <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
                        </div>

                    </form>
                    {/* <!-- personal info procedure container --> */}

                </div>
                {/* <!-- signup column --> */}
            </div>
            {/* <!-- row --> */}

        </main>
    </>
    );
};

export default Register;