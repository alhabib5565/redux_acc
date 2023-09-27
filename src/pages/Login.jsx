import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/image/login.svg';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, loginUser } from '../redux/features/user/userSlice';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ForgetPasswordModal from './ForgetPasswordModal';
const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isLoading, isError, error } = useSelector((state) => state.userSlice)
  
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = ({ email, password }) => {
    // Email Password Login
    dispatch(loginUser({ email, password }))
    if(!error){
      toast.success('login successfull')
    }
    console.log(email, password);
  };

  const handleGoogleLogin = () => {
    //  Google Login
    dispatch(googleLogin())
  };

  useEffect(() => {
    if (error && isError) {
      toast.error(error)
    }
  }, [isError, error])

  return (
    <div className="flex max-w-7xl h-full items-center mx-auto">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-primary/5 w-full max-w-sm rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md"
                {...register('email')}
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full rounded-md"
                {...register('password')}
              />
            </div>
            <div className="relative !mt-8">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
            <div>
              <p>
                Don&apos;t have an account?{' '}
                <span
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </span>
              </p>
              <span
                className="underline text-left w-full"
                onClick={() => setIsOpen(true)}
              >
                forget password
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </button>
          </form>
          <ForgetPasswordModal isOpen={isOpen} setIsOpen={setIsOpen}></ForgetPasswordModal>
        </div>
      </div>
    </div>
  );
};

export default Login;
