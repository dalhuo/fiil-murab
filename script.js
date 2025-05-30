// Global variables
let currentZoom = 1;
let isAnimationStarted = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    startAnimation();
    setupEventListeners();
});

// Start line drawing animation
function startAnimation() {
    if (isAnimationStarted) return;
    isAnimationStarted = true;
    
    setTimeout(() => {
        document.querySelector('.to-definition')?.classList.add('animate');
    }, 1000);
    
    setTimeout(() => {
        document.querySelector('.to-branches')?.classList.add('animate');
    }, 1800);
    
    setTimeout(() => {
        document.querySelector('.main-horizontal')?.classList.add('animate');
    }, 2500);
    
    setTimeout(() => {
        document.querySelectorAll('.vertical-branch').forEach(el => el.classList.add('animate'));
    }, 3200);
    
    setTimeout(() => {
        document.querySelector('.to-signs')?.classList.add('animate');
    }, 3800);
    
    setTimeout(() => {
        document.querySelector('.signs-horizontal')?.classList.add('animate');
    }, 4400);
    
    setTimeout(() => {
        document.querySelectorAll('.sign-branch-left, .sign-branch-center, .sign-branch-right').forEach(el => el.classList.add('animate'));
    }, 5000);
    
    setTimeout(() => {
        document.querySelector('.to-tools')?.classList.add('animate');
    }, 5600);
}

// Setup event listeners
function setupEventListeners() {
    // Copy functionality for examples
    document.addEventListener('click', function(e) {
        if (e.target.closest('.examples-list li')) {
            const text = e.target.closest('li').textContent;
            navigator.clipboard.writeText(text).then(() => {
                showNotification('تم نسخ النص!');
            });
        }
    });
}

// Modal functions
function openModal(modalId) {
    const modalContent = getModalContent(modalId);
    if (modalContent) {
        createModal(modalId, modalContent);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function createModal(modalId, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${modalId}')">&times;</span>
            <h2 class="modal-title">${content.title}</h2>
            ${content.content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modalId);
        }
    });
}

