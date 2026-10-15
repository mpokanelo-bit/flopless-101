// Simple JavaScript for the Discover Lesotho website

// Show the current year in the footer.
document.querySelectorAll('.current-year').forEach(function(item) {
  item.textContent = new Date().getFullYear();
});

// Search and filter destinations.
var searchBox = document.getElementById('destinationSearch');
var filterButtons = document.querySelectorAll('.filter-btn');
var destinations = document.querySelectorAll('.destination-item');
var noResults = document.getElementById('noResults');

function filterDestinations() {
  var searchText = '';
  if (searchBox) searchText = searchBox.value.toLowerCase();
  var selectedCategory = 'all';
  var activeButton = document.querySelector('.filter-btn.active');
  if (activeButton) selectedCategory = activeButton.getAttribute('data-category');
  var shown = 0;

  destinations.forEach(function(item) {
    var text = item.textContent.toLowerCase();
    var category = item.getAttribute('data-category');
    if (text.includes(searchText) && (selectedCategory === 'all' || category === selectedCategory)) {
      item.classList.remove('hidden');
      shown++;
    } else {
      item.classList.add('hidden');
    }
  });
  if (noResults) noResults.classList.toggle('hidden', shown > 0);
}
if (searchBox) searchBox.addEventListener('input', filterDestinations);
filterButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    filterButtons.forEach(function(item) { item.classList.remove('active'); });
    button.classList.add('active');
    filterDestinations();
  });
});

// Open gallery pictures in a larger window.
var galleryImages = document.querySelectorAll('.gallery-thumb');
var galleryModalElement = document.getElementById('galleryModal');
if (galleryImages.length > 0 && galleryModalElement) {
  var galleryModal = new bootstrap.Modal(galleryModalElement);
  var imageNumber = 0;
  var bigImage = document.getElementById('modalImage');
  var imageTitle = document.getElementById('modalTitle');
  function showImage(number) {
    imageNumber = (number + galleryImages.length) % galleryImages.length;
    bigImage.src = galleryImages[imageNumber].src;
    bigImage.alt = galleryImages[imageNumber].alt;
    imageTitle.textContent = galleryImages[imageNumber].getAttribute('data-title');
  }
  galleryImages.forEach(function(image, number) {
    image.addEventListener('click', function() { showImage(number); galleryModal.show(); });
  });
  document.getElementById('nextImage').addEventListener('click', function() { showImage(imageNumber + 1); });
  document.getElementById('previousImage').addEventListener('click', function() { showImage(imageNumber - 1); });
}

// Calculate the estimated booking cost.
var service = document.getElementById('service');
var people = document.getElementById('people');
var total = document.getElementById('bookingTotal');
var prices = { 'Mountain Adventure': 450, 'Cultural Tour': 300, 'Pony Trekking': 500, 'Scenic Sightseeing': 250 };
function updateTotal() {
  if (service && people && total) {
    var count = parseInt(people.value) || 1;
    total.textContent = 'Estimated total: M' + ((prices[service.value] || 0) * count);
  }
}
if (service) service.addEventListener('change', updateTotal);
if (people) people.addEventListener('input', updateTotal);
updateTotal();

// Show a message when a form is completed. These forms are demonstrations only.
function handleForm(formId, messageId, message) {
  var form = document.getElementById(formId);
  var result = document.getElementById(messageId);
  if (form && result) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (form.checkValidity()) {
        result.textContent = message;
        result.classList.remove('d-none');
        form.reset();
        updateTotal();
      } else {
        form.classList.add('was-validated');
      }
    });
  }
}
handleForm('contactForm', 'contactSuccess', 'Your message has been received. Thank you.');
handleForm('bookingForm', 'bookingSuccess', 'Your booking request has been saved for this demonstration.');

// Check that both registration passwords match.
var registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', function(event) {
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    if (password.value !== confirmPassword.value) confirmPassword.setCustomValidity('Passwords do not match.');
    else confirmPassword.setCustomValidity('');
    if (!registrationForm.checkValidity()) {
      event.preventDefault();
      registrationForm.classList.add('was-validated');
    } else {
      event.preventDefault();
      document.getElementById('registrationSuccess').textContent = 'Registration completed successfully for this demonstration.';
      document.getElementById('registrationSuccess').classList.remove('d-none');
      registrationForm.reset();
    }
  });
}
