export async function getDataFromJson(link) {
  try {
    let response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    let data = await response.json();
    return data;
  } catch {
    throw new Error("Cant Fetch Data");
  }
}

export function getCategories(data) {
  return [...new Set(data.map((e) => e.category))];
}
