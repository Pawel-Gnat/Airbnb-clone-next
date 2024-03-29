'use client'

import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from '@/app/hooks/useLoginModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'

const LoginModal = () => {
	const router = useRouter()
	const registerModal = useRegisterModal()
	const loginModal = useLoginModal()
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<FieldValues> = data => {
		setIsLoading(true)

		signIn('credentials', { ...data, redirect: false }).then(callback => {
			setIsLoading(false)

			if (callback?.ok) {
				toast.success('Logged in')
				router.refresh()
				loginModal.onClose()
			}

			if (callback?.error) {
				toast.success(callback.error)
			}
		})
	}

	const toggle = useCallback(() => {
		loginModal.onClose()
		registerModal.onOpen()
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title='Welcome back'
				subtitle='Login to your account!'
			/>
			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	)

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='justify-center flex flex-row items-center gap-2'>
					<div>First time using Airbnb?</div>
					<button
						onClick={toggle}
						className='text-neutral-800 hover:underline'>
						Create an account
					</button>
				</div>
			</div>
		</div>
	)

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal
