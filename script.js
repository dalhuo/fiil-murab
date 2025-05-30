// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(-50px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }, 10);
    }
}

function closeModal(modal) {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.transform = 'translateY(-50px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Enhanced search functionality
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (!searchTerm) {
        clearHighlights();
        showToast('Silakan masukkan kata untuk dicari', 'warning');
        return;
    }
    
    clearHighlights();
    
    const boxes = document.querySelectorAll('.box');
    const modals = document.querySelectorAll('.modal-content');
    let found = false;
    let firstMatch = null;
    
    // Search in visible content
    boxes.forEach(box => {
        const text = box.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            box.classList.add('search-highlight');
            found = true;
            if (!firstMatch) {
                firstMatch = box;
            }
        }
    });
    
    // Search in modal content
    modals.forEach(modal => {
        const text = modal.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            const modalId = modal.closest('.modal').id;
            const correspondingBox = document.querySelector(`[onclick="openModal('${modalId}')"]`);
            if (correspondingBox) {
                correspondingBox.classList.add('search-highlight');
                found = true;
                if (!firstMatch) {
                    firstMatch = correspondingBox;
                }
            }
        }
    });
    
    if (!found) {
        showToast(`Tidak ditemukan hasil untuk: "${searchTerm}"`, 'error');
    } else {
        showToast(`Ditemukan ${document.querySelectorAll('.search-highlight').length} hasil`, 'success');
        
        // Scroll to first match
        if (firstMatch) {
            firstMatch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'center'
            });
        }
        
        // Auto-clear highlights after 8 seconds
        setTimeout(clearHighlights, 8000);
    }
}

function clearHighlights() {
    const highlighted = document.querySelectorAll('.search-highlight');
    highlighted.forEach(element => {
        element.classList.remove('search-highlight');
    });
}

// Enhanced toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = '#4CAF50';
            break;
        case 'error':
            backgroundColor = '#f44336';
            break;
        case 'warning':
            backgroundColor = '#ff9800';
            break;
        default:
            backgroundColor = '#2196F3';
    }
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Help modal
function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'modal';
    helpModal.style.display = 'block';
    
    helpModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-title">Panduan Penggunaan</div>
            <div class="modal-section">
                <h3>🎯 Cara Menggunakan:</h3>
                <ul>
                    <li><strong>Klik kotak manapun</strong> untuk melihat penjelasan detail</li>
                    <li><strong>Gunakan pencarian</strong> untuk menemukan topik tertentu</li>
                    <li><strong>Ikuti garis penghubung</strong> untuk memahami alur konsep</li>
                    <li><strong>Klik contoh</strong> dalam modal untuk menyalinnya</li>
                </ul>
            </div>
            <div class="modal-section">
                <h3>⌨️ Shortcut Keyboard:</h3>
                <ul>
                    <li><strong>Ctrl + F:</strong> Fokus ke kotak pencarian</li>
                    <li><strong>Ctrl + P:</strong> Cetak peta konsep</li>
                    <li><strong>ESC:</strong> Tutup modal yang terbuka</li>
                    <li><strong>Enter:</strong> Cari atau buka item yang dipilih</li>
                    <li><strong>Tab:</strong> Navigasi antar elemen</li>
                </ul>
            </div>
            <div class="modal-section">
                <h3>📱 Tips Mobile:</h3>
                <ul>
                    <li>Geser untuk melihat seluruh diagram</li>
                    <li>Tap untuk berinteraksi dengan elemen</li>
                    <li>Pinch to zoom untuk memperbesar/memperkecil</li>
                </ul>
            </div>
            <div class="modal-section">
                <h3>🎨 Kode Warna:</h3>
                <ul>
                    <li><strong style="color: #ff6b6b;">🔴 Merah:</strong> Konsep utama</li>
                    <li><strong style="color: #74b9ff;">🔵 Biru:</strong> Definisi</li>
                    <li><strong style="color: #00b894;">🟢 Hijau:</strong> Marfu' (رفع)</li>
                    <li><strong style="color: #fdcb6e;">🟡 Kuning:</strong> Manshub (نصب)</li>
                    <li><strong style="color: #fd79a8;">🟣 Pink:</strong> Majzum (جزم)</li>
                    <li><strong style="color: #a29bfe;">🟦 Ungu:</strong> Alat dan detail</li>
                </ul>
            </div>
            <div class="highlight">
                <strong>💡 Tips:</strong> Mulai dari atas dan ikuti garis penghubung untuk memahami alur konsep secara sistematis.
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Add close functionality
    const closeBtn = helpModal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        closeModal(helpModal);
        setTimeout(() => {
            if (document.body.contains(helpModal)) {
                document.body.removeChild(helpModal);
            }
        }, 350);
    });
    
    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            closeModal(helpModal);
            setTimeout(() => {
                if (document.body.contains(helpModal)) {
                    document.body.removeChild(helpModal);
                }
            }, 350);
        }
    });
}

// Print functionality
function printDiagram() {
    const originalTitle = document.title;
    document.title = 'Peta Konsep Fi\'il Mu\'rab';
    
    // Hide search container temporarily
    const searchContainer = document.querySelector('.search-container');
    searchContainer.style.display = 'none';
    
    window.print();
    
    // Restore after printing
    setTimeout(() => {
        searchContainer.style.display = 'block';
        document.title = originalTitle;
    }, 1000);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Global shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case 'f':
                e.preventDefault();
                document.getElementById('searchInput').focus();
                break;
            case 'p':
                e.preventDefault();
                printDiagram();
                break;
        }
    }
    
    // ESC to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal);
        });
    }
    
    // Enter for search
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        searchContent();
    }
});

// Add tooltips to boxes
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = {
        'mainModal': 'Klik untuk mempelajari konsep dasar Fi\'il Mu\'rab',
        'definitionModal': 'Klik untuk memahami definisi lengkap',
        'marfooModal': 'Pelajari tentang Fi\'il Mudhari\' Marfu\'',
        'mansoobModal': 'Pelajari tentang Fi\'il Mudhari\' Manshub',
        'majzoomModal': 'Pelajari tentang Fi\'il Mudhari\' Majzum',
        'dammaModal': 'Tanda rafa\' dengan dhammah',
        'thabutNoonModal': 'Tanda rafa\' dengan tetapnya nun',
        'fathaModal': 'Tanda nashb dengan fathah',
        'hadhfNoonNasbModal': 'Tanda nashb dengan hapusnya nun',
        'sukoonModal': 'Tanda jazm dengan sukun',
        'hadhfNoonJazmModal': 'Tanda jazm dengan hapusnya nun',
        'nasbToolsModal': 'Delapan huruf yang men-nashb-kan fi\'il',
        'jazmToolsModal': 'Alat-alat yang men-jazm-kan fi\'il',
        'af3alKhamsaModal': 'Lima bentuk fi\'il mudhari\' khusus',
        'mu3talAkhirModal': 'Fi\'il yang berakhiran huruf illat',
        'examplesModal': 'Contoh-contoh penerapan dalam kalimat',
        'notesModal': 'Catatan penting yang harus diingat'
    };
    
    Object.keys(tooltips).forEach(modalId => {
        const box = document.querySelector(`[onclick="openModal('${modalId}')"]`);
        if (box) {
            box.setAttribute('data-tooltip', tooltips[modalId]);
        }
    });
});

