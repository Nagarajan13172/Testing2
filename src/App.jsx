import { useState } from 'react'
import './App.css'
// import Todo from './components/Todo'
// import ProductList from './components/ProductList'
// import SearchBar from './components/SearchBar'
// import CategoryFilter from './components/CategoryFilter'
// import Pagination from './components/Pagination'
import Accordion from './components/Accordion'
import PopupModal from './components/PopupModal'


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  // ----- Product listing (commented out for accordion/modal practice) -----
  // const [products, setProducts] = useState([])
  // const [search, setSearch] = useState("")
  // const [category, setCategory] = useState("all")
  // const [currentPage, setCurrentPage] = useState(1)
  // const productsPerPage = 10;

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("https://dummyjson.com/products")
  //       const data = await response.json();
  //       setProducts(data.products)
  //     } catch (error) {
  //     }
  //   }
  //   fetchProducts()
  // }, [])

  // const filteredProducts = useMemo(() => {
  //   return products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase())).filter((product) => {
  //     if (category == "all")
  //       return true;
  //     return (
  //       product.category === category
  //     )
  //   })
  // }, [search, products, category])

  // const totalPage = Math.ceil(
  //   filteredProducts.length / productsPerPage
  // )

  // const currentProducts =
  //   filteredProducts.slice(
  //     (currentPage - 1) *
  //     productsPerPage,
  //     currentPage * productsPerPage
  //   );

  return (


    <>
      <div>

        {/* <SearchBar search={search} setSearch={setSearch} /> */}
        {/* <CategoryFilter category={category} setCategory={setCategory} /> */}
        {/* <ProductList products={currentProducts} /> */}
        {/* <Pagination currentPage={currentPage} totalPage={totalPage} setCurrentPage={setCurrentPage} /> */}

        <h2>Accordion</h2>
        <Accordion />

        <h2 style={{ marginTop: "32px" }}>Popup Modal</h2>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

        <PopupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Machine Coding Round"
        >
          <p>This is a reusable popup modal.</p>
          <p>Close it with the × button, the Escape key, or by clicking outside.</p>
        </PopupModal>
      </div>
    </>
  )
}

export default App
