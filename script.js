// JavaScript to change the image on button click
document.getElementById('change-image').addEventListener('click', function() {
    var imgElement = document.getElementById('example-image');
    
    // Change the image source
    if (imgElement.src.includes('example.jpg')) {
        imgElement.src = 'images/another-example.jpg';
    } else {
        imgElement.src = 'images/example.jpg';
    }
});
