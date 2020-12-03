import { ContactService } from "../../service/ContactService";
import { mockListing } from "../fixtures";
import { mockContacts } from '../fixtures/contact';


const expect = require('chai').expect;

describe('Contact Service Unit Tests', () => {
	
	const contactService = new ContactService();
	// beforeEach(function() {
	  
	// })
	
	describe('Get unique listings from contact array', () => {
		it('Should return correct list of unique listings', () => {
			const result = contactService.getUniqueListingIdsFromContactArray(mockContacts);
			const expectedResult = [
				1109, 1168, 1270, 1075, 1281
			]
			expect(result).to.eql(expectedResult);
		})
	})

	describe('Get contact amount by listing ID from given contact array', () => {
		it('Should return correct contact amount', () => {
			const result = contactService.getContactAmountByListingId(1109 ,mockContacts);

			expect(result).to.equal(3);
		})
	})

	describe('Get all contacts from month', () => {
		it('Should return all contacts from given month, when given an array of contacts', () => {
			const fixedDateContacts = contactService.convertUnixToMonthYear(mockContacts);

			const expectedResult = [
				{ listing_id: 1109, contact_date: '5.2020' },
				{ listing_id: 1168, contact_date: '5.2020' },
				{ listing_id: 1168, contact_date: '5.2020' },
				{ listing_id: 1270, contact_date: '5.2020' },
			]
			
			const result = contactService.getAllContactsFromMonth(fixedDateContacts, '5.2020');

			expect(result).to.eql(expectedResult);
		})
	})

	describe('Get Price sum from listing', () => {
		it('Should return correct contact amount', () => {
			const result = contactService.getPriceSumFromListing(mockListing);
			expect(result).to.equal(374239);
		})
	})

  })