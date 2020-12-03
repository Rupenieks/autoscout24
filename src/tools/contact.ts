import { Contact } from "../types";

export function getCountByListingId(listingId : number, contacts: Contact[]): number {
	const segregateContacts = contacts.filter(contact => contact.listing_id === listingId);
	return segregateContacts.length;
}
