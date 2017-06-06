# MongoDB examples

**NOTE: Populating the dictionary database**
- For the dictionary examples, you should first **populate your dictionary** on your computer using the `formatted-dictionary.json` file in `load-dict-script`.
- To do this:
  - In your terminal, navigate to the `load-dict-script/` directory
  - Run `$ mongoimport --db eng-dict2 --collection words --file formatted-dictionary.json`
  - It should print out "connected to: localhost" and "imported 28035 documents"

## dictionary-server-side
- Dictionary lookup example with server-side rendering using Handlebars
- Each word in the dictionary has its own page, like http://localhost:3000/dog
- Example explained in [Lecture 25](https://docs.google.com/presentation/d/12ReR7wEcABB6uYm027hlEisiGfEHFm_dHBlkFTlKf84/edit#slide=id.g22b40c325b_0_722)
- To run:
  - In your terminal, run `$ mongod`. Keep that process running and don't close the terminal.
  - Create a second terminal window. In this terminal window, navigate to the `dictionary-server-side/` directory
  - Run `$ npm install`
  - Run `$ npm start`
  - View the running app at http://localhost:3000
  
## dictionary-spa
- Dictionary lookup example written as a single-page app
- Each word in the dictionary has its own page, like http://localhost:3000/dog
- Example explained in [Lecture 25](https://docs.google.com/presentation/d/12ReR7wEcABB6uYm027hlEisiGfEHFm_dHBlkFTlKf84/edit#slide=id.g22b40c325b_0_722)
- To run:
  - In your terminal, run `$ mongod`. Keep that process running and don't close the terminal.
  - Create a second terminal window. In this terminal window, navigate to the `dictionary-spa/` directory
  - Run `$ npm install`
  - Run `$ npm start`
  - View the running app at http://localhost:3000

