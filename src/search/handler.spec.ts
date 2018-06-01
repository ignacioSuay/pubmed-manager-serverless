import {search} from './handler'
import {expect} from 'chai';
import axios from "axios";
var MockAdapter = require('axios-mock-adapter');
import 'mocha';
const  searchResponse = require('../../test/resources/search.test.response.json');


describe('search publications', () => {

    it('should return a publication', async function () {
        var mock = new MockAdapter(axios);
        mock.onGet().reply(200, searchResponse);

        const result = await search(null, null);
        console.log("resultado " + JSON.stringify(result));

    });

});
