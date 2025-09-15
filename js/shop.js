// Shop page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeShop()
})

function initializeShop() {
  // Initialize filters
  initializeFilters()

  // Initialize sorting
  const sortSelect = document.getElementById("sortBy")
  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      sortProducts(this.value)
    })
  }
}

function initializeFilters() {
  // Add event listeners to filter checkboxes
  const filterCheckboxes = document.querySelectorAll('.filter-options input[type="checkbox"]')
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      applyFilters()
    })
  })

  // Price range inputs
  const minPrice = document.getElementById("minPrice")
  const maxPrice = document.getElementById("maxPrice")

  if (minPrice && maxPrice) {
    minPrice.addEventListener("input", applyFilters)
    maxPrice.addEventListener("input", applyFilters)
  }
}

function applyFilters() {
  // Get selected filters
  const selectedCategories = getSelectedFilters("category")
  const selectedBrands = getSelectedFilters("brand")
  const selectedConditions = getSelectedFilters("condition")
  const selectedStorage = getSelectedFilters("storage")

  const minPrice = document.getElementById("minPrice").value
  const maxPrice = document.getElementById("maxPrice").value

  // Apply filters to products
  filterProducts({
    categories: selectedCategories,
    brands: selectedBrands,
    conditions: selectedConditions,
    storage: selectedStorage,
    minPrice: minPrice,
    maxPrice: maxPrice,
  })
}

function getSelectedFilters(filterType) {
  const checkboxes = document.querySelectorAll(`input[id*="${filterType}"]:checked`)
  return Array.from(checkboxes).map((cb) => cb.id)
}

function filterProducts(filters) {
  // Filter products based on selected criteria
  const products = document.querySelectorAll(".product-card")
  let visibleCount = 0

  products.forEach((product) => {
    const shouldShow = true

    // Apply filter logic here
    // This is a simplified version - in a real app, you'd have product data

    if (shouldShow) {
      product.style.display = "block"
      visibleCount++
    } else {
      product.style.display = "none"
    }
  })

  // Update results count
  const resultsInfo = document.querySelector(".results-info p")
  if (resultsInfo) {
    resultsInfo.textContent = `Showing 1-${Math.min(24, visibleCount)} of ${visibleCount} results`
  }
}

function sortProducts(sortBy) {
  const productsGrid = document.querySelector(".products-grid .row")
  const products = Array.from(productsGrid.children)

  products.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getPriceFromElement(a) - getPriceFromElement(b)
      case "price-high":
        return getPriceFromElement(b) - getPriceFromElement(a)
      case "rating":
        return getRatingFromElement(b) - getRatingFromElement(a)
      case "newest":
        return 0 // Would implement based on date
      default:
        return 0
    }
  })

  // Re-append sorted products
  products.forEach((product) => productsGrid.appendChild(product))
}

function getPriceFromElement(element) {
  const priceText = element.querySelector(".current-price").textContent
  return Number.parseInt(priceText.replace("₹", "").replace(",", ""))
}

function getRatingFromElement(element) {
  const stars = element.querySelectorAll(".stars .fas.fa-star").length
  return stars
}

function setPriceRange(min, max) {
  document.getElementById("minPrice").value = min
  document.getElementById("maxPrice").value = max
  applyFilters()
}

function clearFilters() {
  // Clear all filter checkboxes
  const checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]')
  checkboxes.forEach((cb) => (cb.checked = false))

  // Clear price inputs
  document.getElementById("minPrice").value = ""
  document.getElementById("maxPrice").value = ""

  // Reset products display
  const products = document.querySelectorAll(".product-card")
  products.forEach((product) => (product.style.display = "block"))

  showToast("Filters cleared!", "info")
}

function setGridView() {
  document.querySelector(".view-toggle .btn:first-child").classList.add("active")
  document.querySelector(".view-toggle .btn:last-child").classList.remove("active")
  // Implement grid view logic
}

function setListView() {
  document.querySelector(".view-toggle .btn:last-child").classList.add("active")
  document.querySelector(".view-toggle .btn:first-child").classList.remove("active")
  // Implement list view logic
}

function addToCart(productId) {
  console.log(`Adding product ${productId} to cart`)
  showToast("Product added to cart!", "success")

  // Update cart badge
  const cartBadge = document.querySelector(".badge")
  if (cartBadge) {
    const currentCount = Number.parseInt(cartBadge.textContent)
    cartBadge.textContent = currentCount + 1
  }
}

function addToWishlist(productId) {
  console.log(`Adding product ${productId} to wishlist`)
  showToast("Product added to wishlist!", "success")
}

function quickView(productId) {
  // Implement quick view modal
  console.log(`Quick view for product ${productId}`)
}

function showToast(message, type = "info") {
  // Create and show toast notification
  const toast = document.createElement("div")
  toast.className = `toast align-items-center text-white bg-${type} border-0`
  toast.setAttribute("role", "alert")
  toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `

  document.body.appendChild(toast)
  const bsToast = window.bootstrap.Toast // Declare bootstrap variable
  new bsToast(toast).show()

  // Remove toast after it's hidden
  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove()
  })
}
