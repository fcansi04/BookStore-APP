const BaseUrl = import.meta.env.VITE_BASE_URL;

export const getBooks = async ({ queryKey }) => {
  // Token'ı localStorage'dan al
  const token = localStorage.getItem("token");

  const [_queryName, page, limit, searchQuery] = queryKey;
  let url = `${BaseUrl}/books?page=${page}&limit=${limit}`;

  // Add search query to the URL if it exists
  if (searchQuery && searchQuery.length > 0) {
    url += `&search=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // JSON parse hatası olursa statusText kullan
      }

      console.log("API Error:", errorMessage);
      throw new Error(errorMessage || "API request failed");
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
