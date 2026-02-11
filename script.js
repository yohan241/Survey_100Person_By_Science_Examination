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
        text: "YYAAAAYYYY!!!!!!!",
        dull: false,
        button: "baliw"
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

// Add soft background music throughout the site
window.addEventListener('DOMContentLoaded', function() {
    let bgAudio = document.getElementById('bg-audio');
    if (!bgAudio) {
        bgAudio = document.createElement('audio');
        bgAudio.id = 'bg-audio';
        bgAudio.src = 'You\'ll Be Safe Here - Rivermaya  Piano Cover by LJ Madrigal.mp3';
        bgAudio.loop = true;
        bgAudio.volume = 0.12;
        bgAudio.style.display = 'none';
        document.body.appendChild(bgAudio);
    }
    // Try to play on first user interaction
    function tryPlay() {
        bgAudio.play();
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('touchstart', tryPlay);
    }
    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
});

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
    // Animate the 2nd to the last slide's text (the letter)
    if (idx === slides.length - 2) {
        textDiv.style.opacity = '0';
        textDiv.style.transform = 'translateY(80px)';
        textDiv.innerHTML = '';
        // Add reveal button as clickable PNG
        const revealBtn = document.createElement('img');
        revealBtn.src = 'love-letter-envelope-with-heart-clipart.png';
        revealBtn.alt = 'Read the Letter';
        revealBtn.style.width = '90px';
        revealBtn.style.cursor = 'pointer';
        revealBtn.style.marginTop = '40px';
        revealBtn.style.opacity = '0';
        revealBtn.style.transform = 'translateY(40px)';
        revealBtn.className = 'reveal-btn-img';
        textDiv.appendChild(revealBtn);
        // Animate popup for button
        setTimeout(() => {
            textDiv.style.transition = 'transform 1s cubic-bezier(.77,0,.18,1), opacity 1s cubic-bezier(.77,0,.18,1)';
            textDiv.style.opacity = '1';
            textDiv.style.transform = 'translateY(0)';
            revealBtn.style.transition = 'transform 0.7s cubic-bezier(.77,0,.18,1), opacity 0.7s cubic-bezier(.77,0,.18,1)';
            revealBtn.style.opacity = '1';
            revealBtn.style.transform = 'translateY(0)';
        }, 100);
        revealBtn.onclick = () => {
            revealBtn.style.display = 'none';
            // Start typewriter effect
            setTimeout(() => {
                // Extract inner text from <span class='letter'>...</span>
                const match = slides[idx].text.match(/<span class=['"]letter['"]>([\s\S]*)<\/span>/i);
                let letterText = match ? match[1] : slides[idx].text;
                const span = document.createElement('span');
                span.className = 'letter';
                textDiv.appendChild(span);
                let i = 0;
                function typeWriter() {
                    if (i <= letterText.length) {
                        span.innerHTML = letterText.slice(0, i).replace(/\n/g, '<br>');
                        i++;
                        setTimeout(typeWriter, 30);
                    } else {
                        // Show reply button after letter is fully revealed
                        const btn = document.createElement('button');
                        btn.className = 'reply-btn';
                        btn.textContent = slides[idx].button || '<3';
                        btn.onclick = () => nextSlide(1);
                        btn.style.marginTop = '32px';
                        textDiv.appendChild(btn);
                    }
                }
                typeWriter();
            }, 200);
        };
    } else {
        textDiv.innerHTML = slide.text;
    }
    slideDiv.appendChild(textDiv);
    // Button(s)
    if (slide.button && idx !== slides.length - 2) {
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
            if (stubbornNoCount >= 5) {
                noBtn.style.display = 'none';
                return;
            }
            noBtn.textContent = [
                "NO",
                "AYAW",
                "ayaw ko nga",
                "Nope!",
                "HINDE",
                "Hindi talaga.",
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

    // Play happy-happy-happy-song.mp3 on the slide after the question slide
    if (idx > 0 && slides[idx - 1].question) {
        let audio = document.getElementById('happy-audio');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'happy-audio';
            audio.src = 'happy-happy-happy-song.mp3';
            audio.autoplay = true;
            audio.loop = false;
            audio.volume = 0.3;
            audio.style.display = 'none';
            document.body.appendChild(audio);
        } else {
            audio.currentTime = 0;
            audio.volume = 0.3;
            audio.play();
        }
    } else {
        // Stop the audio if it exists and we're not on the happy slide
        const audio = document.getElementById('happy-audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }

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
