import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import EmptyState from '../components/EmptyState'
import PropertiesClient from './PropertiesClient'

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser()

	if (!currentUser) {
		return (
			<EmptyState
				title='Unathorized'
				subtitle='Please login'
			/>
		)
	}

	const listings = await getListings({
		userId: currentUser.id,
	})

	if (listings.length === 0) {
		return (
			<EmptyState
				title='No properties found'
				subtitle={`Looks like you have no properties.`}
			/>
		)
	}

	return (
		<div>
			<PropertiesClient
				listings={listings}
				currentUser={currentUser}
			/>
		</div>
	)
}

export default PropertiesPage
