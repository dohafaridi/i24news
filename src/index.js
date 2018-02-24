import isEmpty from 'lodash/fp/isEmpty';
import mocks from '../mocks/data';

import { filterArticles, getQuery } from './herlpers';
import getTemplate from './template';
import View from './view';

const getArticles = filters => isEmpty(filters)
    ? mocks.results
    : filterArticles(mocks.results, filters);

const getView = (template) => new View(template);

const setView = () => {
    const query = getQuery();
    const articles = getArticles(query);
    const renderOnlyTitles = isEmpty(query.titleNoFormatting) ? true : false;
    const template = getTemplate(articles, renderOnlyTitles);

    getView(template);
};

window.addEventListener('load', setView);
window.addEventListener('hashchange', setView);