// Copy functionality for examples
document.addEventListener('DOMContentLoaded', function() {
    // Add copy functionality to all example lists
    document.addEventListener('click', function(e) {
        if (e.target.closest('.examples-list li')) {
            const listItem = e.target.closest('.examples-list li');
            const text = listItem.textContent.trim();
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Contoh berhasil disalin!', 'success');
                    
                    // Visual feedback
                    listItem.style.background = '#c8e6c9';
                    setTimeout(() => {
                        listItem.style.background = '';
                    }, 1000);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Contoh berhasil disalin!', 'success');
            }
        }
    });
    
    // Add cursor pointer and title to example items
    const style = document.createElement('style');
    style.textContent = `
        .examples-list li {
            cursor: pointer;
            position: relative;
        }
        
        .examples-list li::after {
            content: '📋';
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .examples-list li:hover::after {
            opacity: 1;
        }
        
        .examples-list li:hover {
            background: #e8f5e8 !important;
        }
    `;
    document.head.appendChild(style);
});

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('Peta Konsep Fi\'il Mu\'rab siap digunakan!');
    
    // Welcome message
    setTimeout(() => {
        showToast('Selamat datang! Klik kotak manapun untuk mulai belajar.', 'success');
    }, 1000);
    
    // Add modal close functionality
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Make boxes focusable
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.setAttribute('tabindex', index + 1);
    });
    
    // Add loading animation
    const levels = document.querySelectorAll('.level');
    levels.forEach((level, index) => {
        level.style.opacity = '0';
        setTimeout(() => {
            level.style.opacity = '1';
        }, index * 200);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    showToast('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    .bounce {        animation: bounce 2s infinite;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.5); }
        50% { box-shadow: 0 0 20px rgba(116, 185, 255, 0.8); }
        100% { box-shadow: 0 0 5px rgba(116, 185, 255, 0.5); }
    }
    
    .glow {
        animation: glow 2s ease-in-out infinite;
    }
`;
document.head.appendChild(animationStyles);

// Enhanced interaction effects
function addInteractionEffects() {
    const boxes = document.querySelectorAll('.box');
    
    boxes.forEach(box => {
        // Add click effect
        box.addEventListener('click', function() {
            this.classList.add('bounce');
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 2000);
        });
        
        // Add focus effect
        box.addEventListener('focus', function() {
            this.classList.add('glow');
        });
        
        box.addEventListener('blur', function() {
            this.classList.remove('glow');
        });
        
        // Add double-click for quick copy
        box.addEventListener('dblclick', function() {
            const text = this.textContent.trim();
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Teks berhasil disalin!', 'success');
                    this.classList.add('shake');
                    setTimeout(() => {
                        this.classList.remove('shake');
                    }, 500);
                });
            }
        });
    });
}

// Touch support for mobile
function addTouchSupport() {
    let touchStartTime;
    let touchStartPos;
    
    document.addEventListener('touchstart', function(e) {
        touchStartTime = Date.now();
        touchStartPos = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    });
    
    document.addEventListener('touchend', function(e) {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // If touch duration is less than 200ms and minimal movement, treat as tap
        if (touchDuration < 200) {
            const touchEndPos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY
            };
            
            const distance = Math.sqrt(
                Math.pow(touchEndPos.x - touchStartPos.x, 2) + 
                Math.pow(touchEndPos.y - touchStartPos.y, 2)
            );
            
            if (distance < 10) {
                const target = e.target.closest('.box');
                if (target && target.onclick) {
                    e.preventDefault();
                    target.click();
                }
            }
        }
    });
}

// Zoom functionality
let zoomLevel = 1;
const minZoom = 0.5;
const maxZoom = 2;

function zoomIn() {
    zoomLevel = Math.min(zoomLevel + 0.1, maxZoom);
    applyZoom();
    showToast(`Zoom: ${Math.round(zoomLevel * 100)}%`, 'info');
}

function zoomOut() {
    zoomLevel = Math.max(zoomLevel - 0.1, minZoom);
    applyZoom();
    showToast(`Zoom: ${Math.round(zoomLevel * 100)}%`, 'info');
}

function resetZoom() {
    zoomLevel = 1;
    applyZoom();
    showToast('Zoom direset ke 100%', 'info');
}

function applyZoom() {
    const diagram = document.querySelector('.diagram');
    diagram.style.transform = `scale(${zoomLevel})`;
    diagram.style.transformOrigin = 'center top';
    
    // Adjust container height to prevent overflow
    const container = document.querySelector('.diagram-container');
    const originalHeight = 800; // Base height
    container.style.minHeight = `${originalHeight * zoomLevel}px`;
}

// Add zoom controls
function addZoomControls() {
    const searchContainer = document.querySelector('.search-container');
    
    const zoomControls = document.createElement('div');
    zoomControls.style.cssText = `
        display: inline-block;
        margin-left: 15px;
        background: rgba(255,255,255,0.2);
        border-radius: 25px;
        padding: 5px;
    `;
    
    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '🔍+';
    zoomInBtn.className = 'search-btn';
    zoomInBtn.style.cssText = 'margin: 0 2px; padding: 8px 12px; font-size: 14px;';
    zoomInBtn.onclick = zoomIn;
    zoomInBtn.title = 'Perbesar (Ctrl + Plus)';
    
    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '🔍-';
    zoomOutBtn.className = 'search-btn';
    zoomOutBtn.style.cssText = 'margin: 0 2px; padding: 8px 12px; font-size: 14px;';
    zoomOutBtn.onclick = zoomOut;
    zoomOutBtn.title = 'Perkecil (Ctrl + Minus)';
    
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '↻';
    resetBtn.className = 'search-btn';
    resetBtn.style.cssText = 'margin: 0 2px; padding: 8px 12px; font-size: 14px;';
    resetBtn.onclick = resetZoom;
    resetBtn.title = 'Reset Zoom (Ctrl + 0)';
    
    zoomControls.appendChild(zoomInBtn);
    zoomControls.appendChild(zoomOutBtn);
    zoomControls.appendChild(resetBtn);
    
    searchContainer.appendChild(zoomControls);
}

// Enhanced keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '=':
            case '+':
                e.preventDefault();
                zoomIn();
                break;
            case '-':
                e.preventDefault();
                zoomOut();
                break;
            case '0':
                e.preventDefault();
                resetZoom();
                break;
            case 'h':
                e.preventDefault();
                showHelp();
                break;
        }
    }
    
    // Arrow key navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('box')) {
            e.preventDefault();
            navigateBoxes(e.key, focusedElement);
        }
    }
});

// Box navigation with arrow keys
function navigateBoxes(direction, currentBox) {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const currentIndex = boxes.indexOf(currentBox);
    let nextIndex;
    
    switch(direction) {
        case 'ArrowUp':
            nextIndex = Math.max(0, currentIndex - 1);
            break;
        case 'ArrowDown':
            nextIndex = Math.min(boxes.length - 1, currentIndex + 1);
            break;
        case 'ArrowLeft':
            nextIndex = Math.max(0, currentIndex - 1);
            break;
        case 'ArrowRight':
            nextIndex = Math.min(boxes.length - 1, currentIndex + 1);
            break;
    }
    
    if (nextIndex !== undefined && boxes[nextIndex]) {
        boxes[nextIndex].focus();
        boxes[nextIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Progress indicator
function showProgress(duration = 2000) {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4CAF50, #45a049);
        z-index: 10001;
        transition: width ${duration}ms ease;
    `;
    
    document.body.appendChild(progress);
    
    // Animate progress
    setTimeout(() => {
        progress.style.width = '100%';
    }, 10);
    
    setTimeout(() => {
        if (document.body.contains(progress)) {
            document.body.removeChild(progress);
        }
    }, duration + 100);
}

// Auto-save user preferences
function savePreferences() {
    const preferences = {
        zoomLevel: zoomLevel,
        lastVisited: Date.now()
    };
    localStorage.setItem('fiilMurabPreferences', JSON.stringify(preferences));
}

function loadPreferences() {
    try {
        const saved = localStorage.getItem('fiilMurabPreferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            if (preferences.zoomLevel) {
                zoomLevel = preferences.zoomLevel;
                applyZoom();
            }
        }
    } catch (e) {
        console.log('Could not load preferences');
    }
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('Slow loading detected:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box, index) => {
        box.setAttribute('role', 'button');
        box.setAttribute('aria-label', `Topik ${index + 1}: ${box.textContent.trim()}`);
        box.setAttribute('aria-describedby', 'instructions');
    });
    
    // Add instructions for screen readers
    const instructions = document.createElement('div');
    instructions.id = 'instructions';
    instructions.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    instructions.textContent = 'Gunakan tombol Tab untuk navigasi, Enter untuk membuka detail, dan Escape untuk menutup.';
    document.body.appendChild(instructions);
    
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
        
        const highContrastStyles = document.createElement('style');
        highContrastStyles.textContent = `
            .high-contrast .box {
                border: 3px solid #000 !important;
                background: #fff !important;
                color: #000 !important;
            }
            
            .high-contrast .connector-line {
                background: #000 !important;
            }
        `;
        document.head.appendChild(highContrastStyles);
    }
}

