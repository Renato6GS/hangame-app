export const sendDenounce = async ({ category, commentary, word }) => {
  try {
    if (!category) throw new Error("Category is required");
    if (!commentary) throw new Error("Comment is required");
    if (!word) throw new Error("Word is required");
    if (category.length === "" || commentary.length === "" || word.length === "")
      throw new Error("All fields are required");
    if (commentary.length > 200) throw new Error("Comment is too long");

    const url = "/api/sendDenounce";
    const data = { category, commentary, word };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = fetch(url, options)
      .then((res) => res.json())
      .then((res) => res);
    return res;
  } catch (e) {
    console.error(e);
    return false;
  }
};
