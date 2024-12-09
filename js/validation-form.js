import { isEscapeKey } from './util';

const MAX_QUANTITY_HASHTAGS = 5;
const MAX_SIZE_COMMENTS = 140;
const HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;

const errorMessage = {
  INVALID_HASHTAG: 'Введен невалидный хэштег',
  QUANTITY_EXCEEDED_HASHTAG: 'Превышено количество хэштегов',
  REPEAT_HASHTAGS: 'Хэштеги не должны повторяться',
  SIZE_COMMENT_EXCEEDED: 'Превышен размер комментария'
};

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const onFormCancelKeydownEnter = (evt) => {
  if(isEscapeKey){
    evt.stopPropagation();
  }
};
hashtagsInput.addEventListener('keydown', onFormCancelKeydownEnter);

descriptionInput.addEventListener('keydown', onFormCancelKeydownEnter);

const pristine = new Pristine(uploadForm,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const resetPristine = () => {
  uploadForm.reset();
  pristine.reset();
};

const checkSizeDescription = (element) => element.length <= MAX_SIZE_COMMENTS;

const splitsTheEnteredData = (element) => element.trim().split(/\s+/);

const checkSizeHashtags = (element) => splitsTheEnteredData(element).length <= MAX_QUANTITY_HASHTAGS;

const checkValidHashtag = (element) => {
  const hashtag = splitsTheEnteredData(element);
  const isEmpty = !hashtagsInput.value.trim();
  return HASHTAG_STRING.test(hashtag) || isEmpty;
};

const checkUniquenessHashtag = (element) => {
  const hashtag = splitsTheEnteredData(element);
  const uniquenessHashtags = new Set(hashtag);
  return uniquenessHashtags.size === hashtag.length;
};

const initValidation = () => {
  pristine.addValidator(hashtagsInput, checkSizeHashtags, errorMessage.QUANTITY_EXCEEDED_HASHTAG);
  pristine.addValidator(descriptionInput, checkSizeDescription, errorMessage.SIZE_COMMENT_EXCEEDED);
  pristine.addValidator(hashtagsInput, checkUniquenessHashtag, errorMessage.REPEAT_HASHTAGS);
  pristine.addValidator(hashtagsInput, checkValidHashtag, errorMessage.INVALID_HASHTAG);
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});

export {initValidation, resetPristine};
