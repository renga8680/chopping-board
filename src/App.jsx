import './App.css'

const whatsappUrl = 'https://wa.me/message/WSEWIKXSUAKBM1'

function App() {
  return (
    <main className="page">
      <section className="product-card" aria-label="Product preview">
        <div className="image-shell">
          <img
            className="product-image"
            src="/product.jpg"
            alt="Cutting board product preview"
          />
        </div>

        <div className="content">
          <p className="eyebrow">WhatsApp order</p>
          <h1>Stainless Steel Chopping Boards</h1>

          <ul className="benefits" aria-label="Product benefits">
            <li>Cash On Delivery available</li>
            <li>Free Shipping All Over India</li>
          </ul>

          <a
            className="button"
            href={whatsappUrl}
          >
            Shop Now
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
