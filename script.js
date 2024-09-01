// Block non-alphabetic characters in the name field
document
  .getElementById("full-name")
  .addEventListener("input", function (event) {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
  });

// Block special characters and numbers after the dot in the domain field
document.getElementById("domain").addEventListener("input", function (event) {
  let domain = this.value;

  // Allow only alphanumeric characters and dots in the main part of the domain
  domain = domain.replace(/[^a-zA-Z0-9.]/g, "");

  // Ensure that after the last dot, only alphabetic characters are allowed (block numbers)
  const parts = domain.split(".");
  if (parts.length > 1) {
    const tld = parts[parts.length - 1].replace(/[^a-zA-Z]/g, "");
    parts[parts.length - 1] = tld;
  }

  this.value = parts.join(".");
});

// Submit form and generate emails
document
  .getElementById("email-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document
      .getElementById("full-name")
      .value.trim()
      .toLowerCase();
    const domain = document.getElementById("domain").value.trim().toLowerCase();
    const emailList = document.getElementById("email-list");
    const resetBtn = document.getElementById("reset-btn");

    // Clear previous results and errors
    emailList.innerHTML = "";
    document.getElementById("name-error").style.display = "none";
    document.getElementById("domain-error").style.display = "none";

    // Validate domain (must be in the format domain.tld with no numbers or special characters after the TLD)
    if (!/^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(domain)) {
      document.getElementById("domain-error").textContent =
        "Please enter a valid domain (e.g., example.com) with only letters after the TLD.";
      document.getElementById("domain-error").style.display = "block";
      return;
    }

    // Split full name into parts
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    const initials = firstName[0] + lastName[0];

    // Generate possible email formats
    const possibleEmails = [
      `${firstName}@${domain}`,
      `${lastName}@${domain}`,
      `${firstName}.${lastName}@${domain}`,
      `${firstName[0]}.${lastName}@${domain}`,
      `${firstName}${lastName}@${domain}`,
      `${firstName[0]}${lastName}@${domain}`,
      `${firstName}_${lastName}@${domain}`,
      `${initials}@${domain}`,
      `${lastName}${firstName}@${domain}`,
    ];

    // Display the possible emails
    possibleEmails.forEach((email) => {
      const listItem = document.createElement("li");
      listItem.textContent = email;
      emailList.appendChild(listItem);
    });

    // Enable the reset button after displaying results
    resetBtn.disabled = false;
  });

// Reset button functionality
document.getElementById("reset-btn").addEventListener("click", function () {
  // Clear the input fields and email list
  document.getElementById("full-name").value = "";
  document.getElementById("domain").value = "";
  document.getElementById("email-list").innerHTML = "";

  // Disable the reset button again
  this.disabled = true;
});
