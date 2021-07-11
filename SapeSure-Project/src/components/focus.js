
export default function focusTrap() {
    const focusableElements =
    'input, button, checkbox, radio, textarea, radio__box--input';
    const modalPopup = document.querySelectorAll(".focus-trap");

    modalPopup.forEach((item) => {
        const firstFocusableElement = item.querySelectorAll(focusableElements)[0];
        // console.log(firstFocusableElement);
        const focusableContent = item.querySelectorAll(focusableElements);
        // console.log(focusableContent);
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        // console.log(lastFocusableElement);
        document.addEventListener("keydown", (e) => {
            const isTabPressed = e.key === "Tab" || e.keyCode === 9;
            if (!isTabPressed) {
                return;
            }
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus(); 
                e.preventDefault();
            }
        });
        firstFocusableElement.focus();
    });
}

  
