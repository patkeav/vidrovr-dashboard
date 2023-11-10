# Frontend Coding Challenge - Patrick Keaveny

Hi all!
Thanks so much for having me participate in this code challenge. Below you'll find steps for running the app.



## Project Setup

This projects is built with Node 20.3.1. 
If you have `nvm`, you can use `nvm use` in the project root to switch to the correct version.

```sh
npm install
```

### Compile Client code and Hot-Reload for Development

```sh
npm run dev
```

### Node server (required for API calls)

```sh
npm run server
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Details

### Stack

I chose to build with [Vue.js](https://vuejs.org/), [TypeScript](https://www.typescriptlang.org/), [SASS](https://sass-lang.com/), [ChartJS](https://www.chartjs.org/), and [Vuetify](https://vuetifyjs.com/en/).

Vue is the framework I'm most familiar with, and I enjoy TypeScript for extra type safety and less debugging. Same goes for SASS. While ChartJS was what I chose for visualizing the data on the Metadata Inspector as it offers lightweight and versatile customizations for data.

I chose Vuetify because I've used it in the past and found it pretty simple to implement, although it's changed a lot in recent months so I ended up running into a lot of unexpected hurdles. In the future, I would likely choose a different UI library like Quasar or Vue Material. 

## Metadata Inspector

### Design Considerations

For this project, I decided to create a detail page with the video as the most prominent aspect on the page, since I figured a typical user might want to view the video before looking at subsequent data. I also chose to post-load the video until after the user has clicked the thumbnail in order to save on rendering time just in case the user chooses not to view the video, and thereby not block rendering of content below the fold. 

I also decided on a simple color scheme for the chart data, using variations of one color if the number of times a person is detected in the video is above a certain threshold. I chose 3 as an arbitrary threshold for the purposes of demo.

I also chose a dark app theme because it's generally better for contrast ratios to go with a dark theme, as well as allows the lighter-colored cards to be more contrasting and visually set apart from the background.

### Dev Considerations

I'm a big fan of the smart/dumb component model for building. That is, utilizing a parent or "smart" component that handles heavy logic like API fetching, array manipulations etc, and a child or "dumb" component that only has very simple logic and formatting. I like this pattern because it allows the child components to be re-used elsewhere since they're not so tightly coupled with the parent components, and also makes it easier to keep component size small. 

I leaned pretty heavily on using Vue's Computed variables for some of the array manipulation, mainly because Computed variables will automatically update when their dependencies update, so there's no need to keep track of when to update the return value of the Computed variable since it will be updated automatically. 

