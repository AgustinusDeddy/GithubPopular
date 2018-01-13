// import axios from 'axios';

const id= "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

async function getProfile(username){
    // return axios.get('https://api.github.com/users/' + username + params)

    // return axios.get('https://api.github.com/users/' + username)
    //     .then(function (user) {
    //         return user.data;
    //     });

    const response = await fetch(`https://api.github.com/users/${username}`)

    return response.json();
}

async function getRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);

    return response.json();
}

function getStarCount (repos){
    return repos.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore( {followers}, repos) {
    // var followers = profile.followers;
    // const totalStars = getStarCount(repos);

    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error);
    return null;
}

async function getUserData (player){
    // return axios.all([
    //     getProfile(player),
    //     getRepos(player)
    // ]).then(function (data) {
    //     var profile = data[0];
    //     var repos = data[1];

    //     return {
    //         profile: profile,
    //         score: calculateScore(profile, repos)
    //     }
    // });

    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ])
    
    return {
        profile,
        score: calculateScore(profile, repos)
    }
}

function sortPlayers (players) {
    // return players.sort(function (a,b) {
    //     return b.score - a.score;
    // });

    return players.sort( (a,b) => b.score - a.score);
}

export async function battle(players){

    const results = await Promise.all(players.map(getUserData))
        .catch(handleError);
    
    return results === null ?   
        results : sortPlayers(results);
}

export async function fetchPopularRepos(language){
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    const response = await fetch(encodedURI)
        .catch(handleError);

    const repos = await response.json();
    
    return repos.item;
}

// module.exports = {
//     battle (players) {
       
//     },
//     fetchPopularRepos : function(language){
       
//     }
// }
