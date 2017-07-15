import { LogViewerPage } from './app.po';

describe('log-viewer App', () => {
  let page: LogViewerPage;

  beforeEach(() => {
    page = new LogViewerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
