import isEmpty from 'lodash/fp/isEmpty';

const getRelatedStories = (relatedStories) => (
    isEmpty(relatedStories) ? 
    '' :
    relatedStories.reduce((a, item) => (
        a + `<li class="article__related-stories--item">
            <a 
                href="${item.unescapedUrl}" 
                class="article__related-stories--item__url" 
                title="${item.titleNoFormatting}">
                <span class="link__animation--underline">
                    ${item.title}
                </span>
            </a>
            <div class="article__related-stories--item-publisher">
                ${item.publisher} - ${item.publishedDate}
            </div>
        </li>`
    ), '<ul  class="article__content">') + '</ul>'
);

const Article = (renderOnlyTitle, {
    title,
    titleNoFormatting,
    image,
    content,
    url,
    publisher,
    publisherDate,
    relatedStories,
}) => {
    if(renderOnlyTitle)
        return `
            <h2 class="article__title">
                <a href="#titleNoFormatting=${encodeURIComponent(titleNoFormatting)}">
                    <span class="link__animation--underline">
                        ${titleNoFormatting}
                    </span>
                </a>
            </h2>
        `;

    return `
        <article class="article">
            <div class="article-top">
                <h1 class="article__title--main">${title}</h1>
                <figure class="article__image">
                    <img
                        src= ${image.url}
                        alt= ${titleNoFormatting}
                    />
                    <figcaption>
                        <div class="article__image--publisher">
                        <a 
                            href="${image.originalContextUrl}" 
                            title=${image.publisher} 
                            target="_blank">
                                <span class="link__animation--underline">
                                    ${image.publisher}
                                </span>
                            </a>
                        </div>
                    </figcaption>
                </figure>
                <div class="article__content">${content}</div>
                <a 
                    href="${url}" 
                    title=${titleNoFormatting}
                    class="article__readmore" 
                    target="_blank">
                    <span class="link__animation--underline">
                        read more
                    </span>
                </a>
                <div class="article__publisher">
                    ${publisher} - ${publisherDate}
                </div>
            </div>
            ${getRelatedStories(relatedStories)}
        </article>
    `;
};

export default Article;
