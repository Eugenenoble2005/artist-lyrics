const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.GENIUS_API_KEY); // Scrapes if no key is provided
(() => {
    try {
        const args = process.argv;
        var index = -1;
        args.forEach(async (arg)=>{
            index++;
            if(arg.startsWith("--artist")){
                var artist = process.argv[index+1];
                const songs = await Client.songs.search(artist);
                const indexSongs = Math.floor(Math.random() * Math.floor(songs.length));
                const lyrics = await songs[indexSongs].lyrics();
                const title = songs[indexSongs].fullTitle;
                const { image } = songs[indexSongs];
                const arrLyrics = lyrics.split('\n').filter((l) => l.length && l[0] !== '[');
                const indexLyrics = Math.floor(Math.random() * Math.floor(arrLyrics.length));
                console.log(arrLyrics[indexLyrics] + "--" + title);
            }
        });
      
    } catch (error) {
        console.error("Error fetching and processing lyrics:", error);
    }
})();
