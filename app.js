/* =========================================
   FIREBASE: KONFIGURASI DAN FIRESTORE
   Pastikan Firebase Console project ID cocok.
========================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBDjIrzs6j5rtC7Jf2y7_yfSkpAVsU3_8",
  authDomain: "uts-sehat-243026027.firebaseapp.com",
  projectId: "uts-sehat-243026027",
  storageBucket: "uts-sehat-243026027.firebasestorage.app",
  messagingSenderId: "323997518053",
  appId: "1:323997518053:web:ab044a5c89cc33c9ecec0c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const recipesCollection = collection(db, "Makanan_Sehat");

/* =========================================
   1. DATA RESEP SALAD INDONESIA
========================================= */

let recipes = [
  {
    id: "gado-gado",
    name: "Gado-Gado Tanpa Minyak",
    category: "Salad Nusantara",
    time: 25,
    calories: 300,
    protein: 13,
    diet: ["vegetarian"],
    allergens: ["kacang", "telur", "kedelai"],
    ingredients: [
      "Kangkung",
      "Kol",
      "Tauge",
      "Kentang",
      "Tahu kukus",
      "Telur rebus",
      "Kacang tanah",
    ],
    amounts: [
      "1 genggam kangkung",
      "50 g kol",
      "50 g tauge",
      "1 kentang kecil",
      "2 potong tahu kukus",
      "1 telur rebus",
      "1 sdm saus kacang",
    ],
    steps: [
      "Cuci bersih semua sayuran.",
      "Rebus kangkung, kol, tauge, dan kentang hingga matang.",
      "Kukus tahu dan rebus telur hingga matang.",
      "Haluskan kacang tanah sangrai dengan air, asam jawa, dan bumbu secukupnya.",
      "Susun semua bahan dan sajikan dengan saus kacang.",
    ],
    description:
      "Salad khas Indonesia berisi sayuran rebus, tahu, telur, dan saus kacang tanpa minyak tambahan.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: "pecel-sayur",
    name: "Pecel Sayur Segar",
    category: "Salad Nusantara",
    time: 20,
    calories: 280,
    protein: 11,
    diet: ["vegetarian", "vegan"],
    allergens: ["kacang"],
    ingredients: [
      "Bayam",
      "Kacang panjang",
      "Tauge",
      "Mentimun",
      "Daun kemangi",
      "Kacang tanah",
    ],
    amounts: [
      "1 genggam bayam",
      "50 g kacang panjang",
      "50 g tauge",
      "½ mentimun",
      "Daun kemangi secukupnya",
      "1 sdm sambal pecel",
    ],
    steps: [
      "Cuci semua sayuran hingga bersih.",
      "Rebus bayam, kacang panjang, dan tauge hingga matang.",
      "Iris mentimun dan siapkan daun kemangi.",
      "Encerkan sambal pecel menggunakan air hangat tanpa minyak tambahan.",
      "Sajikan sayuran dengan sambal pecel secukupnya.",
    ],
    description:
      "Salad sayuran tradisional dengan sambal kacang yang segar dan mudah dibuat.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: "karedok",
    name: "Karedok Sunda",
    category: "Sayuran Mentah",
    time: 15,
    calories: 260,
    protein: 9,
    diet: ["vegetarian", "vegan"],
    allergens: ["kacang"],
    ingredients: [
      "Kacang panjang",
      "Kol",
      "Tauge",
      "Mentimun",
      "Terong lalap",
      "Daun kemangi",
      "Kacang tanah",
    ],
    amounts: [
      "3 batang kacang panjang",
      "50 g kol",
      "Segenggam tauge",
      "½ mentimun",
      "1 terong lalap kecil",
      "Daun kemangi secukupnya",
      "1 sdm saus kacang",
    ],
    steps: [
      "Cuci bersih semua sayuran dan tiriskan.",
      "Iris kacang panjang, kol, mentimun, dan terong lalap.",
      "Haluskan kacang sangrai dengan bawang putih, kencur, asam jawa, dan air matang.",
      "Campurkan sayuran dengan saus kacang.",
      "Sajikan segera setelah dicampur.",
    ],
    description:
      "Salad khas Sunda dari sayuran segar dengan bumbu kencur dan saus kacang.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: "urap-sayur",
    name: "Urap Sayur",
    category: "Salad Nusantara",
    time: 25,
    calories: 220,
    protein: 6,
    diet: ["vegetarian", "vegan"],
    allergens: [],
    ingredients: [
      "Kacang panjang",
      "Tauge",
      "Bayam",
      "Kelapa parut",
      "Bawang putih",
      "Kencur",
      "Daun jeruk",
    ],
    amounts: [
      "50 g kacang panjang",
      "50 g tauge",
      "1 genggam bayam",
      "2 sdm kelapa parut",
      "1 siung bawang putih",
      "Sedikit kencur",
      "1 lembar daun jeruk",
    ],
    steps: [
      "Rebus kacang panjang, tauge, dan bayam hingga matang.",
      "Campurkan kelapa parut dengan bawang putih, kencur, dan daun jeruk.",
      "Bumbui kelapa secukupnya.",
      "Kukus campuran kelapa berbumbu selama sekitar 10 menit.",
      "Campurkan kelapa dengan sayuran sebelum disajikan.",
    ],
    description:
      "Sayuran rebus dengan kelapa berbumbu yang dikukus tanpa proses menumis.",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: "salad-buah",
    name: "Salad Buah Yoghurt",
    category: "Salad Buah",
    time: 15,
    calories: 190,
    protein: 6,
    diet: ["vegetarian"],
    allergens: ["susu"],
    ingredients: [
      "Pepaya",
      "Melon",
      "Semangka",
      "Apel",
      "Yoghurt tawar",
      "Jeruk nipis",
    ],
    amounts: [
      "100 g pepaya",
      "100 g melon",
      "100 g semangka",
      "½ apel",
      "3 sdm yoghurt tawar tanpa gula",
      "1 sdt air jeruk nipis",
    ],
    steps: [
      "Cuci buah yang perlu dicuci, lalu kupas dan potong dadu.",
      "Campurkan yoghurt tawar dengan air jeruk nipis.",
      "Aduk buah dengan dressing yoghurt secara perlahan.",
      "Simpan di kulkas sebentar jika ingin disajikan dingin.",
      "Hindari tambahan sirup atau susu kental manis jika ingin membatasi gula.",
    ],
    description:
      "Salad buah tropis dengan dressing yoghurt tawar tanpa minyak tambahan.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85",
  },

  {
    id: "rujak-buah",
    name: "Rujak Buah Segar",
    category: "Salad Buah",
    time: 15,
    calories: 170,
    protein: 3,
    diet: ["vegetarian", "vegan"],
    allergens: ["kacang"],
    ingredients: [
      "Mangga muda",
      "Bengkuang",
      "Nanas",
      "Mentimun",
      "Kacang tanah",
      "Cabai",
      "Asam jawa",
    ],
    amounts: [
      "½ mangga muda",
      "100 g bengkuang",
      "100 g nanas",
      "½ mentimun",
      "1 sdt kacang sangrai (opsional)",
      "Cabai sesuai selera",
      "1 sdt air asam jawa",
    ],
    steps: [
      "Cuci dan potong buah sesuai selera.",
      "Ulek cabai dengan sedikit garam dan air asam jawa.",
      "Tambahkan sedikit air agar bumbu mudah tercampur.",
      "Sesuaikan gula atau lewati jika ingin membatasi gula tambahan.",
      "Sajikan buah dengan bumbu rujak tanpa minyak.",
    ],
    description:
      "Salad buah tradisional dengan mangga muda, bengkuang, nanas, dan bumbu asam pedas.",
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=900&q=85",
  },
];

