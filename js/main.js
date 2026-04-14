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
        
        // Tutup menu saat klik link
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
    
    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items found:', faqItems.length);
    
    if (faqItems.length > 0) {
        faqItems.forEach(function(item) {
            const question = item.querySelector('.faq-question');
            if (question) {
                // Hapus event listener lama (pakai yang baru)
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
    
    // Set minimal tanggal (H+1)
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
            
            // Simulasi kirim
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
    
    console.log('Main.js - semua event listener terpasang');
});