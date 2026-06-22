document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("artLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".prev-arrow");
    const nextBtn = document.querySelector(".next-arrow");

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    // 1. LISTEN FOR CLICKS ON ANY ART ITEM BOX (Your working gallery loop)
    document.querySelectorAll(".art-item").forEach(item => {
        item.addEventListener("click", function () {
            const allImagesInItem = Array.from(this.querySelectorAll("img"));

            if (allImagesInItem.length === 0) return;

            currentAlbumImages = allImagesInItem.map(img => ({
                src: img.getAttribute("src"),
                alt: img.getAttribute("alt") || "Artwork View"
            }));

            currentImageIndex = 0;
            updateLightboxDisplay();

            modal.style.display = "block";

            if (currentAlbumImages.length > 1) {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        });
    });

    // 2. NEW CODING PAGE TRIGGER: LISTEN FOR CLEANROOM MEDIA BUTTON CLICK
    const cleanroomBtn = document.getElementById("open-cleanroom-lightbox");
    if (cleanroomBtn) {
        cleanroomBtn.addEventListener("click", function (e) {
            e.stopPropagation(); // Stops the click from bubbling

            // ADD ALL YOUR SCREENSHOT FILE PATHS AND CAPTIONS RIGHT HERE:
            currentAlbumImages = [
                {
                    src: 'imgs/code/CleanRoom/tape.JPG',
                    alt: 'tape asset'
                },
                {
                    src: 'imgs/code/CleanRoom/tape1.JPEG',
                    alt: 'tape1'
                },
                {
                    src: 'imgs/code/CleanRoom/tape2.JPEG',
                    alt: 'tape2'
                },
                {
                    src: 'imgs/code/CleanRoom/tape3.JPEG',
                    alt: 'tape3'
                },
                {
                    src: 'imgs/code/CleanRoom/tape4.JPEG',
                    alt: 'tape4'
                },
                {
                    src: 'imgs/code/CleanRoom/bottles.JPEG',
                    alt: 'bottles'
                },
                {
                    src: 'imgs/code/CleanRoom/testing.JPG',
                    alt: 'testing'
                },
                {
                    src: 'imgs/code/CleanRoom/testing2.JPG',
                    alt: 'testing2'
                },
                {
                    src: 'imgs/code/CleanRoom/disc.JPEG',
                    alt: 'disc'
                },
                {
                    src: 'imgs/code/CleanRoom/disc2.JPEG',
                    alt: 'disc2'
                },
                {
                    src: 'imgs/code/CleanRoom/blueprint.JPEG',
                    alt: 'blueprint'
                },
            ];

            currentImageIndex = 0;
            updateLightboxDisplay();

            modal.style.display = "block";

            // Show arrow buttons only if you added more than one image
            if (currentAlbumImages.length > 1) {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        });
    }

    // 3. RENDER THE CURRENT SLIDE DETECTED
    function updateLightboxDisplay() {
        const activePhoto = currentAlbumImages[currentImageIndex];
        if (activePhoto && lightboxImg) {
            lightboxImg.src = activePhoto.src;
            lightboxCaption.textContent = activePhoto.alt;
        }
    }

    // 4. CYCLE SLIDESHOW ACTIONS
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentAlbumImages.length;
        updateLightboxDisplay();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
        updateLightboxDisplay();
    }

    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });

    // 5. WINDOW CLOSING LOGIC
    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Keyboard controls
    document.addEventListener("keydown", function (e) {
        if (modal.style.display === "block") {
            if (e.key === "Escape") modal.style.display = "none";
            if (e.key === "ArrowRight" && currentAlbumImages.length > 1) showNextImage();
            if (e.key === "ArrowLeft" && currentAlbumImages.length > 1) showPrevImage();
        }
    });
});