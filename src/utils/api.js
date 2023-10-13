export async function fetchResource(resourceName, params = '') {
  const data = await fetch(`http://localhost:3003/${resourceName}${params}`);
  const resource = await data.json();

  return resource;
}

export async function createResource(resourceName, resourceData) {
  const data = await fetch(`http://localhost:3003/${resourceName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resourceData),
  });
  const resource = await data.json();

  return resource;
}

export async function updateResource(resourceName, resourceId, resourceData) {
  const data = await fetch(
    `http://localhost:3003/${resourceName}/${resourceId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceData),
    }
  );
  const resource = await data.json();

  return resource;
}