// Service Worker for offline support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Fi\'il Mu\'rab Concept Map...');
    
    // Show loading progress
    showProgress(1500);
    
    // Load user preferences
    loadPreferences();
    
    // Add all enhancements
    addZoomControls();
    addInteractionEffects();
    addTouchSupport();
    improveAccessibility();
    monitorPerformance();
    
    // Save preferences on page unload
    window.addEventListener('beforeunload', savePreferences);
    
    // Welcome sequence
    setTimeout(() => {
        showToast('Peta Konsep Fi\'il Mu\'rab siap digunakan! 🎉', 'success');
        
        // Highlight main topic briefly
        const mainTopic = document.querySelector('.main-topic');
        if (mainTopic) {
            mainTopic.classList.add('glow');
            setTimeout(() => {
                mainTopic.classList.remove('glow');
            }, 3000);
        }
    }, 1600);
    
    // Add helpful tips after a delay
    setTimeout(() => {
        if (!localStorage.getItem('fiilMurabTipsShown')) {
            showToast('💡 Tip: Klik tombol ❓ untuk panduan lengkap', 'info');
            localStorage.setItem('fiilMurabTipsShown', 'true');
        }
    }, 5000);
    
    console.log('✅ Initialization complete!');
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        savePreferences();
    } else {
        // Page is visible again
        console.log('Welcome back to Fi\'il Mu\'rab!');
    }
});

