// ========== WAIT UNTUK DOM SIAP ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js loaded - DOM ready');
    
    // ========== MOBILE MENU TOGGLE (DIPERBAIKI) ==========
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        // Toggle menu saat tombol diklik
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            console.log('Menu toggled, active status:', navMenu.classList.contains('active'));
        });
        
        // Tutup menu saat link diklik
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                console.log('Menu closed by link click');
            });
        });
        
        // Tutup menu saat klik di luar menu
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                console.log('Menu closed by outside click');
            }
        });
        
        // Tutup menu saat scroll
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                console.log('Menu closed by scroll');
            }
        });
        
        // Tutup menu saat resize window (dari mobile ke desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                console.log('Menu closed by resize');
            }
        });
    } else {
        console.log('Menu toggle atau navMenu tidak ditemukan');
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
        
        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }
        
        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(function() { nextSlide(); }, autoSlideDelay);
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
    if (faqItems.length > 0) {
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.removeEventListener('click', toggleFaq);
                question.addEventListener('click', toggleFaq);
                function toggleFaq() { 
                    item.classList.toggle('active'); 
                }
            }
        });
    }
    
    // ========== PORTFOLIO LIGHTBOX ==========
    // const modal = document.getElementById('lightboxModal');
    // const modalImg = document.getElementById('lightboxImg');
    // const closeModal = document.querySelector('.modal-close');
    
    // if (modal && modalImg) {
    //     window.openLightbox = function(imgSrc) {
    //         modal.style.display = 'block';
    //         modalImg.src = imgSrc;
    //     };
    //     if (closeModal) { 
    //         closeModal.onclick = function() { 
    //             modal.style.display = 'none'; 
    //         }; 
    //     }
    //     modal.onclick = function() { 
    //         modal.style.display = 'none'; 
    //     };
    // }
    
    // ========== SERVICE CHIPS ==========
    const serviceChips = document.querySelectorAll('.service-chip');
    const selectedServicesInput = document.getElementById('selectedServices');
    
    function updateSelectedServices() {
        if (selectedServicesInput) {
            const selected = [];
            document.querySelectorAll('.service-chip.active').forEach(function(chip) {
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
            });
        });
    }
    
    // ========== FORM BOOKING HANDLER (hanya jika form ada) ==========
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dateInput = document.getElementById('tanggal');
    
    if (dateInput) {
        dateInput.min = tomorrow.toISOString().split('T')[0];
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
                document.querySelectorAll('.service-chip.active').forEach(function(chip) {
                    chip.classList.remove('active');
                });
                updateSelectedServices();
                if (dateInput) dateInput.value = '';
            }, 1000);
        });
    }
    
    // ========== KECAMATAN TABS & KELURAHAN PANELS ==========
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
            });
        });
    }
    
    // ========== KELURAHAN CLICK ==========
    const kelurahanItems = document.querySelectorAll('.kelurahan-item');
    if (kelurahanItems.length > 0) {
        kelurahanItems.forEach(function(item) {
            item.addEventListener('click', function() {
                console.log('Kelurahan dipilih:', this.textContent.trim());
            });
        });
    }
    
    // ========== SERVICE CARD CLICKABLE (UNTUK HALAMAN LAYANAN) ==========
    // Mengecek apakah ada element service-card-clickable
    const serviceCards = document.querySelectorAll('.service-card-clickable');
    if (serviceCards.length > 0) {
        serviceCards.forEach(function(card) {
            card.addEventListener('click', function() {
                const index = card.dataset.serviceIndex;
                if (index !== undefined && window.services && window.services[index]) {
                    if (typeof window.openModal === 'function') {
                        window.openModal(window.services[index]);
                    }
                }
            });
        });
    }
    
    // ========== FILTER BUTTONS (UNTUK HALAMAN LAYANAN) ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0 && window.displayServices) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { 
                    b.classList.remove('active'); 
                });
                btn.classList.add('active');
                const currentFilter = btn.dataset.filter;
                window.displayServices(currentFilter);
            });
        });
    }
    
    // ========== PRICE MODAL ==========
    const priceModal = document.getElementById('priceModal');
    const modalClose = document.querySelector('.price-modal-close');
    
    if (priceModal) {
        window.openModal = function(service) {
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalPrice = document.getElementById('modalPrice');
            const modalDescription = document.getElementById('modalDescription');
            
            if (modalIcon) modalIcon.textContent = service.emoji || '🔧';
            if (modalTitle) modalTitle.textContent = service.name;
            if (modalPrice) modalPrice.textContent = service.price;
            if (modalDescription) modalDescription.textContent = service.description;
            
            priceModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };
        
        function closePriceModal() {
            priceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', closePriceModal);
        }
        
        priceModal.addEventListener('click', function(e) {
            if (e.target === priceModal) closePriceModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && priceModal.style.display === 'flex') {
                closePriceModal();
            }
        });
    }
    
    console.log('Main.js - semua event listener terpasang');
});