import React from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logowhite.png';
// import shareVideo from '../assets/share.mp4';
import Welcome from '../assets/login.svg';
import { client } from '../client';

const Login = () => {
	const navigate = useNavigate();

	const responseGoogle = (response) => {
		const { name, googleId, imageUrl } = response.profileObj;

		localStorage.setItem('user', JSON.stringify(response.profileObj));

		const doc = {
			_id: googleId,
			_type: 'user',
			userName: name,
			image: imageUrl,
		};

		client.createIfNotExists(doc).then(() => {
			navigate('/', { replace: true });
		});
	};

	return (
		<div className='flex justify-start items-center flex-col h-screen'>
			<div className=' relative w-full h-full'>
				{/* <video
					src={shareVideo}
					type='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
					className='w-full h-full object-cover'
				/> */}

				<svg
					className='transition duration-300 ease-in-out delay-150 absolute bottom-0'
					viewBox='0 0 1440 400'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						className='transition-all duration-300 ease-in-out delay-150 path-0'
						d='M0 400V100c61.264.841 122.527 1.683 174-7s93.154-26.89 147-30c53.846-3.11 119.857 8.879 176 12 56.143 3.121 102.418-2.624 147-3 44.582-.376 87.47 4.617 139 3s111.699-9.846 166-2 102.735 31.766 162 39c59.265 7.234 129.361-2.219 186-7 56.639-4.781 99.82-4.89 143-5v300z'
						fill='#ef444466'
						strokeWidth='0'
					/>
					<path
						className='transition-all duration-300 ease-in-out delay-150 path-1'
						d='M0 400V200c49.12-17.92 98.241-35.84 158-31 59.759 4.84 130.155 32.44 182 35 51.845 2.56 85.139-19.922 140-14 54.861 5.922 131.29 40.249 181 36 49.71-4.249 72.704-47.072 116-60 43.296-12.928 106.894 4.04 167 11 60.106 6.96 116.72 3.912 171 7s106.223 12.31 160 16c53.777 3.69 109.389 1.845 165 0v200z'
						fill='#ef444488'
						strokeWidth='0'
					/>
					<path
						className='transition-all duration-300 ease-in-out delay-150 path-2'
						d='M0 400V300c58.326 11.024 116.651 22.048 160 26 43.349 3.952 71.721.832 130-4 58.279-4.832 146.465-11.376 212-4 65.535 7.376 108.42 28.672 158 18s105.854-53.313 157-65c51.146-11.687 97.163 7.579 141 23s85.495 26.998 144 35c58.505 8.002 133.859 12.43 193 7 59.141-5.43 102.07-20.715 145-36v100z'
						fill='#ef4444ff'
						strokeWidth='0'
					/>
				</svg>

				<div className='absolute flex justify-center items-center top-0 right-0 left-0 bottom-0'>
					<div className='flex flex-col gap-4 py-16 justify-between items-center h-1/2 w-5/6 sm:w-1/2 lg:w-1/4 bg-black bg-opacity-60 rounded-xl z-50'>
						<div className='text-center'>
							<p className='text-gray-100 text-lg'>Connect your account</p>
							<img src={logo} width='200px' alt='Share2All logo' />
						</div>

						<div className='mb-8 shadow-lg'>
							<GoogleLogin
								clientId={`${process.env.REACT_APP_GOOGLE_TOKEN_API}`}
								render={(renderProps) => (
									<button
										type='button'
										className='bg-white hover:bg-gray-200 duration-75 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										<FcGoogle className='mr-4' /> Sign in with Google
									</button>
								)}
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy='single_host_origin'
							/>
						</div>
					</div>
				</div>

				<img
					className='fixed h-5/6 right-0 bottom-0 -z-50 object-cover -scale-x-100 object-left'
					src={Welcome}
					alt='Person walking'
				/>
			</div>
		</div>
	);
};

export default Login;