// Handle online/offline status
window.addEventListener('online', function() {
    showToast('Koneksi internet tersambung kembali', 'success');
});

window.addEventListener('offline', function() {
    showToast('Mode offline - fitur terbatas tersedia', 'warning');
});

// Export functionality for advanced users
function exportData() {
    const data = {
        title: 'Peta Konsep Fi\'il Mu\'rab',
        exported: new Date().toISOString(),
        structure: {
            main: 'الأفعال المعربة',
            branches: ['مرفوع', 'منصوب', 'مجزوم'],
            signs: {
                marfoo: ['الضمة', 'ثبوت النون'],
                mansoob: ['الفتحة', 'حذف النون'],
                majzoom: ['السكون', 'حذف النون']
            }
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fiil-murab-concept-map.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Data berhasil diekspor!', 'success');
}

// Add export button (hidden by default, can be shown with Ctrl+E)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        exportData();
    }
});

// Final error boundary
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('Terjadi kesalahan sistem', 'error');
});

// Performance optimization: Lazy load heavy content
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            // Add any heavy content loading here
            element.classList.add('loaded');
            lazyObserver.unobserve(element);
        }
    });
}, observerOptions);

// Observe all boxes for lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        lazyObserver.observe(box);
    });
});

console.log('🎓 Fi\'il Mu\'rab Concept Map - Ready for Learning!');
