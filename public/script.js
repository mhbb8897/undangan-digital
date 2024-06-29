window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    document.getElementById("heading").textContent = query;
  }
};
document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("myAudio");
  var playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        console.log("Audio is playing automatically");
      })
      .catch(function (error) {
        console.log("Audio autoplay was prevented");
        // Wait for user interaction
        document.body.addEventListener(
          "click",
          function () {
            audio.play();
          },
          { once: true }
        );
      });
  }
});

const copyButtons = document.querySelectorAll(
  ".in-content span button.copy-text"
);

copyButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const copiedText = button.previousElementSibling.textContent;
    navigator.clipboard.writeText(copiedText);
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 2000);
  });
});


document.querySelector(".submit-btn").addEventListener("click", function () {
  const noteContent = document.getElementById("note").value;

  fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isiPesan: noteContent }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Data has been saved successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while saving the data.");
    });
});
