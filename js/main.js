// ========== WAIT UNTUK DOM SIAP ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded - DOM ready');
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            console.log('Menu toggled');
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ========== SET ACTIVE MENU ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const allNavLinks = document.querySelectorAll('.nav-menu a');
    allNavLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== SLIDER FULL WIDTH ==========
    const slidesContainer = document.getElementById('slidesFull');
    const prevBtn = document.getElementById('prevBtnFull');
    const nextBtn = document.getElementById('nextBtnFull');
    const dotsContainer = document.getElementById('dotsFull');
    
    if (slidesContainer && prevBtn && nextBtn) {
        const slides = document.querySelectorAll('#slidesFull .slide-full');
        const slideCount = slides.length;
        let currentIndex = 0;
        let autoSlideInterval;
        const autoSlideDelay = 5000;
        
        if (dotsContainer && slideCount > 0) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot-full');
                dot.setAttribute('data-index', i);
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.getAttribute('data-index')));
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateSlider() {
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = 'translateX(' + offset + '%)';
            
            const dots = document.querySelectorAll('.dot-full');
            dots.forEach(function(dot, index) {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        function goToSlide(index) {
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            updateSlider();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentIndex - 1);
        }
        
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(function() {
                nextSlide();
            }, autoSlideDelay);
        }
        
        function resetAutoSlide() {
            startAutoSlide();
        }
        
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoSlide();
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoSlide();
        });
        
        updateSlider();
        startAutoSlide();
        
        const sliderContainer = document.querySelector('.slider-container-full');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', function() {
                if (autoSlideInterval) clearInterval(autoSlideInterval);
            });
            sliderContainer.addEventListener('mouseleave', function() {
                startAutoSlide();
            });
        }
        
        console.log('Slider full width initialized, slide count:', slideCount);
    }
    
    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items found:', faqItems.length);
    
    if (faqItems.length > 0) {
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.removeEventListener('click', toggleFaq);
                question.addEventListener('click', toggleFaq);
                
                function toggleFaq() {
                    console.log('FAQ clicked');
                    item.classList.toggle('active');
                }
            }
        });
    }
    
    // ========== PORTFOLIO LIGHTBOX ==========
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeModal = document.querySelector('.modal-close');
    
    if (modal && modalImg) {
        window.openLightbox = function(imgSrc) {
            modal.style.display = 'block';
            modalImg.src = imgSrc;
            console.log('Lightbox opened:', imgSrc);
        };
        
        if (closeModal) {
            closeModal.onclick = function() {
                modal.style.display = 'none';
            };
        }
        
        modal.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    // ========== SERVICE CHIPS (TOGGLE BUTTON) ==========
    const serviceChips = document.querySelectorAll('.service-chip');
    const selectedServicesInput = document.getElementById('selectedServices');
    
    function updateSelectedServices() {
        if (selectedServicesInput) {
            const selected = [];
            const activeChips = document.querySelectorAll('.service-chip.active');
            activeChips.forEach(function(chip) {
                selected.push(chip.dataset.value);
            });
            selectedServicesInput.value = selected.join(', ');
        }
    }
    
    if (serviceChips.length > 0) {
        serviceChips.forEach(function(chip) {
            chip.addEventListener('click', function() {
                chip.classList.toggle('active');
                updateSelectedServices();
                console.log('Service chip toggled');
            });
        });
    }
    
    // ========== FORM BOOKING HANDLER ==========
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    const dateInput = document.getElementById('tanggal');
    if (dateInput) {
        dateInput.min = yyyy + '-' + mm + '-' + dd;
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const activeChips = document.querySelectorAll('.service-chip.active');
            if (activeChips.length === 0) {
                if (formMessage) {
                    formMessage.innerHTML = '⚠️ Pilih minimal satu layanan!';
                    formMessage.style.color = 'red';
                }
                return;
            }
            
            const selectedLayanan = [];
            activeChips.forEach(function(chip) {
                selectedLayanan.push(chip.dataset.value);
            });
            
            const nama = document.getElementById('nama') ? document.getElementById('nama').value : '';
            const wa = document.getElementById('wa') ? document.getElementById('wa').value : '';
            const kelurahan = document.getElementById('kelurahan') ? document.getElementById('kelurahan').value : '';
            const detailAlamat = document.getElementById('detailAlamat') ? document.getElementById('detailAlamat').value : '';
            const jenisAC = document.getElementById('jenisAC') ? document.getElementById('jenisAC').value : '';
            const keluhan = document.getElementById('keluhan') ? document.getElementById('keluhan').value : '';
            const tanggal = document.getElementById('tanggal') ? document.getElementById('tanggal').value : '';
            
            if (formMessage) {
                formMessage.innerHTML = '⏳ Mengirim pesanan...';
                formMessage.style.color = 'blue';
            }
            
            setTimeout(function() {
                if (formMessage) {
                    formMessage.innerHTML = '✅ Pesanan terkirim! Admin akan hubungi via WhatsApp dalam 15 menit.';
                    formMessage.style.color = 'green';
                }
                bookingForm.reset();
                const allChips = document.querySelectorAll('.service-chip.active');
                allChips.forEach(function(chip) {
                    chip.classList.remove('active');
                });
                updateSelectedServices();
                if (dateInput) dateInput.value = '';
            }, 1000);
            
            console.log('Form submitted:', {
                nama: nama,
                wa: wa,
                layanan: selectedLayanan.join(', ')
            });
        });
    }
    
    // ========== KECAMATAN TABS & KELURAHAN PANELS (HALAMAN TENTANG) ==========
    const kecamatanTabs = document.querySelectorAll('.kecamatan-tab');
    const kelurahanPanels = document.querySelectorAll('.kelurahan-panel');
    
    if (kecamatanTabs.length > 0 && kelurahanPanels.length > 0) {
        function switchKecamatanTab(kecamatanId) {
            kecamatanTabs.forEach(function(tab) {
                if (tab.getAttribute('data-kecamatan') === kecamatanId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            kelurahanPanels.forEach(function(panel) {
                if (panel.getAttribute('data-panel') === kecamatanId) {
                    panel.classList.add('active-panel');
                } else {
                    panel.classList.remove('active-panel');
                }
            });
        }
        
        kecamatanTabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const kecamatan = this.getAttribute('data-kecamatan');
                switchKecamatanTab(kecamatan);
                console.log('Kecamatan tab clicked:', kecamatan);
            });
        });
        
        console.log('Kecamatan tabs initialized');
    }
    
    // ========== KELURAHAN CLICK (HALAMAN TENTANG) ==========
    const kelurahanItems = document.querySelectorAll('.kelurahan-item');
    
    kelurahanItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const kelurahanName = this.textContent.trim();
            console.log('Kelurahan dipilih:', kelurahanName);
            // Bisa ditambahkan fungsi redirect ke kontak.html jika diperlukan
        });
    });
    
    console.log('Main.js - semua event listener terpasang');
});