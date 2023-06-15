// unsplash API
const count = 10;
const apiKey = '8IQ5SF8b3jBE2uf9Y4vzRhjQJ9iYIVRdGmfF3JBxWRE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

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
    // event listener, check when is finished loading
    img.addEventListener('load', imageLoaded);
    // add img inside a
    link.appendChild(img);
    // add a tag to DOM
    container.appendChild(link);
}

// get photos from unsplash API
async function getPhotos() {
  try {
    ready = false
    imagesLoaded = 0;
    const response = await fetch(apiUrl);
    const data = await response.json();
    data.forEach(photo => addPhoto(photo));
  } catch(error) {
    console.log(error);
  }
}

// on load
getPhotos()

// add event listener on scroll for infinite scroll feature
window.addEventListener('scroll', ()=> {
  const websiteHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.scrollY + window.innerHeight;
  const windowHeight = window.innerHeight;
  // if close to end of website nad previous images loaded - request more photos
  if ((scrollPosition + windowHeight) > websiteHeight && ready) getPhotos();
})

// check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === count) {
    ready = true;
    loader.hidden = true;
  }
}