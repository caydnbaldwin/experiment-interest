const profileToggle = document.getElementById('profileToggle');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const customizationToggle = document.getElementById('customizationToggle');
const customizationDropdown = document.getElementById('customizationDropdown');
const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const customizationShortcut = document.getElementById('customizationShortcut');

profileToggle.addEventListener('click', function() {
    sideMenu.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
});

if (customizationShortcut) {
    customizationShortcut.addEventListener('click', function() {
        sideMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
        customizationDropdown.classList.add('open'); 
        customizationToggle.classList.add('active'); 
    });
}

function closeMenu() {
    sideMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = ''; 
    
    if (customizationDropdown.classList.contains('open')) {
        customizationDropdown.classList.remove('open');
        customizationToggle.classList.remove('active');
    }
}

closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

customizationToggle.addEventListener('click', function(e) {
    e.preventDefault();
    customizationDropdown.classList.toggle('open');
    customizationToggle.classList.toggle('active');
});

colorSchemeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const scheme = this.dataset.scheme;
        document.body.className = ''; 
        document.body.classList.add(scheme); 

        localStorage.setItem('colorScheme', scheme);

        colorSchemeButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

fontSizeSlider.addEventListener('input', function() {
    const fontSize = this.value;
    document.documentElement.style.fontSize = `${fontSize}%`;
    fontSizeValue.textContent = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize);
});

window.addEventListener('DOMContentLoaded', function() {
    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
        document.body.classList.add(savedColorScheme);
        document.querySelector(`.color-scheme-btn[data-scheme="${savedColorScheme}"]`)?.classList.add('active');
    } else {
        document.querySelector('.color-scheme-btn[data-scheme="default"]')?.classList.add('active');
    }
    const savedFontSize = localStorage.getItem('fontSize') || 100;
    document.documentElement.style.fontSize = `${savedFontSize}%`;
    if (fontSizeSlider) {
        fontSizeSlider.value = savedFontSize;
        fontSizeValue.textContent = `${savedFontSize}%`;
    }
});