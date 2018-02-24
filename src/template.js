import isEmpty from 'lodash/fp/isEmpty';

import Article from './components/Article';
import { NO_RESULT_MESSAGE } from './constants';

const getTemplate = (articles, renderOnlyTitles = true)  => {
    if(isEmpty(articles))
        return NO_RESULT_MESSAGE;

    if(!renderOnlyTitles)
        document.querySelector('.articles__form').style.display = 'none';
    else
        document.querySelector('.articles__form').style.display = 'block';

    return articles
        .map((o) =>
            new Article(
                o.title,
                o.titleNoFormatting,
                o.content, o.url,
                o.publisher,
                o.publishedDate,
                o.image,
                o.relatedStories
            )
        )
        .reduce((a, article) => a + article.render(renderOnlyTitles), '');
};


export default getTemplate;
