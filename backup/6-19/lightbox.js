document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("artLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".prev-arrow");
    const nextBtn = document.querySelector(".next-arrow");

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    // 1. LISTEN FOR CLICKS ON ANY ART ITEM BOX
    document.querySelectorAll(".art-item").forEach(item => {
        item.addEventListener("click", function () {
            // Collect all images inside this specific clicked box
            const allImagesInItem = Array.from(this.querySelectorAll("img"));

            if (allImagesInItem.length === 0) return;

            // Gather their sources and alt captions
            currentAlbumImages = allImagesInItem.map(img => ({
                src: img.getAttribute("src"),
                alt: img.getAttribute("alt") || "Artwork View"
            }));

            // Start on the first image
            currentImageIndex = 0;
            updateLightboxDisplay();

            // Reveal the lightbox modal
            modal.style.display = "block";

            // Show arrow buttons only if this item has multiple images
            if (currentAlbumImages.length > 1) {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        });
    });

    // 2. RENDER THE CURRENT SLIDE DETECTED
    function updateLightboxDisplay() {
        const activePhoto = currentAlbumImages[currentImageIndex];
        lightboxImg.src = activePhoto.src;
        lightboxCaption.textContent = activePhoto.alt;
    }

    // 3. CYCLE SLIDESHOW ACTIONS
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

    // 4. WINDOW CLOSING LOGIC
    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Keyboard controls for a nice UX touch
    document.addEventListener("keydown", function (e) {
        if (modal.style.display === "block") {
            if (e.key === "Escape") modal.style.display = "none";
            if (e.key === "ArrowRight" && currentAlbumImages.length > 1) showNextImage();
            if (e.key === "ArrowLeft" && currentAlbumImages.length > 1) showPrevImage();
        }
    });
});