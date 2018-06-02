import {search} from './handler'
import {expect} from 'chai';
import axios from "axios";
var MockAdapter = require('axios-mock-adapter');
import 'mocha';
const  searchResponse = require('../../test/resources/search.test.response.json');
const  summaryResponse = require('../../test/resources/summary.response.json');


describe('search publications', () => {

    it('should return 20 publications', async function () {

        //Given
        var mock = new MockAdapter(axios);
        mock.onGet(new RegExp('esearch')).reply(200, searchResponse);
        mock.onGet(new RegExp('esummary')).reply(200, summaryResponse);

        //When
        const result = await search(null, null);

        //Then
        console.log("resultado " + JSON.stringify(result));
        expect(result).to.not.be.null;
        expect(result.statusCode).to.equal(200);
        expect(result.body)

    });

});
