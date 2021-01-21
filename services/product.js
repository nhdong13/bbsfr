export function initReviewOptions() {
  let username = process.env.STAMPED_PUBLIC_API_KEY;
  let password = process.env.STAMPED_PRIVATE_API_KEY;
  var myHeaders = new Headers({
    Authorization:
      "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
    "Content-Type": "application/json",
  });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return requestOptions;
}

export function initReviewSummaryOptions() {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      productIds: [
        {
          productId: 123,
        },
      ],
      apiKey: process.env.STAMPED_PUBLIC_API_KEY,
      storeUrl: "www.bikebiz.com.au",
    }),
  };

  return requestOptions;
}
