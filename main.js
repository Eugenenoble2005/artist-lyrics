const Genius = require("genius-lyrics");
const fs = require('node:fs');
const Client = new Genius.Client(); // Scrapes if no key is provided

(() => {
    try {
        const args = process.argv;
        var index = -1;
        args.forEach(async (arg) => {
            index++;
            if (arg.startsWith("--artist")) {
                var artist = process.argv[index + 1];
                try {
                    const songs = await Client.songs.search(artist);
                    const indexSongs = Math.floor(Math.random() * Math.floor(songs.length));
                    const lyrics = await songs[indexSongs].lyrics();
                    const title = songs[indexSongs].fullTitle;
                    const { image } = songs[indexSongs];
                    const arrLyrics = lyrics.split('\n').filter((l) => l.length && l[0] !== '[');
                    const indexLyrics = Math.floor(Math.random() * Math.floor(arrLyrics.length));
                    var output = arrLyrics[indexLyrics] + "--" + title;
                    console.log(output);

                    // Write output to cache file
                     fs.appendFile("cache.txt", output + "\n", (err) => {
                        if (err) {
                            console.error("Error writing to cache:", err);
                        }
                    });
                } catch {
                    // Exception occurred, read a random line from the cache file
                    fs.readFile('cache.txt', 'utf8', (err, data) => {
                        if (err) {
                            console.error("Error reading from cache:", err);
                            return;
                        }

                        // Split the file into lines
                        const lines = data.split('\n').filter(Boolean); // Filter out any empty lines

                        // Generate a random index
                        const randomIndex = Math.floor(Math.random() * lines.length);

                        // Get a random line
                        const randomLine = lines[randomIndex];

                        console.log('[CACHE]', randomLine);
                    });
                }
            }
        });
    } catch (error) {
        console.error("Error fetching and processing lyrics:", error);
    }
})();
