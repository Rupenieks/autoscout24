import { ListingService } from '../service/ListingService';
import csv = require('csv-parser');
import fs = require('fs');
import { Contact, Listing } from '../types';
import { ContactService } from '../service/ContactService';
import { outputCurrency } from '../tools';

export function generateAvgListingSellPricePerSellerType(listings : Listing[]) {
	const listingService = new ListingService();

	console.table(listingService.getAvgSellingPricePerSellerType(listings));
}
 
export function generatePercentualDistributionCarsByMake(listings : Listing[]) {
	const listingService = new ListingService();

	console.table(listingService.getPercentDistributionCarsByMake(listings));
}

export function generateTop5MostContactedListingPerMonth(contacts: Contact[], listings: Listing[]) {
	const contactService = new ContactService();

	const outputArray = contactService.getTopFiveContactedListingsPerMonth(contacts, listings);

	outputArray.forEach(outputItem => {
		console.log('Month: ' + outputItem.date);
		console.table(outputItem.listingOutput);
	})
}

export function generateTopThirtyPercentOfContactedListings(contacts: Contact[], listings: Listing[]) {
	const contactService = new ContactService();

	const result = contactService.getTopThirtyPercentOfContactedListings(contacts, listings);

	const output = [{
		average_price: outputCurrency(result)
	}];

	console.table(output);
}