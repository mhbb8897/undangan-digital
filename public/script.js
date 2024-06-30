window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    document.getElementById("heading").textContent = query;
  }
};

const audio = document.getElementById('myAudio');

// Mendeteksi event scroll
window.addEventListener('scroll', function() {
    if (!audio.paused || audio.currentTime > 0) {
        return; 
    }

    audio.play();
    audio.style.visibility = 'visible';
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
  const nameContent = document.getElementById("name").value;
  const currentTime = new Date();
  const formattedTime = `${currentTime
    .getDate()
    .toString()
    .padStart(2, "0")}-${(currentTime.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${currentTime.getFullYear()} ${currentTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentTime
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;

  if (!noteContent || !nameContent) {
    alert("Mohon lengkapi isi nama dan pesan");
    return;
  }

  // Membuat objek data
  const data = {
    name: nameContent,
    isiPesan: noteContent,
    waktu: formattedTime,
  };

  fetch("/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Menggunakan objek data
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
