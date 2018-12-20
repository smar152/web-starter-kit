# web-starter-kit
SASS Compiler - The purpose of this specific branch is to create an environment purely for compiling `.scss` files int o `.css` files, bundling appropriately, prefixing etc.

##Usage

###Compile
Run `npm run build`. 

All JS files in `src/cssBundles` will be processed and generate a `.css` file with the same base name under `dist/css`. The bundled `.js` files are discarded at the end since they are only used for configuration. 

###Add new files
For each new `.css` output that you want, add a new `.js` file to `src/cssBundles` with the name that you want each final `.css` file to have.

Add whatever `.scss` or `.css` files you need to the project (probably under `src/scss` but potentially also under `node_modules`).

In the `.js` file, simply import the `.scss` or `.css` files that you want combined.

## Build Commands

- All build commands for this application go through `npm` and are defined in `/package.json` under the `"scripts"` property.
- Execute each one of these scripts with `npm run scriptName`.
- When you see `npm-run-all`, that executes multiple other targets defined
- With the exception of `node`, the executables used here do **not** need to be installed on the running system, as npm will look under the `/node_modules/.bin` folder
- If a script is called `scriptName`, npm will automatically call `prescriptName` before its invocation and `postscriptName` after.
- Make sure to run `npm install` before attempting anything (only once, unless modules are upgraded in the `package.json`)

### Building for Production

#### `npm run build`

- Build the final product in the ./dist directory. To deploy, just move the contents of ./dist to a deployed directory.

#### `npm run distserver`

- Serve the contents of ./dist to `localhost:3000`. 

#### `npm run start`

- Compile and start serving for development. This also serves the content to `localhost:3000` but will re-compile with any changes, so all you need to do is refresh the browser.

#### `npm run open:src`

- If the server failed to load when running `npm run start`, start it manually with this command.
  
## Help Understanding the Technology

- [React: Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [React: Using Forms](https://reactjs.org/docs/forms.html)
- [React: Component Lifecycle methods](https://reactjs.org/docs/react-component.html#componentdidmount)
- [React: Event Handling](https://reactjs.org/docs/handling-events.html)
- [React: Special HTML Characters like className](https://reactjs.org/docs/dom-elements.html)
- [React: Making refs to dom nodes in JS](https://reactjs.org/docs/refs-and-the-dom.html)
- [React/Bootstrap: ReactStrap](https://github.com/reactstrap/reactstrap/blob/master/README.md)
- [React/Bootstrap: ReactStrap Components](https://reactstrap.github.io/components/alerts/)
- [fetch: Service Requests](https://www.npmjs.com/package/whatwg-fetch)
- [React Router: Docs](https://reacttraining.com/react-router/web/guides/philosophy)
- [React Router: Simple React Router Tutorial](https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf)
- [React Router: Deployment](https://stanko.github.io/react-router-subfolder-on-server/)
- [React Router: Deployment 2](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1)
- [React Router: React Router 4 Gotchas](https://medium.com/@djoepramono/react-router-4-gotchas-2ecd1282de65)
- [React Router: Migrating to 4](https://github.com/ReactTraining/react-router/blob/25776d4dc89b8fb2f575884749766355992116b5/packages/react-router/docs/guides/migrating.md#the-router)
