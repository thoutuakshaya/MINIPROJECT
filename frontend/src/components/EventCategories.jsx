function EventCategories() {
    const categories = ["Weddings", "Corporate Events", "College Fests", "Product Launches"];
    return (
      <section className="categories">
        <h2>Event Categories</h2>
        <div className="cards">
          {categories.map((cat) => (
            <div key={cat} className="card">{cat}</div>
          ))}
        </div>
      </section>
    );
  }
  export default EventCategories;
  