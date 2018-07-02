import {search} from './handler'
import {expect} from 'chai';
import axios from "axios";
import 'mocha';
import {Publication, PublicationGroup} from "../model/publication.type";
const  searchResponse = require('../../test/resources/search.test.response.json');
const  summaryResponse = require('../../test/resources/summary.response.json');
const  event = require('../../test/resources/event.json');
const MockAdapter = require('axios-mock-adapter');

describe('search publications', () => {

    it('should return 20 publications', async function () {

        //Given
        const mock = new MockAdapter(axios);
        mock.onGet(new RegExp('esearch')).reply(200, searchResponse);
        mock.onGet(new RegExp('esummary')).reply(200, summaryResponse);

        //When
        const result = await search(event);

        //Then
        expect(result).to.not.be.null;
        expect(result.statusCode).to.equal(200);

        const resPubs = JSON.parse(result.body).publications as Publication[];
        expect(resPubs.length).to.equal(20);

        const lastPub = resPubs[19];
        expect(lastPub.uid).to.equal("29857301");
        expect(lastPub.title).to.equal("Anion photoelectron spectroscopy and chemical bonding of ThO<sub>2</sub><sup>-</sup> and ThO<sub>3</sub><sup/>.");
        expect(lastPub.pubdate).to.equal("2018 May 29");
        expect(lastPub.epubdate).to.equal("2018 May 29");
        expect(lastPub.source).to.equal("Biomed Pharmacother");
        expect(lastPub.lastauthor).to.equal("McCarron PA");
        expect(lastPub.issue).to.equal("");
        expect(lastPub.pages).to.equal("215-224");
        expect(lastPub.lang[0]).to.equal("eng");
        expect(lastPub.issn).to.equal("0753-3322");
        expect(lastPub.pubtype[0]).to.equal('Journal Article');
        expect(lastPub.pubmedId).to.equal("29857301");
        expect(lastPub.doi).to.equal("10.1016/j.biopha.2018.05.124");

        //Then Authors are correct
        expect(lastPub.authors[0].name).to.equal("Haggag YA");
        expect(lastPub.authors[0].authType).to.equal("Author");

        expect(lastPub.authors[2].name).to.equal("El-Gizawy SA");
        expect(lastPub.authors[2].authType).to.equal("Author");

        expect(lastPub.authors[6].name).to.equal("McCarron PA");
        expect(lastPub.authors[6].authType).to.equal("Author");
        expect(lastPub.authors.length).to.equal(7);

    });

    it('should return the expected count, webenv and queryKey data', async function () {

        //Given
        const mock = new MockAdapter(axios);
        mock.onGet(new RegExp('esearch')).reply(200, searchResponse);
        mock.onGet(new RegExp('esummary')).reply(200, summaryResponse);

        //When
        const result = await search(event);

        //Then
        expect(result).to.not.be.null;
        expect(result.statusCode).to.equal(200);

        const response = JSON.parse(result.body) as PublicationGroup;
        expect(response.publications.length).to.equal(20);
        expect(response.count).to.equal("3671832");
        expect(response.queryKey).to.equal("1");
        expect(response.webEnv).to.equal("NCID_1_253755776_130.14.22.215_9001_1527878257_2130018231_0MetA0_S_MegaStore");


    });

});
