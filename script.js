const slides = [
    {
        img: 'slide1.gif',
        text: "hoyy!",
        dull: true,
        button: "hmmm?"
    },
    {
        img: 'slide2.gif',
        text: "hoyy!! ikaw nga",
        dull: true,
        button: "ako ba?"
    },
    {
        img: 'slide3.gif',
        text: "oo malamang, sino pa ba magandang babae napindot ng link",
        dull: false,
        button: "...."
    },
    {
        img: 'slide4.gif',
        text: "oo na hindi pa tayo bati, pero..",
        dull: false,
        button: "???"
    },
    
    {
        img: 'slide5.jpeg',
        text: "Will you be my Valentine?",
        dull: false,
        question: true
    },
    {
        img: 'accept.gif',
        text: "hehe",
        dull: false,
        button: "hehe?"
    },
    {
        img: 'slidemore.gif',
        text: "i have a little surprise for you..",
        dull: false,
        button: "ano yon?"
    },
    {
        img: 'slide8.gif',
        text: "<span class='letter'>Dear Valentine, <br><br>Thank you for making my day brighter. I hope this little surprise made you smile!<br><br>With all my heart,<br>Your Secret Admirer</span>",
        dull: false,
        button: "<3"
    },
    {
        img: 'last.gif',
        text: "i love you - daniel",
        dull: false,
        end: true
    }
];

let current = 0;
let stubbornNoCount = 0;

function renderSlide(idx, direction = 1) {
    const slide = slides[idx];
    const container = document.getElementById('slides-container');
    // Create new slide
    const slideDiv = document.createElement('div');
    slideDiv.className = 'slide' + (slide.dull ? ' dull' : ' colored');
    // Font logic
    if (idx < 4) {
        slideDiv.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive, sans-serif';
    } else {
        slideDiv.style.fontFamily = "'Indie Flower', cursive";
    }
    // Set initial position for seamless carousel
    slideDiv.style.transform = `translateX(${direction * 100}vw)`;
    // Image
    const img = document.createElement('img');
    img.src = slide.img;
    img.alt = '';
    slideDiv.appendChild(img);
    // Add sunflower PNG for slide 5 (question slide)
    if (slide.question) {
        const sunflower = document.createElement('img');
        sunflower.src = 'tl.png';
        sunflower.alt = 'sunflower';
        sunflower.style.width = '70px';
        sunflower.style.margin = '20px auto 0 auto';
        sunflower.style.display = 'block';
        sunflower.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))';
        slideDiv.appendChild(sunflower);

        // Get the bounding box for the main image to position decorations around it
        setTimeout(() => {
            const mainImgRect = img.getBoundingClientRect();
            const slideRect = slideDiv.getBoundingClientRect();
            const imgCenterX = mainImgRect.left + mainImgRect.width / 2 - slideRect.left;
            const imgTop = mainImgRect.top - slideRect.top;
            const imgBottom = imgTop + mainImgRect.height;
            const imgLeft = mainImgRect.left - slideRect.left;
            const imgRight = imgLeft + mainImgRect.width;

            // Sunflowers: left-top, left-bottom, right-top
            const sunPositions = [
                { left: imgLeft - 40, top: imgTop - 20 },
                { left: imgLeft - 40, top: imgBottom - 40 },
                { left: imgRight + 10, top: imgTop - 20 }
            ];
            sunPositions.forEach(pos => {
                const sun = document.createElement('img');
                sun.src = 'sunflower.png';
                sun.alt = 'sunflower';
                sun.style.width = '60px';
                sun.style.position = 'absolute';
                sun.style.left = pos.left + 'px';
                sun.style.top = pos.top + 'px';
                sun.style.pointerEvents = 'none';
                sun.style.zIndex = 5;
                sun.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
                sun.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))';
                slideDiv.appendChild(sun);
            });
            // Kuromis: right-bottom, right-top, left-bottom
            const kuroPositions = [
                { left: imgRight + 10, top: imgBottom - 40 },
                { left: imgRight + 10, top: imgTop + 40 },
                { left: imgLeft - 40, top: imgBottom - 10 }
            ];
            kuroPositions.forEach(pos => {
                const kuro = document.createElement('img');
                kuro.src = 'kuromi.gif';
                kuro.alt = 'kuromi';
                kuro.style.width = '60px';
                kuro.style.position = 'absolute';
                kuro.style.left = pos.left + 'px';
                kuro.style.top = pos.top + 'px';
                kuro.style.pointerEvents = 'none';
                kuro.style.zIndex = 5;
                kuro.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
                kuro.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.10))';
                slideDiv.appendChild(kuro);
            });
        }, 0);
    }
    // Text
    const textDiv = document.createElement('div');
    textDiv.className = 'center-text';
    textDiv.innerHTML = slide.text;
    slideDiv.appendChild(textDiv);
    // Button(s)
    if (slide.button) {
        const btn = document.createElement('button');
        btn.className = 'reply-btn';
        btn.textContent = slide.button;
        btn.onclick = () => nextSlide(1);
        slideDiv.appendChild(btn);
    } else if (slide.question) {
        const yesBtn = document.createElement('button');
        yesBtn.className = 'choice-btn';
        yesBtn.textContent = 'Yes';
        yesBtn.onclick = () => nextSlide(1);
        const noBtn = document.createElement('button');
        noBtn.className = 'choice-btn';
        noBtn.textContent = 'No';
        noBtn.onclick = () => {
            stubbornNoCount++;
            // Change image to a random no gif
            const noGifs = ['no1.gif', 'no2.gif', 'no3.gif', 'no4.gif'];
            const randomGif = noGifs[Math.floor(Math.random() * noGifs.length)];
            img.src = randomGif;
            noBtn.textContent = [
                "NO",
                "AYAW",
                "ayaw ko nga",
                "Nope!",
                "Try again!",
                "HINDE",
                "Still no!",
                "C'mon!"
            ][stubbornNoCount % 8] || "No";
        };
        const btnWrap = document.createElement('div');
        btnWrap.style.display = 'flex';
        btnWrap.style.gap = '20px';
        btnWrap.style.justifyContent = 'center';
        btnWrap.appendChild(yesBtn);
        btnWrap.appendChild(noBtn);
        slideDiv.appendChild(btnWrap);
    }
    // Add new slide to container
    container.appendChild(slideDiv);
    // Animate both slides
    setTimeout(() => {
        // Move current slide out, if exists
        const slidesInDom = container.querySelectorAll('.slide');
        if (slidesInDom.length > 1) {
            slidesInDom[0].style.transform = `translateX(${-direction * 100}vw)`;
        }
        // Move new slide in
        slideDiv.style.transform = 'translateX(0)';
        // Remove old slide after animation
        setTimeout(() => {
            if (slidesInDom.length > 1) {
                container.removeChild(slidesInDom[0]);
            }
        }, 500);
    }, 30);
}

function nextSlide(direction = 1) {
    if (direction === 1 && current < slides.length - 1) {
        current++;
    } else if (direction === -1 && current > 0) {
        current--;
    } else {
        return;
    }
    stubbornNoCount = 0;
    renderSlide(current, direction);
}

window.onload = () => {
    const container = document.getElementById('slides-container');
    container.innerHTML = '';
    renderSlide(0, 1);
};
