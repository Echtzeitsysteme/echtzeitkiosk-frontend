# Echtzeitkiosk - Frontend

At the department of Real-Time Systems Lab (ES) at the Technische Universität Darmstadt, employees of the department got together and opened a small kiosk with self-service in the common kitchen. The kiosk was independently filled with different goods to build up a certain stock.  Initially it was financed by an appointed employee (from now on called administrator/superuser) who took over the administration of the kiosk and regularly checked the stock. As a result, any employee at the department is able to purchase available products from the kiosk with one payment. In the context of the project seminar software systems at the TU Darmstadt the two authors of this document are to develop a digital solution for inventory and invoice management. This GitHub repository contains the frontend code of the project. The backend code can be found [here](https://github.com/Echtzeitsysteme/echtzeitkiosk-backend). You can fork this repository and use it as a template for your own project. The frontend is written in TypeScript with [React.js](https://reactjs.org/) and uses [Material-UI](https://material-ui.com/) with the react-admin library for the user interface. The backend is also written in TypeScript with [Node.js](https://nodejs.org/en/) and uses [Express.js](https://expressjs.com/) as web framework. The database is a [PostgreSQL](https://www.postgresql.org/) database and TypeORM is chosen as an object-relational mapper (ORM). Easy deployment with [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) is supported. You can utilize Traefikv2 as a reverse proxy and Let's Encrypt for SSL certificates easily with the provided docker-compose files which contains also Portainer for container management & monitoring and Adminer for database management on browser.

![](/screenshots/login.jpg)

![](/screenshots/register.jpg)

![](/screenshots/dashboard.jpg)

![](/screenshots/users.jpg)

![](/screenshots/products.jpg)

![](/screenshots/customer-invoices.jpg)

![](/screenshots/monthly-invoice.jpg)

![](/screenshots/system-state.jpg)

![](/screenshots/customer-dashboard.jpg)

![](/screenshots/configuration.jpg) 

![](/screenshots/email-inbox.jpg)


# Setup

## Prerequisites

* Basic knowledge of the command line, UNIX, Docker, Node.js, Git, and GitHub... or the willingness to learn
* Finish this [tutorial](https://flexboxfroggy.com/) to learn CSS Flexbox, if you are not familiar with it. It's a quick and fun way to learn the basics. Also check this [cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for a quick reference.
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* Node - LTS (v16.17.0 at the time of writing) - installation with nvm is recommended
* npm  - LTS (v8.15.0 at the time of writing) - use it only to install yarn in order to make things consistent 
* yarn - stable (v1.22.15 at the time of writing) - install global packages with yarn instead of npm. Run `yarn` in the project root to install all dependencies of the project when you clone the repository.
* TypeScript - stable (v4.4.2 at the time of writing)
* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com) (optional)
* [Docker Desktop](https://www.docker.com/products/docker-desktop) (optional)
* [GitHub Desktop](https://desktop.github.com/) (optional)
* API - [echtzeitkiosk-backend](https://github.com/Echtzeitsysteme/echtzeitkiosk-backend)

## .env

``` 
# production || development || test
NODE_ENV=production

# put this env variable in GitHub secrets if you want to build docker images with GitHub Actions
REACT_APP_API_URL=http://localhost:4000/v1

```
## GitHub Actions
* `./github/workflows/arm64.yml`  and `./github/workflows/amd64.yml` are used to build docker images for ARM64 and AMD64 architectures respectively and then push them to GitHub Container Registry. When a new commit is pushed to the `deployment` branch, the workflow is triggered. You can use the images in your own project by changing the image name in the docker-compose files. 
  * Images are stored in the `packages` tab of the GitHub Container Registry.
    * https://github.com/Echtzeitsysteme/echtzeitkiosk-frontend/pkgs/container/echtzeitkiosk-frontend
  * https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
  * You should create a `read:packages` token on GitHub. Then you can use it on your server to pull the images from GitHub Container Registry.
  * Be sure that you pull the correct image for your architecture. You can check your architecture with `uname -m` command on your server. And you should also use the correct image in your docker-compose file.

## Docker and Docker Compose

### Dockerfile
* Two step build
  * FROM node:16-alpine AS builder
    * If you need to change your server local timezone, you can change it in this step. 
    * `ENV GENERATE_SOURCEMAP=false` ensures that the source map is not generated in production mode.
    * You can also set REACT_APP_API_URL in this step, if you want to build docker images with GitHub Actions and you don't want to put REACT_APP_API_URL in GitHub secrets.
  * FROM nginx:stable-alpine 
    * Serve static files from the build folder with nginx
    * nginx configuration file is located at `./nginx/nginx.conf`

### Docker Compose
#### docker-compose.yml
* `./docker-compose.yml` is used to run the application in development mode without SSL certificates and reverse proxy. You should use it only for development purposes. You can use it to run the application in production mode if you don't want to use Traefikv2 and Let's Encrypt. Be sure that you set open required ports in your firewall for the services that you want to expose to the internet. 
#### docker-compose.with-traefik.yml
* `./docker-compose.with-traefik.yml` is used to run the application in production mode with Traefikv2 and Let's Encrypt. You can use it for production purposes. Be sure that you set open required ports in your firewall for the services that you want to expose to the internet. You can play with labels to configure Traefikv2.
  * Check this documentation: https://rafrasenberg.com/posts/docker-container-management-with-traefik-v2-and-portainer/

## Useful Tips and Notes

* `src/index.tsx` is the entry point of the application like the `main.cpp` in C++ and `Main.java` in Java. However in React, the entry point is a component which is called `App` and it is located in `src/App.tsx`. The `index.tsx` file is responsible for rendering the `App` component.
* Under the `public` folder, you can find the `index.html` file which is the template of the application. The `index.html` file is responsible for loading the `index.js` file which is the compiled JavaScript code of the application. The `index.js` file is generated by the `build` command of the `react-scripts` package. It is a big file which contains all the JavaScript code of the application since we implemented a single page application.
* Check CORS settings of your backend if you get any problems after a deployment, when you try to access the API from a browser.
* Check console logs of the browser if you get any problems after a deployment or while developing. Be sure that the API URL is correct. You should see someting like this in the console: `API_URL http://localhost:4000/v1`. You can also use the React Developer Tools extension of the browser to inspect the React components. 
* Do not delete the `yarn.lock` file. It is used to lock the versions of the dependencies of the project. If you delete it, you may get different versions of the dependencies and you may get errors. Do not use `npm` to install dependencies. Use `yarn` instead. If you use `npm` to install dependencies, you may get different versions of the dependencies and you may get errors. Furthermore `npm` is not compatible with `yarn.lock` file. If you use `npm` to install dependencies, you will get an extra `package-lock.json` file which will make the project inconsistent. So use `yarn` to install dependencies and if you want to install a global package, use `yarn global add <package-name>` instead of `npm install -g <package-name>`. yarn is also used for Docker images. So if you use `npm` to install dependencies, you may get different versions of the dependencies in the Docker image and you may get errors.
* **token, role, userId, email** variables will be stored in the local storage of the browser on login. You can use the browser's developer tools to access them. Logout will remove them from the local storage.
* `**Language and theme** preferences will also persist in the local storage of the browser and will be applied on the next visit. You can use the browser's developer tools to access them. Logout will remove them from the local storage.
* The user will be logged out if the token expires. The token expiration time is set by the backend. The token expiration time can be changed in the backend's .env file.
* `src/authProvider.ts` is responsible for the authentication of the application. It is a custom authentication provider which is used by the `react-admin` package. The `react-admin` package is a framework for building admin applications. It is a wrapper around the `react` package. It provides a lot of features out of the box. For example, it provides a data provider which is responsible for fetching data from the backend. It also provides a custom authentication provider which is responsible for the authentication of the application. The `react-admin` package also provides a custom theme which is responsible for the styling of the application. The `react-admin` package also provides a custom layout which is responsible for the layout of the application. The `react-admin` package also provides a custom menu which is responsible for the menu of the application. 
* i18n related files can be found under `src/i18n` and `src/packages`. You can edit the files under `src/i18n` to change the translations.
* Data fetching functions of react-admin are not used. The react-admin library is used only for the UI, i18n and authentication. 
* Visit [react-admin](https://marmelab.com/react-admin/) for more information about react-admin.

  
## Commit Messages

### **`yarn commit`**

This project uses [commitizen](https://github.com/commitizen/cz-cli) with the cz-emoji extension to standardize commit messages. To use it, run `yarn commit` instead of `git commit` after staging your changes. You will be prompted to select a commit type and write a commit message. You can select the commit type by typing keywords or with arrow keys. The commit message will be automatically formatted according to the commit type. cz-cli package is also installed to use commitizen from the command line. Be sure that required dependencies are installed before using it. You can also use the normal `git commit` command. We don't validate commit messages, but it's a good practice to use commitizen.

## Getting Started with Create React App (CRA)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### CRA Scripts

In the project directory, you can run:

#### **`yarn dev`**

Runs the app in the development mode with hot reloading.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.\
Build process can take 1-15 minutes, especially with GitHub Actions.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

As written below, this project is bootstrapped with CRA and some configurations may not be optimized for your use case. If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. There are also alternatives to `eject` that you can use to customize your build process without ejecting. You can check one of these: rewire, CRACO, react-app-rewired .

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Credits

* [This project example from react-admin library was used as boilerplate for this project.](https://github.com/marmelab/react-admin/tree/master/examples/demo)
* [Material UI](https://mui.com/)
* [JavaScript Shopping Cart library on top of localStorage](https://github.com/peet86/cart-localstorage)
* [SweetAlert2](https://sweetalert2.github.io/)
* [React](https://reactjs.org/)
* [Deployment with Docker & Traefikv2 & free SSL certs from Let’s Encrypt](https://rafrasenberg.com/posts/docker-container-management-with-traefik-v2-and-portainer/)
* [GitHub Copilot](https://github.com/features/copilot/) - AI assisted code completion and suggestions. 😉
* [Tabnine](https://www.tabnine.com/) - AI assisted code completion and suggestions. 😉
* [Unsplash](https://unsplash.com/) - Free high-resolution photos. 📷
* and many more packages which are listed in package.json.

# Changelog

## [0.1.0] - 2022-09-14

Init release.

### Major changes

- Initial release

### Changed features

- Initial release

# Roadmap (implicit post-mortem 🥲)

- [ ] Code splitting 🙈
- [ ] Better folder structure 🙈
- [ ] Migration to [Vite](https://www.darraghoriordan.com/2021/05/16/migrating-from-create-react-app-to-vite/)\
- [ ] Utilize react-admin or remove/replace it 🙈 
- [ ] Use JSON body instead of url-encoding 🙈 
- [ ] Testing 🙈
- [ ] Better CI/CD and linting\ 
  - [ ] lint-staged\🤕
  - [ ] husky🤕
  - [ ] ...
- [ ] Optimize nginx config
- [ ] "DRY" components 🙈
- [ ] Use proper strict TypeScript with TSC_COMPILE_ON_ERROR=false... 🥲
  - [ ] Use more TypeScript features like Interfaces, Enums, etc. 🙈
- [ ] Add GDPR compliance (cookie consent, privacy policy, etc.) 👨‍⚖️
- [ ] Improve/customize CSV export for the DataGrid component
- [ ] Improve/customize search box for the DataGrid component
- [ ] Improve/customize sorting, pagination and filtering for the DataGrid component
- [ ] Optimize bundle size
- [ ] Optimize images


# Contributing

Feel free to contribute to this project. You can open an issue or a pull request. If you want to contribute to this project.

# LICENSE

[GNU General Public License v3.0](LICENSE)
