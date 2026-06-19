import { useEffect, useState } from "react";

const LIMIT = 10;

const InfiniteScroll = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
      );

      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [
        ...prev,
        ...data.products,
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight +
          document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (bottom && !loading && hasMore) {
        setSkip((prev) => prev + LIMIT);
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [loading, hasMore]);

  return (
    <div>
      <h1>Infinite Scroll</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      {!hasMore && (
        <p>No More Products</p>
      )}
    </div>
  );
};

export default InfiniteScroll;