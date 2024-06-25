window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    if (query) {
        document.getElementById('heading').textContent = query;
    }
};