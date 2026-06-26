document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("artLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxVideo = document.getElementById("lightboxVideo"); // Safely reads as null on art page
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".prev-arrow");
    const nextBtn = document.querySelector(".next-arrow");

    let currentAlbumImages = [];
    let currentImageIndex = 0;

    // 1. LISTEN FOR CLICKS ON ANY ART ITEM BOX (Art Gallery - Unchanged)
    document.querySelectorAll(".art-item").forEach(item => {
        item.addEventListener("click", function () {
            // Find all child assets (both images and videos) inside the container in order
            const galleryAssets = Array.from(this.querySelectorAll("img, video"));

            if (galleryAssets.length === 0) return;

            // Find the description paragraph element inside the overlay
            const overlayDescEl = this.querySelector(".overlay-desc");
            const albumDescription = overlayDescEl ? overlayDescEl.innerHTML : "";

            // Check if the current device supports true mouse hover interactions
            const supportsHover = window.matchMedia('(hover: hover)').matches;

            // Map each element with its correct asset type
            currentAlbumImages = galleryAssets.map((asset, index) => {
                const isVideo = asset.tagName.toLowerCase() === "video";
                return {
                    type: isVideo ? 'video' : 'image',
                    src: asset.getAttribute("src"),
                    alt: isVideo ? (asset.getAttribute("data-alt") || "Video View") : (asset.getAttribute("alt") || "Artwork View"),

                    // Only attach description if it's the 1st asset AND the device lacks hover mechanics
                    description: (index === 0 && !supportsHover) ? albumDescription : ""
                };
            });

            currentImageIndex = 0;
            updateLightboxDisplay();

            if (modal) modal.style.display = "flex";

            if (prevBtn && nextBtn) {
                if (currentAlbumImages.length > 1) {
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                } else {
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }
            }
        });
    });

    // 2. CODING PAGE TRIGGER: LISTEN FOR CLEANROOM MEDIA BUTTON CLICK
    const cleanroomBtn = document.getElementById("open-cleanroom-lightbox");
    if (cleanroomBtn) {
        cleanroomBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            // MIX AND MATCH VIDEOS AND IMAGES HERE BY CHANGING THE 'type' KEY
            currentAlbumImages = [
                {
                    type: 'video',
                    src: 'vids/tape.MP4',
                    alt: 'Tape video'
                },
                {
                    type: 'video',
                    src: 'vids/wafer.MP4',
                    alt: 'Wafer video'
                },
                {
                    type: 'video',
                    src: 'vids/door.MP4',
                    alt: 'Door video'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/tape.JPG',
                    alt: 'Tape asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/tape1.JPEG',
                    alt: 'Tape1 asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/tape2.JPEG',
                    alt: 'Tape2 asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/tape3.JPEG',
                    alt: 'Tape3 asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/tape4.JPEG',
                    alt: 'Tape4 asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/bottles.JPEG',
                    alt: 'Bottles asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/testing.JPG',
                    alt: 'Testing img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/testing2.JPG',
                    alt: 'Testing2 img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/disc.JPEG',
                    alt: 'Disc asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/Disc2.JPEG',
                    alt: 'Disc2 asset img'
                },
                {
                    type: 'image',
                    src: 'imgs/code/CleanRoom/blueprint.JPEG',
                    alt: 'Blueprint img'
                },
            ];

            currentImageIndex = 0;
            updateLightboxDisplay();

            if (modal) modal.style.display = "flex";

            if (prevBtn && nextBtn) {
                if (currentAlbumImages.length > 1) {
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                } else {
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }
            }
        });
    }

    // 3. RENDER FUNCTION (Safely switches tracks depending on type)
    function updateLightboxDisplay() {
        const activeMedia = currentAlbumImages[currentImageIndex];
        if (!activeMedia) return;

        // Safety pause: stops audio instantly if switching slides
        if (lightboxVideo) {
            lightboxVideo.pause();
        }

        if (activeMedia.type === 'video' && lightboxVideo) {
            // Hide image layout container, show video layout container
            if (lightboxImg) lightboxImg.style.display = "none";
            lightboxVideo.style.display = "block";

            const videoSource = lightboxVideo.querySelector("source");
            if (videoSource) {
                videoSource.src = activeMedia.src;

                // THE CRITICAL FIX: Forces the browser to load the new video stream binary data
                lightboxVideo.load();
            }
        } else {
            // Default back to image layout rules
            if (lightboxVideo) lightboxVideo.style.display = "none";
            if (lightboxImg) {
                lightboxImg.style.display = "block";
                lightboxImg.src = activeMedia.src;
            }
        }

        // THE CONTENT INJECTION: Assemble the Title and Description dynamically
        if (lightboxCaption) {
            let captionHTML = `<h3 class="lightbox-title-text" style="margin: 0 0 8px 0; font-size: 1.4rem; color: var(--gold); font-family: Almendra, serif;">${activeMedia.alt}</h3>`;

            // If a description exists (meaning it's the 1st image AND on a non-hover touch device), append it below the title
            if (activeMedia.description) {
                captionHTML += `<p class="lightbox-desc-text" style="margin: 0; font-size: 1rem; color: #ccc; font-family: Almendra, serif;">${activeMedia.description}</p>`;
            }

            lightboxCaption.innerHTML = captionHTML;
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

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showNextImage(); });
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showPrevImage(); });
    }

    // 5. WINDOW CLOSING LOGIC
    function closeLightbox() {
        if (modal) modal.style.display = "none";
        if (lightboxVideo) {
            lightboxVideo.pause(); // Kills audio streaming instantly on close
        }
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeLightbox();
        });
    }

    // Keyboard navigation controls
    document.addEventListener("keydown", function (e) {
        if (modal && modal.style.display === "block") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight" && currentAlbumImages.length > 1) showNextImage();
            if (e.key === "ArrowLeft" && currentAlbumImages.length > 1) showPrevImage();
        }
    });

    // 6. PORTFOLIO GRID ISOLATION FILTER WITH MULTI-CATEGORY SUPPORT
    const filterButtons = document.querySelectorAll(".filter-btn");
    const artItems = document.querySelectorAll(".art-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedFilter = this.getAttribute("data-filter");

            artItems.forEach(item => {
                const itemCategoryStr = item.getAttribute("data-category") || "";

                // THE MULTI-FILTER FIX: Split space-separated string into an array of categories
                const categories = itemCategoryStr.split(" ");

                // Check if 'all' is chosen, OR if the array contains the selected filter term
                if (selectedFilter === "all" || categories.includes(selectedFilter)) {
                    item.classList.remove("is-hidden");
                } else {
                    item.classList.add("is-hidden");
                }
            });
        });
    });
});


