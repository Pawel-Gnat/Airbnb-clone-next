import getCurrentUser from '@/app/actions/getCurrentUser'
import EmptyState from '@/app/components/EmptyState'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser()
	const favoriteListings = await getFavoriteListings()

	if (favoriteListings.length === 0) {
		return (
			<EmptyState
				title='No favorites found'
				subtitle='Looks like you have no favorite listings.'
			/>
		)
	}

	return (
		<FavoritesClient
			favoriteListings={favoriteListings}
			currentUser={currentUser}
		/>
	)
}

export default FavoritesPage