// Modal content data
function getModalContent(modalId) {
    const contents = {
        mainModal: {
            title: "الأفعال المعربة (Fi'il Mu'rab)",
            content: `
                <div class="modal-section">
                    <h3>Pengertian Fi'il Mu'rab</h3>
                    <div class="arabic-text">
                        المعرب من الأفعال هو الفعل المضارع الذى لم يتصل بنون النسوة أو نون التوكيد المباشرة
                    </div>
                    <p><strong>Fi'il Mu'rab</strong> adalah <strong>Fi'il Mudhari' (kata kerja masa kini/akan datang)</strong> yang tidak bersambung dengan:</p>
                    <ul>
                        <li><strong>نون النسوة</strong> (Nun Niswah) - seperti: يكتبن، يقرأن</li>
                        <li><strong>نون التوكيد المباشرة</strong> (Nun Ta'kid Langsung) - seperti: ليكتبن، ليقرأن</li>
                    </ul>
                    
                    <div class="highlight">
                        <h4>Pembagian Fi'il Mu'rab:</h4>
                        <p>Fi'il Mudhari' Mu'rab terbagi menjadi <strong>3 keadaan i'rab</strong>:</p>
                        <ol>
                            <li><strong>مرفوع</strong> (Marfu') - Keadaan asli/normal</li>
                            <li><strong>منصوب</strong> (Manshub) - Karena didahului huruf nashb</li>
                            <li><strong>مجزوم</strong> (Majzum) - Karena didahului adat jazm</li>
                        </ol>
                    </div>

                    <h3>Contoh Dasar</h3>
                    <div class="examples-list">
                        <h4>✅ Yang Termasuk Mu'rab:</h4>
                        <ul>
                            <li>أكتبُ - Aku menulis (marfu')</li>
                            <li>لن أكتبَ - Aku tidak akan menulis (manshub)</li>
                            <li>لم أكتبْ - Aku tidak menulis (majzum)</li>
                        </ul>
                    </div>
                </div>
            `
        },

        definitionModal: {
            title: "تعريف الفعل المضارع المعرب",
            content: `
                <div class="modal-section">
                    <h3>Syarat Fi'il Mudhari' Mu'rab</h3>
                    <p>Fi'il Mudhari' dapat di-i'rab (berubah harakat akhir) jika memenuhi syarat:</p>
                    
                    <div class="highlight">
                        <h4>✅ Yang Termasuk Mu'rab:</h4>
                        <ul>
                            <li><strong>أكتب</strong> - Aku menulis</li>
                            <li><strong>تكتب</strong> - Kamu menulis</li>
                            <li><strong>يكتب</strong> - Dia menulis</li>
                            <li><strong>نكتب</strong> - Kami menulis</li>
                            <li><strong>يكتبان</strong> - Mereka berdua menulis</li>
                            <li><strong>تكتبون</strong> - Kalian menulis</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>❌ Yang TIDAK Mu'rab (Mabni):</h4>
                        <ul>
                            <li><strong>يكتبن</strong> - Mereka (perempuan) menulis → Bersambung Nun Niswah</li>
                            <li><strong>ليكتبن</strong> - Sungguh dia akan menulis → Bersambung Nun Ta'kid</li>
                            <li><strong>اكتب</strong> - Tulislah! → Fi'il Amr (bukan mudhari')</li>
                            <li><strong>كتب</strong> - Dia telah menulis → Fi'il Madhi (bukan mudhari')</li>
                        </ul>
                    </div>

                    <h3>Ciri-ciri Fi'il Mudhari'</h3>
                    <p>Fi'il Mudhari' selalu dimulai dengan salah satu dari 4 huruf mudhari'ah:</p>
                    <ul>
                        <li><strong>أ</strong> (Alif) - untuk orang pertama tunggal</li>
                        <li><strong>ن</strong> (Nun) - untuk orang pertama jamak</li>
                        <li><strong>ت</strong> (Ta') - untuk orang kedua</li>
                        <li><strong>ي</strong> (Ya') - untuk orang ketiga</li>
                    </ul>
                </div>
            `
        },

        marfooModal: {
            title: "رفع الفعل المضارع (Rafa' Fi'il Mudhari')",
            content: `
                <div class="modal-section">
                    <h3>Kapan Fi'il Mudhari' Marfu'?</h3>
                    <div class="arabic-text">
                        يكون الفعل المضارع مرفوعا إذا لم يسبقه حرف نصب أو حرف جزم
                    </div>
                    <p><strong>Fi'il Mudhari' menjadi marfu' jika tidak didahului huruf nashb atau huruf jazm</strong></p>
                    <p>Artinya: <strong>Fi'il Mudhari' dalam keadaan asli/normal adalah MARFU'</strong></p>

                    <h3>Tanda-tanda Rafa' Fi'il Mudhari'</h3>
                    
                    <h4>1. الضمة (Dhammah) - Tanda Asli</h4>
                    <div class="examples-list">
                        <h4>Contoh dengan Dhammah:</h4>
                        <ul>
                            <li>أنا أكتبُ - Aku menulis</li>
                            <li>نحن نكتبُ - Kami menulis</li>
                            <li>أنت تكتبُ - Kamu menulis</li>
                            <li>هو يكتبُ - Dia menulis</li>
                            <li>هي تكتبُ - Dia (perempuan) menulis</li>
                        </ul>
                    </div>
                    
                    <h4>2. ثبوت النون (Tetapnya Nun) - للأفعال الخمسة</h4>
                    <p>Untuk <strong>Al-Af'al Al-Khamsah</strong> (5 bentuk fi'il), tanda rafa' adalah <strong>tetapnya nun</strong></p>
                    
                    <div class="examples-list">
                        <h4>Contoh Al-Af'al Al-Khamsah Marfu':</h4>
                        <ul>
                            <li>أنتما تكتبان - Kalian berdua menulis</li>
                            <li>هما يكتبان - Mereka berdua menulis</li>
                            <li>أنتم تكتبون - Kalian menulis</li>
                            <li>هم يكتبون - Mereka menulis</li>
                            <li>أنتِ تكتبين - Kamu (perempuan) menulis</li>
                        </ul>
                    </div>

                    <h3>Fi'il Mu'tal Akhir (Berakhiran Huruf Illat)</h3>
                    <p>Jika fi'il berakhiran huruf illat (ا، و، ي), maka rafa'nya dengan <strong>dhammah muqaddarah</strong>:</p>
                    <ul>
                        <li><strong>يسعى</strong> - mرفوع بضمة مقدرة على الألف</li>
                        <li><strong>يسمو</strong> - مرفوع بضمة مقدرة على الواو</li>
                        <li><strong>يرمي</strong> - مرفوع بضمة مقدرة على الياء</li>
                    </ul>
                </div>
            `
        },

        mansoobModal: {
            title: "نصب الفعل المضارع (Nashb Fi'il Mudhari')",
            content: `
                <div class="modal-section">
                    <h3>Kapan Fi'il Mudhari' Manshub?</h3>
                    <div class="arabic-text">
                        ينصب الفعل المضارع إذا سبقه أحد حروف النصب
                    </div>
                    <p><strong>Fi'il Mudhari' menjadi manshub jika didahului salah satu huruf nashb</strong></p>

                    <h3>Tanda-tanda Nashb Fi'il Mudhari'</h3>
                    
                    <h4>1. الفتحة (Fathah) - Tanda Asli</h4>
                    <div class="examples-list">
                        <h4>Contoh dengan Fathah:</h4>
                        <ul>
                            <li>لن أكتبَ - Aku tidak akan menulis</li>
                            <li>لن تكتبَ - Kamu tidak akan menulis</li>
                            <li>لن نكتبَ - Kami tidak akan menulis</li>
                            <li>لن يكتبَ - Dia tidak akan menulis</li>
                        </ul>
                    </div>
                    
                    <h4>2. حذف النون (Hapusnya Nun) - للأفعال الخمسة</h4>
                    <p>Untuk <strong>Al-Af'al Al-Khamsah</strong>, tanda nashb adalah <strong>hapusnya nun</strong></p>
                    
                    <div class="examples-list">
                        <h4>Contoh Al-Af'al Al-Khamsah Manshub:</h4>
                        <ul>
                            <li>لن تكتبا - Kalian berdua tidak akan menulis (nun dihapus)</li>
                            <li>لن يكتبا - Mereka berdua tidak akan menulis (nun dihapus)</li>
                            <li>لن تكتبوا - Kalian tidak akan menulis (nun dihapus)</li>
                            <li>لن يكتبوا - Mereka tidak akan menulis (nun dihapus)</li>
                            <li>لن تكتبي - Kamu (perempuan) tidak akan menulis (nun dihapus)</li>
                        </ul>
                    </div>

                    <h3>حروف النصب الثمانية (8 Huruf Nashb)</h3>
                    <ol>
                        <li><strong>أن</strong> (المصدرية) - يسرني أن تتقدمَ</li>
                        <li><strong>لن</strong> (للنفي في المستقبل) - لن يضيعَ الحق</li>
                        <li><strong>كي</strong> (للتعليل) - ادرسا كي تنجحا</li>
                        <li><strong>إذن</strong> (في جواب كلام) - إذن أكرمَك</li>
                        <li><strong>لام التعليل</strong> - اعملوا لتعيشوا</li>
                        <li><strong>لام الجحود</strong> - لم أكن لألهوَ</li>
                        <li><strong>فاء السببية</strong> - كونوا يداً فتفوزوا</li>
                        <li><strong>حتى</strong> (للغاية) - جاهد حتى تصلَ</li>
                    </ol>

                    <h3>Fi'il Mu'tal Akhir Manshub</h3>
                    <ul>
                        <li><strong>معتل بالألف:</strong> بفتحة مقدرة - لن يرضى، لن يتبارى</li>
                        <li><strong>معتل بالواو:</strong> بفتحة ظاهرة - لن يشكوَ، لن يعلوَ</li>
                        <li><strong>معتل بالياء:</strong> بفتحة ظاهرة - لن يرميَ، لن يبنيَ</li>
                    </ul>
                </div>
            `
        },

        majzoomModal: {
            title: "جزم الفعل المضارع (Jazm Fi'il Mudhari')",
            content: `
                <div class="modal-section">
                    <h3>Kapan Fi'il Mudhari' Majzum?</h3>
                    <div class="arabic-text">
                        يجزم الفعل المضارع إذا سبقه أداة من أدوات الجزم
                    </div>
                    <p><strong>Fi'il Mudhari' menjadi majzum jika didahului salah satu adat jazm</strong></p>

                    <h3>Tanda-tanda Jazm Fi'il Mudhari'</h3>
                    
                    <h4>1. السكون (Sukun) - Tanda Asli</h4>
                    <div class="examples-list">
                        <h4>Contoh dengan Sukun:</h4>
                        <ul>
                            <li>لم أكتبْ - Aku tidak menulis</li>
                            <li>لم تكتبْ - Kamu tidak menulis</li>
                            <li>لم نكتبْ - Kami tidak menulis</li>
                            <li>لم يكتبْ - Dia tidak menulis</li>
                        </ul>
                    </div>
                    
                    <h4>2. حذف النون (Hapusnya Nun) - للأفعال الخمسة</h4>
                    <div class="examples-list">
                        <h4>Contoh Al-Af'al Al-Khamsah Majzum:</h4>
                        <ul>
                            <li>لم تكتبا - Kalian berdua tidak menulis (nun dihapus)</li>
                            <li>لم يكتبا - Mereka berdua tidak menulis (nun dihapus)</li>
                            <li>لم تكتبوا - Kalian tidak menulis (nun dihapus)</li>
                            <li>لم يكتبوا - Mereka tidak menulis (nun dihapus)</li>
                            <li>لم تكتبي - Kamu (perempuan) tidak menulis (nun dihapus)</li>
                        </ul>
                    </div>

                    <h4>3. حذف حرف العلة (Hapusnya Huruf Illat) - للفعل المعتل الآخر</h4>
                    <div class="examples-list">
                        <h4>Contoh Fi'il Mu'tal Akhir Majzum:</h4>
                        <ul>
                            <li>لم يرضَ - Dia tidak ridha (ألف dihapus)</li>
                            <li>لم يشكُ - Dia tidak mengeluh (واو dihapus)</li>
                            <li>لم يرمِ - Dia tidak melempar (ياء dihapus)</li>
                        </ul>
                    </div>

                    <h3>أدوات الجزم قسمان (2 Jenis Adat Jazm)</h3>
                    
                    <h4>القسم الأول: ما يجزم فعلاً واحداً</h4>
                    <ol>
                        <li><strong>لم</strong> - نفي في الماضي - لم يحضرْ محمد</li>
                        <li><strong>لما</strong> - نفي مستمر - ولما تدرسوا</li>
                        <li><strong>لام الأمر</strong> - للطلب - لينفقْ صاحب الغنى</li>
                        <li><strong>لا الناهية</strong> - للنهي - لا تنسَ المعروف</li>
                    </ol>
                    
                    <h4>القسم الثاني: ما يجزم فعلين (أدوات الشرط)</h4>
                    <p>إن - مَن - ما - مهما - متى - أيان - أين - أينما - أنى - حيثما - كيفما - أي</p>

                                        <h3>جزم المضارع في جواب الطلب</h3>
                    <p>قد يُجزم المضارع إذا وقع جواباً لأمر أو نهي:</p>
                    <div class="examples-list">
                        <h4>أمثلة:</h4>
                        <ul>
                            <li>احترم الناس يحترموك - Hormatilah orang, mereka akan menghormatimu</li>
                            <li>لا تكذب تُحترم - Jangan berbohong, kamu akan dihormati</li>
                        </ul>
                    </div>
                </div>
            `
        },

        nasbToolsModal: {
            title: "حروف النصب الثمانية (8 Huruf Nashb)",
            content: `
                <div class="modal-section">
                    <div class="arabic-text">
                        حروف النصب هي: أن - لن - كي - إذن - لام التعليل - لام الجحود - فاء السببية - حتى
                    </div>
                    
                    <h3>Penjelasan Detail Setiap Huruf Nashb</h3>
                    
                    <ol>
                        <li>
                            <h4>أن (المصدرية) - An Masdariyyah</h4>
                            <p><strong>Fungsi:</strong> Dapat ditakwil dengan fi'il menjadi masdar</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>يسرني أن تتقدمَ - Aku senang kamu maju (= kemajuanmu)</li>
                                    <li>أريد أن أسافرَ - Aku ingin bepergian (= perjalananku)</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لن - Lan (Tidak akan)</h4>
                            <p><strong>Fungsi:</strong> Menafikan fi'il di masa depan</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>لن يضيعَ الحق المغتصب - Hak yang dirampas tidak akan hilang</li>
                                    <li>لن نستسلمَ للظلم - Kami tidak akan menyerah pada kezaliman</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>كي - Kay (Supaya/Agar)</h4>
                            <p><strong>Fungsi:</strong> Menunjukkan sebab/tujuan</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>ادرسا كي تنجحا - Belajarlah supaya kalian sukses</li>
                                    <li>اعمل كي تعيشَ كريماً - Bekerjalah agar hidup mulia</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>إذن - Idzan (Kalau begitu)</h4>
                            <p><strong>Fungsi:</strong> Menjawab perkataan sebelumnya</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>إذن أكرمَك - Kalau begitu aku akan menghormatimu</li>
                                    <li>إذن أساعدَك - Kalau begitu aku akan membantumu</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لام التعليل - Lam Ta'lil (Lam Sebab)</h4>
                            <p><strong>Fungsi:</strong> Sama dengan "كي" menunjukkan sebab</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>اعملوا لتعيشوا سعداء - Bekerjalah agar kalian hidup bahagia</li>
                                    <li>ادرس لتنجحَ - Belajarlah agar sukses</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لام الجحود - Lam Juhud (Lam Penyangkalan)</h4>
                            <p><strong>Syarat:</strong> Harus didahului "كان" yang dinafikan</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>لم أكن لألهوَ والأمر جد - Aku tidak akan bermain-main sementara urusan serius</li>
                                    <li>ما كان الله ليعذبَهم - Allah tidak akan menyiksa mereka</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>فاء السببية - Fa' Sababiyyah (Fa' Sebab)</h4>
                            <p><strong>Syarat:</strong> Didahului nafi atau thalab (perintah/larangan/pertanyaan)</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>كونوا يداً واحدة فتفوزوا - Bersatulah, maka kalian akan menang</li>
                                    <li>لا تكسل فتندمَ - Jangan malas, nanti kamu menyesal</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>حتى - Hatta (Hingga/Sampai)</h4>
                            <p><strong>Fungsi:</strong> Menunjukkan batas akhir/tujuan</p>
                            <div class="examples-list">
                                <h4>Contoh:</h4>
                                <ul>
                                    <li>جاهد حتى تصلَ إلى ما تصبو إليه - Berjuanglah hingga mencapai cita-cita</li>
                                    <li>اصبر حتى يأتيَ الفرج - Sabarlah hingga datang pertolongan</li>
                                </ul>
                            </div>
                        </li>
                    </ol>

                    <h3>ملاحظات مهمة (Catatan Penting)</h3>
                    
                    <div class="highlight">
                        <h4>1. أن + لا = ألا</h4>
                        <p>قد تدغم (أن) بلا النافية ويستمر عملها كحرف نصب</p>
                        <div class="examples-list">
                            <h4>مثال:</h4>
                            <ul>
                                <li>طلبت منه ألا يغادرَ هذا المكان - Aku meminta dia agar tidak meninggalkan tempat ini</li>
                            </ul>
                        </div>
                    </div>

                    <div class="highlight">
                        <h4>2. الفعل المعتل الآخر المنصوب</h4>
                        <ul>
                            <li><strong>معتل بالألف:</strong> بفتحة مقدرة - لن يرضى، لن يسعى</li>
                            <li><strong>معتل بالواو:</strong> بفتحة ظاهرة - لن يشكوَ، لن يعلوَ</li>
                            <li><strong>معتل بالياء:</strong> بفتحة ظاهرة - لن يرميَ، لن يبنيَ</li>
                        </ul>
                    </div>
                </div>
            `
        },

        jazmToolsModal: {
            title: "أدوات الجزم قسمان (2 Jenis Adat Jazm)",
            content: `
                <div class="modal-section">
                    <div class="arabic-text">
                        أدوات جزم الفعل المضارع قسمان: قسم يجزم فعلا واحدا - قسم يجزم فعلين
                    </div>
                    
                    <h3>القسم الأول: ما يجزم فعلاً واحداً</h3>
                    <p>Semua adat ini adalah <strong>حروف الجزم</strong> (huruf jazm)</p>
                    
                    <ol>
                        <li>
                            <h4>لم - Lam (Tidak/Belum)</h4>
                            <p><strong>Fungsi:</strong> Menafikan fi'il mudhari' di masa lampau</p>
                            <div class="examples-list">
                                <h4>أمثلة:</h4>
                                <ul>
                                    <li>لم يحضرْ محمد - Muhammad tidak hadir</li>
                                    <li>لم أفهمْ الدرس - Aku tidak memahami pelajaran</li>
                                    <li>لم تكتبْ الواجب - Kamu tidak menulis PR</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لما - Lamma (Belum)</h4>
                            <p><strong>Fungsi:</strong> Menafikan fi'il mudhari' dari masa lampau hingga sekarang</p>
                            <div class="examples-list">
                                <h4>أمثلة:</h4>
                                <ul>
                                    <li>جاء موعد الامتحان ولما تدرسوا - Waktu ujian tiba tapi kalian belum belajar</li>
                                    <li>لما يصلْ القطار - Kereta belum tiba</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لام الأمر - Lam Amr (Lam Perintah)</h4>
                            <p><strong>Fungsi:</strong> Menyatakan perintah</p>
                            <div class="examples-list">
                                <h4>أمثلة:</h4>
                                <ul>
                                    <li>لينفقْ صاحب الغنى من غناه - Hendaklah orang kaya berinfak dari kekayaannya</li>
                                    <li>ليقمْ كل واحد بواجبه - Hendaklah setiap orang melakukan kewajibannya</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>لا الناهية - La Nahiyah (La Larangan)</h4>
                            <p><strong>Fungsi:</strong> Menyatakan larangan</p>
                            <div class="examples-list">
                                <h4>أمثلة:</h4>
                                <ul>
                                    <li>لا تنسَ المعروف - Jangan lupakan kebaikan</li>
                                    <li>لا تكذبْ - Jangan berbohong</li>
                                    <li>لا تؤذِ الناس - Jangan menyakiti orang</li>
                                </ul>
                            </div>
                        </li>
                    </ol>

                    <h3>القسم الثاني: ما يجزم فعلين (أدوات الشرط)</h3>
                    <p>Adat-adat ini men-jazm <strong>2 fi'il</strong>: fi'il syarat dan jawab syarat</p>
                    
                    <div class="highlight">
                        <h4>أدوات الشرط الجازمة:</h4>
                        <p>إن - مَن - ما - مهما - متى - أيان - أين - أينما - أنى - حيثما - كيفما - أي</p>
                    </div>

                    <h4>تفصيل أدوات الشرط:</h4>
                    
                    <ol>
                        <li>
                            <h4>إن - In (Jika)</h4>
                            <p>Adat syarat yang paling umum</p>
                            <div class="examples-list">
                                <ul>
                                    <li>إن تدرسْ تنجحْ - Jika kamu belajar, kamu akan sukses</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>مَن - Man (Siapa/Barangsiapa)</h4>
                            <p>Untuk orang yang berakal (عاقل)</p>
                            <div class="examples-list">
                                <ul>
                                    <li>من يقرأْ كتاباً يزددْ علماً - Barangsiapa membaca buku, bertambah ilmunya</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>ما - Ma (Apa/Apapun)</h4>
                            <p>Untuk selain yang berakal (غير عاقل)</p>
                            <div class="examples-list">
                                <ul>
                                    <li>ما تفعلْ من خير تجدْه - Apa yang kamu perbuat dari kebaikan, kamu akan mendapatkannya</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>مهما - Mahma (Apapun/Bagaimanapun)</h4>
                            <p>Sama seperti "ما" tapi lebih umum</p>
                            <div class="examples-list">
                                <ul>
                                    <li>مهما تصبرْ تُؤجرْ - Apapun kesabaranmu, kamu akan diberi pahala</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>متى وأيان - Mata & Ayyan (Kapan)</h4>
                            <p>Untuk waktu (ظرف زمان)</p>
                            <div class="examples-list">
                                <ul>
                                    <li>متى يأتِ الصيف يسافرْ الناس - Kapan musim panas datang, orang-orang bepergian</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>أين وأينما وأنى وحيثما - Ayna, Aynama, Anna, Haysuma (Di mana)</h4>
                            <p>Untuk tempat (ظرف مكان)</p>
                            <div class="examples-list">
                                <ul>
                                    <li>أينما يسدْ الأمن تعمَّ الطمأنينة - Di manapun keamanan terjaga, ketenangan merata</li>
                                    <li>حيثما يجرِ النيل تخصبْ الأرض - Di manapun Sungai Nil mengalir, tanah menjadi subur</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>كيفما - Kayfama (Bagaimanapun)</h4>
                            <p>Untuk keadaan (حال)</p>
                            <div class="examples-list">
                                <ul>
                                    <li>كيفما تعاملْ الناس يعاملوك - Bagaimanapun kamu memperlakukan orang, mereka akan memperlakukanmu</li>
                                </ul>
                            </div>
                        </li>
                        
                        <li>
                            <h4>أي - Ayy (Yang mana/Apapun)</h4>
                            <p>Bisa untuk semua makna sesuai yang ditambahkan padanya</p>
                            <div class="examples-list">
                                <ul>
                                    <li>أي امرأة تخلصْ في عملها تخدمْ بلادها - Wanita manapun yang ikhlas dalam pekerjaannya, dia mengabdi pada negaranya</li>
                                </ul>
                            </div>
                        </li>
                    </ol>

                    <h3>ملاحظات مهمة</h3>
                    
                    <div class="highlight">
                        <h4>1. حذف فعل الشرط</h4>
                        <p>يجوز حذف فعل الشرط بعد إن المدغمة في لا النافية (إلا)</p>
                        <div class="examples-list">
                            <ul>
                                <li>عامل الناس بالحسنى وإلا يكرهوك - Perlakukan orang dengan baik, kalau tidak mereka akan membencimu</li>
                            </ul>
                        </div>
                    </div>

                    <div class="highlight">
                        <h4>2. جزم المضارع في جواب الطلب</h4>
                        <p>قد يجزم المضارع إذا وقع جواباً لأمر أو لنهى</p>
                        <div class="examples-list">
                            <ul>
                                <li>احترم الناس يحترموك - Hormatilah orang, mereka akan menghormatimu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },

        af3alKhamsaModal: {
            title: "الأفعال الخمسة (Al-Af'al Al-Khamsah)",
            content: `
                <div class="modal-section">
                    <h3>تعريف الأفعال الخمسة</h3>
                    <div class="arabic-text">
                        الأفعال الخمسة هي: كل مضارع اتصلت به ألف الاثنين أو واو الجماعة أو ياء المخاطبة
                    </div>
                    <p><strong>Al-Af'al Al-Khamsah</strong> adalah setiap fi'il mudhari' yang bersambung dengan:</p>
                    <ul>
                        <li><strong>ألف الاثنين</strong> (Alif Mutsanna) - untuk dua orang</li>
                        <li><strong>واو الجماعة</strong> (Waw Jama'ah) - untuk jamak laki-laki</li>
                        <li><strong>ياء المخاطبة</strong> (Ya' Mukhathabah) - untuk perempuan yang diajak bicara</li>
                    </ul>

                    <h3>الأوزان الخمسة (5 Bentuk)</h3>
                    
                    <div class="highlight">
                        <h4>الصيغ الخمس:</h4>
                        <ol>
                            <li><strong>يفعلان</strong> - Mereka berdua (laki-laki) melakukan</li>
                            <li><strong>تفعلان</strong> - Kalian berdua melakukan</li>
                            <li><strong>يفعلون</strong> - Mereka (laki-laki) melakukan</li>
                            <li><strong>تفعلون</strong> - Kalian (laki-laki) melakukan</li>
                            <li><strong>تفعلين</strong> - Kamu (perempuan) melakukan</li>
                        </ol>
                    </div>

                    <h3>أمثلة تطبيقية مع "كتب"</h3>
                    
                    <div class="examples-list">
                        <h4>في حالة الرفع (ثبوت النون):</h4>
                        <ul>
                            <li><strong>هما يكتبان</strong> - Mereka berdua menulis</li>
                            <li><strong>أنتما تكتبان</strong> - Kalian berdua menulis</li>
                            <li><strong>هم يكتبون</strong> - Mereka menulis</li>
                            <li><strong>أنتم تكتبون</strong> - Kalian menulis</li>
                            <li><strong>أنتِ تكتبين</strong> - Kamu (perempuan) menulis</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>في حالة النصب (حذف النون):</h4>
                        <ul>
                            <li><strong>لن يكتبا</strong> - Mereka berdua tidak akan menulis</li>
                            <li><strong>لن تكتبا</strong> - Kalian berdua tidak akan menulis</li>
                            <li><strong>لن يكتبوا</strong> - Mereka tidak akan menulis</li>
                            <li><strong>لن تكتبوا</strong> - Kalian tidak akan menulis</li>
                            <li><strong>لن تكتبي</strong> - Kamu (perempuan) tidak akan menulis</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>في حالة الجزم (حذف النون):</h4>
                        <ul>
                            <li><strong>لم يكتبا</strong> - Mereka berdua tidak menulis</li>
                            <li><strong>لم تكتبا</strong> - Kalian berdua tidak menulis</li>
                            <li><strong>لم يكتبوا</strong> - Mereka tidak menulis</li>
                            <li><strong>لم تكتبوا</strong> - Kalian tidak menulis</li>
                            <li><strong>لم تكتبي</strong> - Kamu (perempuan) tidak menulis</li>
                        </ul>
                    </div>

                    <h3>علامات الإعراب للأفعال الخمسة</h3>
                    
                    <div class="highlight">
                        <h4>قاعدة مهمة:</h4>
                        <ul>
                            <li><strong>الرفع:</strong> ثبوت النون (النون موجودة)</li>
                            <li><strong>النصب:</strong> حذف النون (النون محذوفة)</li>
                            <li><strong>الجزم:</strong> حذف النون (النون محذوفة)</li>
                        </ul>
                    </div>

                    <h3>أمثلة من القرآن الكريم</h3>
                    
                    <div class="examples-list">
                        <h4>آيات قرآنية:</h4>
                        <ul>
                            <li><strong>يُؤْمِنُونَ بِالْغَيْبِ</strong> - Mereka beriman kepada yang gaib (مرفوع)</li>
                            <li><strong>لَن تَنَالُوا الْبِرَّ</strong> - Kalian tidak akan mencapai kebajikan (منصوب)</li>
                            <li><strong>لَمْ يَلِدْ وَلَمْ يُولَدْ</strong> - Dia tidak beranak dan tidak diperanakkan (مجزوم)</li>
                        </ul>
                    </div>

                    <h3>تدريبات تطبيقية</h3>
                    
                    <div class="examples-list">
                        <h4>حدد علامة الإعراب:</h4>
                        <ul>
                            <li>الطلاب يدرسون بجد (ثبوت النون - مرفوع)</li>
                            <li>لن تنجحوا بدون اجتهاد (حذف النون - منصوب)</li>
                            <li>لم يحضروا الاجتماع (حذف النون - مجزوم)</li>
                            <li>أنتما تعملان بإخلاص (ثبوت النون - مرفوع)</li>
                        </ul>
                    </div>
                </div>
            `
        },

        mu3talAkhirModal: {
            title: "الفعل المعتل الآخر (Fi'il Mu'tal Akhir)",
            content: `
                <div class="modal-section">
                    <h3>تعريف الفعل المعتل الآخر</h3>
                    <p><strong>الفعل المعتل الآخر</strong> هو الفعل الذي ينتهي بأحد حروف العلة الثلاثة:</p>
                    <ul>
                        <li><strong>الألف (ا)</strong> - مثل: يسعى، يرضى</li>
                        <li><strong>الواو (و)</strong> - مثل: يدعو، يسمو</li>
                        <li><strong>الياء (ي)</strong> - مثل: يرمي، يبني</li>
                    </ul>

                    <h3>إعراب الفعل المعتل الآخر</h3>

                    <h4>1. في حالة الرفع</h4>
                    <p>جميع الأفعال المعتلة الآخر تُرفع بـ <strong>ضمة مقدرة</strong></p>
                    
                    <div class="examples-list">
                        <h4>أمثلة الرفع:</h4>
                        <ul>
                            <li><strong>يسعى</strong> - مرفوع بضمة مقدرة على الألف</li>
                            <li><strong>يسمو</strong> - مرفوع بضمة مقدرة على الواو</li>
                            <li><strong>يرمي</strong> - مرفوع بضمة مقدرة على الياء</li>
                        </ul>
                    </div>

                    <h4>2. في حالة النصب</h4>
                    
                    <div class="highlight">
                        <h4>قواعد النصب:</h4>
                        <ul>
                            <li><strong>المعتل بالألف:</strong> بفتحة مقدرة</li>
                            <li><strong>المعتل بالواو:</strong> بفتحة ظاهرة</li>
                            <li><strong>المعتل بالياء:</strong> بفتحة ظاهرة</li>
                        </ul>
                    </div>
                    
                    <div class="examples-list">
                        <h4>أمثلة النصب:</h4>
                        <ul>
                            <li><strong>لن يرضى</strong> - منصوب بفتحة مقدرة على الألف</li>
                            <li><strong>لن يتبارى</strong> - منصوب بفتحة مقدرة على الألف</li>
                            <li><strong>لن يشكوَ</strong> - منصوب بفتحة ظاهرة على الواو</li>
                            <li><strong>لن يعلوَ</strong> - منصوب بفتحة ظاهرة على الواو</li>
                            <li><strong>لن يرميَ</strong> - منصوب بفتحة ظاهرة على الياء</li>
                            <li><strong>لن يبنيَ</strong> - منصوب بفتحة ظاهرة على الياء</li>
                        </ul>
                    </div>

                    <h4>3. في حالة الجزم</h4>
                    <p>جميع الأفعال المعتلة الآخر تُجزم بـ <strong>حذف حرف العلة</strong></p>
                    
                    <div class="examples-list">
                        <h4>أمثلة الجزم:</h4>
                        <ul>
                            <li><strong>لم يرضَ</strong> - مجزوم بحذف الألف (أصلها: يرضى)</li>
                            <li><strong>لم يسعَ</strong> - مجزوم بحذف الألف (أصلها: يسعى)</li>
                            <li><strong>لم يشكُ</strong> - مجزوم بحذف الواو (أصلها: يشكو)</li>
                            <li><strong>لم يعلُ</strong> - مجزوم بحذف الواو (أصلها: يعلو)</li>
                            <li><strong>لم يرمِ</strong> - مجزوم بحذف الياء (أصلها: يرمي)</li>
                            <li><strong>لم يبنِ</strong> - مجزوم بحذف الياء (أصلها: يبني)</li>
                        </ul>
                    </div>

                    <h3>ملاحظة خاصة</h3>
                    
                    <div class="highlight">
                        <h4>الفعل الصحيح المعتل ما قبل الآخر</h4>
                        <p>إذا كان الفعل صحيح الآخر ومعتل ما قبل الآخر فإنه يجزم بالسكون، لكن يحذف منه حرف العلة منعاً لالتقاء الساكنين</p>
                        
                        <div class="examples-list">
                            <h4>أمثلة:</h4>
                            <ul>
                                <li><strong>لم يكن</strong> - أصلها: يكون (حُذفت الواو)</li>
                                <li><strong>لم يكد</strong> - أصلها: يكاد (حُذفت الألف)</li>
                                <li><strong>لم يستطع</strong> - أصلها: يستطيع (حُذفت الياء)</li>
                            </ul>
                        </div>
                    </div>

                    <h3>تدريبات تطبيقية</h3>
                    
                    <div class="examples-list">
                        <h4>أعرب الأفعال التالية:</h4>
                        <ul>
                            <li>المؤمن يدعو ربه - (مرفوع بضمة مقدرة)</li>
                            <li>لن أنسى فضلك - (منصوب بفتحة مقدرة)</li>
                            <li>لم يبقَ من الوقت شيء - (مجزوم بحذف الألف)</li>
                            <li>الطائر يطير في السماء - (مرفوع بضمة مقدرة)</li>
                        </ul>
                    </div>

                    <h3>أمثلة من القرآن الكريم</h3>
                    
                    <div class="examples-list">
                        <h4>آيات قرآنية:</h4>
                        <ul>
                            <li><strong>وَاللَّهُ يَدْعُو إِلَىٰ دَارِ السَّلَامِ</strong> - يدعو: مرفوع بضمة مقدرة</li>
                            <li><strong>لَن نَّدْعُوَ مِن دُونِهِ إِلَٰهًا</strong> - ندعو: منصوب بفتحة مقدرة</li>
                            <li><strong>لَمْ يَلِدْ وَلَمْ يُولَدْ</strong> - يلد: مجزوم بحذف حرف العلة</li>
                        </ul>
                    </div>
                </div>
            `
        },

        examplesModal: {
            title: "أمثلة تطبيقية شاملة",
            content: `
                <div class="modal-section">
                    <h3>أمثلة شاملة للأفعال المعربة</h3>
                    
                    <h4>1. أمثلة الرفع</h4>
                    
                    <div class="examples-list">
                        <h4>الأفعال العادية (بالضمة):</h4>
                        <ul>
                            <li>الطالب <strong>يدرسُ</strong> بجد - مرفوع بالضمة</li>
                            <li>المعلم <strong>يشرحُ</strong> الدرس - مرفوع بالضمة</li>
                            <li>الطلاب <strong>يفهمونَ</strong> الشرح - مرفوع بثبوت النون</li>
                            <li>الطالبان <strong>يكتبانِ</strong> الواجب - مرفوع بثبوت النون</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>الأفعال المعتلة الآخر (بضمة مقدرة):</h4>
                        <ul>
                            <li>المؤمن <strong>يدعو</strong> ربه - مرفوع بضمة مقدرة على الواو</li>
                            <li>الطفل <strong>يبكي</strong> من الألم - مرفوع بضمة مقدرة على الياء</li>
                            <li>الإنسان <strong>يسعى</strong> للخير - مرفوع بضمة مقدرة على الألف</li>
                        </ul>
                    </div>

                    <h4>2. أمثلة النصب</h4>
                    
                    <div class="examples-list">
                        <h4>مع حروف النصب المختلفة:</h4>
                        <ul>
                            <li><strong>أن:</strong> يسرني أن <strong>تنجحَ</strong> - منصوب بالفتحة</li>
                            <li><strong>لن:</strong> لن <strong>أتأخرَ</strong> عن الموعد - منصوب بالفتحة</li>
                            <li><strong>كي:</strong> ادرس كي <strong>تفهمَ</strong> - منصوب بالفتحة</li>
                            <li><strong>حتى:</strong> سأعمل حتى <strong>أنجحَ</strong> - منصوب بالفتحة</li>
                            <li><strong>فاء السببية:</strong> لا تهمل فـ<strong>تندمَ</strong> - منصوب بالفتحة</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>الأفعال الخمسة المنصوبة:</h4>
                        <ul>
                            <li>لن <strong>تنجحوا</strong> بدون اجتهاد - منصوب بحذف النون</li>
                            <li>لن <strong>تكتبا</strong> الامتحان غداً - منصوب بحذف النون</li>
                            <li>لن <strong>تفهمي</strong> بدون تركيز - منصوب بحذف النون</li>
                        </ul>
                    </div>

                    <h4>3. أمثلة الجزم</h4>
                    
                    <div class="examples-list">
                        <h4>مع أدوات الجزم التي تجزم فعلاً واحداً:</h4>
                        <ul>
                            <li><strong>لم:</strong> لم <strong>يحضرْ</strong> الطالب - مجزوم بالسكون</li>
                            <li><strong>لما:</strong> لما <strong>ينتهِ</strong> من عمله - مجزوم بحذف حرف العلة</li>
                            <li><strong>لام الأمر:</strong> <strong>ليجتهدْ</strong> كل طالب - مجزوم بالسكون</li>
                            <li><strong>لا الناهية:</strong> لا <strong>تكذبْ</strong> - مجزوم بالسكون</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>مع أدوات الشرط:</h4>
                        <ul>
                            <li><strong>إن:</strong> إن <strong>تدرسْ</strong> <strong>تنجحْ</strong> - كلاهما مجزوم</li>
                            <li><strong>من:</strong> من <strong>يعملْ</strong> خيراً <strong>
                            <li><strong>من:</strong> من <strong>يعملْ</strong> خيراً <strong>يجدْه</strong> - كلاهما مجزوم</li>
                            <li><strong>ما:</strong> ما <strong>تفعلْ</strong> من خير <strong>تُؤجرْ</strong> عليه - كلاهما مجزوم</li>
                            <li><strong>متى:</strong> متى <strong>تأتِ</strong> <strong>أكرمْك</strong> - كلاهما مجزوم</li>
                            <li><strong>أين:</strong> أينما <strong>تذهبْ</strong> <strong>أتبعْك</strong> - كلاهما مجزوم</li>
                        </ul>
                    </div>

                    <h4>4. أمثلة متنوعة من القرآن الكريم</h4>
                    
                    <div class="examples-list">
                        <h4>آيات مع إعراب الأفعال:</h4>
                        <ul>
                            <li><strong>يُؤْمِنُونَ بِالْغَيْبِ</strong> - يؤمنون: مرفوع بثبوت النون</li>
                            <li><strong>لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا</strong> - تنالوا: منصوب بحذف النون، تنفقوا: منصوب بحذف النون</li>
                            <li><strong>وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ</strong> - يكن: مجزوم بحذف حرف العلة</li>
                            <li><strong>إِن تَنصُرُوا اللَّهَ يَنصُرْكُمْ</strong> - تنصروا: مجزوم بحذف النون، ينصركم: مجزوم بالسكون</li>
                        </ul>
                    </div>

                    <h4>5. تدريبات تطبيقية</h4>
                    
                    <div class="examples-list">
                        <h4>حدد حالة الإعراب والعلامة:</h4>
                        <ul>
                            <li>الطلاب يحضرون الدروس يومياً (مرفوع - ثبوت النون)</li>
                            <li>لن نتأخر عن الاجتماع (منصوب - الفتحة)</li>
                            <li>لم يفهموا الشرح جيداً (مجزوم - حذف النون)</li>
                            <li>المؤمن يدعو ربه في كل وقت (مرفوع - ضمة مقدرة)</li>
                            <li>لن أنسى معروفك أبداً (منصوب - فتحة مقدرة)</li>
                            <li>لم يبقَ من الوقت إلا قليل (مجزوم - حذف حرف العلة)</li>
                        </ul>
                    </div>

                    <h4>6. أمثلة الأخطاء الشائعة</h4>
                    
                    <div class="examples-list">
                        <h4>❌ خطأ ← ✅ صحيح:</h4>
                        <ul>
                            <li>❌ لن يكتبون ← ✅ لن يكتبوا (حذف النون في النصب)</li>
                            <li>❌ لم يدرسون ← ✅ لم يدرسوا (حذف النون في الجزم)</li>
                            <li>❌ لن يرضا ← ✅ لن يرضى (المعتل بالألف لا يظهر عليه التغيير)</li>
                            <li>❌ لم يدعو ← ✅ لم يدعُ (حذف حرف العلة في الجزم)</li>
                        </ul>
                    </div>

                    <h4>7. جمل للتحليل النحوي</h4>
                    
                    <div class="examples-list">
                        <h4>حلل الجمل التالية نحوياً:</h4>
                        <ul>
                            <li><strong>يسعى الطالب للتفوق:</strong> يسعى (فعل مضارع مرفوع بضمة مقدرة)</li>
                            <li><strong>لن تنجحوا بدون جهد:</strong> تنجحوا (فعل مضارع منصوب بحذف النون)</li>
                            <li><strong>إن تصدقوا يضاعف الله لكم:</strong> تصدقوا (فعل الشرط مجزوم بحذف النون)، يضاعف (جواب الشرط مجزوم بالسكون)</li>
                            <li><strong>لم يكن الأمر سهلاً:</strong> يكن (فعل مضارع ناقص مجزوم بحذف حرف العلة)</li>
                        </ul>
                    </div>

                    <h4>8. نصائح للحفظ والفهم</h4>
                    
                    <div class="highlight">
                        <h4>قواعد مهمة للتذكر:</h4>
                        <ul>
                            <li><strong>الأصل في المضارع:</strong> الرفع بالضمة</li>
                            <li><strong>الأفعال الخمسة:</strong> رفع بثبوت النون، نصب وجزم بحذفها</li>
                            <li><strong>المعتل الآخر:</strong> رفع بضمة مقدرة، جزم بحذف حرف العلة</li>
                            <li><strong>حروف النصب:</strong> 8 حروف تنصب المضارع</li>
                            <li><strong>أدوات الجزم:</strong> قسمان - تجزم فعلاً واحداً أو فعلين</li>
                        </ul>
                    </div>
                </div>
            `
        },

        notesModal: {
            title: "ملاحظات مهمة ونصائح",
            content: `
                <div class="modal-section">
                    <h3>ملاحظات نحوية مهمة</h3>
                    
                    <div class="highlight">
                        <h4>1. الفرق بين النصب والجزم في الأفعال الخمسة</h4>
                        <p>كلاهما بحذف النون، لكن التمييز يكون بالعامل:</p>
                        <ul>
                            <li><strong>النصب:</strong> بعد حروف النصب (لن، أن، كي...)</li>
                            <li><strong>الجزم:</strong> بعد أدوات الجزم (لم، لا الناهية، إن...)</li>
                        </ul>
                    </div>

                    <div class="highlight">
                        <h4>2. المضارع المبني (غير المعرب)</h4>
                        <p>لا يدخل في الأفعال المعربة:</p>
                        <ul>
                            <li><strong>المتصل بنون النسوة:</strong> يكتبن، يدرسن</li>
                            <li><strong>المتصل بنون التوكيد:</strong> ليكتبن، ليدرسن</li>
                        </ul>
                    </div>

                    <h3>نصائح للطلاب</h3>
                    
                    <div class="examples-list">
                        <h4>خطوات تحليل الفعل المضارع:</h4>
                        <ol>
                            <li><strong>تأكد أنه مضارع:</strong> يبدأ بأحد حروف (أ، ن، ت، ي)</li>
                            <li><strong>تأكد أنه معرب:</strong> غير متصل بنون النسوة أو التوكيد</li>
                            <li><strong>حدد العامل:</strong> ما الذي يؤثر على آخره؟</li>
                            <li><strong>حدد النوع:</strong> عادي، من الأفعال الخمسة، أم معتل الآخر؟</li>
                            <li><strong>طبق القاعدة:</strong> حسب النوع والعامل</li>
                        </ol>
                    </div>

                    <h3>الأخطاء الشائعة وتصحيحها</h3>
                    
                    <div class="examples-list">
                        <h4>أخطاء في الأفعال الخمسة:</h4>
                        <ul>
                            <li>❌ <strong>خطأ:</strong> الطلاب لن يحضرون ← ✅ <strong>صحيح:</strong> لن يحضروا</li>
                            <li>❌ <strong>خطأ:</strong> لم يفهمون الدرس ← ✅ <strong>صحيح:</strong> لم يفهموا</li>
                            <li>❌ <strong>خطأ:</strong> أنتما لن تسافران ← ✅ <strong>صحيح:</strong> لن تسافرا</li>
                        </ul>
                    </div>

                    <div class="examples-list">
                        <h4>أخطاء في الأفعال المعتلة:</h4>
                        <ul>
                            <li>❌ <strong>خطأ:</strong> لم يدعو الله ← ✅ <strong>صحيح:</strong> لم يدعُ الله</li>
                            <li>❌ <strong>خطأ:</strong> لم يرمي الكرة ← ✅ <strong>صحيح:</strong> لم يرمِ الكرة</li>
                            <li>❌ <strong>خطأ:</strong> لم يسعى للخير ← ✅ <strong>صحيح:</strong> لم يسعَ للخير</li>
                        </ul>
                    </div>

                    <h3>قواعد للحفظ</h3>
                    
                    <div class="highlight">
                        <h4>جدول سريع للمراجعة:</h4>
                        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                            <tr style="background: #f8f9fa;">
                                <th style="border: 1px solid #ddd; padding: 8px;">نوع الفعل</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">الرفع</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">النصب</th>
                                <th style="border: 1px solid #ddd; padding: 8px;">الجزم</th>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;"><strong>الفعل العادي</strong></td>
                                <td style="border: 1px solid #ddd; padding: 8px;">الضمة</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">الفتحة</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">السكون</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;"><strong>الأفعال الخمسة</strong></td>
                                <td style="border: 1px solid #ddd; padding: 8px;">ثبوت النون</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">حذف النون</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">حذف النون</td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px;"><strong>المعتل الآخر</strong></td>
                                <td style="border: 1px solid #ddd; padding: 8px;">ضمة مقدرة</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">فتحة (ظاهرة/مقدرة)</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">حذف حرف العلة</td>
                            </tr>
                        </table>
                    </div>

                    <h3>تمارين للمراجعة</h3>
                    
                    <div class="examples-list">
                        <h4>أعرب الأفعال في الجمل التالية:</h4>
                        <ul>
                            <li>الطلاب <strong>يدرسون</strong> للامتحان</li>
                            <li>لن <strong>نتأخر</strong> عن الموعد</li>
                            <li>لم <strong>يحضروا</strong> الاجتماع</li>
                            <li>المؤمن <strong>يدعو</strong> ربه</li>
                            <li>لن <strong>أنسى</strong> معروفك</li>
                            <li>إن <strong>تجتهد</strong> <strong>تنجح</strong></li>
                        </ul>
                    </div>

                    <h3>مصادر للمزيد من التعلم</h3>
                    
                    <div class="examples-list">
                        <h4>كتب مفيدة:</h4>
                        <ul>
                            <li><strong>ألفية ابن مالك</strong> - للإمام ابن مالك</li>
                            <li><strong>شرح ابن عقيل</strong> - شرح مفصل للألفية</li>
                            <li><strong>النحو الواضح</strong> - علي الجارم ومصطفى أمين</li>
                            <li><strong>جامع الدروس العربية</strong> - مصطفى الغلاييني</li>
                        </ul>
                    </div>

                    <div class="highlight">
                        <h4>نصيحة أخيرة:</h4>
                        <p><strong>الممارسة هي المفتاح!</strong> اقرأ النصوص العربية وحلل الأفعال فيها، وستجد نفسك تتقن هذا الموضوع تدريجياً.</p>
                    </div>
                </div>
            `
        },

        // Modal untuk tanda-tanda i'rab yang detail
        dammaModal: {
            title: "الضمة - علامة الرفع الأصلية",
            content: `
                <div class="modal-section">
                    <h3>الضمة في الفعل المضارع</h3>
                    <p><strong>الضمة</strong> هي العلامة الأصلية لرفع الفعل المضارع</p>
                    
                    <div class="examples-list">
                        <h4>أمثلة:</h4>
                        <ul>
                            <li>أنا أكتبُ الدرس</li>
                            <li>أنت تقرأُ الكتاب</li>
                            <li>هو يفهمُ الشرح</li>
                            <li>نحن نحفظُ القرآن</li>
                        </ul>
                    </div>
                </div>
            `
        },

        thabutNoonModal: {
            title: "ثبوت النون - علامة رفع الأفعال الخمسة",
            content: `
                <div class="modal-section">
                    <h3>ثبوت النون في الأفعال الخمسة</h3>
                    <p>الأفعال الخمسة تُرفع بـ <strong>ثبوت النون</strong></p>
                    
                    <div class="examples-list">
                        <h4>الأفعال الخمسة المرفوعة:</h4>
                        <ul>
                            <li>هما يكتبان - النون ثابتة</li>
                            <li>أنتما تكتبان - النون ثابتة</li>
                            <li>هم يكتبون - النون ثابتة</li>
                            <li>أنتم تكتبون - النون ثابتة</li>
                            <li>أنتِ تكتبين - النون ثابتة</li>
                        </ul>
                    </div>
                </div>
            `
        },

        fathaModal: {
            title: "الفتحة - علامة النصب الأصلية",
            content: `
                <div class="modal-section">
                    <h3>الفتحة في الفعل المضارع المنصوب</h3>
                    <p><strong>الفتحة</strong> هي العلامة الأصلية لنصب الفعل المضارع</p>
                    
                    <div class="examples-list">
                        <h4>أمثلة مع حروف النصب:</h4>
                        <ul>
                            <li>لن أكتبَ - منصوب بالفتحة</li>
                            <li>أريد أن أقرأَ - منصوب بالفتحة</li>
                            <li>ادرس كي تنجحَ - منصوب بالفتحة</li>
                            <li>لا تكسل فتندمَ - منصوب بالفتحة</li>
                        </ul>
                    </div>
                </div>
            `
        },

        sukoonModal: {
            title: "السكون - علامة الجزم الأصلية",
            content: `
                <div class="modal-section">
                    <h3>السكون في الفعل المضارع المجزوم</h3>
                    <p><strong>السكون</strong> هو العلامة الأصلية لجزم الفعل المضارع</p>
                    
                    <div class="examples-list">
                        <h4>أمثلة مع أدوات الجزم:</h4>
                        <ul>
                            <li>لم أكتبْ - مجزوم بالسكون</li>
                            <li>لا تكذبْ - مجزوم بالسكون</li>
                            <li>إن تدرسْ تنجحْ - كلاهما مجزوم بالسكون</li>
                            <li>ليجتهدْ الطالب - مجزوم بالسكون</li>
                        </ul>
                    </div>
                </div>
            `
        },

        hadhfNoonNasbModal: {
            title: "حذف النون في النصب - للأفعال الخمسة",
            content: `
                <div class="modal-section">
                    <h3>حذف النون علامة نصب الأفعال الخمسة</h3>
                    <p>الأفعال الخمسة تُنصب بـ <strong>حذف النون</strong></p>
                    
                    <div class="examples-list">
                        <h4>أمثلة:</h4>
                        <ul>
                            <li>لن تكتبا - النون محذوفة (أصلها: تكتبان)</li>
                            <li>لن يكتبوا - النون محذوفة (أصلها: يكتبون)</li>
                            <li>لن تكتبي - النون محذوفة (أصلها: تكتبين)</li>
                        </ul>
                    </div>
                </div>
            `
        },

        hadhfNoonJazmModal: {
            title: "حذف النون في الجزم - للأفعال الخمسة",
            content: `
                <div class="modal-section">
                    <h3>حذف النون علامة جزم الأفعال الخمسة</h3>
                    <p>الأفعال الخمسة تُجزم بـ <strong>حذف النون</strong></p>
                    
                    <div class="examples-list">
                        <h4>أمثلة:</h4>
                        <ul>
                            <li>لم تكتبا - النون محذوفة (أصلها: تكتبان)</li>
                            <li>لم يكتبوا - النون محذوفة (أصلها: يكتبون)</li>
                            <li>لم تكتبي - النون محذوفة (أصلها: تكتبين)</li>
                            <li>إن تجتهدوا تنجحوا - كلاهما بحذف النون</li>
                        </ul>
                    </div>
                </div>
            `
        }
    };

    return contents[modalId] || null;
}

// Search functionality
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchTerm) {
        clearSearchHighlights();
        return;
    }

    clearSearchHighlights();
    
    const boxes = document.querySelectorAll('.box');
    let found = false;

    boxes.forEach(box => {
        const content = box.textContent.toLowerCase();
        if (content.includes(searchTerm)) {
            box.classList.add('search-highlight');
            found = true;
            
            // Scroll to first match
            if (!found) {
                box.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    if (!found) {
        showNotification('لم يتم العثور على نتائج');
    } else {
        showNotification(`تم العثور على ${document.querySelectorAll('.search-highlight').length} نتيجة`);
    }
}

function clearSearchHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });
}

// Zoom functionality
function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.1, 2);
    applyZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.1, 0.5);
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    const diagram = document.querySelector('.diagram');
    if (diagram) {
        diagram.style.transform = `scale(${currentZoom})`;
        diagram.style.transformOrigin = 'center top';
    }
}

// Help function
function showHelp() {
    const helpContent = {
        title: "مساعدة - كيفية استخدام الخريطة",
        content: `
            <div class="modal-section">
                <h3>كيفية استخدام هذه الخريطة التفاعلية</h3>
                
                <h4>🖱️ التنقل والتفاعل:</h4>
                <ul>
                    <li><strong>انقر على أي مربع</strong> لفتح شرح مفصل</li>
                    <li><strong>استخدم البحث</strong> للعثور على موضوع معين</li>
                    <li><strong>أزرار التكبير/التصغير</strong> لتعديل حجم العرض</li>
                    <li><strong>زر الطباعة</strong> لطباعة الخريطة</li>
                </ul>

                <h4>📚 محتوى الخريطة:</h4>
                <ul>
                    <li><strong>المستوى الأول:</strong> المفهوم الأساسي للأفعال المعربة</li>
                    <li><strong>المستوى الثاني:</strong> تعريف الفعل المضارع المعرب</li>
                    <li><strong>المستوى الثالث:</strong> أقسام الإعراب الثلاثة</li>
                    <li><strong>المستوى الرابع:</strong> علامات الإعراب</li>
                    <li><strong>المستوى الخامس:</strong> التفاصيل والأدوات</li>
                </ul>

                <h4>💡 نصائح للاستفادة القصوى:</h4>
                <ul>
                    <li>ابدأ من الأعلى واتبع الخطوط المتصلة</li>
                    <li>اقرأ كل مربع بتأنٍ</li>
                    <li>استخدم الأمثلة للفهم العملي</li>
                    <li>راجع الملاحظات المهمة</li>
                </ul>

                <h4>🎯 الهدف من الخريطة:</h4>
                <p>تسهيل فهم موضوع الأفعال المعربة بطريقة بصرية تفاعلية، مع ربط المفاهيم ببعضها البعض بشكل منطقي ومتدرج.</p>
            </div>
        `
    };
    
    createModal('helpModal', helpContent);
}

// Notification function
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Segoe UI', sans-serif;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Add CSS for notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
    
    // Ctrl+F for search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Ctrl+P for print
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

// Auto-start animation on page load
window.addEventListener('load', function() {
    setTimeout(startAnimation, 500);
});
