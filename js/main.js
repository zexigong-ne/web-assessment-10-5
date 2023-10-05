function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);
  

  function getListingCode(listing) {
    let amenitiesList = '';

    let amenitiesArray;
    try {
      amenitiesArray = JSON.parse(listing.amenities);
    } catch (error) {
      amenitiesArray = [];
    }
  
    if (amenitiesArray.length > 0) {
      amenitiesList = amenitiesArray.map((amenity) => `<li>${amenity}</li>`).join("");
    } else {
      amenitiesList = '<li>No amenities specified.</li>';
    }

    return `<div class="col-4">
  <div class="listing-card">
    <img
      src=${listing.picture_url}
      class="card-img-top"
      alt="AirBNB Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div>${listing.price}</div>
      <div class="host">
                    <img
                    src=${listing.host_picture_url}
                    alt="Host Thumbnail"
                  />
                    <div class="host_name">${listing.host_name}</div>
                  </div>
      <div class = "amenities">
      <p class="card-text">
      ${listing.description}
      </p>
      <div><strong>Amenities:</strong></div>
          <ul>${amenitiesList}</ul>
        </div>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }


  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();
    me.redraw(listings.slice(0, 50));
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();