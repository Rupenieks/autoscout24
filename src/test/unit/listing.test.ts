import { ListingService } from "../../service/ListingService";
import { mockListing } from '../fixtures/listings';

const expect = require('chai').expect;

describe('Listing Service Unit Tests', () => {
	
	const listingService = new ListingService();
	// beforeEach(function() {
	  
	// })
	
	describe('Get count by seller type', () => {
		it('Should return 5 on count of Dealer', () => {
			const result = listingService.getCountBySellerType('dealer', mockListing);

			expect(result).to.equal(5);
		})
	})

	describe('Get count by car make', () => {
		it('Should return 4 on count of Mazda', () => {
			const result = listingService.getCountByCarMake('Mazda', mockListing);

			expect(result).to.equal(4);
		})
	})

	describe('Get price sum by seller type', () => {
		it('Should return sum of 100323 by type dealer', () => {
			const result = listingService.getPriceSumBySellerType('dealer', mockListing);

			expect(result).to.equal(100323);
		})
	})

	

	
  })