/* =========================================
   MEMUAT RESEP DARI FIRESTORE
========================================= */
async function loadRecipesFromFirestore() {
  try {
    const snapshot = await getDocs(recipesCollection);
    const firestoreRecipes = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: data.id || docSnap.id,
        name: data.name || "Resep tanpa nama",
        category: data.category || "Salad Nusantara",
        time: Number(data.time) || 15,
        calories: Number(data.calories) || 0,
        protein: Number(data.protein) || 0,
        diet: Array.isArray(data.diet) ? data.diet : ["vegetarian"],
        allergens: Array.isArray(data.allergens) ? data.allergens : [],
        ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
        amounts: Array.isArray(data.amounts) ? data.amounts : (Array.isArray(data.ingredients) ? data.ingredients : []),
        steps: Array.isArray(data.steps) ? data.steps : [],
        description: data.description || "",
        image: data.image || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
        firestoreDocId: docSnap.id
      };
    });

    // Gabungkan resep lokal dan Firebase; resep Firebase dengan ID sama menggantikan lokal.
    const combined = new Map(recipes.map((recipe) => [recipe.id, recipe]));
    firestoreRecipes.forEach((recipe) => combined.set(recipe.id, recipe));
    recipes = [...combined.values()];
    favorites = loadFavorites();
    render();
    console.info(`Firestore: ${firestoreRecipes.length} dokumen resep berhasil dibaca.`);
  } catch (error) {
    console.error("Gagal membaca resep dari Firestore:", error);
    showToast("Gagal memuat resep Firebase. Periksa koneksi dan Firestore Rules.");
  }
}

