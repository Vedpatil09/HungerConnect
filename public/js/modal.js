// Handle card click (safe way)
document.addEventListener("click", function (e) {

  const card = e.target.closest(".food-card");

  if (!card) return;

  openFoodModal(

    card.dataset.id,
    card.dataset.title,
    card.dataset.desc,
    card.dataset.qty,
    card.dataset.loc,
    card.dataset.exp,
    card.dataset.img,
    card.dataset.lat,
    card.dataset.lng,
    card.dataset.ai

  );

});

// Open donate modal

function openDonateModal() {
  document.getElementById("donateModal").style.display = "flex";
}

// Close donate modal
function closeDonateModal() {
  document.getElementById("donateModal").style.display = "none";
}


// Open food details modal
function openFoodModal(
  id, title, desc, qty, loc, exp, img, lat, lng, ai
) {


  // Set text
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalQty").innerText = qty;
  document.getElementById("modalLoc").innerText = loc;
document.getElementById("modalAI").innerText =ai || "AI analysis not available";

  document.getElementById("modalExp").innerText =
    new Date(exp).toLocaleString();

  // Image
  document.getElementById("modalImage").src =
    img || "https://source.unsplash.com/400x300/?food";

  // Booking form
  document.getElementById("bookForm").action =
    "/book/" + id;

  // Google Maps link
  if (lat && lng) {

    document.getElementById("mapLink").href =
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    document.getElementById("mapLink").innerText =
      "🗺️ Open in Google Maps";

  } else {

    document.getElementById("mapLink").href = "#";

    document.getElementById("mapLink").innerText =
      "📍 Location not available";
  }

  console.log("LAT:", lat, "LNG:", lng);

  // Show modal
  document.getElementById("foodModal").style.display = "flex";
}


// Close food modal
function closeFoodModal() {
  document.getElementById("foodModal").style.display = "none";
}


// Get current location
function getLocation() {

  if (!navigator.geolocation) {
    alert("Location not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(pos => {

    document.getElementById("lat").value =
      pos.coords.latitude;

    document.getElementById("lng").value =
      pos.coords.longitude;

    alert("Location saved!");

  }, () => {
    alert("Location permission denied");
  });

}
