import isEmpty from 'lodash/fp/isEmpty';
import queryString from 'query-string';

import  {
    PUBLISHED_DATE_PROP_KEY,
    TITLE_PROP_KEY,
    CONTENT_PROP_KEY,
    TITLE_NO_FORMATTING_PROP_KEY,
} from './constants';

const getTimeWithoutHours = date => date.setHours(0, 0, 0, 0);

const isRelevantDate = (itemDate, searchedDate) =>
    getTimeWithoutHours(itemDate) === getTimeWithoutHours(searchedDate);

const isRelevantSearchCriteria = (propValue, searchCriteria) =>
    propValue.toLowerCase().includes(searchCriteria.toLowerCase());

const isRelevantArticle = (article, filters = {}) => {
    let isArticleMatchDateCriteria = true;
    let isArticleMatchSearchCriteria = true;
    Object.keys(filters)
        .map(filterKey => {
            switch (filterKey) {
                case PUBLISHED_DATE_PROP_KEY:
                    isArticleMatchDateCriteria =
                        isRelevantDate(new Date(article[filterKey]), new Date(filters[filterKey]));
                    break;
                case TITLE_PROP_KEY:
                case CONTENT_PROP_KEY:
                case TITLE_NO_FORMATTING_PROP_KEY:
                    isArticleMatchSearchCriteria =
                        isRelevantSearchCriteria(
                            encodeURIComponent(article[filterKey]),
                            encodeURIComponent(filters[filterKey])
                        );
                    break;
            }
        });
    return isArticleMatchDateCriteria && isArticleMatchSearchCriteria;
};

/**
 * @description filter the passed items
 * @param {*} items 
 * @param {*} filters 
 * @return {Array}
 */
export const filterArticles = (items, filters) =>
    items.filter(article => isRelevantArticle(article, filters));

/**
 * @description get the query (hash) from location and parse it into an object
 * @return {Object} - query
 */
export const getQuery = () => queryString.parse(window.location.hash, { arrayFormat: 'index' });

/**
 * set the query (in hash) on location and update the url
 * @param currentQuery
 * @param query
 *  @returns {undefined}
 */
export const setQuery = (query) => {
    if(isEmpty(query))
        return;

    const oldQuery = getQuery();
    const newQuery = isEmpty(oldQuery)
        ? query
        : Object.assign({}, oldQuery, query);
    window.location.hash = '#' + queryString.stringify(newQuery, { arrayFormat: 'index' });
};
