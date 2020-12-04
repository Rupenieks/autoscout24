import { ListingService } from '../service/ListingService';
import { Contact, Listing } from '../types';
import { ContactService } from '../service/ContactService';

export function generateAvgListingSellPricePerSellerType(listings : Listing[]) {
	const listingService = new ListingService();

	return listingService.getAvgSellingPricePerSellerType(listings)
}
 
export function generatePercentualDistributionCarsByMake(listings : Listing[]) {
	const listingService = new ListingService();
	
	return listingService.getPercentDistributionCarsByMake(listings)
}

export function generateTop5MostContactedListingPerMonth(contacts: Contact[], listings: Listing[]) {
	const contactService = new ContactService();

	return contactService.getTopFiveContactedListingsPerMonth(contacts, listings);
}

export function generateTopThirtyPercentOfContactedListings(contacts: Contact[], listings: Listing[]) {
	const contactService = new ContactService();

	return contactService.getTopThirtyPercentOfContactedListings(contacts, listings);
}