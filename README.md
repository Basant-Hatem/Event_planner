# EventPlannerFrontend
This is the frontend part of the Event Planner project built with Angular.
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.3.

## Getting Started
Follow these steps to set up and run the project locally after cloning it.

### Prerequisites
Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli)

You can check versions by running:
node -v
npm -v
ng version

### After Pulling the Project

If you’ve just cloned or pulled this project from GitHub, follow these steps before running it:

## Navigate into the project folder

   cd frontend-event-planner-tools3

## Install dependencies (since node_modules isn’t included in the repo):

   npm install

   This command downloads all required packages listed in `package.json` and recreates the `node_modules` folder.

## Verify Angular CLI is installed globally
   If you don’t have it, install it with:

   npm install -g @angular/cli

## Development server

To start a local development server, run:

ng serve

Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload whenever you modify any of the source files.


### Building for Production

To create an optimized build of the project:

ng build --configuration production

The compiled files will be available in the dist/ directory.

### Notes

* Do not push node_modules or .angular folders — they’re excluded via .gitignore.
* If you face issues with dependencies, try deleting the node_modules folder and package-lock.json, then reinstall:

  rm -rf node_modules package-lock.json
  npm install

## To apply it:
1. In VS Code, open your project folder.  
2. Locate README.md (or create one if it doesn’t exist).  
3. Replace all content with the text above.  
4. Save it (Ctrl + S).  
5. Then push it to GitHub:
   git add README.md
   git commit -m "Add complete project setup instructions to README"
   git push

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

ng generate component component-name

For a complete list of available schematics (such as components, directives, or pipes), run:
ng generate --help

## Building

To build the project run:
ng build

This will compile your project and store the build artifacts in the dist/ directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:
ng test

## Running end-to-end tests

For end-to-end (e2e) testing, run:
ng e2e

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
