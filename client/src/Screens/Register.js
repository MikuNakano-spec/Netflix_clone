import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Input } from '../Components/UsedInputs';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { InlineError } from '../Components/Notifications/Error';
import toast from 'react-hot-toast';
import { registerAction } from '../Redux/Actions/userActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterValidation } from '../Components/Validation/UserValidation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector((state) => state.userRegister);

    //validate
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterValidation),
    });

    //on submit
    const onSubmit = (data) => {
      dispatch(registerAction(data));
    };

    useEffect(() => {
      if (userInfo?.isAdmin) {
        navigate("/dashboard");
      }
      else if (userInfo) {
        navigate("/profile");
      }
      if (isSuccess) {
        toast.success(`Welcome ${userInfo?.fullName}`);
        dispatch({ type: "USER_REGISTER_RESET"});
      }
      if (isError) {
        toast.error(isError);
        dispatch({ type: "USER_REGISTER_RESET"});
      }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
        <div className='container mx-auto px-7 my-24 flex-colo'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full 2xl:w-2/5 flex-colo gap-4 p-8 sm:p-14 md:w-3/5 bg-light rounded-lg border border-border'>
                <img src="/images/logo.png" alt="logo" className='w-full h-12 object-contain'/>
                <div className='w-full'>
                    <Input label="FullName" placeholder="Enter your name..." type="text" name="fullName" register={register("fullName")} bg={true} />
                    {errors.fullName && <InlineError text={errors.fullName.message} />}
                </div>
                <div className='w-full'>
                    <Input label="Email" placeholder="Enter your email..." type="email" name="email" register={register("email")} bg={true} />
                    {errors.email && <InlineError text={errors.email.message} />}
                </div>
                <div className='w-full'>
                    <Input label="Password" placeholder="Enter your password..." type="password" name="password" register={register("password")} bg={true} />
                    {errors.password && <InlineError text={errors.password.message} />}
                </div>
                <button type='submit' disabled={isLoading} className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full mb-4'>
                    {
                    isLoading ? (
                        "Loading..."
                    ) : (
                        <>
                        <FiLogIn/> Sign Up
                        </>
                    )
                    }
                </button>
                <p className='text-center text-border'>
                    Already have an account ?{" "}
                    <Link to="/login" className='text-dryGray font-semibold ml-2'>Sign In</Link>
                </p>
            </form>
        </div>
    </Layout>
  )
}

export default Register;