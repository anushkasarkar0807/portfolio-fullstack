const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  try {
    const response = await fetch(
      "https://my-portfolio-s841.onrender.com/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      }
    );

    if (response.ok) {
      alert("Message sent successfully!");
      form.reset();
    } else {
      alert("Error sending message. Please try again.");
    }
  } catch (err) {
    alert("Server error. Please try again later.");
  }
});
