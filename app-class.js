// Gallery JS Class refactor

// Universal JS function
function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

// Gallery JS code
class Gallery {
  constructor(section) {
    this.container = section;
    this.list = [...section.querySelectorAll('.img')];
    //target
    this.modal = getElement('.modal');
    this.closeBtn = getElement('.close-btn');
    this.prevBtn = getElement('.prev-btn');
    this.nextBtn = getElement('.next-btn');
    this.modalImgContainer = getElement('#main-img-container');
    this.imgName = getElement('.image-name');
    this.modalImages = getElement('.modal-images');
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);

    // Event listener
    this.container.addEventListener(
      'click',
      function (e) {
        const selectedImg = e.target;
        this.openModal(selectedImg, this.list);
      }.bind(this)
    );
  }

  // Adding methods on prototype
  openModal(selectedImg, imageList) {
    if (selectedImg.classList.contains('img')) {
      this.modal.classList.add('open');
    } else return;
    // Adding main image
    this.addMainImage(selectedImg);

    // Adding model image list
    const modalList = imageList
      .map(function (image) {
        return `<img
            src="${image.src}"
            title="${image.title}"
            data-id="${image.dataset.id}"
            class="${
              selectedImg.dataset.id === image.dataset.id
                ? 'modal-img selected'
                : 'modal-img'
            }"
            alt="${image.title}"
          />`;
      })
      .join('');
    this.modalImages.innerHTML = modalList;

    // Event listener to the buttons on after opening modal
    this.closeBtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.chooseImage);
  }

  addMainImage(selectedImg) {
    this.modalImgContainer.innerHTML = `<img src="${selectedImg.src}" class="main-img" alt="main-image" title="${selectedImg.title}" />`;
    this.imgName.textContent = selectedImg.title;
  }

  closeModal() {
    this.modal.classList.remove('open');
    // remove event listener after closing modal
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.chooseImage);
  }

  nextImage() {
    const selected = this.modalImages.querySelector('.selected');
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    next.classList.add('selected');
    selected.classList.remove('selected');
    //Adding main image
    this.addMainImage(next);
  }

  prevImage() {
    const selected = this.modalImages.querySelector('.selected');
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    prev.classList.add('selected');
    selected.classList.remove('selected');
    this.addMainImage(prev);
  }

  chooseImage = function (e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');
      const imageChoosen = e.target;
      imageChoosen.classList.add('selected');
      this.addMainImage(imageChoosen);
    }
  };
}

// Instances of Gallery
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