/* =========================================
   2. MENGAMBIL ELEMEN HTML
========================================= */

const searchInput = document.getElementById("search-input");
const allergyFilter = document.getElementById("allergy-filter");
const dietFilter = document.getElementById("diet-filter");

const recipeGrid = document.getElementById("recipe-grid");
const favoriteGrid = document.getElementById("favorite-grid");

const resultCount = document.getElementById("result-count");
const recipeTotal = document.getElementById("recipe-total");
const favoriteTotal = document.getElementById("favorite-total");
const navFavCount = document.getElementById("nav-fav-count");

const emptyState = document.getElementById("empty-state");
const favoriteEmpty = document.getElementById("favorite-empty");
const activeFilter = document.getElementById("active-filter");

const recipeDialog = document.getElementById("recipe-dialog");
const dialogContent = document.getElementById("dialog-content");
const toast = document.getElementById("toast");
const addRecipeDialog = document.getElementById("add-recipe-dialog");
const addRecipeForm = document.getElementById("add-recipe-form");
const addRecipeMessage = document.getElementById("add-recipe-message");

/* =========================================
   3. PENYIMPANAN FAVORIT SEMENTARA
========================================= */

// Untuk tahap awal, favorit disimpan di browser.
// Pada langkah Firebase, bagian ini akan kita integrasikan
// dengan Cloud Firestore.

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("sehatin-favorites") || "[]");

    if (!Array.isArray(saved)) {
      return new Set();
    }

    const validIds = recipes.map((recipe) => recipe.id);

    return new Set(saved.filter((id) => validIds.includes(id)));
  } catch (error) {
    console.warn("Data favorit tidak dapat dibaca:", error);
    return new Set();
  }
}

let favorites = loadFavorites();

function saveFavorites() {
  try {
    localStorage.setItem("sehatin-favorites", JSON.stringify([...favorites]));

    return true;
  } catch (error) {
    console.error("Gagal menyimpan favorit:", error);
    showToast("Favorit gagal disimpan di browser.");
    return false;
  }
}

/* =========================================
   4. NOTIFIKASI
========================================= */

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =========================================
   5. MEMBUAT KARTU RESEP
========================================= */

