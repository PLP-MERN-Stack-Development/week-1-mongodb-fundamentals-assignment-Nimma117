//TASK 2: BASIC CRUD OPERATIONS

// Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// Find books published after a certain year
db.books.find({ published_year: { $gt: 2015 } })

// Find books by a specific author
db.books.find({ author: "Chimamanda Ngozi Adichie" })

// Update the price of a specific book
db.books.updateOne(
  { title: "Purple Hibiscus" },
  { $set: { price: 8500 } }
)

// Delete a book by its title
db.books.deleteOne({ title: "The Alchemist" })


//TASK 3: ADVANCED QUERIES

// Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// Projection: return only title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

// Sort by price in ascending order
db.books.find().sort({ price: 1 })

// Sort by price in descending order
db.books.find().sort({ price: -1 })

// Pagination: First 5 books (Page 1)
db.books.find().limit(5)

// Pagination: Next 5 books (Page 2)
db.books.find().skip(5).limit(5)


//TASK 4: AGGREGATION PIPELINE

// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

//TASK 5: INDEXING

// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 })

// Use explain() to demonstrate performance improvement (on title search)
db.books.find({ title: "Purple Hibiscus" }).explain("executionStats")