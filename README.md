# Getting Started with Golden App

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the necessary dependencies and packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### Design methology and assumptions

The UI design of the website is build using clean vanilla css with `Flex layout` controlling the navigations and the `Grid layout` managing the main content.

The responsive design of the web app only caters to full desktop and mobile view. I did not take into account the tablet view.

The project folder structure is as followed:

- src => Contains the main project component file that loads the UI. App.tsx
- api => For api calls to the json or any other endpoints
- interfaces => Defining the strict structure to be used - redux => A single file call dataStore.ts that contains the reducer and action creator.

As no json is found, I took the liberty of creating one myself and my assumption is the landing page images is loaded from the json file. As such, the json file contains an array of data, each data containing the `image url, main text, links, hrefs` which can change the look and feel of the texts on the Grid.
