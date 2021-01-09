import { requestProfileData } from '../../services/github';

import { createSVGWindow } from 'svgdom';
import axios from 'axios';
import SvgJS from 'svg.js';
import { requestWakatimeStats } from '../../services/wakatime';

const window = createSVGWindow()
const SVG = SvgJS(window)
const document = window.document

const WIDTH = 854;
const HEIGHT = 773;
const MARGIN = 64;

const STATS_CARD_WIDTH = 100;

const IMAGE_SIZE = 223;
const DEFAULT_HIGHLIGHT_COLOR = '#0766F5';

const THEMES = {
  light: {
    background: '#D8D8D8',
    textColor: '#000000',
    cardColor: '#000000',
  },
  dark: {
    background: '#0D1117',
    textColor: '#FFFFFF',
    cardColor: '#ffffff',
  }
}

class SVGProfile {
  constructor({ theme, highlightColor, github, wakatime, name, job, aboutMe }) {
    this.theme = THEMES[theme] || THEMES.light;
    this.highlightColor = highlightColor ? `#${highlightColor}` : DEFAULT_HIGHLIGHT_COLOR;
    this.github = github;
    this.wakatime = wakatime;
    this.job = job;
    this.name = name;
    this.aboutMe = aboutMe;
    this.canvas = SVG(document.documentElement).size(WIDTH, HEIGHT).font({ family: 'Helvetica' })
  }

  /**
   * Get the base64 image from a given url
   * This is necessary to enable Github Camo to load the image from the SVG
   * @param {String} url 
   */
  _getBase64(url) {
    return axios
      .get(url, {
        responseType: 'arraybuffer'
      })
      .then(response => Buffer.from(response.data, 'binary').toString('base64'))
  }

  /**
   * Request Github API and get all public profile info
   * @param {String} username 
   */
  _getGithubProfileInfo = () => {
    return requestProfileData(this.github)
  }

  /**
   * Get the base64 from a image url and then render it inside a container with border radius
   * @param {String} avatarUrl 
   */
  _renderAvatar = async (avatarUrl) => {
    if (!avatarUrl) return null;
    const avatarOffset = WIDTH - IMAGE_SIZE - MARGIN;
    const avatarContainer = this.canvas.circle(IMAGE_SIZE).move(avatarOffset, MARGIN)

    const image = await this._getBase64(avatarUrl);
    this.canvas
      .image(`data:image/jpg;base64,${image}`)
      .size(IMAGE_SIZE, IMAGE_SIZE)
      .move(avatarOffset, MARGIN)
      .clipWith(avatarContainer)
  }

  /**
   * Create the frame where the profile will be mounted
   */
  _createContainer = () => {
    return this.canvas
      .rect(WIDTH, HEIGHT)
      .fill(this.theme.background)
  }

  /**
   * Render both of the background circles
   */
  _renderbackground = () => {
    this.canvas.circle(490).fill(this.highlightColor).opacity(0.1).move(-270, -90)
    this.canvas.circle(474).fill(this.highlightColor).opacity(0.1).move(502, 399)
  }

  /**
   * This method creates a text with the first word highlighted and returns it
   * @param {String} text 
   */
  _createdHighlightedText = (text) => {
    if (!text) return this.canvas.text();
    const [firstWord, ...rest] = text.split(' ');

    return this.canvas
      .text(add => {
        add.tspan(`${firstWord} `).fill(this.highlightColor);
        add.tspan(rest.join(' ')).fill(this.theme.textColor);
      })
  }

  /**
   * Renders the title saying "Hello, I'm ..." also with a highlighted word
   */
  _renderWelcomeText = () => {
    const group = this.canvas.group()
    group
      .text(add => {
        add.tspan('Hello, ').fill(this.highlightColor);
        add.tspan('I\'m').fill(this.theme.textColor);
        add.tspan(this.name).fill(this.theme.textColor).newLine();
      })
      .leading(1.1)
      .font({
        size: 48,
        weight: 'bold',
      })
      .move(0, 0)

    group.text(this.job)
      .fill(this.theme.textColor)
      .opacity(0.6)
      .move(0, 59)
      .font({
        size: 13,
        weight: '300',
      })

    group.move(MARGIN, 148);
  }

