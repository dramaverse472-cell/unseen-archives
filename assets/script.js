// Story data with metadata
const stories = [
  {
    title: "The Richest Man Awakens",
    category: "urban",
    date: "2026-01-15",
    popular: 850
  },
  {
    title: "Case Files: Paranormal",
    category: "paranormal",
    date: "2025-12-20",
    popular: 1200
  },
  {
    title: "Street King",
    category: "urban",
    date: "2026-02-01",
    popular: 320
  },
  {
    title: "The Haunted Manor",
    category: "paranormal",
    date: "2025-11-10",
    popular: 2100
  }
];

// Get DOM elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const storyCards = document.querySelectorAll(".story-card");
const noResults = document.getElementById("noResults");

// Filter and sort logic
function filterAndSort() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOption = sortBy.value;

  let visibleCards = Array.from(storyCards);

  // Apply search filter
  visibleCards = visibleCards.filter(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    return title.includes(searchTerm);
  });

  // Apply category filter
  visibleCards = visibleCards.filter(card => {
    const category = card.getAttribute("data-category");
    return selectedCategory === "all" || category === selectedCategory;
  });

  // Apply sorting
  visibleCards.sort((a, b) => {
    if (sortOption === "newest") {
      const dateA = new Date(a.getAttribute("data-date"));
      const dateB = new Date(b.getAttribute("data-date"));
      return dateB - dateA;
    } else if (sortOption === "popular") {
      const popA = parseInt(a.getAttribute("data-popular"));
      const popB = parseInt(b.getAttribute("data-popular"));
      return popB - popA;
    } else if (sortOption === "title") {
      const titleA = a.querySelector("h2").textContent;
      const titleB = b.querySelector("h2").textContent;
      return titleA.localeCompare(titleB);
    }
  });

  // Hide all cards first
  storyCards.forEach(card => card.style.display = "none");

  // Show filtered/sorted cards
  if (visibleCards.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    visibleCards.forEach(card => card.style.display = "block");
  }
}

// Event listeners
searchInput.addEventListener("input", filterAndSort);
categoryFilter.addEventListener("change", filterAndSort);
sortBy.addEventListener("change", filterAndSort);

// Initial call
filterAndSort();