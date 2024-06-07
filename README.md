# QuackAlias

QuackAlias is a simple email alias generator web application.
## Usage

**1. Obtain the DuckDuckGo API Key:**

   - [Install the DuckDuckGo web browser extension.](https://duckduckgo.com/email/)
   - [Set up the Email Protection feature.](https://duckduckgo.com/email/)

From here, follow these steps closely:

-  From DuckDuckGo’s email autofill page, right-click anywhere on the page and select “Inspect” from the context menu.

<img src="images/image1.jpg" alt="Image 1" width="450" height="350">

- In the developer tools panel, click the “Network” tab at the top.

<img src="images/image2.jpg" alt="Image 2" width="450" height="350">

- On the DuckDuckGo site next to the sidebar, click the “Generate Private Duck Address” button.

- In the developer panel sidebar, click on the word “addresses.”

<img src="images/image3.jpg" alt="Image 3" width="450" height="350">

- Scroll down until you see the words “authorization: Bearer,” followed by a long string of letters and numbers.

- Copy the long string of letters and numbers (without the “authorization: Bearer” portion) to your clipboard.

**2. Clone the repository:**

```bash
git clone https://github.com/Megane0103/quackalias.git
```

**3. Install dependencies for backend:**

```bash
cd quackalias/backend
npm install
```

**4. Create the config.js file in the `backend` directory:**

In the `backend` directory, create a file named `config.js` and add the following content:

```javascript
// config.js
export const DUCKDUCKGO_API_KEY = '';
```

**5. Paste the API key into the config.js file:**

Paste the copied API key into the `DUCKDUCKGO_API_KEY` variable within the `config.js` file in the `backend` directory.

**6. Start the server:**

```bash
cd ../backend
node server.mjs
```

**7. Open `index.html` in your browser to use QuackAlias.**

## Features

- Generate email aliases with a click of a button.
- Copy generated email aliases to the clipboard.
- View history of generated aliases and delete them if needed.

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- API: DuckDuckGo Email Alias API

## Contributing

Contributions are welcome! Please fork this repository and create a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.


