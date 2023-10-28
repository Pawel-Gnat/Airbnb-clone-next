import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import axios from 'axios'

import { SafeUser } from '../types'
import useLoginModal from './useLoginModal'
import toast from 'react-hot-toast'

interface FavoriteProps {
	listingId: string
	currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: FavoriteProps) => {
	const router = useRouter()
	const loginModal = useLoginModal()

	const hasFavorited = useMemo(() => {
		const list = currentUser?.favoriteIds || []

		return list.includes(listingId)
	}, [currentUser, listingId])

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			e.preventDefault()

			if (!currentUser) {
				return loginModal.onOpen()
			}

			try {
				let request

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`)
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`)
				}

				await request()
				router.refresh()
				toast.success('Success')
			} catch (error) {
				toast.success('Something went wrong.')
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router]
	)

	return { hasFavorited, toggleFavorite }
}

export default useFavorite
