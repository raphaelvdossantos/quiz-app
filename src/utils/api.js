export async function fetchResource(resourceName, params = '') {
  const data = await fetch(`http://localhost:3000/${resourceName}${params}`);
  const resource = await data.json();

  return resource;
}

export async function createResource(resourceName, resourceData) {
  const data = await fetch(`http://localhost:3000/${resourceName}`, {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
    },
    body: JSON.stringify(resourceData),
  });
  const resource = await data.json();

  return resource;
}
