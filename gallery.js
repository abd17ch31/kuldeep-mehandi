const cards = document.querySelectorAll(".card");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const imageGrid = document.getElementById("imageGrid");
const popupTitle = document.getElementById("popupTitle");

/* 🔥 EDIT IMAGES FROM HERE ONLY */
const galleryImages = {
  bridal: [
    "bridall/b1.jpeg",
    "bridall/b2.jpeg",
    "bridall/b3.jpeg",
    "bridall/b4.jpeg",
    "bridall/b5.jpeg",
    "bridall/b6.jpeg",
    "bridall/b7.jpeg",
    "bridall/b8.jpeg",
    "bridall/b9.jpeg",
    "bridall/bridal cover.jpg"
  ],

  festival: [
    "guest/g1.jpg",
    "guest/g2.jpg",
    "guest/g3.jpg",
    "guest/g4.jpg",
    "guest/g5.jpg",
    "guest/g6.jpg",
    "guest/g7.jpg",
    "guest/g8.jpg",
    "guest/g9.jpg",
    "guest/g10.jpg"
  ],

  normal: [
    "bridall/f1.PNG",
    "bridall/f2.PNG",
    "bridall/f3.PNG",
    "bridall/f4.JPG",
    "bridall/f5.JPG",
    "bridall/f6.PNG",
    "bridall/f7.JPG",
    "bridall/f8.PNG",
    "bridall/f9.PNG",
    "bridall/f10.PNG"
  ],

  baby: [
    "bridall/bs1.PNG",
    "bridall/bs2.PNG",
    "bridall/bs3.PNG",
    "bridall/bs4.PNG",
    "bridall/bs5.JPG",
    "bridall/bs6.PNG",
    "bridall/bs7.PNG",
    "bridall/bs11.JPG",
    "bridall/bs9.PNG",
    "bridall/bs10.PNG"
  ],

  guest: [
    "guest/gt1.jpg",
    "guest/gt2.jpg",
    "guest/gt3.jpg",
    "guest/gt4.jpg",
    "guest/gt5.jpg",
    "guest/gt6.jpg",
    "guest/gt7.jpg",
    "guest/gt8.jpg",
    "guest/gt9.jpg",
    "guest/gt10.jpg"
  ],

  figure: [
    "bridall/n1.JPG",
    "bridall/n2.JPG",
    "bridall/n3.JPG",
    "bridall/n4.JPG",
    "bridall/n5.JPG",
    "bridall/n6.JPG",
    "bridall/n7.JPG",
    "bridall/n8.JPG",
    "bridall/n9.JPG",
    "bridall/n10.JPG",

  ]
};

cards.forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    popupTitle.textContent = card.textContent;

    imageGrid.innerHTML = "";

    galleryImages[category].forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      imageGrid.appendChild(img);
    });

    popup.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

popup.addEventListener("click", e => {
  if (e.target === popup) popup.style.display = "none";
});

