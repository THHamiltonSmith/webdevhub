# WebDevHub - A place for developers

[![GitHub issues](https://img.shields.io/github/issues/THHamiltonSmith/webdevhub)](https://github.com/THHamiltonSmith/webdevhub/issues)
[![GitHub stars](https://img.shields.io/github/stars/THHamiltonSmith/webdevhub)](https://github.com/THHamiltonSmith/webdevhub/stargazers)
[![GitHub license](https://img.shields.io/github/license/THHamiltonSmith/webdevhub)](https://github.com/THHamiltonSmith/webdevhub/blob/master/LICENSE)


> WebDevHub is designed to be one central place for developers, that offers a variety of tools to help with any developing needs. This includes code formatters, file converters, image compressors etc.

https://webdevhub.herokuapp.com/

A central hub with all the tools a developer might need makes it easier to focus on developing, rather then searching for different sites to find a working tool. WebDevHub eliminates this hassle. The site is open-source, designed to be made by the users. If there a feature you want to add, a bug you want to fix etc, simply open a pull request.

---

### Implemented Features
- Hex to css `filter:` converter
- Word Counter
- Lorem Ipsum Generator
- Code Formatter (HTML, CSS, JS, etc.)
- JSON to XML converter.

### Planned Features
- Image Converter *- UI implemented but needs server-side code to fix*
- Color Converter (Hex to RGB etc.)
- URL Shortner
- File Compressors
- Site/code templates.
- Expansion to provide tools for other programming languages (C, C++, Python etc.)
- CSS grid generator
- JWT encoder / decoder
- Link to Regex101
- Colour palette generator from a base colour
- Text & JSON diff
- JS repl
- ESLint & Prettier config generators
- .MD formatter/preview


If you like, you can fork the repo and create a pull request to contribute one of these features to the site. These are only some of the features planned to be added, and more will be listed here in the future. Check out the Projects page to see a more in-depth board of potential features to be added, or create a pull request and suggest your own feature.

---
### Frameworks Used

- <a href="https://github.com/nodejs/node">Node.js</a>
- <a href="https://github.com/Sky-Enterprises/luna-framework">Luna Framework (CSS)</a>
- <a href="https://github.com/jquery/jquery">jQuery</a>
- <a href="https://github.com/codemirror/codemirror5">CodeMirror</a>
- <a href="https://github.com/beautify-web/js-beautify">js-beautify</a>

&nbsp;

## How to Contribute

To contribute to the site:

1. Clone the repository via terminal or github desktop.
2. Run `npm i` to install all needed node packages.
3. In a terminal window opened in the main project directory, run `npm run devStart` to active nodemon, which will restart the test server whenever a change is made. The server can be acessed at `localhost:3000`
4. Create a new file in the `/views` directory titled `your-feature.ejs` and a new JS file in the `/public` directory titled `your-feature.js`
5. Add a new `app.get` request in the `server.js` file, as such:

```js
app.get("/your-feature", (req, res) => {
    // Render the page with given paramaters.
    res.render("your-feature", {    // The name of the .ejs file you created
        title: "Your Feature",      // The title of the webpage, usually the same as the feature name.
    });
});
```

6. Code your feature.
7. Add a link to the feature on the home page under a relevant subcategory.
8. (Optional) - Credit yourself at the bottom of your feature using this sample code. Have a look <a href="https://webdevhub.herokuapp.com/image-converter/">here</a> for an example of how it is done.

```html
  <!-- User Credit -->
  <hr class="credit-hr">
  <span class="credit-link">Feature added by <a href="https://github.com/your-username">@your-username</a></span>
```

8. Create a pull request for your new feature.

### Rules/Guidelines for contributing

- Try to follow the site's colour scheme.
- Comment your code as you go and use readable variable names. Its hard to debug code when it looks like Latin.
- Dont delete or change other people's code without a good explanation, or your pull-request wont be approved.

> We want to make our documentation (including this README) the best it can be. If you have any suggestions, please open an issue.

&nbsp;

## Screenshots

<img width="1512" alt="Screenshot 2022-06-25 at 9 18 18 pm" src="https://user-images.githubusercontent.com/19927547/175772260-5622d523-dd80-4fdb-860d-8f7f3dc92880.png">
<img width="1512" alt="Screenshot 2022-06-28 at 11 51 51 pm" src="https://user-images.githubusercontent.com/19927547/176326721-c6901aa3-871f-4d05-889f-a4e1e6599b31.png">
<img width="1512" alt="Screenshot 2022-06-29 at 12 15 32 am" src="https://user-images.githubusercontent.com/19927547/176326733-e0303f13-9e34-460f-b999-ddf9d622d248.png">


