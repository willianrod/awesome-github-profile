<div align="center">
  <h1> Github Awesome Profile </h1>
  <p>Create a awesome looking image to use in your github profile readme.</p>
</div>

<hr>

## Geting started

To help you generate your image, I created a very simple tool that creates it for you. To access it, you can go to [HERE](https://awesome-profile.willianrod.com/) and create your own image.

## Doint it manually

If you want to create your profile by hand, you can also do that.

To create your image, start with this base url:
```
https://awesome-profile.willianrod.com/api/profile
```

Now you can pass some parameters to this URL, the allowed parameters is presented below

| Parameter      | Value              | Required | Default value | Notes                 |
| -------------- | ------------------ | -------- | ------------- | --------------------- |
| github         | String             | yes      |               |                       |
| name           | String             | yes      |               |                       |
| wakatime       | String             | no       |               |                       |
| highlightColor | String             | no       | 0766F5        | Hex color without `#` |
| job            | String             | no       |               |                       |
| aboutMe        | String             | no       |               |                       |
| theme          | "dark" or "light"  | no       | light         |                       |

## Preview

| Dark | Light |
| ---- | ----- |
| ![](https://awesome-profile.willianrod.com/api/profile?theme=dark&highlightColor=076655&name=Willian&github=willianrod&wakatime=willianrod&job=Fullstack%20Developer&aboutMe=Hello%20World) | ![](https://awesome-profile.willianrod.com/api/profile?theme=light&highlightColor=076655&name=Willian&github=willianrod&wakatime=willianrod&job=Fullstack%20Developer&aboutMe=Hello%20World) |

## Next steps

Although this is already functional, still some things that I want to do to make it more cooler than now. Here are some of them

- [ ] Add more background styles
- [ ] Possibility to change all colors with parameters
- [ ] Add github language stats instead of wakatime for non wakatime users
- [ ] Add a color picker in the image generator form
- [ ] Improve performance to remove image loading time
- [ ] Cache data for a certain period of time
- [ ] Create little modules to fetch data from another places, like Last.fm, Discord, Twitter...

## Development

### Envirement variables
First you will need to create a Github Personal Access Token, to do this, simple go to this page [https://github.com/settings/tokens](https://github.com/settings/tokens) and click at `Generate new token`. In the next page, you will have a field called "Note", you can put wathever name you want on it, this is just for you to identify where this access token being used. You can leave all checkbox fields in blank and create the token by clicking "Generate token" button at the end of the page. In the next page, you will see token higlighted in green. Make sure to copy it, because it will be the only time that you will see this code in this page.

Now create a file called `.env.local` at the project root, and put the following content and replace `YOUR_GENERATED_PERSONAL_ACCESS_TOKEN` with your copied token

```env
PAT=YOUR_GENERATED_PERSONAL_ACCESS_TOKEN
```

### Instalation
To help with the development with this cool profile image, first you have to get it running locally to start.

So you need to install all project dependêncies, I recommend unsing [yarn](https://classic.yarnpkg.com/en/docs/install). Inside the project directory you need to run the following command:

```bash
yarn install
```

After a little while, all dependêncies will be installed.

Now you just need to start your local development server by running this command:

```bash
yarn dev
```

When ready, your development server will be available at [http://localhost:3000](http://localhost:3000)

To contribute with the generator, simple got to `pages/index.js` and start editing. The page auto-updates as you edit the file.

To contribute with the api that creates the SVG, go to `pages/api/profile.js`and start editing.

## This project uses Next.Js
If you are't familiar with Next.js, you can learn about it at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

---

Hosted by [Vercel](https://vercel.com/)