function createRecipeCard(recipe) {
  const isFavorite = favorites.has(recipe.id);

  const card = document.createElement("article");
  card.className = "recipe-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "card-image";
  imageWrapper.dataset.detail = recipe.id;

  const image = document.createElement("img");
  image.src = recipe.image;
  image.alt = recipe.name;
  image.loading = "lazy";

  const category = document.createElement("span");
  category.className = "category-tag";
  category.textContent = recipe.category;

  const heart = document.createElement("button");
  heart.type = "button";
  heart.className = "heart-btn";
  heart.dataset.favorite = recipe.id;
  heart.textContent = isFavorite ? "★" : "☆";
  heart.setAttribute("aria-pressed", String(isFavorite));
  heart.setAttribute(
    "aria-label",
    isFavorite ? "Hapus dari favorit" : "Simpan ke favorit",
  );

  if (isFavorite) {
    heart.classList.add("saved");
  }

  imageWrapper.append(image, category, heart);

  const content = document.createElement("div");
  content.className = "card-content";

  const topLine = document.createElement("div");
  topLine.className = "card-topline";

  const dietLabel = document.createElement("span");
  dietLabel.textContent = recipe.diet.includes("vegan")
    ? "Plant-based"
    : recipe.diet.includes("high-protein")
      ? "Protein source"
      : "Pilihan segar";

  const timeLabel = document.createElement("span");
  timeLabel.textContent = `◷ ${recipe.time} menit`;

  topLine.append(dietLabel, timeLabel);

  const title = document.createElement("h3");
  title.textContent = recipe.name;
  title.dataset.detail = recipe.id;

  const description = document.createElement("p");
  description.textContent = recipe.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const calories = document.createElement("span");
  calories.innerHTML = `◉ <strong>±${recipe.calories}</strong> kkal/porsi`;

  const protein = document.createElement("span");
  protein.innerHTML = `↗ <strong>${recipe.protein} g</strong> protein`;

  meta.append(calories, protein);

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const ingredientCount = document.createElement("span");
  ingredientCount.className = "ingredient-count";
  ingredientCount.textContent = `${recipe.ingredients.length} bahan utama`;

  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "detail-link";
  detailButton.dataset.detail = recipe.id;
  detailButton.textContent = "Lihat resep ↗";

  footer.append(ingredientCount, detailButton);

  content.append(topLine, title, description, meta, footer);
  card.append(imageWrapper, content);

  return card;
}

/* =========================================
   6. PENCARIAN DAN FILTER
========================================= */

