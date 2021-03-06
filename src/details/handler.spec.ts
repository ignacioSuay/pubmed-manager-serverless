import {getPublicationDetails} from './handler'
import {expect} from 'chai';
import axios from "axios";
import 'mocha';
import {PublicationDetails} from "../model/publication.type";

const event = require('../../test/resources/event.json');
const MockAdapter = require('axios-mock-adapter');

describe('Get publication details', () => {

    it('should return the publication details', async function () {

        //Given
        const mock = new MockAdapter(axios);
        const xmlResult = '<?xml version="1.0" ?>\n<!DOCTYPE PubmedArticleSet PUBLIC "-//NLM//DTD PubMedArticle, 1st January 2018//EN" "https://dtd.nlm.nih.gov/ncbi/pubmed/out/pubmed_180101.dtd">\n<PubmedArticleSet>\n<PubmedArticle>\n    <MedlineCitation Status="Publisher" Owner="NLM">\n        <PMID Version="1">29869029</PMID>\n        <DateRevised>\n            <Year>2018</Year>\n            <Month>06</Month>\n            <Day>05</Day>\n        </DateRevised>\n        <Article PubModel="Print-Electronic">\n            <Journal>\n                <ISSN IssnType="Electronic">1860-1499</ISSN>\n                <JournalIssue CitedMedium="Internet">\n                    <PubDate>\n                        <Year>2018</Year>\n                        <Month>Jun</Month>\n                        <Day>05</Day>\n                    </PubDate>\n                </JournalIssue>\n                <Title>Medical molecular morphology</Title>\n                <ISOAbbreviation>Med Mol Morphol</ISOAbbreviation>\n            </Journal>\n            <ArticleTitle>Dynamic localization of α-tubulin acetyltransferase ATAT1 through the cell cycle in human fibroblastic KD cells.</ArticleTitle>\n            <ELocationID EIdType="doi" ValidYN="Y">10.1007/s00795-018-0195-x</ELocationID>\n            <Abstract>\n                <AbstractText>Acetylation of α-tubulin is a well-studied posttranscriptional modification, which is mostly catalyzed by α-tubulin N-acetyltransferase (ATAT1). ATAT1 possibly affects various cellular functions related with microtubules, such as intracellular transport, cell motility, cilia formation, and neuronal signaling. Here, we analyzed the subcellular localization of immunolabeled ATAT1 in human fibroblast KD cells through the cell cycle using confocal laser scanning microscopy. ATAT1 dramatically changed its localization through the cell cycle, depending on the mitotic phase. In interphase, immunolabeled ATAT1 was observed in centrioles, nuclei, and basal bodies if the cells projected primary cilia. ATAT1 was intensely detected as clusters in the nuclei in the G1-G2 phase. In telophase, ATAT1 colocalized with chromatids and spindle poles, and ultimately migrated to the daughter nucleus, newly synthesized centrioles, and midbody. The nucleolus is a core region of ribosomal RNA transcription, and the midbody is associated with severing and depolymerizing of microtubules in the stembody. The specific distributions of ATAT1 through the cell cycle suggest multiple functions of ATAT1, which could include acetylation of microtubules, RNA transcription activity, severing microtubules, and completion of cytokinesis.</AbstractText>\n            </Abstract>\n            <AuthorList CompleteYN="Y">\n                <Author ValidYN="Y">\n                    <LastName>Nekooki-Machida</LastName>\n                    <ForeName>Yoko</ForeName>\n                    <Initials>Y</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan. y-nekooki@med.teikyo-u.ac.jp.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Nakakura</LastName>\n                    <ForeName>Takashi</ForeName>\n                    <Initials>T</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Nishijima</LastName>\n                    <ForeName>Yoshimi</ForeName>\n                    <Initials>Y</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Tanaka</LastName>\n                    <ForeName>Hideyuki</ForeName>\n                    <Initials>H</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Arisawa</LastName>\n                    <ForeName>Kenjiro</ForeName>\n                    <Initials>K</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Kiuchi</LastName>\n                    <ForeName>Yoshiko</ForeName>\n                    <Initials>Y</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Miyashita</LastName>\n                    <ForeName>Toshio</ForeName>\n                    <Initials>T</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n                <Author ValidYN="Y">\n                    <LastName>Hagiwara</LastName>\n                    <ForeName>Haruo</ForeName>\n                    <Initials>H</Initials>\n                    <AffiliationInfo>\n                        <Affiliation>Department of Anatomy, Graduate School of Medicine, Teikyo University, 2-11-1 Kaga Itabashi-Ku, Tokyo, 173-8605, Japan. h.hagiwara@med.teikyo-u.ac.jp.</Affiliation>\n                    </AffiliationInfo>\n                </Author>\n            </AuthorList>\n            <Language>eng</Language>\n            <GrantList CompleteYN="Y">\n                <Grant>\n                    <GrantID>17K08523</GrantID>\n                    <Agency>Ministry of Education, Culture, Sports, Science and Technology</Agency>\n                    <Country/>\n                </Grant>\n            </GrantList>\n            <PublicationTypeList>\n                <PublicationType UI="D016428">Journal Article</PublicationType>\n            </PublicationTypeList>\n            <ArticleDate DateType="Electronic">\n                <Year>2018</Year>\n                <Month>06</Month>\n                <Day>05</Day>\n            </ArticleDate>\n        </Article>\n        <MedlineJournalInfo>\n            <Country>Japan</Country>\n            <MedlineTA>Med Mol Morphol</MedlineTA>\n            <NlmUniqueID>101239023</NlmUniqueID>\n            <ISSNLinking>1860-1499</ISSNLinking>\n        </MedlineJournalInfo>\n        <KeywordList Owner="NOTNLM">\n            <Keyword MajorTopicYN="N">ATAT1</Keyword>\n            <Keyword MajorTopicYN="N">Acetylation</Keyword>\n            <Keyword MajorTopicYN="N">Cell cycle</Keyword>\n            <Keyword MajorTopicYN="N">KD cell</Keyword>\n            <Keyword MajorTopicYN="N">α-Tubulin</Keyword>\n        </KeywordList>\n    </MedlineCitation>\n    <PubmedData>\n        <History>\n            <PubMedPubDate PubStatus="received">\n                <Year>2018</Year>\n                <Month>03</Month>\n                <Day>13</Day>\n            </PubMedPubDate>\n            <PubMedPubDate PubStatus="accepted">\n                <Year>2018</Year>\n                <Month>06</Month>\n                <Day>01</Day>\n            </PubMedPubDate>\n            <PubMedPubDate PubStatus="entrez">\n                <Year>2018</Year>\n                <Month>6</Month>\n                <Day>6</Day>\n                <Hour>6</Hour>\n                <Minute>0</Minute>\n            </PubMedPubDate>\n            <PubMedPubDate PubStatus="pubmed">\n                <Year>2018</Year>\n                <Month>6</Month>\n                <Day>6</Day>\n                <Hour>6</Hour>\n                <Minute>0</Minute>\n            </PubMedPubDate>\n            <PubMedPubDate PubStatus="medline">\n                <Year>2018</Year>\n                <Month>6</Month>\n                <Day>6</Day>\n                <Hour>6</Hour>\n                <Minute>0</Minute>\n            </PubMedPubDate>\n        </History>\n        <PublicationStatus>aheadofprint</PublicationStatus>\n        <ArticleIdList>\n            <ArticleId IdType="pubmed">29869029</ArticleId>\n            <ArticleId IdType="doi">10.1007/s00795-018-0195-x</ArticleId>\n            <ArticleId IdType="pii">10.1007/s00795-018-0195-x</ArticleId>\n        </ArticleIdList>\n    </PubmedData>\n</PubmedArticle>\n\n</PubmedArticleSet>';
        mock.onGet(new RegExp('efetch')).reply(200, xmlResult);

        //When
        const result = await getPublicationDetails(event);

        //Then
        expect(result).to.not.be.null;
        expect(result.statusCode).to.equal(200);

        const pub = JSON.parse(result.body) as PublicationDetails;
        expect(pub.abstract).to.equal("Acetylation of α-tubulin is a well-studied posttranscriptional modification, which is mostly catalyzed by α-tubulin N-acetyltransferase (ATAT1). ATAT1 possibly affects various cellular functions related with microtubules, such as intracellular transport, cell motility, cilia formation, and neuronal signaling. Here, we analyzed the subcellular localization of immunolabeled ATAT1 in human fibroblast KD cells through the cell cycle using confocal laser scanning microscopy. ATAT1 dramatically changed its localization through the cell cycle, depending on the mitotic phase. In interphase, immunolabeled ATAT1 was observed in centrioles, nuclei, and basal bodies if the cells projected primary cilia. ATAT1 was intensely detected as clusters in the nuclei in the G1-G2 phase. In telophase, ATAT1 colocalized with chromatids and spindle poles, and ultimately migrated to the daughter nucleus, newly synthesized centrioles, and midbody. The nucleolus is a core region of ribosomal RNA transcription, and the midbody is associated with severing and depolymerizing of microtubules in the stembody. The specific distributions of ATAT1 through the cell cycle suggest multiple functions of ATAT1, which could include acetylation of microtubules, RNA transcription activity, severing microtubules, and completion of cytokinesis.");
    });

    it('should return empty publication details', async function () {

        //Given
        const mock = new MockAdapter(axios);
        const xmlResult = '<?xml version="1.0" ?>\n' +
            '<!DOCTYPE PubmedArticleSet PUBLIC "-//NLM//DTD PubMedArticle, 1st June 2018//EN" "https://dtd.nlm.nih.gov/ncbi/pubmed/out/pubmed_180601.dtd">\n' +
            '<PubmedArticleSet>\n' +
            '    <PubmedArticle>\n' +
            '        <MedlineCitation Status="In-Data-Review" Owner="NLM">\n' +
            '            <PMID Version="1">29880494</PMID>\n' +
            '            <DateRevised>\n' +
            '                <Year>2018</Year>\n' +
            '                <Month>06</Month>\n' +
            '                <Day>08</Day>\n' +
            '            </DateRevised>\n' +
            '            <Article PubModel="Print">\n' +
            '                <Journal>\n' +
            '                    <ISSN IssnType="Electronic">1524-4571</ISSN>\n' +
            '                    <JournalIssue CitedMedium="Internet">\n' +
            '                        <Volume>122</Volume>\n' +
            '                        <Issue>12</Issue>\n' +
            '                        <PubDate>\n' +
            '                            <Year>2018</Year>\n' +
            '                            <Month>Jun</Month>\n' +
            '                            <Day>08</Day>\n' +
            '                        </PubDate>\n' +
            '                    </JournalIssue>\n' +
            '                    <Title>Circulation research</Title>\n' +
            '                    <ISOAbbreviation>Circ. Res.</ISOAbbreviation>\n' +
            '                </Journal>\n' +
            '                <ArticleTitle>The CCC Complex COMManDs Control of LDL Cholesterol Levels.</ArticleTitle>\n' +
            '                <Pagination>\n' +
            '                    <MedlinePgn>1629-1631</MedlinePgn>\n' +
            '                </Pagination>\n' +
            '                <ELocationID EIdType="doi" ValidYN="Y">10.1161/CIRCRESAHA.118.313074</ELocationID>\n' +
            '                <AuthorList CompleteYN="Y">\n' +
            '                    <Author ValidYN="Y">\n' +
            '                        <LastName>Keating</LastName>\n' +
            '                        <ForeName>Michael F</ForeName>\n' +
            '                        <Initials>MF</Initials>\n' +
            '                        <AffiliationInfo>\n' +
            '                            <Affiliation>From the Lipid Metabolism and Cardiometabolic Disease Laboratory, Baker Heart and Diabetes Institute, Melbourne, Australia (M.F.K., A.C.C.).</Affiliation>\n' +
            '                        </AffiliationInfo>\n' +
            '                        <AffiliationInfo>\n' +
            '                            <Affiliation>Central Clinical School, Monash University, Melbourne, Australia (M.F.K., A.C.C.).</Affiliation>\n' +
            '                        </AffiliationInfo>\n' +
            '                    </Author>\n' +
            '                    <Author ValidYN="Y">\n' +
            '                        <LastName>Calkin</LastName>\n' +
            '                        <ForeName>Anna C</ForeName>\n' +
            '                        <Initials>AC</Initials>\n' +
            '                        <AffiliationInfo>\n' +
            '                            <Affiliation>From the Lipid Metabolism and Cardiometabolic Disease Laboratory, Baker Heart and Diabetes Institute, Melbourne, Australia (M.F.K., A.C.C.) anna.calkin@baker.edu.au.</Affiliation>\n' +
            '                        </AffiliationInfo>\n' +
            '                        <AffiliationInfo>\n' +
            '                            <Affiliation>Central Clinical School, Monash University, Melbourne, Australia (M.F.K., A.C.C.).</Affiliation>\n' +
            '                        </AffiliationInfo>\n' +
            '                    </Author>\n' +
            '                </AuthorList>\n' +
            '                <Language>eng</Language>\n' +
            '                <PublicationTypeList>\n' +
            '                    <PublicationType UI="D016421">Editorial</PublicationType>\n' +
            '                </PublicationTypeList>\n' +
            '            </Article>\n' +
            '            <MedlineJournalInfo>\n' +
            '                <Country>United States</Country>\n' +
            '                <MedlineTA>Circ Res</MedlineTA>\n' +
            '                <NlmUniqueID>0047103</NlmUniqueID>\n' +
            '                <ISSNLinking>0009-7330</ISSNLinking>\n' +
            '            </MedlineJournalInfo>\n' +
            '            <KeywordList Owner="NOTNLM">\n' +
            '                <Keyword MajorTopicYN="N">Editorials</Keyword>\n' +
            '                <Keyword MajorTopicYN="N">animals</Keyword>\n' +
            '                <Keyword MajorTopicYN="N">atherosclerosis</Keyword>\n' +
            '                <Keyword MajorTopicYN="N">humans</Keyword>\n' +
            '                <Keyword MajorTopicYN="N">mice</Keyword>\n' +
            '            </KeywordList>\n' +
            '        </MedlineCitation>\n' +
            '        <PubmedData>\n' +
            '            <History>\n' +
            '                <PubMedPubDate PubStatus="entrez">\n' +
            '                    <Year>2018</Year>\n' +
            '                    <Month>6</Month>\n' +
            '                    <Day>9</Day>\n' +
            '                    <Hour>6</Hour>\n' +
            '                    <Minute>0</Minute>\n' +
            '                </PubMedPubDate>\n' +
            '                <PubMedPubDate PubStatus="pubmed">\n' +
            '                    <Year>2018</Year>\n' +
            '                    <Month>6</Month>\n' +
            '                    <Day>9</Day>\n' +
            '                    <Hour>6</Hour>\n' +
            '                    <Minute>0</Minute>\n' +
            '                </PubMedPubDate>\n' +
            '                <PubMedPubDate PubStatus="medline">\n' +
            '                    <Year>2018</Year>\n' +
            '                    <Month>6</Month>\n' +
            '                    <Day>9</Day>\n' +
            '                    <Hour>6</Hour>\n' +
            '                    <Minute>0</Minute>\n' +
            '                </PubMedPubDate>\n' +
            '            </History>\n' +
            '            <PublicationStatus>ppublish</PublicationStatus>\n' +
            '            <ArticleIdList>\n' +
            '                <ArticleId IdType="pubmed">29880494</ArticleId>\n' +
            '                <ArticleId IdType="pii">CIRCRESAHA.118.313074</ArticleId>\n' +
            '                <ArticleId IdType="doi">10.1161/CIRCRESAHA.118.313074</ArticleId>\n' +
            '            </ArticleIdList>\n' +
            '        </PubmedData>\n' +
            '    </PubmedArticle>\n' +
            '</PubmedArticleSet>';
        mock.onGet(new RegExp('efetch')).reply(200, xmlResult);

        //When
        const result = await getPublicationDetails(event);

        //Then
        expect(result).to.not.be.null;
        expect(result.statusCode).to.equal(200);

        const pub = JSON.parse(result.body) as PublicationDetails;
        expect(pub.abstract).to.equal("");
    });

});

