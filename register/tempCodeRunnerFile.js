

function setSuccess(element) {
    const inputGroup = element.parentElement; // Fixed typo
    const errorElement = inputGroup.querySelector('.error');

    errorElement.innerText = '';
    inputGroup.classList.add('success');