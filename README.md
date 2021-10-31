# MOODLE POINTS

Get infinite points on a moodle course that uses the [BlockXP](https://moodle.org/plugins/block_xp) plugin.

### How to use

First, you need an instance of NodeJS running on your computer, as well as a package manager (I recommend YARN).

1. Clone this repository: `git clone {REPO_URL}`
2. Install dependencies: `yarn install`
3. Create a `.env` file and include the following (write your username and password here):

```text
E_USERNAME=JoeDoe13
E_PASSWORD=joe doe 1963x
```

4. Then you need to configure the variables present on the `index.js` file. Mainly you'll need to change the URIs, but you can also configure how many times to get points (`repeat` variable) and if you want to show the browser (`showBrowser`)
5. Run `yarn start` or `node index.js`
