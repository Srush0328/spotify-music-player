const response = await fetch(
    "https://api.spotify.com/v1/search?q=Taylor%20Swift&type=track",
    {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
);

const data = await response.json();

console.log(data);