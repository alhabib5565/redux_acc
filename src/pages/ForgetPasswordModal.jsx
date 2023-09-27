import React from 'react';
import Modal from '../components/ui/Modal';
import { useForm } from 'react-hook-form';
import auth from '../utils/firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';

const ForgetPasswordModal = ({ isOpen, setIsOpen }) => {
    const { register, handleSubmit } = useForm();

    const onSubmit = ({ email }) => {
        // Email Password Login
        console.log(email)
        sendPasswordResetEmail(auth,email)
            .then(() => {
                toast('send email ')
            })
            .catch(error => {
                console.log(error)
            })
    };
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={'forget password'}>
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

                <div className="relative !mt-8">
                    <button type="submit" className="btn btn-primary w-full">
                        Forget password
                    </button>
                </div>

            </form>
        </Modal>
    );
};

export default ForgetPasswordModal;