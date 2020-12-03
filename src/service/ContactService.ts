import { outputCurrency, getCountByListingId, getAverage } from "../tools";
import { Contact, Listing, MonthOutput } from "../types";
import { Top5ContactedListingsPerMonthOutput } from '../types/Output';

export class ContactService {
	constructor() { }
	
	getTopThirtyPercentOfContactedListings(contacts : Contact[], listings : Listing[]){
		const uniqueListingIds = this.getUniqueListingIdsFromContactArray(contacts);

		let listingStats = uniqueListingIds.map(listingId => {
			return { listingId, total_amount_of_contacts: this.getContactAmountByListingId(listingId, contacts) }
		});

		listingStats = this.sortListingsDescendingByContactAmount(listingStats);

		// Extract top 30%
		listingStats.splice(0, listingStats.length * .3);

		const topThirtyListings = listingStats.map(listingStat => {
			let listing = listings.find(listing => listing.id === listingStat.listingId);

			if (listing !== undefined) {
				return listing;
			}
		});

		// @ts-ignore
		const listingPriceSum = this.getPriceSumFromListing(topThirtyListings);

		return getAverage(listingPriceSum, topThirtyListings.length);
	}

	getTopFiveContactedListingsPerMonth(contacts: Contact[], listings: Listing[]) {
		// Convert UNIX Timestamps to readable month.year format.
		const modifiedContacts = this.convertUnixToMonthYear(contacts);

		// Extract only the dates in order to extract unique
		let dates = modifiedContacts.map(contact => contact.contact_date);

		// Create set of unique dates
		let uniqueMonths = [...new Set(dates)];

		// Iterate over each unique date (aka month/year)
		let output = uniqueMonths.map(month => {

			// Create array of contacts that were made only within specified month
			const monthContacts: Contact[] = this.getAllContactsFromMonth(modifiedContacts, month);

			// Create a set of unique listings
			const uniqueListings = this.getUniqueListingIdsFromContactArray(monthContacts);

			// Iterate over each unique listing, get its data from the listings object and fill the return object with specified data
			let listingOutput = uniqueListings.map(uniqueListing => {
				const listing = listings.find(listing => listing.id === uniqueListing);

				if (listing !== undefined) {
					return {
						listing_id: listing.id as number,
						make: listing.make as string,
						selling_price: `${outputCurrency(listing?.price as number)}`,
						mileage: `${listing?.mileage} KM`,
						total_amount_of_contacts: this.getContactAmountByListingId(uniqueListing, monthContacts)
					}
				} 

				return listing;
			})

			// Sort these listings in descending order based on contacts made
			//@ts-ignore
			listingOutput = this.sortListingsDescendingByContactAmount(listingOutput);

			// Extract top 5 listings for output
			listingOutput = listingOutput.splice(0, 5);

			const monthOutput : MonthOutput = {
				date: month,
				//@ts-ignore
				listingOutput
			}

			return monthOutput;
		})

		// Sort based on date with earliest month being first (based on spec sheet)
		output = this.sortOutputByDateAscending(output);

		return output;
	}

	convertUnixToMonthYear(contacts: Contact[]) {
		return contacts.map(contact => {
			const month = new Date(contact.contact_date).getMonth();
			const year = new Date(contact.contact_date).getFullYear();
			return { ...contact, contact_date : `${month + 1}.${year}` };
		});
	}

	getUniqueListingIdsFromContactArray(contacts: Contact[]) {
		return [...new Set(contacts.map(listing => listing.listing_id))];
	}

	getContactAmountByListingId(listingId : number, contacts : Contact[]) : number {
		const segregateContacts = contacts.filter(contact => contact.listing_id === listingId);
		return segregateContacts.length;
	}

	getAllContactsFromMonth(contacts: Contact[], month : string): Contact[] {
		return contacts.filter((contact) => contact.contact_date === month);
	}

	sortOutputByDateAscending(monthOutputs: MonthOutput[]): MonthOutput[] {
		return monthOutputs.sort((a, b) => (parseInt(a.date) - parseInt(b.date)));
	}

	sortListingsDescendingByContactAmount(listings : any) {
		return listings.sort((a: { total_amount_of_contacts: number; }, b: { total_amount_of_contacts: number; }) => (b.total_amount_of_contacts - a.total_amount_of_contacts));
	}

	getPriceSumFromListing(listing: Listing[]): number {
		return listing.reduce((prev, cur) => prev + cur.price, 0);
	}

}