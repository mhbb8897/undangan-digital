window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        document.getElementById('heading').textContent = query;
    }
};
document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('myAudio');
    var playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(function () {
            console.log('Audio is playing automatically');
        }).catch(function (error) {
            console.log('Audio autoplay was prevented');
            // Wait for user interaction
            document.body.addEventListener('click', function () {
                audio.play();
            }, { once: true });
        });
    }
});