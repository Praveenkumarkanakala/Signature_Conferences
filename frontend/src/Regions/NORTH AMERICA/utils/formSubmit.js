// const APPS_SCRIPT_URL =
//   "https://script.google.com/macros/s/AKfycbzIv1T6HwbkiEYY3c0L4acdElqQ9KmTke87UJ1_OvOWFTxQ2M8ec0GbMCOZSvzF_7yBjg/exec";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxrHYfalltdqw5mtY_E2stSrDAX-FPp5ObLe0YjTOl_zODHB2FbzU8x56EgWKU-mkRynQ/exec"; // paste your URL here

export async function submitToSheets(payload) {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors", // required — Apps Script doesn't return CORS headers
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });
  // no-cors means we can't read the response — but the write still happens
}