function getFilteredRecipes() {
  const query = searchInput.value.trim().toLowerCase();
  const allergy = allergyFilter.value;
  const diet = dietFilter.value;

  return recipes.filter((recipe) => {
    const searchableText = [
      recipe.name,
      recipe.description,
      recipe.category,
      ...recipe.ingredients,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchableText.includes(query);

    // Menyembunyikan resep yang terdaftar mengandung
    // alergen yang dipilih.
    const matchesAllergy = !allergy || !recipe.allergens.includes(allergy);

    const matchesDiet = !diet || recipe.diet.includes(diet);

    return matchesSearch && matchesAllergy && matchesDiet;
  });
}

/* =========================================
   7. MENAMPILKAN RESEP DAN FAVORIT
========================================= */

function renderRecipeList(container, recipeList) {
  container.replaceChildren();

  recipeList.forEach((recipe) => {
    container.appendChild(createRecipeCard(recipe));
  });
}

function render() {
  const filteredRecipes = getFilteredRecipes();

  renderRecipeList(recipeGrid, filteredRecipes);

  recipeTotal.textContent = recipes.length;

  resultCount.textContent = `${filteredRecipes.length} resep ditemukan`;

  emptyState.hidden = filteredRecipes.length > 0;

  const filterDescriptions = [];

  if (searchInput.value.trim()) {
    filterDescriptions.push(`Pencarian: "${searchInput.value.trim()}"`);
  }

  if (allergyFilter.value) {
    filterDescriptions.push(`Tanpa bahan: ${allergyFilter.value}`);
  }

  if (dietFilter.value) {
    filterDescriptions.push(
      `Preferensi: ${dietFilter.value.replace("-", " ")}`,
    );
  }

  activeFilter.textContent = filterDescriptions.length
    ? `Filter aktif: ${filterDescriptions.join(" • ")}`
    : "";

  const favoriteRecipes = recipes.filter((recipe) => favorites.has(recipe.id));

  renderRecipeList(favoriteGrid, favoriteRecipes);

  favoriteTotal.textContent = `${favoriteRecipes.length} resep`;

  navFavCount.textContent = favoriteRecipes.length;

  favoriteEmpty.hidden = favoriteRecipes.length > 0;
}

/* =========================================
   8. DETAIL RESEP
========================================= */

function openRecipe(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) return;

  dialogContent.replaceChildren();

  const image = document.createElement("img");
  image.className = "dialog-image";
  image.src = recipe.image;
  image.alt = recipe.name;

  const body = document.createElement("div");
  body.className = "dialog-body";
const category = document.createElement("span");
  category.className = "eyebrow";
  category.textContent = recipe.category.toUpperCase();

  const title = document.createElement("h2");
  title.textContent = recipe.name;

  const description = document.createElement("p");
  description.textContent = recipe.description;

  const facts = document.createElement("div");
  facts.className = "dialog-facts";

  const time = document.createElement("span");
  time.textContent = `◷ ${recipe.time} menit`;

  const calories = document.createElement("span");
  calories.textContent = `±${recipe.calories} kkal/porsi`;

  const protein = document.createElement("span");
  protein.textContent = `${recipe.protein} g protein`;

  facts.append(time, calories, protein);

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Bahan-bahan";

  const ingredientList = document.createElement("ul");

  recipe.amounts.forEach((amount) => {
    const item = document.createElement("li");
    item.textContent = amount;
    ingredientList.appendChild(item);
  });

  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "Cara membuat";

  const stepsList = document.createElement("ol");

  recipe.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    stepsList.appendChild(item);
  });

  const note = document.createElement("p");
  note.textContent =
    "Catatan: estimasi nutrisi dapat berbeda berdasarkan ukuran porsi dan bahan yang digunakan. Periksa label bahan dan saus jika memiliki alergi.";

  note.style.marginTop = "20px";

  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "primary-button";
  favoriteButton.dataset.favorite = recipe.id;
  favoriteButton.textContent = favorites.has(recipe.id)
    ? "♥ Hapus dari favorit"
    : "♡ Simpan ke favorit";

  body.append(
    category,
    title,
    description,
    facts,
    ingredientsTitle,
    ingredientList,
    stepsTitle,
    stepsList,
    note,
    favoriteButton,
  );

  dialogContent.append(image, body);

  if (!recipeDialog.open) {
    recipeDialog.showModal();
  }
}

/* =========================================
   9. TAMBAH / HAPUS FAVORIT
========================================= */

function toggleFavorite(recipeId) {
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) return;

  if (favorites.has(recipeId)) {
    favorites.delete(recipeId);
    showToast("Resep dihapus dari favorit.");
  } else {
    favorites.add(recipeId);
    showToast("Resep ditambahkan ke favorit.");
  }

  saveFavorites();
  render();

  // Memperbarui tombol favorit pada detail resep
  // jika modal sedang terbuka.
  if (recipeDialog.open) {
    openRecipe(recipeId);
  }
}

/* =========================================
   10. EVENT LISTENER
========================================= */

// Pencarian langsung ketika pengguna mengetik
searchInput.addEventListener("input", render);

// Filter ketika pilihan diubah
allergyFilter.addEventListener("change", render);
dietFilter.addEventListener("change", render);

// Reset semua filter
function resetFilters() {
  searchInput.value = "";
  allergyFilter.value = "";
  dietFilter.value = "";

  render();
}

document
  .getElementById("reset-filters")
  .addEventListener("click", resetFilters);

document.getElementById("empty-reset").addEventListener("click", resetFilters);

