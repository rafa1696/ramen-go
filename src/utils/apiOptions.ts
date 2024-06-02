const key = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";

export const options = {
  method: "GET",
  headers: {
    "x-api-key": key,
  },
};

export const postOptions = {
  method: "POST",
  headers: { "x-api-key": key },
  body: (brothId: string, proteinId: string) =>
    JSON.stringify({
      brothId: brothId,
      proteinId: proteinId,
    }),
};
