import { Controller } from "stimulus";

export default class extends Controller {
  static values = {
    url: String,
    page: Number,
  };

  initialize() {
    this.scroll = this.scroll.bind(this);
    this.pageValue = this.pageValue || 1;
  }

  connect() {
     document.addEventListener("scroll", this.scroll);
  }

  scroll() {
    if (this.scrollReachedEnd) {
      this._fetchNewPage()
    }
  }

  async _fetchNewPage() {
    const url = new URL(this.urlValue);
    url.searchParams.set('page', this.pageValue)

    await get(url.toString(), {
      responseKind: 'turbo-stream'
    });

    this.pageValue +=1;
  }


  get scrollReachedEnd() {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      return distanceFromBottom < 20; // adjust the number 20 yourself
  }
}
