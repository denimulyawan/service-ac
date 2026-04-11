// ========== MOBILE MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ========== SET ACTIVE MENU ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
    
    // ========== PORTFOLIO LIGHTBOX ==========
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const closeModal = document.querySelector('.modal-close');
    
    if (modal && modalImg) {
        window.openLightbox = function(imgSrc) {
            modal.style.display = 'block';
            modalImg.src = imgSrc;
        }
        
        if (closeModal) {
            closeModal.onclick = function() {
                modal.style.display = 'none';
            }
        }
        
        modal.onclick = function() {
            modal.style.display = 'none';
        }
    }
    
    // ========== FAQ ACCORDION ==========
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // ========== SERVICE CHIPS (TOGGLE BUTTON) ==========
    const serviceChips = document.querySelectorAll('.service-chip');
    const selectedServicesInput = document.getElementById('selectedServices');
    
    function updateSelectedServices() {
        if (selectedServicesInput) {
            const selected = [];
            document.querySelectorAll('.service-chip.active').forEach(chip => {
                selected.push(chip.dataset.value);
            });
            selectedServicesInput.value = selected.join(', ');
        }
    }
    
    if (serviceChips.length > 0) {
        serviceChips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
                updateSelectedServices();
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
    if(dateInput) dateInput.min = `${yyyy}-${mm}-${dd}`;
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const selectedChips = document.querySelectorAll('.service-chip.active');
            if (selectedChips.length === 0) {
                if (formMessage) {
                    formMessage.innerHTML = '⚠️ Pilih minimal satu layanan!';
                    formMessage.style.color = 'red';
                }
                return;
            }
            
            const selectedLayanan = Array.from(selectedChips).map(chip => chip.dataset.value);
            
            const data = {
                nama: document.getElementById('nama')?.value || '',
                wa: document.getElementById('wa')?.value || '',
                kelurahan: document.getElementById('kelurahan')?.value || '',
                detailAlamat: document.getElementById('detailAlamat')?.value || '',
                jenisAC: document.getElementById('jenisAC')?.value || '',
                layanan: selectedLayanan.join(', '),
                keluhan: document.getElementById('keluhan')?.value || '',
                tanggal: document.getElementById('tanggal')?.value || ''
            };
            
            if (formMessage) {
                formMessage.innerHTML = '⏳ Mengirim pesanan...';
                formMessage.style.color = 'blue';
            }
            
            // Simulasi kirim (ganti dengan fetch ke Google Apps Script nanti)
            setTimeout(() => {
                if (formMessage) {
                    formMessage.innerHTML = '✅ Pesanan terkirim! Admin akan hubungi via WhatsApp dalam 15 menit.';
                    formMessage.style.color = 'green';
                }
                bookingForm.reset();
                document.querySelectorAll('.service-chip.active').forEach(chip => {
                    chip.classList.remove('active');
                });
                updateSelectedServices();
                if(dateInput) dateInput.value = '';
            }, 1000);
        });
    }
});