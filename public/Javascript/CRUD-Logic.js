async function CRUD(type, route, data) {
  //logic to determine type of fetch: Create, Get, Post, or Delete

  //pass in route, type of fetch, and the data
  const response = await fetch(route, {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
