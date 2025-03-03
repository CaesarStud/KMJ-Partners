document.addEventListener("DOMContentLoaded", function () {
    // Text for the main headings
    const text1 = "YOU RECORD THE CONTENT.";
    const text2 = "WE MAKE YOU FAMOUS!";
    const workWithUsText = "WORK WITH US!";
    const typingSpeed = 50;

    let index1 = 0, index2 = 0, index3 = 0;
    const h1Element1 = document.getElementById("typed-text-1");
    const h1Element2 = document.getElementById("typed-text-2");
    const buttonElement = document.querySelector(".center-container a");
    const workWithUsElement = document.getElementById("typed-work-with-us");
    const secondContainerParagraphs = document.querySelectorAll(".second-container p");
    const innerContainerH1 = document.querySelector(".inner-container-1 h1");
    const boxes = document.querySelectorAll(".box-1, .box-2, .box-3, .box-4");

    /** Typing effect for .center-container h1 **/
    function typeFirstLine() {
        if (index1 < text1.length) {
            h1Element1.innerHTML += text1.charAt(index1);
            index1++;
            setTimeout(typeFirstLine, typingSpeed);
        } else {
            setTimeout(typeSecondLine, 0);
        }
    }

    function typeSecondLine() {
        if (index2 < text2.length) {
            h1Element2.innerHTML += text2.charAt(index2);
            index2++;
            setTimeout(typeSecondLine, typingSpeed);
        } else {
            setTimeout(() => {
                buttonElement.style.animation = "slideInFromRight 1.2s ease-out forwards";
            }, 0);
        }
    }

    function typeWorkWithUs() {
        if (!workWithUsElement) return; // If not on wwu.html, exit
        workWithUsElement.textContent = ""; // Clears existing text
        
        function type() {
            if (index3 < workWithUsText.length) {
                workWithUsElement.textContent += workWithUsText.charAt(index3); // Use textContent to avoid &nbsp;
                index3++;
                setTimeout(type, typingSpeed);
            }
        }
        type();
    }   

    // Detect which page is loaded and apply the correct typing effect
    if (h1Element1 && h1Element2) {
        typeFirstLine(); // Start typing effect on index.html
    } else if (workWithUsElement) {
        typeWorkWithUs(); // Start typing effect on wwu.html
    }

    /** Scroll-triggered typing effect for .inner-container-1 h1 **/
    function handleScrollForTyping() {
        if (!innerContainerH1) return;

        const containerPosition = innerContainerH1.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (containerPosition < screenHeight - 100) {
            innerContainerH1.style.opacity = "1";
            startTypingEffect(innerContainerH1, innerContainerH1.innerText, 60);
            window.removeEventListener("scroll", handleScrollForTyping);
        }
    }

    function startTypingEffect(element, text, speed) {
        element.innerHTML = "";
        let index = 0;

        function type() {
            if (index < text.length) {
                //element.innerHTML += text.charAt(index) === " " ? "&nbsp;" : text.charAt(index);
                element.innerHTML += text.charAt(index); // Allows proper spaces
                index++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    window.addEventListener("scroll", handleScrollForTyping);

    /** Scroll-triggered slide-in effect for .second-container p elements **/
    function handleScrollForParagraphs() {
        const secondContainer = document.querySelector(".second-container");
        if (!secondContainer) return;

        const containerPosition = secondContainer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (containerPosition < screenHeight - 100) {
            secondContainerParagraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.animation = "slideInFromLeft 1s ease-out forwards";
                }, index * 200);
            });

            window.removeEventListener("scroll", handleScrollForParagraphs);
        }
    }

    window.addEventListener("scroll", handleScrollForParagraphs);

    /** Scroll-triggered sliding door effect for boxes **/
    function handleScrollForBoxes() {
        boxes.forEach((box, index) => {
            const boxPosition = box.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (boxPosition < screenHeight - 100) {
                setTimeout(() => {
                    box.style.opacity = "1";
                    box.style.clipPath = "inset(0 0 0 0)"; // Reveal effect
                }, index * 300); // Staggered reveal effect for each box
            }
        });
    }

    window.addEventListener("scroll", handleScrollForBoxes);

   /** Scroll-triggered count-up animation for statistics in .fourth-container **/
    function countUpOnScroll() {
        const stats = document.querySelectorAll(".fourth-container h2");
        const screenHeight = window.innerHeight;
        let started = false;

        function startCounting(element, targetValue, duration, prefix = "", suffix = "+") {
            let start = 0;
            let increment = targetValue / (duration / 16); // Adjust speed

            function updateNumber() {
                start += increment;
                if (start >= targetValue) {
                    element.innerText = prefix + targetValue.toLocaleString() + suffix; // Ensure final value is correct
                } else {
                    element.innerText = prefix + Math.floor(start).toLocaleString() + suffix;
                    requestAnimationFrame(updateNumber);
                }
            }
            updateNumber();
        }

        function handleScrollForStats() {
            const container = document.querySelector(".fourth-container");
            if (!container || started) return; // Avoid running twice

            const containerPosition = container.getBoundingClientRect().top;
            if (containerPosition < screenHeight - 100) {
                stats.forEach((stat, index) => {
                    let textContent = stat.innerText.trim();
                    let prefix = textContent.startsWith("$") ? "$" : ""; // Detect "$" symbol
                    let targetValue = parseInt(textContent.replace(/[^0-9]/g, ""), 10); // Extract only numbers

                    setTimeout(() => startCounting(stat, targetValue, 2000, prefix, "+"), index * 300); // Staggered effect
                });

                started = true; // Prevents re-triggering
                window.removeEventListener("scroll", handleScrollForStats);
            }
        }

        window.addEventListener("scroll", handleScrollForStats);
    }

    // Initialize count-up effect
    countUpOnScroll();

});
