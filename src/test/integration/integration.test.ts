import { ListingService } from "../../service/ListingService";
import { generateAvgListingSellPricePerSellerType, generatePercentualDistributionCarsByMake, generateTop5MostContactedListingPerMonth, generateTopThirtyPercentOfContactedListings } from '../../api/index';
import { mockContacts, mockListing } from "../fixtures";

const expect = require('chai').expect;

describe('Integration tests', function () {

	describe('Test generateAvgListingSellPricePerSellerType function', () => {
		it('Should return array of objects with correct property values provided a valid listing', () => {
			const actual = generateAvgListingSellPricePerSellerType(mockListing);

			const expectedResult = [
				{ seller_type: 'private', average_in_euro: '€ 17918.4,-' },
				{ seller_type: 'dealer', average_in_euro: '€ 20064.6,-' },
				{ seller_type: 'other', average_in_euro: '€ 46081,-' }
			];
	
			expect(actual).to.eql(expectedResult);
		})
	});


	describe('Test generatePercentualDistributionCarsByMake function', () => {
		it('Should return array of objects with correct property values provided a valid listing', () => {
			const actual = generatePercentualDistributionCarsByMake(mockListing);

			const expectedResult = [
				{ make: 'Mazda', distribution: '28.57%' },
				{ make: 'Mercedes-Benz', distribution: '21.43%' },
				{ make: 'Toyota', distribution: '14.29%' },
				{ make: 'Audi', distribution: '7.14%' },
				{ make: 'Renault', distribution: '7.14%' },
				{ make: 'VW', distribution: '7.14%' },
				{ make: 'Fiat', distribution: '7.14%' },
				{ make: 'BMW', distribution: '7.14%' }
			];

			expect(actual).to.eql(expectedResult);
		})
	});

	describe('Test generateTop5MostContactedListingPerMonth function', () => {
		it('Should return array of objects with correct property values provided a valid listing and contacts which have overlapping data', () => {
			const actual = generateTop5MostContactedListingPerMonth(mockContacts, mockListing);

			const expectedResult = [
				{ make: 'Mazda', distribution: '28.57%' },
				{ make: 'Mercedes-Benz', distribution: '21.43%' },
				{ make: 'Toyota', distribution: '14.29%' },
				{ make: 'Audi', distribution: '7.14%' },
				{ make: 'Renault', distribution: '7.14%' },
				{ make: 'VW', distribution: '7.14%' },
				{ make: 'Fiat', distribution: '7.14%' },
				{ make: 'BMW', distribution: '7.14%' }
			];

			expect(actual).to.eql(expectedResult);
		});
	})

	describe('Test generateTopThirtyPercentOfContactedListings function', () => {
		it('Should return array of objects with correct property values provided a valid listing and contacts which have overlapping data', () => {
			const actual = generateTopThirtyPercentOfContactedListings(mockContacts, mockListing);

			const expectedResult = [
				{ make: 'Mazda', distribution: '28.57%' },
				{ make: 'Mercedes-Benz', distribution: '21.43%' },
				{ make: 'Toyota', distribution: '14.29%' },
				{ make: 'Audi', distribution: '7.14%' },
				{ make: 'Renault', distribution: '7.14%' },
				{ make: 'VW', distribution: '7.14%' },
				{ make: 'Fiat', distribution: '7.14%' },
				{ make: 'BMW', distribution: '7.14%' }
			];

			expect(actual).to.eql(expectedResult);
		});
	})


  })