// Satu event listener untuk kartu, detail, dan tombol favorit
document.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");

  if (favoriteButton) {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(favoriteButton.dataset.favorite);
    return;
  }

  const detailButton = event.target.closest("[data-detail]");

  if (detailButton) {
    openRecipe(detailButton.dataset.detail);
  }
});

// Tutup modal
document.getElementById("dialog-close").addEventListener("click", () => {
  recipeDialog.close();
});

// Tutup modal ketika area luar diklik
recipeDialog.addEventListener("click", (event) => {
  if (event.target === recipeDialog) {
    recipeDialog.close();
  }
});

/* =========================================
   FORM TAMBAH RESEP KE FIRESTORE
========================================= */
const addRecipeButton = document.getElementById("add-recipe-button");
const addRecipeClose = document.getElementById("add-recipe-close");

addRecipeButton?.addEventListener("click", () => {
  addRecipeMessage.textContent = "";
  addRecipeForm.reset();
  addRecipeDialog.showModal();
});

addRecipeClose?.addEventListener("click", () => addRecipeDialog.close());

addRecipeDialog?.addEventListener("click", (event) => {
  if (event.target === addRecipeDialog) addRecipeDialog.close();
});

addRecipeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = addRecipeForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  addRecipeMessage.textContent = "Menyimpan resep ke Firebase...";

  const formData = new FormData(addRecipeForm);
  const name = String(formData.get("name") || "").trim();
  const ingredients = String(formData.get("ingredients") || "")
    .split(/[,\\n]/).map((item) => item.trim()).filter(Boolean);
  const amounts = String(formData.get("amounts") || "")
    .split("\\n").map((item) => item.trim()).filter(Boolean);
  const steps = String(formData.get("steps") || "")
    .split("\\n").map((item) => item.trim()).filter(Boolean);
  const allergensText = String(formData.get("allergens") || "").trim();
  const allergens = allergensText && allergensText.toLowerCase() !== "tidak ada"
    ? allergensText.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean)
    : [];
  const diet = String(formData.get("diet") || "vegetarian")
    .split(",").map((item) => item.trim()).filter(Boolean);
  const slug = name.toLowerCase()
    .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const id = `${slug || "resep"}-${Date.now()}`;

  const newRecipe = {
    id,
    name,
    category: String(formData.get("category") || "Salad Nusantara"),
    time: Number(formData.get("time")) || 15,
    calories: Number(formData.get("calories")) || 0,
    protein: Number(formData.get("protein")) || 0,
    diet,
    allergens,
    ingredients,
    amounts: amounts.length ? amounts : ingredients,
    steps,
    description: String(formData.get("description") || "").trim(),
    image: String(formData.get("image") || "").trim() ||
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(recipesCollection, newRecipe);
    recipes.push({ ...newRecipe, createdAt: undefined });
    render();
    addRecipeDialog.close();
    showToast("Resep berhasil disimpan ke Firebase!");
    addRecipeForm.reset();
  } catch (error) {
    console.error("Gagal menyimpan resep:", error);
    addRecipeMessage.textContent =
      "Gagal menyimpan. Periksa Firestore Rules dan koneksi internet.";
    showToast("Resep belum tersimpan. Periksa Rules Firestore.");
  } finally {
    submitButton.disabled = false;
  }
});

/* =========================================
   11. JALANKAN WEBSITE
========================================= */

render();
loadRecipesFromFirestore();

console.log("Sehatin berhasil dijalankan.");
console.log(`Jumlah resep: ${recipes.length}`);


/* =========================================
   12. NAVBAR: MENU AKTIF DAN SCROLL
========================================= */
const navLinks = [...document.querySelectorAll(".nav-menu .nav-link")];
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(targetId) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${targetId}`;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (targetId) setActiveNav(targetId);
  });
});

// Ubah menu aktif berdasarkan bagian halaman yang paling terlihat.
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length) {
        setActiveNav(visibleSections[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75],
    }
  );

  navTargets.forEach((section) => navObserver.observe(section));
}

