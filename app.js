const dishes = [
  {
    id: "truffle-pasta",
    name: "Truffle Cream Pasta",
    description: "Handmade fettuccine, parmesan cloud, and black truffle aroma.",
    price: "$24"
  },
  {
    id: "volcano-burger",
    name: "Volcano Burger",
    description: "Flame-grilled beef patty, smoked cheddar, and lava chili sauce.",
    price: "$19"
  },
  {
    id: "sushi-zen",
    name: "Sushi Zen Platter",
    description: "Chef selection of fresh nigiri and signature rolls.",
    price: "$31"
  },
  {
    id: "choco-dome",
    name: "Chocolate Dome",
    description: "Dark chocolate shell with molten center and berry coulis.",
    price: "$14"
  }
];

const grid = document.querySelector(".menu-grid");
const template = document.getElementById("dish-card-template");

const baseUrl = new URL("viewer.html", window.location.href);

dishes.forEach((dish) => {
  const card = template.content.cloneNode(true);
  card.querySelector(".dish-name").textContent = dish.name;
  card.querySelector(".dish-description").textContent = dish.description;
  card.querySelector(".dish-price").textContent = dish.price;

  const viewerUrl = new URL(baseUrl);
  viewerUrl.searchParams.set("dish", dish.id);

  const qrContainer = card.querySelector(".qr-code");
  new QRCode(qrContainer, {
    text: viewerUrl.toString(),
    width: 128,
    height: 128,
    colorDark: "#111827",
    colorLight: "#f9fafb",
    correctLevel: QRCode.CorrectLevel.H
  });

  const openLink = card.querySelector(".open-link");
  openLink.href = viewerUrl.toString();

  grid.appendChild(card);
});
