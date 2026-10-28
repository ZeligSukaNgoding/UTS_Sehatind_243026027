import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBDjIrzs6j5rtC7Jf2y7_yfSkpAVsU3_8",
  authDomain: "uts-sehat-243026027.firebaseapp.com",
  projectId: "uts-sehat-243026027",
  storageBucket: "uts-sehat-243026027.firebasestorage.app",
  messagingSenderId: "323997518053",
  appId: "1:323997518053:web:ab044a5c89cc33c9ecec0c",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const recipesCollection = collection(db, "Makanan_Sehat");

let recipes = [];
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
        amounts: Array.isArray(data.amounts)
          ? data.amounts
          : Array.isArray(data.ingredients)
            ? data.ingredients
            : [],
        steps: Array.isArray(data.steps) ? data.steps : [],
        description: data.description || "",
        image: String(data.image || "").trim(),
        firestoreDocId: docSnap.id,
      };
    });
    // Firestore adalah sumber data utama. Ganti seluruh daftar dengan hasil terbaru,
    // jangan menggabungkan data lama di memori agar tidak ada resep duplikat/usang.
    recipes = firestoreRecipes;
    favorites = loadFavorites();
    render();
    console.info(
      `Firestore: ${firestoreRecipes.length} dokumen resep berhasil dibaca.`,
    );
  } catch (error) {
    console.error("Gagal membaca resep dari Firestore:", error);
    showToast(
      "Gagal memuat resep Firebase. Periksa koneksi dan Firestore Rules.",
    );
  }
}

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
const imageFileInput = addRecipeForm.querySelector('input[name="imageFile"]');
const addRecipeMessage = document.getElementById("add-recipe-message");
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

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function createRecipeCard(recipe) {
  const isFavorite = favorites.has(recipe.id);

  const card = document.createElement("article");
  card.className = "recipe-card";

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "card-image";
  imageWrapper.dataset.detail = recipe.id;

  const image = document.createElement("img");
  image.alt = "";
  image.loading = "lazy";
  if (
    recipe.image &&
    (/^https?:\/\/\S+$/i.test(recipe.image) ||
      /^data:image\/(png|jpeg|webp|gif);base64,/i.test(recipe.image))
  ) {
    image.src = recipe.image;
    image.onerror = () => {
      image.hidden = true;
    };
  } else {
    image.hidden = true;
  }

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
  calories.innerHTML = ` <strong>±${recipe.calories}</strong> kkal/porsi`;

  const protein = document.createElement("span");
  protein.innerHTML = ` <strong>${recipe.protein} g</strong> protein`;

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
  detailButton.textContent = "Lihat resep";

  footer.append(ingredientCount, detailButton);

  content.append(topLine, title, description, meta, footer);
  card.append(imageWrapper, content);

  return card;
}