  /**
   * Renders the "About me" section
   */
  _renderAboutMe = () => {
    if (!this.aboutMe) return null;
    this._createdHighlightedText('About me')
      .font({
        size: 30,
        anchor: 'right',
        weight: 'bold',
      })
      .move(MARGIN, 347);

    let lineLength = 0;
    let numberOfLines = 0;

    const textArray = this.aboutMe.split(' ');
    const treatedArray = textArray.map(text => {
      if (numberOfLines >= 5) return null;
      if (lineLength >= 67) {
        lineLength = 0;
        numberOfLines += 1;

        return numberOfLines === 5
          ? `${text}...`
          : `\n${text}`; // break line when get to the end of the line
      }
      lineLength += text.length + 1; // Adding 1 to length to consider a space between words
      return text;
    })

    this.canvas
      .text(treatedArray.join(' '))
      .font({
        size: 16,
      })
      .fill(this.theme.textColor)
      .opacity(0.6)
      .leading(1.2)
      .move(MARGIN, 360);
  }

  /**
   * Render a list of the most used programming languages by a given wakatime user
   */
  _renderRecentActivity = async () => {
    if (!this.wakatime) return null;
    const { languages } = await requestWakatimeStats(this.wakatime);
    let height = 550;

    this._createdHighlightedText('Recent activity')
      .font({
        size: 30,
        anchor: 'right',
        weight: 'bold',
      })
      .move(MARGIN, 530);

    const languagesToShow = languages.splice(0, 5);
    languagesToShow.forEach(language => {
      const group = this.canvas.group();
      const cardWidth = 256;
      const timeCardWidth = 50;
      group.rect(256, 23)
        .radius(4)
        .fill(this.theme.cardColor)
        .opacity(0.06);
      group.rect(50, 19)
        .radius(4)
        .fill(this.highlightColor)
        .move(cardWidth - timeCardWidth - 2, 2);

      const { name, hours, minutes } = language;

      const timeString = `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m`

      group.text(name).font({ size: 13 }).fill(this.theme.textColor).move(5, -1);
      group.text(timeString).fill('#fff').font({ size: 12 }).move(cardWidth - timeCardWidth + 1, 0);

      group.move(MARGIN, height);
      height += 29;
    })

  }

  _createGithubStatsCard = ({ label, value }) => {
    const group = this.canvas.group();
    group.rect(STATS_CARD_WIDTH, 42).fill(this.theme.background).radius(4);
    group.text(label).font({ size: 16 }).fill(this.theme.textColor).move(3, -5);
    group.text(String(value)).font({ size: 16, weight: 'bold' }).fill(this.highlightColor).move(3, 15);
    return group;
  }

  _renderGithubStats = ({ repositories, pullRequests, contributionsCollection }) => {
    const totalStars = repositories.nodes.reduce((acc, curr) => acc += curr.stargazers.totalCount, 0);
    const commits = contributionsCollection.totalCommitContributions + contributionsCollection.restrictedContributionsCount;
    const initialCardLeftOffset = WIDTH - MARGIN - STATS_CARD_WIDTH;

    this._createGithubStatsCard({ label: 'Repos', value: repositories.totalCount })
      .move(initialCardLeftOffset, 590);
    this._createGithubStatsCard({ label: 'Stars', value: totalStars })
      .move(initialCardLeftOffset, 647);
    this._createGithubStatsCard({ label: 'Commits', value: commits })
      .move(initialCardLeftOffset - STATS_CARD_WIDTH - 16, 590);
    this._createGithubStatsCard({ label: 'PR\'s', value: pullRequests.totalCount })
      .move(initialCardLeftOffset - STATS_CARD_WIDTH - 16, 647);
  }

  render = async () => {
    this._createContainer();
    this._renderbackground();
    if (!this.github) return this.canvas.svg();
    const { avatarUrl, ...githubData } = await this._getGithubProfileInfo();

    this._renderWelcomeText();
    this._renderAboutMe();
    this._renderGithubStats(githubData);

    await this._renderRecentActivity();
    await this._renderAvatar(avatarUrl);

    return this.canvas.svg();
  }

}

export default async (req, res) => {
  const svgProfile = new SVGProfile(req.query);
  const profile = await svgProfile.render();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(profile);
}
