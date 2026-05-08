import { useState } from 'react'
import './App.css'

const assetModules = import.meta.glob('./assets/**/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default',
})

const brandLogoModules = import.meta.glob('./assets/brand/*.{jpg,jpeg,png,webp,svg}', {
  eager: true,
  import: 'default',
})

const brandLogo = Object.values(brandLogoModules)[0] ?? ''

const reviewImageModules = import.meta.glob(
  './assets/customer_review/*.{jpg,jpeg,png,webp,svg}',
  {
    eager: true,
    import: 'default',
  },
)

const collectionDefinitions = [
  {
    id: 'new',
    title: 'New Arrivals',
    summary: 'Fresh arrivals from the latest upload batch.',
    matcher: /\/newcollections\//i,
  },
  {
    id: '180',
    title: '180 Collection',
    summary: 'Light, graceful pieces with an easy everyday feel.',
    matcher: /\/180collections\//i,
  },
  {
    id: '220',
    title: '220 Collection',
    summary: 'Polished layers designed to keep the look refined.',
    matcher: /\/220 ?collections\//i,
  },
  {
    id: '230',
    title: '230 Collection',
    summary: 'Balanced sets with a soft gold presence.',
    matcher: /\/230 collections\//i,
  },
  {
    id: '245',
    title: '245 Collection',
    summary: 'Statement-friendly styles with a richer finish.',
    matcher: /\/245 collections\//i,
  },
  {
    id: '250',
    title: '250 Collection',
    summary: 'A premium-feel range for display and sharing.',
    matcher: /\/250collections\//i,
  },
]

const galleryImages = Object.entries(assetModules)
  .map(([path, src]) => ({
    path,
    src,
    fileName: path.split('/').at(-1) ?? path,
  }))
  .filter(({ path }) => !/\/brand\//i.test(path))

const collectionSections = collectionDefinitions
  .map((collection) => {
    const items = galleryImages
      .filter(({ path }) => collection.matcher.test(path))
      .sort((left, right) =>
        left.fileName.localeCompare(right.fileName, undefined, {
          numeric: true,
          sensitivity: 'base',
        }),
      )

    return {
      ...collection,
      items,
    }
  })
  .filter((collection) => collection.items.length > 0)

const customerReviewTexts = [
  'The finish feels elegant and the design sits beautifully.',
  'Loved the premium look. It feels polished and easy to wear.',
  'Lightweight, graceful, and very comfortable for daily use.',
  'The shine stays lovely and the piece feels truly premium.',
  'A beautiful choice when you want a luxurious look every day.',
  'The detail and finish make it feel special the moment you wear it.',
]

const customerReviews = Object.entries(reviewImageModules).map(([path, src], index) => ({
  path,
  src,
  title: `Customer review ${index + 1}`,
  quote: customerReviewTexts[index % customerReviewTexts.length],
  reviewer: `Customer ${index + 1}`,
}))

function App() {
  return (
    <main className="catalogue-page">
      <div className="bg-orb bg-orb-left" aria-hidden="true" />
      <div className="bg-orb bg-orb-right" aria-hidden="true" />

      <section className="intro-strip" aria-label="Catalogue introduction">
        <div className="intro-brand">
          <div className="logo-frame logo-frame-small">
            {brandLogo ? (
              <img src={brandLogo} alt="Brand logo" className="brand-logo" />
            ) : (
              <div className="logo-fallback">Brand</div>
            )}
          </div>

          <div>
            <p className="eyebrow">Antitarnish jewellery catalogue</p>
            <h1>Where every piece feels like a touch of luxury.</h1>
            <p className="hero-note">
              Designed to feel graceful, polished, and effortlessly luxurious
              every time you wear it.
            </p>
            <div className="hero-badges" aria-label="Catalogue highlights">
              <span>Waterproof</span>
              <span>Anti-tarnish</span>
              <span>Gold theme</span>
            </div>
          </div>
        </div>
      </section>

      <section className="info-grid" aria-label="About anti-tarnish jewellery">
        <article className="info-card">
          <p className="collection-kicker">About antitarnish jewellery</p>
          <h2>Made to keep the shine longer and feel comfortable for everyday wear.</h2>
          <p>
            Anti-tarnish jewellery is designed with a protective finish that helps
            slow down dullness and discoloration. It keeps the pieces looking
            brighter for longer while giving your customers a polished, premium feel.
          </p>
        </article>

        <article className="info-card">
          <p className="collection-kicker">How to use</p>
          <h2>Wear, store, and care for each piece the right way.</h2>
          <ul className="care-list">
            <li>Wear after perfume, lotion, and makeup have settled.</li>
            <li>Keep each item in a dry pouch or separate box after use.</li>
            <li>Wipe gently with a soft cloth before storing.</li>
            <li>Avoid chemical sprays for longer shine.</li>
            <li>This jewellery is waterproof, and light contact with water is fine.</li>
          </ul>
        </article>
      </section>

      <section className="collections" aria-label="Jewellery collections">
        {collectionSections.map((collection) => (
          <article key={collection.id} className="collection-card" id={collection.id}>
            <header className="collection-header">
              <div>
                <p className="collection-kicker">New arrivals</p>
                <h2>{collection.title}</h2>
                <p className="collection-summary">{collection.summary}</p>
              </div>
            </header>

            <div className="image-grid">
              {collection.items.map((item, index) => (
                <figure className="image-tile" key={item.path}>
                  <img
                    src={item.src}
                    alt={`${collection.title} image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </figure>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className="footer-card" aria-label="Contact details">
        <div>
          <p className="collection-kicker">Get in touch</p>
          <h2>We're here for orders, enquiries, and collection updates.</h2>
        </div>

        <div className="footer-grid">
          <a className="footer-item" href="mailto:sheluxestore04@gmail.com">
            <span>Email</span>
            <strong>sheluxestore04@gmail.com</strong>
          </a>

          <a className="footer-item" href="tel:+919345857218">
            <span>Contact no</span>
            <strong>9345857218</strong>
          </a>

          <a
            className="footer-item"
            href="https://www.instagram.com/SheLuxe_Store/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Instagram</span>
            <strong>SheLuxe_Store</strong>
          </a>
        </div>
      </footer>

      <section className="reviews-section" aria-label="Customer reviews">
        <div className="reviews-header">
          <p className="collection-kicker">Customer reviews</p>
          <h2>Curated customer moments from real buyers.</h2>
        </div>

        <div className="reviews-grid">
          {customerReviews.map((review) => (
            <ReviewCard key={review.path} review={review} />
          ))}
        </div>
      </section>
    </main>
  )
}

function ReviewCard({ review }) {
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <article className="review-card">
      <figure className="review-media">
        {hasImageError ? (
          <div className="review-media-fallback" aria-label={review.title}>
            <span>Image unavailable</span>
            <strong>{review.reviewer}</strong>
          </div>
        ) : (
          <img
            src={review.src}
            alt={review.title}
            loading="lazy"
            decoding="async"
            onError={() => setHasImageError(true)}
          />
        )}
      </figure>

      <div className="review-content">
        <span className="review-back-label">Customer voice</span>
        <span className="review-stars" aria-hidden="true">
          ★★★★★
        </span>
        <strong>{review.reviewer}</strong>
        <p>{review.quote}</p>
      </div>
    </article>
  )
}

export default App
