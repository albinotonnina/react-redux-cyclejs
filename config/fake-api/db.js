module.exports = () => {
  const data = {documents: []}
  // Create 1000 users
  for (let i = 0; i < 1000; i++) {
    data.documents.push({id: i, name: `Document ${i}`})
  }
  return data
}
