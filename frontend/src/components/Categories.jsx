function Categories() {
  return (
    <section className="py-20 px-6 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">Event Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            'Domain Expert Meetups',
            'Live Webinars',
            'Foreign Tech Introductions',
            'Startups & Innovations',
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex items-center justify-center text-lg font-semibold text-gray-800 hover:bg-white"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
