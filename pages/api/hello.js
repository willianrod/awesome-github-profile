const { createSVGWindow } = require('svgdom')
const axios = require('axios');
const window = createSVGWindow()
const SVG = require('svg.js')(window)
const document = window.document

function getBase64(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

const createContainer = canvas => {
  canvas
    .rect(500, 600)
    .fill('#0d1117')
    .move(10, 10)
    .rx(4)
    .stroke({ color: '#30363d', width: 1 })
}

export default async (req, res) => {
  const canvas = SVG(document.documentElement).size(510, 610)

  createContainer(canvas)

  const { data: profileData } = await axios.get('https://api.github.com/users/willianrod')

  const { avatar_url: avatarUrl } = profileData;

  const avatarContainer = canvas.rect(100, 100).radius(50).move(26, 26)

  const image = await getBase64(avatarUrl);
  canvas
    .image(`data:image/jpg;base64,${image}`)
    .size(100, 100)
    .move(26, 26)
    .clipWith(avatarContainer)

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(canvas.svg());
}
