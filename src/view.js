import { getQuery, setQuery } from './herlpers';
import { ROOT_ELEMENT, SEARCH_INPUT, DATE_INPUT } from './constants';

export default class View {
    constructor(template) {
        this.template = template;

        this.$rootElement = document.querySelector(ROOT_ELEMENT);
        this.$searchInput = document.querySelector(SEARCH_INPUT);
        this.$dateInput = document.querySelector(DATE_INPUT);

        this.filInputs();
        this.setView();
        this.bindEvents();
    }

    filInputs() {
        const urlParams = getQuery();
        this.$searchInput.value = urlParams.title || '';
        this.$dateInput.value = urlParams.publishedDate || '';
    }

    setView() {
        this.$rootElement.innerHTML = this.template;
        //this.$rootElement.style.display = 'none';
    }

    handleSearch(value) {
        setQuery({
            title: value || undefined,
            content: value || undefined,
        });
    }

    handleSearchByDate(value) {
        setQuery({ publishedDate: value || undefined });
    }

    bindEvents() {
        if(this.$searchInput) {
            this.$searchInput.onkeyup = (e) => this.handleSearch(event.target.value);
            this.$searchInput.onchange = (e) => this.handleSearch(event.target.value);
        }

        if(this.$dateInput) {
            this.$dateInput.onchange = (e) => this.handleSearchByDate(event.target.value);
        }
    }
}
