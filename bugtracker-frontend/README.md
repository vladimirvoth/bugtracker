# Bugtracker Frontend App

This is the Angular 10 frontend app from the Bugtracker.

Bugtracker is a simple-issue tracking app in the tradition of JIRA but much less complicated, for free, and with the goal to suit the needs of small teams in the best possible way. At least in the future because it is yet far off from being finished.

## [Demo](https://my-bugtracker.herokuapp.com/ 'Demo')

## Installation

You will need to run the Bugtracker Express app (the backend API) first. Then simply install all dependencies.

```bash
   npm i
```

or

```bash
   yarn
```

To run the dev server `http://localhost:4200/`:

```bash
   ng serve
```

## Technologies used

- **Angular 10**
- **NgRx** for state management (inspired by Redux)
- **Bootstrap 4**
- **SCSS** with the BEM methodology
- **Chart.js**
- **Markdown** for creating formatted descriptions and comments
- **Inline editing**
- **Authentication and Authorization**
- **Social login** with Facebook or Github
- **Cypress** for fast, easy and reliable testing in the browser

## What's coming next?

- **Implementing a project level** so that tickets can be assigned to different projects
- **Collaboration** so that different users can work on projects and tickets together
