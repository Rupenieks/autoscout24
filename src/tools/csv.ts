import csv = require('csv-parser');
import fs = require('fs');
import { Contact, Listing } from '../types';

export async function getListingsFromCsv(): Promise<Listing[]> {
	return new Promise((resolve, reject) => {
		const listingsObjectArray: Listing[] = [];

		try {
			fs.createReadStream('./data/listings.csv')
				.pipe(csv())
				.on('data', (data) => {
					let listing: Listing = data;
					listing.price = parseInt(data.price as string, 10);
					listing.mileage = parseInt(data.mileage as string, 10);
					listing.id = parseInt(data.id as string, 10);
					listingsObjectArray.push(listing)
				}).on('end', () => {
					resolve(listingsObjectArray);
				})
	
		} catch (e) {
			console.log("CSV stream error: ");
			reject(e);
		}
	
	}
	)
}

export async function getContactsFromCsv(): Promise<Contact[]> {
	return new Promise((resolve, reject) => {
		const contactObjectArray: Contact[] = [];

		try {
			fs.createReadStream('./data/contacts.csv')
				.pipe(csv())
				.on('data', (data) => {
					let contact: Contact;
					contact = data;
					contact.listing_id = parseInt(data.listing_id as string);
					contact.contact_date = parseInt(data.contact_date as string);
					contactObjectArray.push(contact);
				})
				.on('end', () => {
					resolve(contactObjectArray);
				});
		} catch (e) {
			console.log("CSV stream error: ");
			reject(e);
		}
	}
)}