function getFilteredRecipes() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const ingredientTerm = allergyFilter.value.trim().toLowerCase();
  const allergyTerm = dietFilter.value.trim().toLowerCase();

  return recipes.filter((recipe) => {
    const recipeName = String(recipe.name || "").toLowerCase();
    const description = String(recipe.description || "").toLowerCase();

    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(" ").toLowerCase()
      : String(recipe.ingredients || "").toLowerCase();

    const allergens = Array.isArray(recipe.allergens)
      ? recipe.allergens.join(" ").toLowerCase()
      : String(recipe.allergens || "").toLowerCase();

    const matchesSearch =
      !searchTerm ||
      recipeName.includes(searchTerm) ||
      description.includes(searchTerm) ||
      ingredients.includes(searchTerm);

    const matchesIngredient =
      !ingredientTerm || ingredients.includes(ingredientTerm);

    const matchesAllergy =
      !allergyTerm || allergens.includes(allergyTerm);

    return matchesSearch && matchesIngredient && matchesAllergy;
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
    filterDescriptions.push(`Bahan dasar: ${allergyFilter.value}`);
  }
  if (dietFilter.value) {
    filterDescriptions.push(
      `Alergi: ${dietFilter.value}`,
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

function openRecipe(recipeId) {
  const recipe = recipes.find((item) => String(item.id) === String(recipeId));
  if (!recipe) return;
  dialogContent.replaceChildren();
  const image = document.createElement("img");
  image.className = "dialog-image";
  image.alt = recipe.name || "Foto resep";
  if (
    recipe.image &&
    (/^https?:\/\/\S+$/i.test(recipe.image) ||
      /^data:image\/(png|jpeg|webp|gif);base64,/i.test(recipe.image))
  ) {
    image.src = recipe.image;
    image.onerror = () => {
      image.hidden = true;
    };
  } else {
    image.hidden = true;
  }

  const body = document.createElement("div");
  body.className = "dialog-body";
  const category = document.createElement("span");
  category.className = "eyebrow";
  category.textContent = (recipe.category || "").toUpperCase();
  const title = document.createElement("h2");
  title.textContent = recipe.name || "Resep";
  // Informasi alergi resep
  const allergyInfo = document.createElement("p");
  allergyInfo.className = "dialog-allergens";
  const allergens = Array.isArray(recipe.allergens)
    ? recipe.allergens
    : String(recipe.allergens || "")
        .split(/,|\n|;/)
        .map((item) => item.trim())
        .filter(Boolean);

  allergyInfo.textContent = allergens.length
    ? `Alergi: ${allergens.join(", ")}`
    : "Alergi: Tidak ada informasi alergi";

  const description = document.createElement("p");
  description.textContent = recipe.description || "";
  const facts = document.createElement("div");
  facts.className = "dialog-facts";
  const time = document.createElement("span");
  time.textContent = `◷ ${recipe.time || 0} menit`;
  const calories = document.createElement("span");
  calories.textContent = `±${recipe.calories || 0} kkal/porsi`;
  const protein = document.createElement("span");
  protein.textContent = `${recipe.protein || 0} g protein`;
  facts.append(time, calories, protein);

  // BAHAN-BAHAN: setiap bahan menjadi satu bullet
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Bahan-bahan";
  const ingredientList = createRecipeList(
    recipe.amounts || recipe.ingredients || [],
    "ul",
  );

  // CARA MEMBUAT: setiap langkah mendapat nomor otomatis
  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "Cara membuat";
  const stepsList = createRecipeList(recipe.steps || [], "ol");
  const note = document.createElement("p");
  note.textContent =
    "Catatan: estimasi nutrisi dapat berbeda berdasarkan ukuran porsi dan bahan yang digunakan. Periksa label bahan dan saus jika memiliki alergi.";
  note.style.marginTop = "20px";
  const favoriteButton = document.createElement("button");
  favoriteButton.type = "button";
  favoriteButton.className = "primary-button";
  favoriteButton.dataset.favorite = recipe.id;
  favoriteButton.textContent = favorites.has(recipe.id)
    ? "★ Hapus dari favorit"
    : "☆ Simpan ke favorit";

  body.append(
    category,
    allergyInfo,
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

function splitRecipeItems(text) {
  if (Array.isArray(text)) {
    return text
      .flatMap((item) => splitRecipeItems(String(item)))
      .filter(Boolean);
  }

  if (!text) return [];

  return String(text)
    .split(/\n|,|;/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createRecipeList(items, type = "ul") {
  const list = document.createElement(type);

  splitRecipeItems(items).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  return list;
}

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

// Pencarian langsung ketika pengguna mengetik
searchInput.addEventListener("input", render);

// Filter ketika pilihan diubah
allergyFilter.addEventListener("input", render);
dietFilter.addEventListener("input", render);

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

async function localImageToDataUrl(file) {
  if (!file) return "";
  if (!file.type.startsWith("image/")) {
    throw new Error("Pilih file gambar yang valid.");
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Ukuran file asli maksimal 10 MB.");
  }

  // Kompres gambar di browser agar dokumen Firestore tetap di bawah batas 1 MiB.
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = objectUrl;
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () =>
        reject(new Error("File gambar tidak dapat dibaca."));
    });

    const maxSide = 900;
    const scale = Math.min(
      1,
      maxSide / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Browser tidak mendukung pemrosesan gambar.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    let dataUrl = canvas.toDataURL("image/jpeg", 0.68);
    if (dataUrl.length > 450000) dataUrl = canvas.toDataURL("image/jpeg", 0.48);
    if (dataUrl.length > 450000) {
      throw new Error(
        "Gambar masih terlalu besar setelah dikompres. Pilih foto yang lebih kecil.",
      );
    }
    return dataUrl;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

addRecipeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = addRecipeForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  addRecipeMessage.textContent = "Menyimpan resep ke Firebase...";

  const formData = new FormData(addRecipeForm);
  const name = String(formData.get("name") || "").trim();
  const ingredients = String(formData.get("ingredients") || "")
    .split(/[,;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const amounts = String(formData.get("amounts") || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const steps = String(formData.get("steps") || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  const allergensText = String(formData.get("allergens") || "").trim();
  const allergens =
    allergensText && allergensText.toLowerCase() !== "tidak ada"
      ? allergensText
          .split(",")
          .map((item) => item.trim().toLowerCase())
          .filter(Boolean)
      : [];
  const diet = String(formData.get("diet") || "vegetarian")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = `${slug || "resep"}-${Date.now()}`;

  try {
    const selectedFile = imageFileInput?.files?.[0];
    if (!selectedFile) {
      throw new Error("Pilih gambar dari perangkat terlebih dahulu.");
    }
    addRecipeMessage.textContent = "Mengompres gambar...";
    const imageUrl = await localImageToDataUrl(selectedFile);

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
      image: imageUrl,
      createdAt: serverTimestamp(),
    };

    const savedDoc = await addDoc(recipesCollection, newRecipe);
    // Use the Firestore document ID for stable identification, while preserving recipe id.
    recipes.push({ ...newRecipe, firestoreDocId: savedDoc.id, createdAt: undefined });
    render();
    addRecipeForm.reset();
    addRecipeMessage.textContent = "";
    addRecipeDialog.close();
    showToast("Resep berhasil disimpan. Data tetap tampil dan akan dimuat kembali dari Firestore saat halaman dibuka.");
  } catch (error) {
    console.error("Gagal menyimpan resep:", error);
    addRecipeMessage.textContent =
      error?.message ||
      "Gagal menyimpan. Periksa Firestore Rules dan koneksi internet.";
    showToast("Resep belum tersimpan. Periksa Rules Firestore.");
  } finally {
    submitButton.disabled = false;
  }
});


// Muat resep dari Firestore setiap kali halaman dibuka/di-refresh.
loadRecipesFromFirestore();
