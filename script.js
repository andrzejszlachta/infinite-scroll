// unsplash API
const count = 10;
const apiKey = '8IQ5SF8b3jBE2uf9Y4vzRhjQJ9iYIVRdGmfF3JBxWRE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// add photo to page
const container = document.getElementById('image-container');
function addPhoto(data) {
    // create link to unsplash
    const link = document.createElement('a');
    link.href = data.links.html;
    link.target = '_blank';
    // create img element
    const img = document.createElement('img');
    img.src = data.urls.regular;
    img.alt = data.alt_description;
    img.title = data.alt_description;
    // add img inside a
    link.appendChild(img);
    // add a tag to DOM
    container.appendChild(link);
}

// get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    data.forEach(photo => addPhoto(photo));
  } catch(error) {
    console.log(error);
  }
}

// on load
getPhotos()