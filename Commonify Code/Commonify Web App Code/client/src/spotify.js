export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/";
var client_id = '99c869ea1b8742499d362ccdd2dddd9b';
var client_secret = '645d2a35a9114b209fe89508595b67e8';

const scopes = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
];

export const loginURL = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


