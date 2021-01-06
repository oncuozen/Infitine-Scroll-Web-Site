const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let arrPhotos = [];

const count = 10;
const apiKey = '_l8wapBHdRjHCdgoC0Iaw0engZlJepJVPcK5NbmmfzM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image-loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display photos on screen
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = arrPhotos.length;
    console.log('total images', totalImages);
    // Run function for each object in photosArray
    arrPhotos.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listeners, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put the two elements into imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Fetch photos from Unsplash
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        arrPhotos = await response.json();
        displayPhoto();
    } catch (error) {
        console.log('error: ', error);
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();