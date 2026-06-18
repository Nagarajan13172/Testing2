import {
    useEffect,
    useMemo,
    useState,
} from "react";

import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";

function App() {
    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("all");

    const [currentPage, setCurrentPage] =
        useState(1);

    const productsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response =
                    await fetch(
                        "https://dummyjson.com/products"
                    );

                const data =
                    await response.json();

                setProducts(data.products);
            } catch (err) {
                setError(
                    "Failed to fetch products"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, category]);pr

    const filteredProducts =
        useMemo(() => {
            return products
                .filter((product) =>
                    product.title
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
                )
                .filter((product) => {
                    if (category === "all")
                        return true;

                    return (
                        product.category ===
                        category
                    );
                });
        }, [products, search, category]);

    const totalPages = Math.ceil(
        filteredProducts.length /
        productsPerPage
    );

    const currentProducts =
        filteredProducts.slice(
            (currentPage - 1) *
            productsPerPage,
            currentPage * productsPerPage
        );

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "auto",
            }}
        >
            <h1>Product Listing</h1>

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <CategoryFilter
                category={category}
                setCategory={setCategory}
            />

            <ProductList
                products={currentProducts}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={
                    setCurrentPage
                }
            />
        </div>
    );
}

export default App;