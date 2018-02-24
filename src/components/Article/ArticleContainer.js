import Article from './Article';

export default class ArticleContainer {
    constructor(title, titleNoFormatting, content, url, publisher, publishedDate, image, relatedStories) {
        if(!title)
            throw new Error('Please provide the article title.');
        if(!content)
            throw new Error('Please provide the article content.');

        this.title = title;
        this.titleNoFormatting = titleNoFormatting || this.title;
        this.content = content;
        this.url = url || '#';
        this.publisher = publisher || '';
        this.publishedDate = publishedDate || '';
        this.image = image || {};
        this.relatedStories = relatedStories || [];
    }

    handleTitleClick() {
        return this.render();
    }

    render(renderOnlyTitle = true) {
        return Article(renderOnlyTitle, this);
    }
}
