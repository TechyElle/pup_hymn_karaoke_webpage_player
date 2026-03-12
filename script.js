// Karaoke-style Lyrics Auto-Scroll and Per-Lyric Highlight

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('.custom_audio');
    const lyrics = document.querySelectorAll('.lyrics_content p');
    const lyricsContainer = document.querySelector('.lyrics_container');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');

    // Skip duration in seconds
    const SKIP_SECONDS = 10;

    // Per-word timing data
    const wordsData = [
        {time:12.3,word:"Sintang"}, {time:13.3,word:"Paaralan"}, {time:14.8,word:"Tanglaw"},
        {time:15.7,word:"ka"}, {time:16.4,word:"ng"}, {time:16.9,word:"bayan"},
        {time:18.5,word:"Pandayan"}, {time:19.7,word:"ng"}, {time:20.3,word:"isip"},
        {time:21.5,word:"ng"}, {time:22.0,word:"kabataan"}, {time:24.0,word:"Kami"},
        {time:25.0,word:"ay"}, {time:25.6,word:"dumating"}, {time:26.6,word:"nang"},
        {time:27.1,word:"salat"}, {time:27.9,word:"sa"}, {time:28.2,word:"yaman"},
        {time:29.0,word:"Hanap"}, {time:29.8,word:"na"}, {time:30.5,word:"dunong"},
        {time:32.6,word:"ay"}, {time:32.9,word:"iyong"}, {time:33.5,word:"alay"},
        {time:35.0,word:"Ang"}, {time:36.0,word:"layunin"}, {time:37.8,word:"mong"},
        {time:38.8,word:"makatao"}, {time:41.5,word:"Dinarangal"}, {time:44.2,word:"ang"},
        {time:44.9,word:"Pilipino"}, {time:47.6,word:"Ang"}, {time:48.2,word:"iyong"},
        {time:48.5,word:"aral,"}, {time:49.6,word:"diwa,"}, {time:50.8,word:"adhikang"},
        {time:52.0,word:"taglay"}, {time:53.5,word:"PUP,"}, {time:54.2,word:"aming"},
        {time:55.0,word:"gabay"}, {time:56.0,word:"Paaralang"}, {time:58.8,word:"dakila"},
        {time:61.8,word:"PUP,"}, {time:63.6,word:"pinagpala"},
        {time:68.0,word:"Gagamitin"}, {time:71.0,word:"ang"}, {time:72.0,word:"karunungan"},
        {time:74.0,word:"Mula"}, {time:75.0,word:"sa"}, {time:75.5,word:"iyo,"},
        {time:77.0,word:"para"}, {time:78.0,word:"sa"}, {time:79.0,word:"bayan"},
        {time:80.0,word:"Ang"}, {time:81.0,word:"iyong"}, {time:82.0,word:"aral,"},
        {time:83.0,word:"diwa,"}, {time:84.0,word:"adhikang"}, {time:85.0,word:"taglay"},
        {time:86.0,word:"PUP,"}, {time:87.0,word:"aming"}, {time:88.0,word:"gabay"},
        {time:89.0,word:"Paaralang"}, {time:92.0,word:"dakila"},
        {time:95.0,word:"PUP,"}, {time:98.0,word:"pinagpala"}
    ];

    // Lyric timing for lines (used for scrolling and repetition)
    const lyricStartTimes = [
        12.3, // Sintang Paaralan
        14.8, // Tanglaw ka ng bayan
        18.5, // Pandayan ng isip ng kabataan
        24.0, // Kami ay dumating nang salat sa yaman
        29.0, // Hanap na dunong ay iyong alay
        35.0, // Ang layunin mong makatao
        41.5, // Dinarangal ang Pilipino
        47.6, // Ang iyong aral, diwa, adhikang taglay
        53.5, // PUP, aming gabay
        56.0, // Paaralang dakila
        61.8, // PUP, pinagpala
        68.0, // Gagamitin ang karunungan
        74.0, // Mula sa iyo, para sa bayan
        80.0, // Ang iyong aral, diwa, adhikang taglay
        86.0, // PUP, aming gabay
        89.0, // Paaralang dakila
        95.0  // PUP, pinagpala
    ];

    const finalLyricEndTime = 105; 
    const lyricsTiming = lyricStartTimes.map((start, index) => {
        const end = lyricStartTimes[index + 1] !== undefined ? lyricStartTimes[index + 1] : finalLyricEndTime;
        return { start, end };
    });

    const allSpans = document.querySelectorAll('.lyrics_content p span');
    let currentActiveKey = '';

    function skipAudio(seconds) {
        const maxDuration = Number.isFinite(audio.duration) ? audio.duration : finalLyricEndTime;
        const targetTime = audio.currentTime + seconds;
        audio.currentTime = Math.min(Math.max(targetTime, 0), maxDuration);
    }

    // Skip forward button functionality
    forwardBtn.addEventListener('click', function() {
        skipAudio(SKIP_SECONDS);
    });

    // Skip backward button functionality
    rewindBtn.addEventListener('click', function() {
        skipAudio(-SKIP_SECONDS);
    });

    // Function to update highlighted lyric and auto-scroll
    function updateLyrics() {
        const currentTime = audio.currentTime;

        // Update word-level highlighting
        allSpans.forEach((span, index) => {
            if (wordsData[index]) {
                const startTime = wordsData[index].time;
                // End time for a word is the start time of the next word
                const nextWord = wordsData[index + 1];
                const endTime = nextWord ? nextWord.time : finalLyricEndTime;

                if (currentTime >= startTime && currentTime < endTime) {
                    span.classList.add('active');
                } else {
                    span.classList.remove('active');
                }
            }
        });

        // Find the current active lyrics based on time (for line highlighting and scrolling)
        const activeIndices = [];
        for (let i = 0; i < lyricsTiming.length; i++) {
            if (currentTime >= lyricsTiming[i].start && currentTime < lyricsTiming[i].end) {
                activeIndices.push(i);
            }
        }
        const newActiveKey = activeIndices.join(',');

        // Only update if active lines changed
        if (newActiveKey !== currentActiveKey) {
            // Remove active class from all lyrics
            lyrics.forEach(lyric => lyric.classList.remove('active'));

            // Add active class to current lyric(s)
            if (activeIndices.length > 0) {
                activeIndices.forEach((index) => {
                    if (index >= 0 && index < lyrics.length) {
                        lyrics[index].classList.add('active');
                    }
                });

                // Auto-scroll to keep the first active lyric centered
                scrollToActiveLyric(activeIndices[0]);
            }

            currentActiveKey = newActiveKey;
        }
    }

    // Function to scroll the lyrics container to show active line
    function scrollToActiveLyric(index) {
        const activeLyric = lyrics[index];
        const containerHeight = lyricsContainer.clientHeight;
        const lyricTop = activeLyric.offsetTop;
        const lyricHeight = activeLyric.clientHeight;

        // Calculate scroll position to center the active lyric
        const scrollPosition = lyricTop - (containerHeight / 2) + (lyricHeight / 2);

        lyricsContainer.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    }

    // Update lyrics while audio is playing and when user seeks
    audio.addEventListener('timeupdate', updateLyrics);
    audio.addEventListener('seeked', updateLyrics);

    // Reset highlights when audio ends
    audio.addEventListener('ended', function() {
        lyrics.forEach(lyric => lyric.classList.remove('active'));
        currentActiveKey = '';
    });

    // Allow clicking on a lyric line to seek audio
    lyrics.forEach((lyric, index) => {
        lyric.addEventListener('click', function() {
            if (lyricsTiming[index]) {
                audio.currentTime = lyricsTiming[index].start;
                audio.play();
            }
        });

        // Change cursor to pointer to indicate clickability
        lyric.style.cursor = 'pointer';
    });

    // Sync initial state
    updateLyrics();
});
