window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    document.getElementById("heading").textContent = query;
  }
};

// Scroll event
const audio = document.getElementById("myAudio");
window.addEventListener("click", function () {
  myAudio.play();
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

// const submitButton = document.querySelector(".submit-btn");
// submitButton.addEventListener("click", function () {
//   const noteContent = document.getElementById("note").value;
//   const nameContent = document.getElementById("name").value;
//   const currentTime = new Date();
//   const formattedTime = `${currentTime
//     .getDate()
//     .toString()
//     .padStart(2, "0")}-${(currentTime.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}-${currentTime.getFullYear()} ${currentTime
//         .getHours()
//         .toString()
//         .padStart(2, "0")}:${currentTime
//           .getMinutes()
//           .toString()
//           .padStart(2, "0")}:${currentTime.getSeconds().toString().padStart(2, "0")}`;

//   if (!noteContent || !nameContent) {
//     alert("Mohon lengkapi isi nama dan pesan");
//     return;
//   }

//   // Membuat objek data
//   const data = {
//     name: nameContent,
//     isiPesan: noteContent,
//     waktu: formattedTime,
//   };
//   fetch("/save", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data), // Menggunakan objek data
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Success:", data);
//       alert("Terimakasih atas pesannya!");
//       submitButton.disabled = true;
//       submitButton.style.cursor = "auto";
//       alert("Batas pengiriman pesan hanya 1x");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("An error occurred while saving the data.");
//     });
// });
