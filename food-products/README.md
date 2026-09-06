# Echo Studio - Contemporary Fashion

This project is a React-based e-commerce application for Echo Studio, a premium luxury fashion brand. Below is a detailed overview of the project's structure and its components.

---

## Components

### `/components`
- **FashionCard.jsx**  
  A card component for displaying fashion product details with enhanced styling.

- **Header.jsx**  
  Renders the header section, including free shipping banner.

- **Home.jsx**  
  The main component for the homepage, showcasing featured products, new arrivals slider, and categories.

- **NavBar2.jsx**  
  A navigation bar component with links to Shop, New Arrivals, Women, Collections, and cart.

- **ProductCard.jsx**  
  A detailed product page component with gallery, size selection, and accordion details.

- **ScrollToTop.jsx**  
  Scrolls to top on route changes.

- **SideBar.jsx**  
  A sidebar component for filtering products by categories.

- **SortingBox.jsx**  
  Provides sorting options for products, such as by name or price ascending to descending.

---

## Pages

### `/pages`
- **Cart.jsx**  
  Displays the user's shopping cart and allows them to proceed to checkout.

- **CollectionProducts.jsx**  
  Shows products filtered by a specific collection with infinite scroll.

- **Collections.jsx**  
  Displays all available collections in a 2-column grid layout.

- **NewArrivals.jsx**  
  Shows the latest fashion arrivals with carousel navigation.

- **ProductDetails.jsx**  
  Displays detailed information about a selected product.

- **SearchName.jsx**  
  Provides a search interface for finding products by name.

---

## Contexts

### `/context`
- **CartContext.jsx**  
  Provides a context for managing the shopping cart state across the application.

- **CategoryContext.jsx**  
  Handles the state for product categories and their selection.

- **ProductsByCategoryContext.jsx**  
  Provides context for managing products filtered by selected categories.

---

## Configuration and Environment

- **.env**  
  Environment variables for the application.
- **.gitignore**  
  Specifies files and directories to be ignored by Git.
- **index.html**  
  The main HTML file for the application.
- **package.json**  
  Contains metadata and dependencies for the project.

---

## How to Run the Project

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.
4. Open the application in your browser at `http://localhost:5173`.

---

## License

This project is licensed under the MIT License.
