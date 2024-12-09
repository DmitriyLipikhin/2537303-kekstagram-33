import { isEscapeKey, isEnterKey } from './util';
import { initValidation, resetPristine } from './validation-form';
import { imageScaling } from './image-scaling-module';
import { reset } from './image-effect-module';
//import { submitsForm } from './submitting-form'//

const uploadInput = document.querySelector('.img-upload__input');
const photoOverlay = document.querySelector('.img-upload__overlay');
const photoPreview = document.querySelector('.img-upload__preview img');
const photoCancel = document.querySelector('.img-upload__cancel');
//const photoForm = document.querySelector ('.img-upload__form');
const effectsItemPreview = document.querySelectorAll('.effects__item span');

const closingOverlay = () => {
  photoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoPreview.src = '';
};

const onPhotoOverlayKeydownEnter = (evt) => {
  if(isEnterKey(evt)){
    evt.preventDefault();
    closingOverlay();
  }
};

const onPhotoOverlayKeydownEsc = (evt) => {
  if(isEscapeKey(evt)){
    evt.preventDefault();
    closingOverlay();
  }
};

const uploadPhotoPreview = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (element) => {
      photoPreview.src = element.target.result;
      effectsItemPreview.forEach((item) => {
        item.style.backgroundImage = `url('${element.target.result}')`;
      });
    };

    reader.readAsDataURL(file);
  }
};

const closeUploadPhotoOverlay = () => {
  closingOverlay();
  window.removeEventListener('keydown', onPhotoOverlayKeydownEsc);
  resetPristine();
  reset();
};

const openUploadPhotoOverlay = (evt) => {
  photoOverlay.classList.remove('hidden');
  photoOverlay.classList.add('modal-open');
  uploadPhotoPreview(evt);
  window.addEventListener('keydown', onPhotoOverlayKeydownEsc);
  photoCancel.addEventListener('click', closeUploadPhotoOverlay);
  photoCancel.addEventListener('keydown', onPhotoOverlayKeydownEnter);
  initValidation();
  resetPristine();
  imageScaling();
  //photoForm.addEventListener('submit', submitsForm);//
};

const uploadPhoto = () => {
  uploadInput.addEventListener('change', openUploadPhotoOverlay);
};

export {uploadPhoto};
