let container = document.querySelector('.video');
let badacontainer = document.querySelector('.body');

let mouseX = 0;
let mouseY = 0;

let currentX = mouseX;
let currentY = mouseY;
let rotX = 0;
let rotY = 0;

badacontainer.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    const dx = mouseX - currentX;
    const dy = mouseY - currentY;

    currentX += dx * 0.08;
    currentY += dy * 0.08;

    const targetRotY = Math.max(-70, Math.min(70, dx * 0.1));
    const targetRotX = Math.max(-70, Math.min(70, dy * -0.1));

    rotY += (targetRotY - rotY) * 0.5;
    rotX += (targetRotX - rotX) * 0.5;

    container.style.left = currentX + 'px';
    container.style.top = currentY + 'px';
    container.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    requestAnimationFrame(animate);
}

animate();

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('studio-namma-theme');
const body = document.body;

const applyTheme = (theme) => {
    body.classList.toggle('light', theme === 'light');
    body.classList.toggle('dark', theme === 'dark');
    themeToggle.textContent = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
    localStorage.setItem('studio-namma-theme', theme);
};

if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
} else {
    applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
});

function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('liveTime').textContent = timeStr;
}

updateTime();
setInterval(updateTime, 1000);

let detail_images = document.querySelectorAll('.detail-img');
let playground_images = document.querySelectorAll('.playground-img');

let udetail = document.querySelector('#detail');
let uplayground = document.querySelector('#playground');

let detail_interval;
let playground_interval;
let currentIndex = 0; 

if (udetail) {
    udetail.addEventListener('mouseenter', () => {
        playImageSequence(detail_images); 

        detail_interval = setInterval(() => {
            playImageSequence(detail_images);
        }, 350); 
    });

    udetail.addEventListener('mouseleave', () => {
        clearInterval(detail_interval);
        detail_images.forEach((img) => {
            img.style.transition = 'none'; 
            img.style.visibility = 'hidden'; 
            img.style.zIndex = '1'; 
            img.style.transform = 'translateY(10%) rotate(0deg)'; 
        });
        currentIndex = 0; 
    });
}

if (uplayground) {
    uplayground.addEventListener('mouseenter', () => {
        playImageSequence(playground_images); 

        playground_interval = setInterval(() => {
            playImageSequence(playground_images);
        }, 350); 
    });

    uplayground.addEventListener('mouseleave', () => {
        clearInterval(playground_interval);
        playground_images.forEach((img) => {
            img.style.transition = 'none'; 
            img.style.visibility = 'hidden'; 
            img.style.zIndex = '1'; 
            img.style.transform = 'translateY(10%) rotate(0deg)'; 
        });
        currentIndex = 0; 
    });

    uplayground.addEventListener('mouseenter', () => {
        if (typeof cursor !== 'undefined') {
            cursor.textContent = "PORTFOLIO";
            cursor.style.color = 'white';
            cursor.style.borderRadius = '10px';
        }
    });

    uplayground.addEventListener('mouseleave', () => {
        if (typeof cursor !== 'undefined') {
            cursor.textContent = "";
            cursor.style.borderRadius = '50px';
        }
    });
}

function playImageSequence(images) {
    if (!images || images.length === 0) return;

    let currentImg = images[currentIndex];
    images.forEach((img) => {
        if (img !== currentImg) {
            img.style.zIndex = '9'; 
        }
    });
    currentImg.style.transition = 'all 0.3s ease'; 
    currentImg.style.visibility = 'visible';
    currentImg.style.transform = 'translateY(-10%) rotate(-3deg)';
    currentImg.style.zIndex = '10'; 
    
    let pastIndex = (currentIndex - 1 + images.length) % images.length;
    let pastImage = images[pastIndex];
    pastImage.style.transition = 'all 0s';
    pastImage.style.visibility = 'hidden';
    pastImage.style.transform = 'translateY(10%) rotate(0deg)';

    currentIndex = (currentIndex + 1) % images.length;
}

document.querySelectorAll('.section-5-div').forEach((div) => {
    const caseVideo = div.querySelector('video');
    if (caseVideo) {
        div.addEventListener('mouseenter', () => {
            caseVideo.currentTime = 0;
            caseVideo.play();
        });
        div.addEventListener('mouseleave', () => {
            caseVideo.pause();
            caseVideo.currentTime = 0;
        });
    }
});

const services = document.querySelectorAll('.service-div');

services.forEach((div) => {
    let service_video = div.querySelector('video');
    let small_service_text = div.querySelector('.service-small-text');
    let service_text = div.querySelector('.service-text');

    div.addEventListener('mouseenter', () => {
        if (service_video) {
            service_video.style.transition = 'height 0.4s';
            service_video.style.opacity = '1';
            service_video.style.height = '262.5px';
        }
        if (service_text) service_text.style.zIndex = '11';
        if (small_service_text) small_service_text.style.opacity = '1';
        
        services.forEach((otherDiv) => {
            if (otherDiv !== div) {
                let otherText = otherDiv.querySelector('.service-text');
                if (otherText) otherText.style.opacity = '0.5';
            }
        });
    });

    div.addEventListener('mouseleave', () => {
        if (service_video) {
            service_video.style.transition = 'height 0s';
            service_video.style.height = '0px';
            service_video.style.opacity = '0';
        }
        if (service_text) service_text.style.zIndex = '9';
        if (small_service_text) small_service_text.style.opacity = '0';

        services.forEach((otherDiv) => {
            let otherText = otherDiv.querySelector('.service-text');
            if (otherText) otherText.style.opacity = '1';
        });
    });
});