/* global jest, expect, describe */

import mocks from '../mocks/data';
import { getQuery, setQuery, filterArticles} from '../../me/suite/src/herlpers';

describe('./helpers', () => {
    describe('filterArticles()', () => {
        it('should not mutate passed data', () => {
            filterArticles(mocks.results, { title: 'paulo coelho'});
            expect(mocks.results).toEqual(mocks.results);
        });

        it('should return an empty array if there is no article matched the searched criteria', () => {
            expect(filterArticles(mocks.results, { title: 'paulo coelho'})).toEqual([]);
        });

        it('should return relevant articles matched to the passed filters', () => {
            expect(filterArticles(mocks.results, { title: 'has only kind words for his rivals'}))
                .toEqual([mocks.results[0]]);
        });
    });

    describe('getQuery()', () => {
        it('should return the query hash with correct format', () => {
            window.location.hash = 'title=foo&content=bar&datePublished=1970-01-01';
            expect(getQuery()).toEqual({
               title: 'foo',
               content: 'bar',
                datePublished: '1970-01-01'
            });
        });
    });

    describe('setQuery()', () => {
        it('should not mutate location.hash if the query is empty', () => {
            window.location.hash = 'title=foo';
            setQuery({});
            expect(window.location.hash).toBe('#title=foo');
        });

        it('should set the query hash properly', () => {
            window.location.hash = "";
            setQuery({
                title: 'foo',
                content: 'bar',
                datePublished: '1970-01-01'
            });
            expect(window.location.hash).toBe('#content=bar&datePublished=1970-01-01&title=foo');
        });
    });
});
